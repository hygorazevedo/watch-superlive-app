import './agora-player.css';
import React, { useEffect, useRef, useState } from "react";
import AgoraRTC, { type IAgoraRTCClient, type IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import useRetreaveStream from "../hooks/useRetreateStream";
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const appId = "dca16fbf522b4c6f96ecc88721800310"; 

const AgoraPlayer: React.FC = () => {
  const [remoteUsers, setRemoteUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const clientRef = useRef<IAgoraRTCClient | null>(null);
  const videoRefs = useRef<Map<string | number, HTMLDivElement>>(new Map());
  const { id } = useParams();
  const { stream } = useRetreaveStream(id!);
  const location = useLocation();
  const navigation = useNavigate();

  const backRoute = location.pathname.replace(`/${id}`, '');

  document.title = stream ? `Watching ${stream.name}` : 'Agora Live Spectator';
  
  useEffect(() => {
    if (!stream) return;
    if (clientRef.current) return;

    const init = async () => {
      const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });

      // se já existe um canal ativo
      if ((window as any).activeChannel) {
        if ((window as any).activeChannel === stream.channel) {
          // mesmo canal → derruba anterior
          (window as any).activeClient?.leave();
        }
      }

      (window as any).activeChannel = stream.channel;
      (window as any).activeClient = client;

      clientRef.current = client;
      await client.join(appId, stream.channel, stream.token, stream.uid);

      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "video") {
          setRemoteUsers((prev) => [...prev, user]);
        }
        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", (user) => {
        setRemoteUsers((prev) => prev.filter((u) => u.uid !== user.uid));
        navigation(backRoute);
      });
    };


    init();

    return () => {
      clientRef.current?.leave();
      clientRef.current = null;
    };
  }, [stream]);


  useEffect(() => {
    remoteUsers.forEach((user) => {
      const container = videoRefs.current.get(user.uid);
      if (container) {
        user.videoTrack?.play(container);
      }
    });
  }, [remoteUsers]);


  return (
    <div className='agora-player-container'>
      {remoteUsers.map((user) => (
        <div
          key={user.uid}
          ref={(el) => {
            if (el) videoRefs.current.set(user.uid, el);
          }}
          className='video-container'
        />
      ))}
    </div>
  );
};

export default AgoraPlayer;

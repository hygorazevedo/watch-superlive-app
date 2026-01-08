import { useCallback, useEffect, useRef, useState } from "react";


interface Stream {
  streamId: string;
  name: string;
  image: string;
  viewers: string;
  isPremium: boolean;
}

interface useFetchStreamsResult {
  streams: Stream[];
  loading: boolean;
  hasMore: boolean;
}

interface FetchRequest {
  url: string;
  options: RequestInit;
}

const fetchWrapper = (category: string, next: string | null): FetchRequest => {
  switch (category) {
    case '0':
      return handleFetchDiscover(next);
    case '9':
      return handleFetchFollowings(next);
    case '5':
      return handleFetchPremium(next);
    default:
      throw new Error('Categoria desconhecida');
  }
}

const handleFetchDiscover = (next: string | null): FetchRequest => {
  return {
    url: '/spl/api/web/discover',
    options: {
      headers: {
        "accept": "application/json",
        "authorization": "Token b1cccabd413793bb7854d03e80549532808af648",
        "content-type": "application/json",
        "device-id": "8bc4217f41ef1a1fb86063d540bc9040"
      },
      referrer: "https://superlive.chat/",
      body: JSON.stringify({
        "client_params": {
          "os_type": "web",
          "ad_nationality": null,
          "app_build": "3.33.2",
          "app": "superlive",
          "build_code": "742-2946184-prod",
          "app_language": "pt",
          "device_language": "pt",
          "device_preferred_languages": [
            "pt-BR"
          ],
          "source_url": "https://superlive.chat/pt/discover",
          "session_source_url": "https://superlive.chat/pt",
          "referrer": "https://superlive.chat/pt",
          "adid": "c484f476b8511ed8db53d6e5e19e2620",
          "adjust_attribution_data": {
            "adid": "c484f476b8511ed8db53d6e5e19e2620",
            "tracker_token": "mii5ej6",
            "tracker_name": "Organic",
            "network": "Organic"
          },
          "adjust_web_uuid": "f11f8a8f-052a-4d27-9e78-e9275fd991f6",
          "firebase_analytics_id": "771419953.1767739995",
          "incognito": true,
          "installation_id": "e3a2ebea-a963-4ef2-b370-7106b8da1b3d",
          "rtc_id": "1604364196",
          "uuid_c1": "GlPnpJnPk1fGyQW6IMIrbBxooyc7gJxt",
          "vl_cid": null,
          "ttp": "01KEAR7DPFA7JEJV9J6GQQAQWC_.tt.1",
          "twclid": null,
          "tdcid": null,
          "fbc": null,
          "fbp": "fb.1.1767739995419.414418151983685025",
          "ga_session_id": "1767739995",
          "web_type": 1
        },
        "next": next,
        "type": 0
      }),
      method: "POST",
      credentials: "include"
    }
  };
}

const handleFetchFollowings = (next: string | null): FetchRequest => {
  return {
    url: '/spl/api/web/followings/streams',
    options: {
      method: "POST",
      credentials: "include",
      referrer: "https://superlive.chat/",
      headers: {
        "accept": "application/json",
        "authorization": "Token 2b8a670eba846ee68f1c700592e6b137089646e3",
        "content-type": "application/json",
        "device-id": "d4c19855493cde21ae269b20dae540d3"
      },
      body: JSON.stringify({
        "client_params": {
          "os_type": "web",
          "ad_nationality": null,
          "app_build": "3.33.2",
          "app": "superlive",
          "build_code": "742-2946184-prod",
          "app_language": "pt",
          "device_language": "pt",
          "device_preferred_languages": [
            "pt-BR"
          ],
          "source_url": "https://superlive.chat/pt/followings",
          "referrer": "https://superlive.chat/",
          "adid": "29117272ba9134b7071b8666c4798678",
          "adjust_attribution_data": {
            "adid": "29117272ba9134b7071b8666c4798678",
            "tracker_token": "mii5ej6",
            "tracker_name": "Organic",
            "network": "Organic"
          },
          "adjust_web_uuid": "578699a4-73b0-4ce2-a5a8-4e5d6e59f19c",
          "firebase_analytics_id": "1315483364.1767739699",
          "incognito": true,
          "installation_id": "ea20c4f0-5fcb-42c7-909a-fe3fa85816f2",
          "rtc_id": "496724192",
          "uuid_c1": "-N73thB2iohjab1tf4l72ODjszmyIwC6",
          "vl_cid": null,
          "ttp": "01KEAQYCZS7M7EQGM567W1J6NC_.tt.1",
          "twclid": null,
          "tdcid": null,
          "fbc": null,
          "fbp": "fb.1.1767739700607.763405475888381415",
          "ga_session_id": "1767739698",
          "web_type": 1
        },
        "next": next
      })
    }
  }
}

const handleFetchPremium = (next: string | null): FetchRequest => {
  return {
    url: '/spl/api/web/discover',
    options: {
      headers: {
        "accept": "application/json",
        "authorization": "Token b1cccabd413793bb7854d03e80549532808af648",
        "content-type": "application/json",
        "device-id": "8bc4217f41ef1a1fb86063d540bc9040"
      },
      referrer: "https://superlive.chat/",
      body: JSON.stringify({
        "client_params": {
          "os_type": "web",
          "ad_nationality": null,
          "app_build": "3.33.2",
          "app": "superlive",
          "build_code": "742-2946184-prod",
          "app_language": "pt",
          "device_language": "pt",
          "device_preferred_languages": [
            "pt-BR"
          ],
          "source_url": "https://superlive.chat/pt/discover",
          "session_source_url": "https://superlive.chat/pt",
          "referrer": "https://superlive.chat/pt",
          "adid": "c484f476b8511ed8db53d6e5e19e2620",
          "adjust_attribution_data": {
            "adid": "c484f476b8511ed8db53d6e5e19e2620",
            "tracker_token": "mii5ej6",
            "tracker_name": "Organic",
            "network": "Organic"
          },
          "adjust_web_uuid": "f11f8a8f-052a-4d27-9e78-e9275fd991f6",
          "firebase_analytics_id": "771419953.1767739995",
          "incognito": true,
          "installation_id": "e3a2ebea-a963-4ef2-b370-7106b8da1b3d",
          "rtc_id": "1604364196",
          "uuid_c1": "GlPnpJnPk1fGyQW6IMIrbBxooyc7gJxt",
          "vl_cid": null,
          "ttp": "01KEAR7DPFA7JEJV9J6GQQAQWC_.tt.1",
          "twclid": null,
          "tdcid": null,
          "fbc": null,
          "fbp": "fb.1.1767739995419.414418151983685025",
          "ga_session_id": "1767739995",
          "web_type": 1
        },
        "next": next,
        "type": 5
      }),
      method: "POST",
      credentials: "include"
    }
  };
}

export default function useFetchStreams(category: string, refresh: number): useFetchStreamsResult {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef(false);

  // ✅ Definimos fetchStreams fora do useEffect e com useCallback
  const fetchStreams = useCallback(async () => {
    if (loadingRef.current || !hasMore) return;

    loadingRef.current = true;
    setLoading(true);

    try {
      const request = fetchWrapper(category, next); // corrigido: category
      const response = await fetch(request.url, request.options);
      const data = await response.json();

      setStreams(prev => {
        const newItems = data.items.map((item: any) => ({
          streamId: item.stream_details.livestream_id,
          name: item.user.name,
          image: item.user.profile_image?.thumbnail_url,
          viewers: item.stream_details.viewer_count,
          isPremium: item.stream_details.type === 2,
        }));
        const merged = [...prev, ...newItems];
        const unique = Array.from(new Map(merged.map(s => [s.streamId, s])).values());
        unique.sort((a, b) => b.isPremium - a.isPremium);
        return unique;
      });

      setNext(data.meta.next);
      setHasMore(!!data.meta.next);
    } catch (err) {
      console.error("Erro ao obter streams:", err);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [category, refresh, next, hasMore]);

  // ✅ Buscar streams inicial
  useEffect(() => {
    fetchStreams();
  }, [fetchStreams]);

  // ✅ dispara quando a categoria muda
  useEffect(() => {
    setStreams([]);     // limpa lista ao trocar categoria
    setNext(null);      // reseta paginação
    setHasMore(true);   // habilita novo carregamento
    fetchStreams();
  }, [category, refresh]);

  // ✅ scroll infinito
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollHeight > clientHeight + 50 && scrollTop + clientHeight >= scrollHeight - 50) {
        fetchStreams();
      }
    };


    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchStreams]);

  return { streams, loading, hasMore };
}

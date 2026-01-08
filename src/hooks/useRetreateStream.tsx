import { useEffect, useState } from "react";

interface Stream {
    channel: string;
    token: string;
    uid: string;
    name: string;
}

interface useRetreaveStreamReturn {
    stream: Stream | null;
    loading: boolean;
}

const headers = {
    "accept": "application/json",
    "authorization": "Token 2b8a670eba846ee68f1c700592e6b137089646e3",
    "content-type": "application/json",
    "device-id": "8bc4217f41ef1a1fb86063d540bc9040",
}

export default function useRetreaveStream(streamId: string) : useRetreaveStreamReturn {
    const [stream, setStream] = useState<Stream | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchStream = async () => {
        if (!streamId || !loading) return;

        setLoading(true);
        try {
            const body = {
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
                    "source_url": `https://superlive.chat/pt/livestream/${streamId}`,
                    "session_source_url": "https://superlive.chat/google_callback#state=/pt&id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6IjRiYTZlZmVmNWUxNzIxNDk5NzFhMmQzYWJiNWYzMzJlMGY3ODcxNjUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0NjEyNTIxMzU0NjItbGhxaW85bGdtM2hxaTZjbmtsNGdxdGhzdW8yMnQ1dmEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0NjEyNTIxMzU0NjItbGhxaW85bGdtM2hxaTZjbmtsNGdxdGhzdW8yMnQ1dmEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTI3MTg1NjMwNzc3MjY5MDU5NTkiLCJlbWFpbCI6ImdhbWVzLmh5Z29yYXpldmVkb0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibm9uY2UiOiI0ZGIwYzFhMC0wNzljLTRkMGItODRlMy0wZTNiZTdjM2E4MzAiLCJuYmYiOjE3Njc3Mzk0MjMsIm5hbWUiOiJIeWdvciBBemV2ZWRvIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xnNXBhd0o4YnhWeHQydmJKRF8xWTBVcDVsNDVnTTU0YmU1dnNOcWtLeWh5WXRHZz1zOTYtYyIsImdpdmVuX25hbWUiOiJIeWdvciIsImZhbWlseV9uYW1lIjoiQXpldmVkbyIsImlhdCI6MTc2NzczOTcyMywiZXhwIjoxNzY3NzQzMzIzLCJqdGkiOiIxMzI5MjY0NWE1MGZjNTk4NjVhMjExOGVlMzk5MGZjM2QxZWEzMzIwIn0.o-HXMQTRYWsv2kExqT6brKn5KvsbNPVCnxtawVfOERWf2f2R3XOEPRGgf0bT_PUwRGtK29YPVvNSxChVQjBwWlCc6xs5Od6ei3uNL0DDLtYg_6m-BQlHlZh_353MCVC6rvZ_1bUJcVSt9T4jL-60J3bMtAYyKwyNz8s1WIIkyGI-EMWwu_vr9odPvljiJtyMOxY2EUVOVrh1gktSXwxiIGq684NDVj-AyGg7w_T17D8wMtY8vMXFHe868Wrq_qYMvjHgav2MfIvXzv7vAAUZgqgiOy3bAyGkkcr5yRze5zm0vRqH5ecGrHcECH6frmIeI2bPNq0DqEMmY2N-WgBxkQ&authuser=0&prompt=none",
                    "referrer": "https://accounts.google.com.br/",
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
                "livestream_id": streamId
            }

            const response = await fetch('/spl/api/web/livestream/retrieve', {
                method: 'POST',
                credentials: "include",
                referrer: "https://superlive.chat/",
                headers: headers,
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch stream");
            }

            const data = await response.json();
            console.log(data);
            setStream({
                channel: data.stream_details.channel_id,
                token: data.stream_details.agora_channel_token,
                uid: data.stream_details.agora_id,
                name: data.user.name
            });
        } catch (error) {
            console.error("Error fetching stream:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStream();
    }, [streamId]);

    return {stream, loading};
}
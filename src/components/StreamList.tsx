import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetchStreams from "../hooks/useFetchStreams";

const categories = [
  { descritiopn: "Featured", value: "0" },
  { descritiopn: "Premium", value: "5" },
  { descritiopn: "Followed", value: "9" }
];

export default function StreamList() {
  const [refresh, setRefresh] = useState<number>(0);
  const [category, setCategory] = useState<string>(
    localStorage.getItem("selectedCategory") || "9"
  );

  const { streams, loading, hasMore } = useFetchStreams(category, refresh);

  // sempre que a categoria mudar, salva no localStorage
  useEffect(() => {
    localStorage.setItem("selectedCategory", category);
  }, [category]);

  return (
    <>
      <ul style={{ display: "flex", justifyContent: "center", gap: "10px", listStyle: "none", padding: 0 }}>
        {categories.map((cat, index) => (
          <li
            key={index}
            onClick={() => setCategory(cat.value)}
            style={{
              cursor: "pointer",
              border: category === cat.value ? "2px solid blue" : "1px solid #ccc",
              color: category === cat.value ? "blue" : "#ccc",
              padding: "5px"
            }}
          >
            <span>{cat.descritiopn}</span>
          </li>
        ))}
        <li
            key={-1}
            onClick={() => setRefresh(prev => prev + 1)}
            style={{
              cursor: "pointer",
              border: "1px solid #ccc",
              color: "#ccc",
              padding: "5px"
            }}
          >
            <span>Refresh</span>
          </li>
      </ul>
      <div>
        {streams.map((stream, index) => (
          <Link key={index} to={stream.streamId}>
            <div>
              <img src={stream.image} alt={stream.name} />
              <div>
                {stream.name}
                <p>{stream.viewers} viewers</p>
                {stream.isPremium && <span>⭐ Premium</span>}
              </div>
              
            </div>
          </Link>
        ))}
        {loading && <p>Carregando...</p>}
        {!hasMore && <p>Fim da lista</p>}
      </div>
    </>
  );
}

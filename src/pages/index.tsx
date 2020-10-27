import { useEffect, useState } from "react";
import api from "../services/api";
import { Title } from "../styles/pages/Home";

interface IProduct {
  id: string;
  title: string;
}

export default function Home() {
  const [recommendedProducts, setRecommendedProducts] = useState<IProduct[]>(
    []
  );

  useEffect(() => {
    api
      .get("/recommended")
      .then((response) => setRecommendedProducts(response.data));
  }, []);
  return (
    <div>
      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map((recommendedProducts) => (
            <li key={recommendedProducts.id}>{recommendedProducts.title}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

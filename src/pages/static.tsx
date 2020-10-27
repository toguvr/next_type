import { GetStaticProps } from "next";
import api from "@/services/api";

interface IProduct {
  id: string;
  title: string;
}

interface StaticProps {
  products: IProduct[];
}

export default function StaticRender({ products }: StaticProps) {
  return (
    <div>
      <h1>Top 10</h1>
      <ul>
        {products.map((recommendedProduct) => (
          <li key={recommendedProduct.id}>{recommendedProduct.title}</li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps<StaticProps> = async (context) => {
  const response = await api.get("/recommended");
  return {
    props: {
      products: response.data,
    },
  };
};

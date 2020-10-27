import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import api from "../../../services/api";

interface IProduct {
  id: string;
  title: string;
}

interface StaticProps {
  products: IProduct[];
}

export default function StaticRenderDinamic({ products }: StaticProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>carregando...</h1>;
  }

  return (
    <div>
      <h1>{router.query.slug}</h1>
      <ul>
        {products.map((recommendedProduct) => (
          <li key={recommendedProduct.id}>{recommendedProduct.title}</li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await api.get("/categories");
  const paths = response.data.map((category) => {
    return {
      params: { slug: category.id },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<StaticProps> = async (context) => {
  const { slug } = context.params;
  const response = await api.get(`/products?category_id=${slug}`);
  return {
    props: {
      products: response.data,
    },
    revalidate: 60,
  };
};

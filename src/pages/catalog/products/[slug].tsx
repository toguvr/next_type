import { useRouter } from "next/router";

const products: React.FC = () => {
  const router = useRouter();
  return <h1>{router.query.slug}</h1>;
};

export default products;

import { Layout } from "@/components/Layout";
import ProductList from "@/components/pages/home/ProductList";
import Testimoni from "@/components/pages/home/Testimoni";

export default function Home() {
  return (
    <Layout>
      <>
        <Testimoni />
        <ProductList />
      </>
    </Layout>
  );
}

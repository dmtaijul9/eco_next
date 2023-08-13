import { getAllEcoSpecialProducts } from "@/utils/resolvers/query";
import { useQuery } from "@tanstack/react-query";

import React from "react";

import ProductListComonent from "@/components/ProductListComonent";
import { useRouter } from "next/router";

const ProductList = () => {
  const router = useRouter();

  //INFO: Get all the products from the database.

  const { isLoading, data, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getAllEcoSpecialProducts,
  });

  if (isError) {
    router.push("/500");
    return <div>Error</div>;
  }

  return (
    <ProductListComonent
      isLoading={isLoading}
      products={data?.data?.products}
      title="Eco_Next Special Products"
    />
  );
};

export default ProductList;

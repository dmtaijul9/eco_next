import { getAllProductsQuery } from "@/utils/resolvers/query";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import ProductListComonent from "@/components/ProductListComonent";

const ShopPageComonent = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProductsQuery,
  });

  return (
    <ProductListComonent
      isLoading={isLoading}
      products={data?.data?.products}
      title="All Products"
    />
  );
};

export default ShopPageComonent;

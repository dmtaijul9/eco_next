import React from "react";

import { Container } from "@/components/Container";
import { useQuery } from "@tanstack/react-query";
import { getAllProductsQuery } from "@/utils/resolvers/query";
import PageLoader from "@/components/PageLoader";
import ProductTable from "./ProductTable";

const AllProducts = () => {
  const { isLoading, data, isError } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProductsQuery,
  });

  const products = data?.data?.products;

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Container className="px-3 py-3 my-10 shadow-md">
      <ProductTable
        products={products}
        title="Letest 30 Orders"
        createLink="/admin/products/create"
      />
    </Container>
  );
};

export default AllProducts;

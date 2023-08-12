import React from "react";
import NewOrderTable from "./NewOrderTable";
import { Container } from "@/components/Container";
import { useQuery } from "@tanstack/react-query";
import { getLetestOrdersQuery } from "@/utils/resolvers/query";
import PageLoader from "@/components/PageLoader";

const AllOrders = () => {
  const { isLoading, data, isError } = useQuery({
    queryKey: ["allOrders"],
    queryFn: getLetestOrdersQuery,
  });

  const orders = data?.data?.orders;

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Container className="px-3 py-3 my-10 shadow-md">
      <NewOrderTable orders={orders} title="Letest 30 Orders" />
    </Container>
  );
};

export default AllOrders;

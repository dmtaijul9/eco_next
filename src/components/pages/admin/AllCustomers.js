import React from "react";
import { Container } from "@/components/Container";
import { useQuery } from "@tanstack/react-query";
import { getLetestUsersQuery } from "@/utils/resolvers/query";
import PageLoader from "@/components/PageLoader";
import UsersTable from "./UserTable";

const AllCustomers = () => {
  const { isLoading, data, isError, refetch } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getLetestUsersQuery,
  });

  const customers = data?.data?.users;

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Container className="px-3 py-3 my-10 shadow-md">
      <UsersTable
        customers={customers}
        title="Letest 30 Customers"
        refetch={refetch}
      />
    </Container>
  );
};

export default AllCustomers;

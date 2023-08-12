import { Button } from "@/components/Button";
import { updateUserMutation } from "@/utils/resolvers/mutation";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-hot-toast";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const UsersTable = ({ customers = [], title = "", link, refetch }) => {
  const { mutate, isLoading } = useMutation({
    mutationKey: "updateUser",
    mutationFn: updateUserMutation,
  });

  const [updatingId, setUpdatingId] = React.useState(null);

  const handleUpdate = ({ id, role }) => {
    setUpdatingId(id);
    mutate(
      {
        variables: {
          role,
        },
        userId: id,
      },
      {
        onSuccess: () => {
          toast.success("User updated successfully");
          setUpdatingId(null);
          refetch();
        },
        onError: () => {
          toast.error("Something went wrong");
        },
      }
    );
  };

  return (
    <div className="px-4 py-5 sm:px-6 lg:px-8">
      <div className="items-center pb-4 border-b sm:flex">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            {title}
          </h1>
        </div>
        <div>
          {link && (
            <Button href={link} color="cyan">
              All customers
            </Button>
          )}
        </div>
      </div>
      <div className="flow-root mt-2">
        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                  >
                    Phone Number
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                  >
                    Role
                  </th>

                  <th
                    scope="col"
                    className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                  >
                    <span className="">Admin/User</span>
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                  >
                    <span className="">Admin/User</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, personIdx) => (
                  <tr key={personIdx}>
                    <td
                      className={classNames(
                        personIdx !== customers.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                      )}
                    >
                      {customer?.first_name} {customer?.last_name}
                    </td>
                    <td
                      className={classNames(
                        personIdx !== customers.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell"
                      )}
                    >
                      {customer?.email}
                    </td>
                    <td
                      className={classNames(
                        personIdx !== customers.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                      )}
                    >
                      {customer?.phone}
                    </td>
                    <td
                      className={classNames(
                        personIdx !== customers.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"
                      )}
                    >
                      {customer?.role === "ADMIN" ? (
                        <span className="px-4 py-1 bg-cyan-600 text-gray-950 rounded-xl bg-opacity-40">
                          Admin
                        </span>
                      ) : (
                        <span className="px-4 py-1 bg-red-600 text-gray-950 rounded-xl bg-opacity-40">
                          User
                        </span>
                      )}
                    </td>

                    <td
                      className={classNames(
                        personIdx !== customers.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                      )}
                    >
                      <Button
                        color={customer?.role === "ADMIN" ? "cyan" : "gray"}
                        onClick={() => {
                          handleUpdate({
                            id: customer._id,
                            role: customer?.role === "ADMIN" ? "USER" : "ADMIN",
                          });
                        }}
                        disabled={isLoading && updatingId === customer._id}
                      >
                        {customer?.role === "ADMIN"
                          ? "Make User"
                          : "Make Admin"}
                      </Button>
                    </td>
                    <td
                      className={classNames(
                        personIdx !== customers.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"
                      )}
                    >
                      <Button color="danger">Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;

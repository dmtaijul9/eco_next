import { Button } from "@/components/Button";
import { CheckboxField, SelectField } from "@/components/Fields";
import PageLoader from "@/components/PageLoader";
import { formateMoney } from "@/tools/importantTools";
import { updateOrderMutationByAdmin } from "@/utils/resolvers/mutation";
import { getSingleOrderQuery } from "@/utils/resolvers/query";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const status = ["pending", "processing", "completed", "cancelled"];

const SingleOrderView = () => {
  const router = useRouter();
  const { orderId } = router.query;

  const [updateState, setUpdateState] = useState({
    order_status: "pending",
    is_delivered: false,
  });

  const { isLoading, isError, data, refetch, isFetched } = useQuery({
    queryKey: ["singleOrder", orderId],
    queryFn: () => getSingleOrderQuery({ id: orderId }),
    enabled: !!orderId,
  });

  const { mutate, isLoading: updateLoading } = useMutation({
    mutationKey: ["updateOrder", orderId],
    mutationFn: updateOrderMutationByAdmin,
  });

  useEffect(() => {
    if (data?.data?.order) {
      setUpdateState({
        order_status: data?.data?.order?.order_status,
        is_delivered: data?.data?.order?.is_delivered,
      });
    }
  }, [isFetched]);

  const order = data?.data?.order;

  const handleUpdateOrder = async (e) => {
    e.preventDefault();
    const variables = {
      ...updateState,
    };

    mutate(
      {
        variables,
        orderId,
      },
      {
        onSuccess: () => {
          toast.success("Order updated successfully");
          refetch();
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  if (isLoading) {
    return <PageLoader />;
  }
  return (
    <>
      <main className="relative lg:min-h-full">
        <div>
          <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24">
            <div className="flex items-start justify-center w-full h-full">
              <div className="w-full">
                <dl className="grid grid-cols-1 mt-16 text-sm y-600 gap-x-4">
                  <div className="mt-2 ">
                    <div className="p-3 mb-5 border rounded-md">
                      <dt className="pb-3 font-medium text-gray-900 border-b">
                        Update Order
                      </dt>
                      <form onSubmit={handleUpdateOrder}>
                        <div className="w-full mt-5">
                          <SelectField
                            options={status}
                            className="w-full"
                            label="Order Status"
                            id="order_status"
                            name="order_status"
                            value={updateState.order_status}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setUpdateState({
                                ...updateState,
                                order_status: e.target.value,
                              });
                            }}
                          />
                          <CheckboxField
                            label="Mark as delivered"
                            id="is_delivered"
                            name="is_delivered"
                            onOptionChange={(e) => {
                              setUpdateState({
                                ...updateState,
                                is_delivered: e.target.checked,
                              });
                            }}
                            checked={updateState.is_delivered}
                            className="mt-5"
                          />
                        </div>
                        <div className="mt-5">
                          <Button
                            color="cyan"
                            className="w-full"
                            disabled={updateLoading}
                          >
                            Update Order
                          </Button>
                        </div>
                      </form>
                    </div>
                    <dt className="font-medium text-gray-900">
                      Shipping Address
                    </dt>
                    <div className="mt-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Address:</span>{" "}
                        <span>{order.shipping_address.address}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">City:</span>{" "}
                        <span>{order.shipping_address.city}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Postal Code:</span>{" "}
                        <span>{order.shipping_address.postal_code}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Country:</span>{" "}
                        <span>{order.shipping_address.country}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 border-t">
                    <dt className="font-medium text-gray-900">
                      Contact Information
                    </dt>
                    <div className="mt-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Name:</span>{" "}
                        <span>{order.shipping_address.reciever_name}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Phone:</span>{" "}
                        <span>{order.shipping_address.phone_number}</span>
                      </div>
                    </div>
                  </div>
                  <div className="py-2 mt-2 border-t border-b">
                    <dt className="font-medium text-gray-900">
                      Others Information
                    </dt>
                    <div className="mt-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Payment Method:</span>{" "}
                        <span>{order.payment_method}</span>
                      </div>
                    </div>
                  </div>
                </dl>
              </div>
            </div>
            <div className="lg:col-start-2">
              <h2 className="text-xl font-semibold">Order Summary</h2>
              <ul
                role="list"
                className="mt-6 text-sm font-medium text-gray-500 border-t border-gray-200 divide-y divide-gray-200"
              >
                {order.order_items.map((product) => (
                  <li key={product._id} className="flex py-6 space-x-6">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={100}
                      height={100}
                      className="flex-none object-cover object-center w-24 h-24 bg-gray-100 rounded-md"
                    />
                    <div className="flex-auto space-y-1">
                      <h3 className="text-gray-900">{product.name}</h3>
                      <p className="text-gray-500">
                        {product.qty} x {formateMoney(product.price)}
                      </p>
                    </div>
                    <p className="flex-none font-medium text-gray-900">
                      {formateMoney(product.price * product.qty)}
                    </p>
                  </li>
                ))}
              </ul>

              <dl className="pt-6 space-y-6 text-sm font-medium text-gray-500 border-t border-gray-200">
                <div className="flex items-center justify-between pt-6 text-gray-900 border-t border-gray-200">
                  <dt className="text-base">Total</dt>
                  <dd className="text-base">
                    {formateMoney(order.total_price)}
                  </dd>
                </div>
              </dl>

              <div className="py-6 mt-16 text-right border-t border-gray-200">
                <Link
                  href="/admin/dashboard"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Return to Dashboard
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SingleOrderView;

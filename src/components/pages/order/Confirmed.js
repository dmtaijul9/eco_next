import PageLoader from "@/components/PageLoader";
import { formateMoney } from "@/tools/importantTools";
import { getSingleOrderQuery } from "@/utils/resolvers/query";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Confirmed = () => {
  const router = useRouter();
  //INFO: Order id from url
  const { orderId } = router.query;

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.push("/login");
    },
  });

  //INFO: Get single order query
  const { isLoading, isError, data } = useQuery({
    queryKey: ["singleOrder", orderId],
    queryFn: () => getSingleOrderQuery({ id: orderId }),
    enabled: !!orderId,
  });

  //INFO: Order data
  const order = data?.data?.order;

  //INFO: if loading show page loader
  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <main className="relative lg:min-h-full">
        <div>
          <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24">
            <div className="flex items-start justify-center w-full h-full">
              <div>
                <h1 className="text-lg font-medium text-primary">
                  Order received
                </h1>
                <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  Thanks for ordering
                </p>
                <p className="mt-2 text-base text-gray-500">
                  We appreciate your order, we’re currently processing it. So
                  hang tight and we’ll send you confirmation very soon!
                </p>

                <dl className="mt-16 text-sm font-medium">
                  <dt className="text-gray-900">Tracking number</dt>
                  <dd className="mt-2 text-indigo-600">{order._id}</dd>
                </dl>
                <dl className="grid grid-cols-1 mt-16 text-sm border-t text-gra y-600 gap-x-4">
                  <div className="mt-2 ">
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
                  <li key={product.id} className="flex py-6 space-x-6">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="flex-none object-cover object-center w-24 h-24 bg-gray-100 rounded-md"
                    />
                    <div className="flex-auto space-y-1">
                      <h3 className="text-gray-900">
                        <Link href={`/product/${product.product}`}>
                          {product.name}
                        </Link>
                      </h3>
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
                  href="/shop"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping
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

export default Confirmed;

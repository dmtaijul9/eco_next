import { Button } from "@/components/Button";
import { formateMoney } from "@/tools/importantTools";
import Link from "next/link";
import React from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const NewOrderTable = ({ orders = [], title = "", link }) => {
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
              All Orders
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
                    className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                  >
                    Phone Number
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                  >
                    Order Status
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                  >
                    Total Items
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                  >
                    Total price
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                  >
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, personIdx) => (
                  <tr key={personIdx}>
                    <td
                      className={classNames(
                        personIdx !== orders.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                      )}
                    >
                      {order?.shipping_address?.reciever_name}
                    </td>
                    <td
                      className={classNames(
                        personIdx !== orders.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell"
                      )}
                    >
                      {order?.shipping_address?.phone_number}
                    </td>
                    <td
                      className={classNames(
                        personIdx !== orders.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"
                      )}
                    >
                      {order?.order_status === "pending" ? (
                        <span className="px-4 py-1 bg-yellow-600 text-gray-950 rounded-xl bg-opacity-40">
                          Pending
                        </span>
                      ) : order?.order_status === "processing" ? (
                        <span className="px-4 py-1 text-white bg-gray-950 rounded-xl bg-opacity-40">
                          Processing
                        </span>
                      ) : order?.order_status === "completed" ? (
                        <span className="px-4 py-1 bg-green-600 text-gray-950 rounded-xl bg-opacity-40">
                          Completed
                        </span>
                      ) : (
                        <span className="px-4 py-1 bg-red-600 text-gray-950 rounded-xl bg-opacity-40">
                          Cancelled
                        </span>
                      )}
                    </td>
                    <td
                      className={classNames(
                        personIdx !== orders.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                      )}
                    >
                      {order?.order_items
                        ?.map((item) => item.qty)
                        .reduce((total, qty) => (total += qty), 0)}
                    </td>
                    <td
                      className={classNames(
                        personIdx !== orders.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                      )}
                    >
                      {formateMoney(order?.total_price)}
                    </td>
                    <td
                      className={classNames(
                        personIdx !== orders.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8"
                      )}
                    >
                      <Link href={`/admin/orders/${order?._id}`}>
                        View
                        <span className="sr-only">
                          , {order?.payment_method}
                        </span>
                      </Link>
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

export default NewOrderTable;

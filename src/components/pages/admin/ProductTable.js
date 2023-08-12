import { Button } from "@/components/Button";
import { formateMoney } from "@/tools/importantTools";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductTable = ({ products = [], title = "", link }) => {
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
              All products
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
                    Image
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                  >
                    Brand
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                  >
                    Eco Special
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
                {products.map((product, personIdx) => (
                  <tr key={personIdx}>
                    <td
                      className={classNames(
                        personIdx !== products.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                      )}
                    >
                      <Image
                        src={product?.image}
                        alt={product?.name}
                        width={100}
                        height={100}
                        className="object-cover rounded-md shadow-sm "
                      />
                    </td>
                    <td
                      className={classNames(
                        personIdx !== products.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell"
                      )}
                    >
                      {product?.brand}
                    </td>
                    <td
                      className={classNames(
                        personIdx !== products.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"
                      )}
                    >
                      {product?.category}
                    </td>
                    <td
                      className={classNames(
                        personIdx !== products.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                      )}
                    >
                      {formateMoney(product?.price)}
                    </td>
                    <td
                      className={classNames(
                        personIdx !== products.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                      )}
                    >
                      {product?.isEcoSpecial ? (
                        <span className="px-4 py-1 bg-green-600 text-gray-950 rounded-xl bg-opacity-40">
                          Yes
                        </span>
                      ) : (
                        <span className="px-4 py-1 bg-red-600 text-gray-950 rounded-xl bg-opacity-40">
                          No
                        </span>
                      )}
                    </td>
                    <td
                      className={classNames(
                        personIdx !== products.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8"
                      )}
                    >
                      <Link href={`/admin/products/${product?._id}`}>
                        View
                        <span className="sr-only">
                          , {product?.payment_method}
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

export default ProductTable;

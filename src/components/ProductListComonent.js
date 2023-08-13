import React from "react";
import { Button } from "./Button";
import Link from "next/link";
import Image from "next/image";
import ProductListPlaceholder from "./pages/home/ProductListPlaceholder";

const ProductListComonent = ({
  products = [],
  title = "",
  isLoading = false,
}) => {
  return (
    <div className="bg-white">
      <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          {title}
        </h2>

        {isLoading ? (
          <ProductListPlaceholder />
        ) : (
          <div className="grid grid-cols-1 mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products?.map((product) => (
              <div key={product._id} className="relative group">
                <Link href={`/product/${product._id}`}>
                  <div className="w-full overflow-hidden bg-gray-200 rounded-md cursor-pointer aspect-h-1 aspect-w-1 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={250}
                      className="object-cover object-center w-full h-full max-h-80 lg:h-full lg:w-full"
                    />
                  </div>
                </Link>
                <div className="flex justify-between mt-4">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link href={`/product/${product._id}`}>
                        {product.name}
                      </Link>
                    </h3>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-sm font-medium text-gray-900">
                      ${product.price}
                    </p>
                  </div>
                </div>
                <div className="mt-2">
                  <Button
                    className="py-0.5 font-normal w-full"
                    onClick={() => {
                      addToCartHandler(product);
                    }}
                  >
                    Add To Card
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListComonent;

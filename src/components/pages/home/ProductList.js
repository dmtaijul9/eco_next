import { Button } from "@/components/Button";
import useLocalStorage from "@/hooks/useLocalStorage";
import { addToCart } from "@/redux/reducers/cartSlice";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const products = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: 25,
    color: "Black",
  },
  {
    id: 2,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: 355,
    color: "Black",
  },
  {
    id: 3,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg",
    imageAlt: "Another sirth",
    price: 35,
    color: "Black",
  },
];

const ProductList = () => {
  const [localCartItems, setCartItems] = useLocalStorage("CART", {
    items: [],
    totalItem: 0,
  });
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = async (product) => {
    const cartExists = cartItems.items.find((item) => item.id === product.id);

    if (cartExists) {
      const newCartItems = {
        items: cartItems.items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
        totalItem: cartItems.totalItem + 1,
      };

      setCartItems(newCartItems);
      dispatch(addToCart(newCartItems));
    } else {
      const newProduct = {
        ...product,
        quantity: 1,
      };
      setCartItems({
        items: [...cartItems.items, newProduct],
        totalItem: cartItems.totalItem + 1,
      });
      dispatch(
        addToCart({
          items: [...cartItems.items, newProduct],
          totalItem: cartItems.totalItem + 1,
        })
      );
    }
  };

  return (
    <div className="bg-white">
      <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Eco_Next Special Products
        </h2>

        <div className="grid grid-cols-1 mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="relative group">
              <Link href={product.href}>
                <div className="w-full overflow-hidden bg-gray-200 rounded-md cursor-pointer aspect-h-1 aspect-w-1 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    layout="fill"
                    className="object-cover object-center w-full h-full lg:h-full lg:w-full"
                  />
                </div>
              </Link>
              <div className="flex justify-between mt-4">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>{product.name}</a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-sm font-medium text-gray-900">
                    {product.price}
                  </p>
                  <Button
                    className="py-0.5 font-normal"
                    onClick={() => {
                      addToCartHandler(product);
                    }}
                  >
                    Add To Card
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;

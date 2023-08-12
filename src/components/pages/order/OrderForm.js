import { Button } from "@/components/Button";
import { TextAreaField, TextField } from "@/components/Fields";
import { formateMoney } from "@/tools/importantTools";
import { shippingAddressSchema } from "@/utils/validatorSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RadioGroup } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import { createOrderMutation } from "@/utils/resolvers/mutation";
import { toast } from "react-hot-toast";
import useLocalStorage from "@/hooks/useLocalStorage";
import { clearCart } from "@/redux/reducers/cartSlice";
import { useRouter } from "next/router";

const plans = [
  {
    name: "Cash on",
    value: "cash_on_delivery",
  },
  {
    name: "Nagad",
    value: "nagad",
  },
  {
    name: "Bkash",
    value: "bkash",
  },
];

const OrderForm = ({ total }) => {
  const router = useRouter();
  //INFO: Payment method state
  const [paymentMethod, setPaymentMethod] = useState(plans[0].value);

  //INFO: Local storage cart items
  const [localCartItems, setCartItems] = useLocalStorage("CART", {
    items: [],
    totalItem: 0,
  });

  //INFO: Redux cart items
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  //INFO: state of shipping address
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address: "",
      city: "",
      postal_code: "",
      country: "",
      reciever_name: "",
    },
    resolver: yupResolver(shippingAddressSchema),
  });

  //INFO: Create order mutation
  const { mutate, isLoading } = useMutation({
    mutationKey: ["createOrder"],
    mutationFn: createOrderMutation,
  });

  const onSubmit = async (data) => {
    //INFO: filtering cart items for making order as database schema
    const order_items = cartItems?.items?.map((item) => {
      return {
        name: item.name,
        qty: item.quantity,
        image: item.image,
        price: item.price,
        product: item._id,
      };
    });

    //INFO: Create order variables
    const { address, city, postal_code, country, reciever_name } = data;

    //INFO: Create order variables
    const variables = {
      order_items,
      shipping_address: {
        address,
        city,
        postal_code,
        country,
        reciever_name,
      },
      payment_method: paymentMethod,
      total_price: total.toFixed(2),
    };

    //INFO: Create order mutation finally run here
    mutate(
      { variables },
      {
        onSuccess: (data) => {
          toast.success("Order created successfully");
          reset();
          setCartItems({ items: [], totalItem: 0 });
          dispatch(clearCart());
          router.push(`/order/confirmed/${data?.data?.order._id}`);
        },
        onError: (error) => {
          toast.error(error.response.data.message);
        },
      }
    );
  };

  return (
    <form className="pl-1 mt-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-12 gap-x-4 gap-y-6">
        <div className="text-center col-span-full">
          <h2 className="text-xl font-medium text-gray-900 ">
            Share your shipping address and pay to confirm order{" "}
          </h2>
        </div>
        <TextField
          placeholder="Reciever Name"
          className="col-span-full"
          id="reciever_name"
          name="reciever_name"
          autoComplete="current-reciever_name"
          register={register}
          error={errors?.reciever_name?.message}
        />
        <TextAreaField
          placeholder="Address"
          className="col-span-full"
          id="address"
          name="address"
          autoComplete="current-address"
          register={register}
          error={errors?.address?.message}
        />
        <TextField
          placeholder="city"
          className="col-span-full"
          id="city"
          name="city"
          autoComplete="current-city"
          register={register}
          error={errors?.city?.message}
        />
        <TextField
          placeholder="Postal Code"
          className="col-span-full"
          id="postal_code"
          name="postal_code"
          autoComplete="current-postal_code"
          register={register}
          error={errors?.postal_code?.message}
        />
        <TextField
          placeholder="Country"
          className="col-span-full"
          id="country"
          name="country"
          autoComplete="current-country"
          register={register}
          error={errors?.country?.message}
        />
        <div className="col-span-full">
          <div className="w-full py-3">
            <div className="w-full ">
              <RadioGroup value={paymentMethod} onChange={setPaymentMethod}>
                <div className="flex justify-between gap-2 ">
                  {plans.map((plan) => (
                    <RadioGroup.Option
                      key={plan.name}
                      value={plan.value}
                      className={({ active, checked }) =>
                        `${
                          active
                            ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                            : ""
                        }
                  ${
                    checked ? "bg-sky-900 bg-opacity-75 text-white" : "bg-white"
                  }
                    relative flex w-full cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                      }
                    >
                      {({ active, checked }) => (
                        <>
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center justify-between">
                              <div className="text-sm">
                                <RadioGroup.Label
                                  as="p"
                                  className={`font-medium  ${
                                    checked ? "text-white" : "text-gray-900"
                                  }`}
                                >
                                  {plan.name}
                                </RadioGroup.Label>
                              </div>
                            </div>
                            {checked && (
                              <div className="text-white shrink-0">
                                <CheckIcon className="w-6 h-6" />
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        color="cyan"
        className="w-full px-4 py-2 mt-6 text-sm font-medium "
        disabled={isLoading}
      >
        Confirm & Pay{" "}
        {formateMoney(total) === "$0.00" ? "" : formateMoney(total)}
      </Button>
    </form>
  );
};

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default OrderForm;

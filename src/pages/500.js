import { Button } from "@/components/Button";
import Head from "next/head";
import React from "react";

const ServerError = () => {
  return (
    <>
      <Head>
        <title>500 - Eco Next</title>
        <meta
          name="description"
          content="500 - Internal Server Error. Something went wrong. Please try again later."
        />
      </Head>
      <div className="flex items-center justify-center w-full h-screen p-5 bg-white">
        <div className="text-center">
          <div className="inline-flex p-4 rounded-full bg-warning">
            <div className="p-4 rounded-full bg-meta-6 stroke-yellow-600">
              <svg
                className="w-16 h-16 text-meta-8"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.0002 9.33337V14M14.0002 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
          </div>
          <h1 className="mt-5 text-[36px] font-bold text-danger lg:text-[50px]">
            500 - Internal Server Error
          </h1>
          <p className="mt-5 lg:text-lg">
            Something went wrong. Please try again later.
          </p>
          <div className="mt-5">
            <Button href="/">Back To Home</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServerError;

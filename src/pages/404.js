import { Button } from "@/components/Button";
import { Layout } from "@/components/Layout";
import React from "react";

const NotFount = () => {
  return (
    <Layout>
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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
          </div>
          <h1 className="mt-5 text-[36px] font-bold text-danger lg:text-[50px]">
            404 - Page not found
          </h1>
          <p className="mt-5 text-slate-600 lg:text-lg">
            The page you are looking for doesn&apos;t exist or <br />
            has been removed.
          </p>
          <div className="mt-5">
            <Button color="cyan" href="/">
              Back To Home
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFount;

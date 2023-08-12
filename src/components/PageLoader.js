import React from "react";

const PageLoader = () => {
  return (
    <div
      className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-primary"
      style={{ zIndex: 999999 }}
    >
      <div className="flex items-center justify-center space-x-1 text-sm text-white">
        <svg
          fill="none"
          className="w-6 h-6 animate-spin"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </svg>

        <div>Loading ...</div>
      </div>
    </div>
  );
};

export default PageLoader;

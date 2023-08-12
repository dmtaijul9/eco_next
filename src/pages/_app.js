import "@/styles/globals.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "../styles/slick.css";

// Create a client
const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <Provider store={store}>
          <Component {...pageProps} />
          <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </Provider>
      </SessionProvider>
    </QueryClientProvider>
  );
}

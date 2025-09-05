import "@/styles/globals.css";

import { Router } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

NProgress.configure({ showSpinner: false, trickleSpeed: 150 });

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-[#4070F4] min-h-screen">
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
}

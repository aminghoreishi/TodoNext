import "@/styles/globals.css";

import { Router } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import { ThemeProvider } from "next-themes";
NProgress.configure({ showSpinner: false, trickleSpeed: 150 });

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" >
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

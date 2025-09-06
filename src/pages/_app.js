import "@/styles/globals.css";

import { Router } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
NProgress.configure({ showSpinner: false, trickleSpeed: 150 });

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }) {
   const [mounted, setMounted] = useState(false);
  
    // Use effect to ensure theme is set after the component has mounted
    useEffect(() => {
      setMounted(true);
    }, []);
  
    if (!mounted) {
      // If not mounted, return null to prevent mismatch
      return null;
    }
  return (
    <ThemeProvider attribute="class" >
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

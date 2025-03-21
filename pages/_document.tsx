import { Html, Head, Main, NextScript } from "next/document";
import { useEffect } from "react";
import useStore from "../store/useStore";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

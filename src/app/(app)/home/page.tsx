import { Metadata } from "next";
import HomeClient from "./pageClient";

export const metadata: Metadata = {
  title: "Início",
}

export default function Home() {
  return <>
    <HomeClient />
  </>;
}
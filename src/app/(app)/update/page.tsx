import { Metadata } from "next";
import UpdatesPage from "./pageClient";

export const metadata: Metadata = {
  title: "O que há de novo",
}

export default function WhatsNew() {
  return <>
    <UpdatesPage />
  </>;
}
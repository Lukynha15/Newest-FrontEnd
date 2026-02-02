import { Metadata } from "next";
import NotificationClient from "./pageClient";

export const metadata: Metadata = {
  title: "Notificações",
}

export default function Notification() {
  return (
    <>
      <NotificationClient />
    </>
  );
}
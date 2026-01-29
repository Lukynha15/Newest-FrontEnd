import { Metadata } from "next";
import ProfileClient from "./pageClient";

export const metadata: Metadata = {
  title: "Perfil",
}

export default function Profile() {
  return (
    <>
      <ProfileClient />
    </>
  );
}
import { Metadata } from "next";
import SettingsClient from "./pageCliente";

export const metadata: Metadata = {
  title: "Configurações",
}

export default function Settings() {
  return (
    <>
    <SettingsClient />
    </>
  );
}
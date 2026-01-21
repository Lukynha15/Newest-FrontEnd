"use client"

import { Input } from "@/components/ui/input";
import { AuthGuard } from "@/guard/AuthGuard";
import Image from "next/image";

const settingsUser = {
  name: "Lucas",
  email: "lucas@lucas",
  password: "123456"
}

export default function Settings() {
  return (
    <AuthGuard>
      <div className="h-screen flex items-center justify-center absolute left-1/3">
        <div className="w-full max-w-3xl bg-[var(--popover)] rounded-2xl p-16 mx-auto border-accent border-2">
          <div className="flex flex-col items-center h-11/12 gap-7">
            <button className="w-44 h-44 rounded-full flex justify-center items-center cursor-pointer">
              <Image
                src="/profilePicture.png"
                alt="Profile Picture"
                width={160}
                height={160}
                className="rounded-full object-cover w-44 h-44"
              />
            </button>
            <div className="w-full h-96 flex flex-col justify-between ml-20 mr-20 gap-7 mt-4">
              <Input defaultValue={settingsUser.name} className="h-16 w-xl m-auto" />
              <Input type="email" defaultValue={settingsUser.email} className="h-16 w-xl m-auto" />
              <Input type="password" defaultValue={settingsUser.password} className="h-16 w-xl m-auto" />
              <Input type="password" className="h-16 w-xl m-auto" placeholder="Confirmar senha" />
            </div>
          </div>
          <div className="w-full flex justify-center mt-8">
            <button className="bg-accent h-14 w-1/2 rounded-lg cursor-pointer hover:brightness-110 hover:bg-accent/95 transition-colors duration-200 ">
              Salvar
            </button>
          </div>

        </div>
      </div>
    </AuthGuard>

  );
}
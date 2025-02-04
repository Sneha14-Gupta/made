"use client";
import { HeroUIProvider } from "@heroui/react";
import { Messages, Inputs, SignUp } from "@/components";
import { useState } from "react";
import { io } from "socket.io-client";

export default function Home() {
  const socket=io("https://regulatory-maurine-phleeb-966f2fda.koyeb.app/");
  const [user, setUser] = useState(null);

  return (
    <HeroUIProvider>
      <div className="min-h-screen max-h-screen">
        {user ? (
          <>
            <Messages />
            <Inputs />
          </>
        ) : (
          <SignUp setUser={setUser} socket={socket} />
        )}
      </div>
    </HeroUIProvider>
  );
}
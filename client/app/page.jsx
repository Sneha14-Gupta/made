"use client";
import { HeroUIProvider } from "@heroui/react";
import { Messages, Inputs, SignUp } from "@/components";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(
  "https://didactic-space-eureka-5g4x69j677pjh4qjj-8000.app.github.dev/"
);

export default function Home() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState([]);

  useEffect(() => {
    socket.on("new_message", (msg) => {
      setMessages((prevState) => [...prevState, msg]);
    });
  }, []);

  useEffect(() => {
    socket.on("new_user", (name) => {
      setMessages((prevState) => [
        ...prevState,
        { type: "user", content: name },
      ]);
    });
  }, []);

  useEffect(() => {
    socket.on("user_typing", (data) => {
      setTyping((prevState) => {
        const includes = prevState.some((obj) => obj.name === data.name);

        // If name is not there and is typing
        if (!includes && data.status === true) {
          return [...prevState, data];
        } else if (data.status === false) {
          // If not typing anymore
          return prevState.filter((obj) => obj.name !== data.name);
        } else {
          // Otherwise
          return prevState;
        }
      });
    });
  }, []);

  return (
    <HeroUIProvider>
      <div className="min-h-screen max-h-screen bg-gradient-to-r from-[#fbed96] to-[#abecd6]">
        {user ? (
          <div className="container mx-auto relative min-h-screen p-4">
            <Messages messages={messages} id={socket.id} typing={typing} />
            <Inputs socket={socket} name={user} setMessages={setMessages} />
          </div>
        ) : (
          <SignUp setUser={setUser} socket={socket} />
        )}
      </div>
    </HeroUIProvider>
  );
}
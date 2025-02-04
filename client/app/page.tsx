"use client";
import { HeroUIProvider } from "@heroui/react";

import Emoji from "@/components/Emoji";

export default function Home() {
  return (
    <HeroUIProvider>
      <Emoji />
    </HeroUIProvider>
  );
}

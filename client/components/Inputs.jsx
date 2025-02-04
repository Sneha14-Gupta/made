import { Input, Button } from "@heroui/react";
import { SendHorizonal } from "lucide-react";
import React from "react";

function Inputs() {
  return (
    <div className="absolute bottom-0 left-0 w-full sm:mb-5 flex sm:gap-1 ">
      <Input type="text" label="Enter your message" />
      <Button className="h-auto bg-blue-200 text-white">
        <SendHorizonal />
      </Button>
    </div>
  );
}

export default Inputs;
import { Button, Card } from "@heroui/react";

import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const server = io("https://regulatory-maurine-phleeb-966f2fda.koyeb.app/");
function Emoji() {
  const [emoji, setEmoji] = useState("😎");
  useEffect(() => {
    server.on("newEmoji", (emoji) => {
      setEmoji(emoji);
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-5">
      <h1 className="text-gray-600 uppercase text-sm">MADE App</h1>
      <EmojiPreview emoji={emoji} />
      <EmojiSelect onClick={setEmoji} />
    </div>
  );
}

function EmojiPreview({ emoji }) {
  return <Card className="text-7xl p-4">{emoji}</Card>;
}

function EmojiSelect({ onClick }) {
  const emojiOptions = "😈,🙈,🐭,🐶,🙉,🐱‍🏍".split(",");

  return (
    <div className="flex gap-1 flex-wrap justify-center">
      {emojiOptions.map((emoji) => (
        <Button
          className="text-2xl"
          variant="faded"
          key={emoji}
          onPress={() => {
            onClick(emoji);
            server.emit("emoji", emoji);
          }}
        >
          {emoji}
        </Button>
      ))}
    </div>
  );
}

export default Emoji;

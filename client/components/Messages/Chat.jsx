import { Card, CardBody, Avatar, Image } from "@heroui/react";

function Chat({ message, self }) {
  return (
    <div>
      <Card
        className={`w-fit bg-transparent ${self && "bg-blue-300 ml-auto"} ${
          message.type === "ai" &&
          "bg-gradient-to-r from-[#A1FFCE] to-[#FAFFD1]"
        }`}
      >
        <CardBody className="flex flex-row items-center gap-1">
          {/* Show Avatar */}
          {!self && <Avatar name={message.user.name.toUpperCase()} />}

          {/* For image */}
          {message.type === "image" && (
            <Image alt="Image message" src={message.content} width={400} />
          )}

          {/* For text */}
          {message.type === "text" && <p>{message.content}</p>}

          {/* For ai */}
          {message.type === "ai" && (
            <p className="bg-gradient-to-r from-[#A1FFCE] to-[#FAFFD1]">
              {message.content}
            </p>
          )}

          {/* For links */}
          {message.type === "link" && (
            <p>
              <a
                href={message.content}
                className="underline"
                rel="noopener noreferrer nofollow"
              >
                {message.content}
              </a>
            </p>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default Chat;
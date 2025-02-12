import Chat from "./Chat";
import NewUser from "./NewUser";
import Typing from "./Typing";

function Messages({ id, messages, typing }) {
  return (
    <div className="flex gap-1 flex-col min-h-[80vh] max-h-[80vh] overflow-scroll p-5 no-scrollbar">
      {messages.map((message, idx) =>
        message.type === "user" ? (
          <NewUser key={idx} name={message.content} />
        ) : (
          <Chat key={idx} message={message} self={message.user.id === id} />
        )
      )}
      <Typing users={typing.map(({ name }) => name)} />
    </div>
  );
}

export default Messages;
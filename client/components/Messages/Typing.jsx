export default function Typing({ users }) {
  return users.length > 0 ? (
    <div className="flex items-center gap-1 text-gray-600">
      <div className="typing">
        <span className="circle scaling"></span>
        <span className="circle scaling"></span>
        <span className="circle scaling"></span>
      </div>
      <div>
        {users.join(", ")} {users.length === 1 ? "is" : "are"} typing...
      </div>
    </div>
  ) : (
    <></>
  );
}
import { UserRoundPlusIcon } from "lucide-react";

export default function NewUser({ name }) {
  return (
    <div className="flex items-end gap-1 text-gray-800">
      <UserRoundPlusIcon /> {name} just joined
    </div>
  );
}
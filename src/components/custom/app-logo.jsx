import { Leaf } from "lucide-react";

export default function AppLogo({ size = "default" }) {
  // Size variants
  const sizes = {
    small: "h-4 w-4",
    default: "h-5 w-5",
    medium: "h-6 w-6",
    large: "h-8 w-8",
    xl: "h-10 w-10"
  };

  const sizeClass = sizes[size] || sizes.default;

  return (
    <div className="flex items-center">
      <div className={`bg-green-100 p-2 rounded-full flex items-center justify-center`}>
        <Leaf className={`${sizeClass} text-green-600`} />
      </div>
    </div>
  );
}

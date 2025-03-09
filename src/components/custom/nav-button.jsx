"use client"

import { Button } from "@/components/ui/button"

export default function NavButton({ icon, label, active = false, onClick }) {
  return (
    <Button
      variant="ghost"
      className={`flex flex-col p-4 items-center h-full hover:bg-green-50 ${active ? "text-green-600" : "text-gray-500"}`}
      onClick={onClick}>
      {icon}
      <span className="mt-1 text-xs">{label}</span>
    </Button>
  );
}


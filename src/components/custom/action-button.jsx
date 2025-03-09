"use client"

import { Button } from "@/components/ui/button"

export default function ActionButton({ icon, label, onClick }) {
  return (
    <Button
      className="h-24 flex flex-col items-center justify-center bg-green-50 hover:bg-green-100 text-green-800 border-2 border-green-300 rounded-xl"
      onClick={onClick}>
      {icon}
      <span className="mt-2 text-sm">{label}</span>
    </Button>
  );
}


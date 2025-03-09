"use client"
import { Leaf, Camera, Video, Info } from "lucide-react"
import NavButton from "@/components/custom/nav-button"

export default function AppNavigation({ currentPage, setCurrentPage }) {
  return (
    <nav
      className="fixed bottom-0 w-[60%] left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-t-3xl">
      <div className="flex justify-around py-3 px-2 ">
        <NavButton
          icon={<Leaf className="w-6 h-6" />}
          label="Home"
          active={currentPage === "home"}
          onClick={() => setCurrentPage("home")} />
        <NavButton
          icon={<Camera className="w-6 h-6" />}
          label="Scan"
          active={currentPage === "scan"}
          onClick={() => setCurrentPage("scan")} />
        <NavButton
          icon={<Video className="w-6 h-6" />}
          label="Learn"
          active={currentPage === "video"}
          onClick={() => setCurrentPage("video")} />
        <NavButton
          icon={<Info className="w-6 h-6" />}
          label="Guide"
          active={currentPage === "guide"}
          onClick={() => setCurrentPage("guide")} />
      </div>
    </nav>
  );
}


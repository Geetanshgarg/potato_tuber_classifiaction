"use client"
import { Leaf, Camera, Video } from "lucide-react"
import NavButton from "@/components/custom/nav-button"
import { useLanguage } from "@/contexts/LanguageContext"

export default function AppNavigation({ currentPage, setCurrentPage }) {
  const { t } = useLanguage();
  
  return (
    <nav
      className="fixed bottom-0 w-[60%] left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-t-3xl">
      <div className="flex justify-around py-3 px-2 ">
        <NavButton
          icon={<Leaf className="w-6 h-6" />}
          label={t("home")}
          active={currentPage === "home"}
          onClick={() => setCurrentPage("home")} />
        <NavButton
          icon={<Camera className="w-6 h-6" />}
          label={t("scan")}
          active={currentPage === "scan"}
          onClick={() => setCurrentPage("scan")} />
        <NavButton
          icon={<Video className="w-6 h-6" />}
          label={t("learn")}
          active={currentPage === "video"}
          onClick={() => setCurrentPage("video")} />
      </div>
    </nav>
  );
}


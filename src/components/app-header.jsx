"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Globe, Menu, Leaf } from "lucide-react"
import SlidingMenu from "./sliding-menu"

export default function AppHeader({ currentPage, setCurrentPage }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen)
  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header
        className="flex justify-between items-center p-4 bg-white/80 backdrop-blur-sm shadow-sm">
        {currentPage !== "home" && (
          <Button variant="ghost" className={"hover:bg-green-50"} size="icon" onClick={() => setCurrentPage("home")}>
            <ChevronLeft className="w-6 h-6" />
          </Button>
        )}
        {currentPage === "home" && <Leaf className="w-10 h-10 text-green-600" />}
        <div className="flex gap-2">
          <Button variant="ghost" className={"hover:bg-green-50"} size="icon" onClick={() => setCurrentPage("language")}>
            <Globe className="w-6 h-6" />
          </Button>
          <Button variant="ghost" className={"hover:bg-green-50"} size="icon" onClick={toggleMenu}>
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </header>

      {/* Sliding Menu */}
      <SlidingMenu 
        isOpen={menuOpen} 
        onClose={closeMenu} 
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
}


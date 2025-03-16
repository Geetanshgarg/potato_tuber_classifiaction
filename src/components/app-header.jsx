"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import AppLogo from "@/components/custom/app-logo"

export default function AppHeader({ currentPage, setCurrentPage }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { t, language } = useLanguage();

  const toggleMenu = () => setMenuOpen(!menuOpen)
  const closeMenu = () => setMenuOpen(false)

  // Get the correct page title based on current page
  const getPageTitle = () => {
    switch(currentPage) {
      case 'home':
        return t('home');
      case 'scan':
        return t('scan');
      case 'video':
        return t('learn');
      case 'plants':
        return t('myPlants');
      case 'language':
        return t('selectLanguage');
      default:
        return t('home');
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm py-4 px-4 sticky top-0 z-10">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <div className="flex items-center gap-2" onClick={() => setCurrentPage("home")} style={{ cursor: 'pointer' }}>
            <AppLogo />
            <h1 className="text-lg font-semibold text-green-800">
              {getPageTitle()}
            </h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentPage("language")}
            className="text-green-700 hover:text-green-800 hover:bg-green-50"
          >
            <Globe className="h-5 w-5" />
          </Button>
        </div>
      </header>
    </>
  );
}


"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import AppHeader from "@/components/app-header"
import AppNavigation from "@/components/app-navigation"
import HomePage from "@/components/pages/home-page"
import ScanPage from "@/components/pages/scan-page"
import ResultsPage from "@/components/pages/results-page"
import VideoPage from "@/components/pages/video-page"
import MyPlantsPage from "@/components/pages/my-plants-page"
import LanguagePage from "@/components/pages/language-page"
import AppLogo from "@/components/custom/app-logo"

export default function FarmerAppUI() {
  const [currentPage, setCurrentPage] = useState("home")
  const { language, setLanguage, t } = useLanguage()

  // Optional: Change page title when app loads
  useEffect(() => {
    document.title = "PotatoGuard - Potato Disease Detection";
  }, []);

  const pages = {
    home: <HomePage setPage={setCurrentPage} />,
    scan: <ScanPage />,
    results: <ResultsPage />,
    video: <VideoPage />,
    plants: <MyPlantsPage setPage={setCurrentPage} />,
    language: <LanguagePage setLanguage={setLanguage} setPage={setCurrentPage} />,
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200">
      <AppHeader currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="max-w-md mx-auto p-4 pb-24">{pages[currentPage]}</main>
      <AppNavigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}


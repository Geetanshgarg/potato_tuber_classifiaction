"use client"

import { useState } from "react"
import AppHeader from "@/components/app-header"
import AppNavigation from "@/components/app-navigation"
import HomePage from "@/components/pages/home-page"
import ScanPage from "@/components/pages/scan-page"
import ResultsPage from "@/components/pages/results-page"
import VideoPage from "@/components/pages/video-page"
import MyPlantsPage from "@/components/pages/my-plants-page"
import GuidePage from "@/components/pages/guide-page"
import LanguagePage from "@/components/pages/language-page"

export default function FarmerAppUI() {
  const [currentPage, setCurrentPage] = useState("home")
  const [currentLanguage, setCurrentLanguage] = useState("English")

  const pages = {
    home: <HomePage setPage={setCurrentPage} />,
    scan: <ScanPage />,
    results: <ResultsPage />,
    video: <VideoPage />,
    plants: <MyPlantsPage />,
    guide: <GuidePage />,
    language: <LanguagePage setLanguage={setCurrentLanguage} setPage={setCurrentPage} />,
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200">
      <AppHeader currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="max-w-md mx-auto p-4 pb-24">{pages[currentPage]}</main>
      <AppNavigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}


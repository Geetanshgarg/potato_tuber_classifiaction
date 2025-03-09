"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Camera,
  Upload,
  Leaf,
  Video,
  Globe,
  Menu,
  ChevronLeft,
  Play,
  VolumeIcon as VolumeUp,
  Calendar,
  Info,
  AlertTriangle,
  CheckCircle,
  Droplet,
  Sun,
  Wind,
  ThermometerSun,
} from "lucide-react"
import Image from "next/image"

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
      <header
        className="flex justify-between items-center p-4 bg-white/80 backdrop-blur-sm shadow-sm">
        {currentPage !== "home" && (
          <Button variant="ghost" size="icon" onClick={() => setCurrentPage("home")}>
            <ChevronLeft className="w-6 h-6" />
          </Button>
        )}
        {currentPage === "home" && <Leaf className="w-10 h-10 text-green-600" />}
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={() => setCurrentPage("language")}>
            <Globe className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </header>
      <main className="max-w-md mx-auto p-4 pb-24">{pages[currentPage]}</main>
      <nav
        className="fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-3xl">
        <div className="flex justify-around py-3 px-2">
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
    </div>
  );
}

function HomePage({ setPage }) {
  return (
    <>
      <Card className="bg-white/80 backdrop-blur-sm shadow-lg mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <ActionButton
              icon={<Camera className="w-8 h-8" />}
              label="Take Photo"
              onClick={() => setPage("scan")} />
            <ActionButton
              icon={<Upload className="w-8 h-8" />}
              label="Upload"
              onClick={() => setPage("scan")} />
            <ActionButton
              icon={<Leaf className="w-8 h-8" />}
              label="My Plants"
              onClick={() => setPage("plants")} />
            <ActionButton
              icon={<Video className="w-8 h-8" />}
              label="Guide"
              onClick={() => setPage("guide")} />
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-center text-green-800">Recent Activity</h2>
          <div className="space-y-4">
            <ActivityItem
              icon={<CheckCircle className="w-6 h-6 text-green-500" />}
              text="Healthy Potato Plant"
              time="Today, 10:30 AM" />
            <ActivityItem
              icon={<AlertTriangle className="w-6 h-6 text-yellow-500" />}
              text="Early Blight Detected"
              time="Yesterday, 4:15 PM" />
            <ActivityItem
              icon={<Video className="w-6 h-6 text-blue-500" />}
              text="Watched Treatment Guide"
              time="2 days ago" />
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function ScanPage() {
  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-center text-green-800">Scan Your Plant</h2>
        <div className="space-y-6">
          <div
            className="relative h-48 bg-green-50 rounded-xl border-2 border-dashed border-green-300 flex items-center justify-center">
            <Camera className="w-16 h-16 text-green-400" />
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-green-800/20 rounded-xl">
              <Button className="bg-white text-green-800 hover:bg-green-50">Take Photo</Button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2">
              <Upload className="w-5 h-5" />
              Upload from Gallery
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              <p>Take a clear photo of your potato plant leaf</p>
              <p>Make sure the leaf is well-lit and in focus</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ResultsPage() {
  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-center text-green-800">Plant Health Results</h2>

        <div
          className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-center gap-4">
          <AlertTriangle className="w-12 h-12 text-yellow-500" />
          <div>
            <p className="text-lg font-semibold text-yellow-700">Early Blight Detected</p>
            <p className="text-sm text-yellow-600">Moderate severity</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-medium mb-2 text-green-800">Recommended Actions:</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="bg-green-100 p-1 rounded-full mt-0.5">1</span>
              <span>Remove and destroy affected leaves</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-green-100 p-1 rounded-full mt-0.5">2</span>
              <span>Apply copper-based fungicide</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-green-100 p-1 rounded-full mt-0.5">3</span>
              <span>Improve air circulation around plants</span>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <Button className="w-full justify-start" variant="outline">
            <VolumeUp className="w-5 h-5 mr-2" />
            Listen to Recommendations
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <Video className="w-5 h-5 mr-2" />
            Watch Treatment Video
          </Button>
          <Button
            className="w-full justify-start bg-green-600 hover:bg-green-700 text-white">
            <Leaf className="w-5 h-5 mr-2" />
            Save to My Plants
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function VideoPage() {
  return (
    <>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2 text-green-800">Learn & Improve</h2>
        <p className="text-sm text-muted-foreground">Watch videos to learn better farming techniques</p>
      </div>
      <div className="space-y-6">
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg overflow-hidden">
          <div className="relative h-48 bg-green-900">
            <Image
              src="/placeholder.svg?height=200&width=400"
              alt="Video thumbnail"
              width={400}
              height={200}
              className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                size="icon"
                className="rounded-full w-12 h-12 bg-white/30 backdrop-blur-sm hover:bg-white/50">
                <Play className="w-6 h-6 text-white" />
              </Button>
            </div>
          </div>
          <CardContent className="p-4">
            <h3 className="font-medium">Treating Early Blight in Potato Plants</h3>
            <p className="text-sm text-muted-foreground">3:45 • Dr. Sharma, Plant Pathologist</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <VideoThumbnail
            title="Proper Watering Techniques"
            duration="2:30"
            image="/placeholder.svg?height=100&width=180" />
          <VideoThumbnail
            title="Organic Pest Control"
            duration="4:15"
            image="/placeholder.svg?height=100&width=180" />
          <VideoThumbnail
            title="Soil Health Tips"
            duration="3:20"
            image="/placeholder.svg?height=100&width=180" />
          <VideoThumbnail
            title="Harvesting Guide"
            duration="5:10"
            image="/placeholder.svg?height=100&width=180" />
        </div>

        <Button variant="outline" className="w-full">
          View All Videos
        </Button>
      </div>
    </>
  );
}

function MyPlantsPage() {
  return (
    <>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2 text-green-800">My Plants</h2>
        <p className="text-sm text-muted-foreground">Track and monitor your crops</p>
      </div>
      <div className="space-y-4">
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg overflow-hidden">
          <div className="relative h-32">
            <Image
              src="/placeholder.svg?height=150&width=400"
              alt="Potato field"
              width={400}
              height={150}
              className="w-full h-full object-cover" />
            <div
              className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">Healthy</div>
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">Potato Field 1</h3>
                <p className="text-xs text-muted-foreground">Added: 15 days ago</p>
              </div>
              <Button variant="ghost" size="icon">
                <Info className="w-5 h-5" />
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-2 mt-3">
              <WeatherItem icon={<Sun />} label="Sunny" />
              <WeatherItem icon={<Droplet />} label="Watered" />
              <WeatherItem icon={<ThermometerSun />} label="28°C" />
              <WeatherItem icon={<Wind />} label="Low" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm shadow-lg overflow-hidden">
          <div className="relative h-32">
            <Image
              src="/placeholder.svg?height=150&width=400"
              alt="Potato field with blight"
              width={400}
              height={150}
              className="w-full h-full object-cover" />
            <div
              className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
              Early Blight
            </div>
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">Potato Field 2</h3>
                <p className="text-xs text-muted-foreground">Added: 7 days ago</p>
              </div>
              <Button variant="ghost" size="icon">
                <Info className="w-5 h-5" />
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-2 mt-3">
              <WeatherItem icon={<Sun />} label="Sunny" />
              <WeatherItem icon={<Droplet />} label="Watered" />
              <WeatherItem icon={<ThermometerSun />} label="30°C" />
              <WeatherItem icon={<Wind />} label="Medium" />
            </div>

            <Button className="w-full mt-3 bg-yellow-500 hover:bg-yellow-600 text-white">View Treatment Plan</Button>
          </CardContent>
        </Card>

        <Button className="w-full">
          <Camera className="w-5 h-5 mr-2" />
          Add New Plant
        </Button>
      </div>
    </>
  );
}

function GuidePage() {
  return (
    <>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2 text-green-800">Farmer's Guide</h2>
        <p className="text-sm text-muted-foreground">Essential information for potato farming</p>
      </div>
      <div className="space-y-4">
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
          <CardContent className="p-4">
            <h3 className="font-medium mb-2 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-green-600" />
              Seasonal Calendar
            </h3>
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div className="bg-green-50 p-2 rounded-lg">
                <p className="font-medium">Planting</p>
                <p className="text-xs text-muted-foreground">Oct-Nov</p>
              </div>
              <div className="bg-green-50 p-2 rounded-lg">
                <p className="font-medium">Growing</p>
                <p className="text-xs text-muted-foreground">Dec-Feb</p>
              </div>
              <div className="bg-green-50 p-2 rounded-lg">
                <p className="font-medium">Harvest</p>
                <p className="text-xs text-muted-foreground">Mar-Apr</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
          <CardContent className="p-4">
            <h3 className="font-medium mb-2 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
              Common Problems
            </h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-between">
                <span>Early Blight</span>
                <ChevronLeft className="w-4 h-4 rotate-180" />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                <span>Late Blight</span>
                <ChevronLeft className="w-4 h-4 rotate-180" />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                <span>Pests</span>
                <ChevronLeft className="w-4 h-4 rotate-180" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
          <CardContent className="p-4">
            <h3 className="font-medium mb-2 flex items-center">
              <Video className="w-5 h-5 mr-2 text-blue-500" />
              Video Tutorials
            </h3>
            <div className="space-y-2">
              <VideoItem title="Planting Techniques" duration="4:30" />
              <VideoItem title="Watering Guide" duration="3:15" />
              <VideoItem title="Fertilizer Application" duration="5:20" />
            </div>
          </CardContent>
        </Card>

        <Button className="w-full" variant="outline">
          <VolumeUp className="w-5 h-5 mr-2" />
          Listen to All Guides
        </Button>
      </div>
    </>
  );
}

function LanguagePage({ setLanguage, setPage }) {
  const languages = [
    { name: "English", native: "English" },
    { name: "Hindi", native: "हिन्दी" },
    { name: "Telugu", native: "తెలుగు" },
    { name: "Marathi", native: "मराठी" },
    { name: "Gujarati", native: "ગુજરાતી" },
    { name: "Punjabi", native: "ਪੰਜਾਬੀ" },
    { name: "Bengali", native: "বাংলা" },
    { name: "Tamil", native: "தமிழ்" },
  ]

  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-center text-green-800">Select Language</h2>
        <div className="grid grid-cols-2 gap-2">
          {languages.map((lang) => (
            <Button
              key={lang.name}
              variant="outline"
              className="flex flex-col py-4 h-auto"
              onClick={() => {
                setLanguage(lang.name)
                setPage("home")
              }}>
              <span className="text-lg">{lang.native}</span>
              <span className="text-xs text-muted-foreground">{lang.name}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ActionButton({ icon, label, onClick }) {
  return (
    <Button
      className="h-24 flex flex-col items-center justify-center bg-green-50 hover:bg-green-100 text-green-800 border-2 border-green-300 rounded-xl"
      onClick={onClick}>
      {icon}
      <span className="mt-2 text-sm">{label}</span>
    </Button>
  );
}

function ActivityItem({ icon, text, time }) {
  return (
    <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
      <div className="mt-0.5">{icon}</div>
      <div className="flex-1">
        <p className="text-sm text-green-800">{text}</p>
        <p className="text-xs text-green-600">{time}</p>
      </div>
    </div>
  );
}

function NavButton({ icon, label, active = false, onClick }) {
  return (
    <Button
      variant="ghost"
      className={`flex flex-col items-center ${active ? "text-green-600" : "text-gray-500"}`}
      onClick={onClick}>
      {icon}
      <span className="mt-1 text-xs">{label}</span>
    </Button>
  );
}

function VideoItem({ title, duration }) {
  return (
    <div className="flex items-center space-x-3 p-2 bg-green-50 rounded-lg">
      <Button size="icon" variant="ghost" className="h-8 w-8">
        <Play className="w-4 h-4" />
      </Button>
      <div className="flex-1">
        <p className="text-sm font-medium text-green-800">{title}</p>
        <p className="text-xs text-green-600">{duration}</p>
      </div>
    </div>
  );
}

function VideoThumbnail({ title, duration, image }) {
  return (
    <div className="space-y-1">
      <div className="relative h-24 rounded-lg overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={180}
          height={100}
          className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            size="icon"
            className="rounded-full w-8 h-8 bg-white/30 backdrop-blur-sm hover:bg-white/50">
            <Play className="w-4 h-4 text-white" />
          </Button>
        </div>
        <div
          className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">{duration}</div>
      </div>
      <p className="text-xs font-medium line-clamp-2">{title}</p>
    </div>
  );
}

function WeatherItem({ icon, label }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-green-600 h-5 w-5">{icon}</div>
      <span className="text-xs mt-1">{label}</span>
    </div>
  );
}


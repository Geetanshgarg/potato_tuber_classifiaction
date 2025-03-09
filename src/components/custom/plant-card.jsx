"use client"

import { Button } from "@/components/ui/button"
import { Info, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import WeatherItem from "@/components/custom/weather-item"
import { useEffect, useState } from "react"

export default function PlantCard({
  name,
  status,
  statusColor, // Add this prop
  image,
  addedDays,
  weatherItems,
  showTreatment = false,
  onTreatmentClick,
  onDelete,
}) {
  const [imgSrc, setImgSrc] = useState(image || "/placeholder.svg")
  
  // Use provided statusColor or determine based on status
  const cardStatusColor = statusColor || (status?.toLowerCase() === "healthy" ? "bg-green-500" : "bg-yellow-500")

  // Handle image errors by setting a fallback
  const handleImageError = () => {
    setImgSrc("/placeholder.svg")
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-lg overflow-hidden">
      <div className="relative h-32">
        <img
          src={imgSrc}
          alt={name || "Plant"}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
        <div
          className={`absolute top-2 right-2 ${cardStatusColor} text-white text-xs px-2 py-1 rounded-full`}>
          {status || "Unknown"}
        </div>
        <div className="absolute top-2 left-2">
          <Button 
            size="icon" 
            variant="destructive"
            className="bg-white/90 hover:bg-white text-red-600 h-8 w-8 rounded-full"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{name || "Unnamed Plant"}</h3>
            <p className="text-xs text-muted-foreground">Added: {addedDays || "Recently"}</p>
          </div>
          <Button variant="ghost" size="icon">
            <Info className="w-5 h-5" />
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-3">
          {weatherItems?.map((item, index) => (
            <WeatherItem key={index} icon={item.icon} label={item.label} />
          ))}
        </div>

        {showTreatment && (
          <Button
            className="w-full mt-3 bg-yellow-500 hover:bg-yellow-600 text-white"
            onClick={onTreatmentClick}>
            View Treatment Plan
          </Button>
        )}
      </CardContent>
    </Card>
  );
}


"use client"

import { Button } from "@/components/ui/button"
import { Info, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"

export default function PlantCard({
  name,
  status,
  statusColor,
  image,
  dateAdded,
  onDelete,
}) {
  const [imgSrc, setImgSrc] = useState('/placeholder.svg')
  const [formattedDate, setFormattedDate] = useState('')
  
  useEffect(() => {
    // Check if image is base64 data or a URL
    if (image && (image.startsWith('data:') || image.startsWith('/placeholder'))) {
      setImgSrc(image);
    } else {
      setImgSrc('/placeholder.svg');
    }

    // Format the date when component mounts or dateAdded changes
    if (dateAdded) {
      try {
        const date = new Date(dateAdded);
        
        // Check if the date is valid
        if (isNaN(date.getTime())) {
          // If invalid date string, just display the raw string
          setFormattedDate(String(dateAdded));
          return;
        }
        
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (date.toDateString() === today.toDateString()) {
          setFormattedDate(`Today, ${date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`);
        } else if (date.toDateString() === yesterday.toDateString()) {
          setFormattedDate(`Yesterday, ${date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`);
        } else {
          setFormattedDate(`${date.toLocaleDateString()}, ${date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`);
        }
      } catch (err) {
        // Use the raw date string as fallback instead of current time
        setFormattedDate(String(dateAdded));
      }
    } else {
      // No date provided
      setFormattedDate("Date unavailable");
    }
  }, [image, dateAdded]);
  
  const cardStatusColor = statusColor || (status?.toLowerCase() === "healthy" ? "bg-green-500" : "bg-yellow-500")

  // Handle image errors by setting a fallback
  const handleImageError = () => {
    setImgSrc("/placeholder.svg")
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-lg overflow-hidden">
      <div className="relative h-40">
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
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">{name || "Unnamed Plant"}</h3>
            <p className="text-xs text-muted-foreground">Added: {formattedDate}</p>
          </div>
          <Button variant="ghost" size="icon">
            <Info className="w-5 h-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}


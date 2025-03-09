import { Button } from "@/components/ui/button"
import { Camera, Sun, Droplet, ThermometerSun, Wind } from "lucide-react"
import PlantCard from "@/components/custom/plant-card"
import { useEffect, useState } from "react"

export default function MyPlantsPage({ setPage }) {
  const [plants, setPlants] = useState([]);
  
  // Load plants from localStorage when component mounts
  useEffect(() => {
    try {
      const savedPlantsString = localStorage.getItem('myPlants');
      const savedPlants = JSON.parse(savedPlantsString || '[]');
      
      // Make sure each plant has a valid image and use a placeholder that exists
      const plantsWithImages = savedPlants.map(plant => ({
        ...plant,
        image: plant.image || '/placeholder.svg'
      }));
      
      setPlants(plantsWithImages);
    } catch (error) {
      console.error("Error loading plants:", error);
    }
  }, []);
  
  // Function to delete a plant
  const deletePlant = (plantId) => {
    const updatedPlants = plants.filter(plant => plant.id !== plantId);
    setPlants(updatedPlants);
    localStorage.setItem('myPlants', JSON.stringify(updatedPlants));
  };
  
  // Format the date added to "X days ago" format
  const formatDateAdded = (dateString) => {
    const plantDate = new Date(dateString);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - plantDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  };

  const getStatusColor = (status) => {
    if (!status) return "bg-gray-500";
    
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes("healthy")) return "bg-green-500";
    if (lowerStatus.includes("early blight")) return "bg-yellow-500";
    if (lowerStatus.includes("late blight")) return "bg-red-500";
    if (lowerStatus.includes("bacteria")) return "bg-orange-500";
    if (lowerStatus.includes("fungi")) return "bg-purple-500";
    if (lowerStatus.includes("pest")) return "bg-blue-500";
    if (lowerStatus.includes("virus")) return "bg-red-500";
    
    return "bg-yellow-500"; // Default
  };

  return (
    <>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2 text-green-800">My Plants</h2>
        <p className="text-sm text-muted-foreground">Track and monitor your crops</p>
      </div>
      <div className="space-y-4">
        {plants.length > 0 ? (
          plants.map(plant => (
            <PlantCard
              key={plant.id}
              name={plant.name}
              status={plant.status}
              statusColor={getStatusColor(plant.status)}
              image={plant.image}
              addedDays={formatDateAdded(plant.dateAdded)}
              weatherItems={[
                { icon: <Sun />, label: plant.weather?.sunlight || 'Sunny' },
                { icon: <Droplet />, label: plant.weather?.watered ? "Watered" : "Needs Water" },
                { icon: <ThermometerSun />, label: plant.weather?.temperature || '25°C' },
                { icon: <Wind />, label: plant.weather?.humidity || 'Medium' },
              ]}
              showTreatment={plant.status?.toLowerCase() !== "healthy"}
              onDelete={() => deletePlant(plant.id)}
            />
          ))
        ) : (
          <div className="text-center py-6 bg-gray-50 rounded-lg">
            <p className="text-muted-foreground mb-2">No plants added yet</p>
            <p className="text-sm text-muted-foreground">Scan or upload a photo to add plants</p>
          </div>
        )}

        <Button className="w-full" onClick={() => setPage("scan")}>
          <Camera className="w-5 h-5 mr-2" />
          Add New Plant
        </Button>
      </div>
    </>
  );
}


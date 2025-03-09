export default function WeatherItem({ icon, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-gray-100 p-1.5 rounded-full mb-1">
        <div className="w-4 h-4 text-gray-600">
          {icon}
        </div>
      </div>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}


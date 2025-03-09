export default function ActivityItem({ icon, text, time }) {
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


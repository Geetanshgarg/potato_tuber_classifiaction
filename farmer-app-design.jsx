import Image from "next/image"

export default function FarmerAppDesign() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-4">
      <h1 className="text-3xl font-bold mb-8 text-green-800">Farmer App Design Preview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <DesignPreview title="Mobile Home" src="/placeholder.svg?height=500&width=250" />
        <DesignPreview title="Desktop Home" src="/placeholder.svg?height=400&width=600" />
        <DesignPreview title="Mobile Upload" src="/placeholder.svg?height=500&width=250" />
        <DesignPreview title="Desktop Upload" src="/placeholder.svg?height=400&width=600" />
        <DesignPreview title="Mobile Results" src="/placeholder.svg?height=500&width=250" />
        <DesignPreview title="Desktop Results" src="/placeholder.svg?height=400&width=600" />
      </div>
    </div>
  );
}

function DesignPreview({ title, src }) {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-2 text-green-700">{title}</h2>
      <div className="border-4 border-green-600 rounded-lg overflow-hidden">
        <Image
          src={src || "/placeholder.svg"}
          width={title.includes("Mobile") ? 250 : 600}
          height={title.includes("Mobile") ? 500 : 400}
          alt={`${title} design`}
          className="object-cover" />
      </div>
    </div>
  );
}


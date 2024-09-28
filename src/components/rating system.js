import Rating from '@mui/material/Rating';

const materials = [
  {
    MaterialName: "Recycled Steel",
    BuildingType: "Commercial",
    EnvironmentalImpact: 2,
    Cost: 5000,
    Rating: 4.5,
    Image: "materials/recycled steel.jpg",
  },
  {
    MaterialName: "Bamboo Flooring",
    BuildingType: "Residential",
    EnvironmentalImpact: 1,
    Cost: 3000,
    Rating: 4.2,
    Image: "materials/bamboo floor.jpg",
  },
  {
    MaterialName: "Solar Glass",
    BuildingType: "Commercial",
    EnvironmentalImpact: 1,
    Cost: 8000,
    Rating: 4.8,
    Image: "materials/Solar Glass.jpg",
  },
  {
    MaterialName: "Recycled Plastic Lumber",
    BuildingType: "Residential",
    EnvironmentalImpact: 2,
    Cost: 2000,
    Rating: 3.9,
    Image: "materials/recycled plastic lumber.jpg",
  },
  {
    MaterialName: "Cork Insulation",
    BuildingType: "Residential",
    EnvironmentalImpact: 1,
    Cost: 1500,
    Rating: 4.1,
    Image: "materials/cork insulation.jpg",
  },
  {
    MaterialName: "Reclaimed Wood",
    BuildingType: "Commercial",
    EnvironmentalImpact: 1,
    Cost: 4000,
    Rating: 4.3,
    Image: "materials/reclaimed wood.jpg",
  },
  {
    MaterialName: "Hempcrete",
    BuildingType: "Residential",
    EnvironmentalImpact: 1,
    Cost: 3500,
    Rating: 3.8,
    Image: "materials/hempcrete.jpg",
  },
  {
    MaterialName: "Mycelium Insulation",
    BuildingType: "Commercial",
    EnvironmentalImpact: 1,
    Cost: 2500,
    Rating: 3.7,
    Image: "materials/mycelium.jpg",
  },
  {
    MaterialName: "Recycled Glass Countertops",
    BuildingType: "Residential",
    EnvironmentalImpact: 2,
    Cost: 4500,
    Rating: 4.0,
    Image: "materials/recycled-glass-countertops-.jpg",
  },
  {
    MaterialName: "Straw Bale Insulation",
    BuildingType: "Residential",
    EnvironmentalImpact: 1,
    Cost: 1000,
    Rating: 3.5,
    Image: "materials/straw bale insulation.jpg",
  },
];

export default function MaterialRating() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {materials.map((material, index) => (
        <div key={index} className="border p-4 rounded-lg flex flex-col items-center">
          {/* Display Material Image */}
          <img
            src={material.Image}
            alt={material.MaterialName}
            className="w-40 h-40 object-cover mb-4"
          />

          {/* Material Information */}
          <h2 className="text-xl font-bold mb-2">{material.MaterialName}</h2>
          <p className="mb-2">Building Type: {material.BuildingType}</p>
          <p className="mb-2">Cost: ${material.Cost}</p>

          {/* Rating Component */}
          <Rating value={material.Rating} precision={0.1} readOnly />
          <p className="mt-2">Rating: {material.Rating} stars</p>
        </div>
      ))}
    </div>
  );
}

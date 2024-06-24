// CropData interface defines the structure of the dataset entries.
interface CropData {
    Country: string;
    Year: string;
    "Crop Name": string;
    "Crop Production (UOM:t(Tonnes))": number;
    "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": number;
    "Area Under Cultivation (UOM:Ha(Hectares))": number;
  }
  // Defines the structure for yearly aggregate data.
  export interface YearlyAggregate {
    year: number;
    maxCrop: string;
    minCrop: string;
  }

  // Defines the structure for crop aggregate data.
  export interface CropAggregate {
    crop: string;
    avgYield: number;
    avgArea: number;
  }
  
  // Function to convert any value to a number
  const toNumber = (value: any): number => {
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
  }
  
  // Function to process agriculture data into yearly aggregates and crop aggregates
  export const processAgricultureData = (data: CropData[]): [YearlyAggregate[], CropAggregate[]] => {
    // Object to store yearly crop production data
    const yearlyData: { [key: number]: { [crop: string]: number } } = {};
    
    // Object to store aggregate data for each crop
    const cropData: { [crop: string]: { totalYield: number, totalArea: number, count: number } } = {};
  
    // Process each entry in the data array
    data.forEach((entry) => {
      const year = parseInt(entry.Year.split(', ')[1]); // Extract year from the Year field
      const crop = entry["Crop Name"]; // Extract crop name
      const production = toNumber(entry["Crop Production (UOM:t(Tonnes))"]); // Convert production to number
      const yieldValue = toNumber(entry["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]); // Convert yield to number
      const area = toNumber(entry["Area Under Cultivation (UOM:Ha(Hectares))"]); // Convert area to number
  
      // Aggregate yearly crop production data
      if (!yearlyData[year]) yearlyData[year] = {};
      yearlyData[year][crop] = (yearlyData[year][crop] || 0) + production;
  
      // Aggregate crop data
      if (!cropData[crop]) cropData[crop] = { totalYield: 0, totalArea: 0, count: 0 };
      cropData[crop].totalYield += yieldValue;
      cropData[crop].totalArea += area;
      cropData[crop].count += 1;
    });
  
    // Calculate yearly aggregates
    const yearlyAggregates: YearlyAggregate[] = Object.entries(yearlyData).map(([year, crops]) => {
      const cropEntries = Object.entries(crops);
      const maxCrop = cropEntries.reduce((prev, curr) => (curr[1] > prev[1] ? curr : prev))[0];
      const minCrop = cropEntries.reduce((prev, curr) => (curr[1] < prev[1] ? curr : prev))[0];
      return { year: parseInt(year), maxCrop, minCrop };
    });
  
    // Calculate crop aggregates
    const cropAggregates: CropAggregate[] = Object.entries(cropData).map(([crop, values]) => {
      return {
        crop,
        avgYield: parseFloat((values.totalYield / values.count).toFixed(3)),
        avgArea: parseFloat((values.totalArea / values.count).toFixed(3))
      };
    });
  
    // Return both aggregates
    return [yearlyAggregates, cropAggregates];
  };
  
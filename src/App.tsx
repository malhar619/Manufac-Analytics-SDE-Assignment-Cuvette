import React, { useEffect, useState } from 'react';
import { Container, Title } from '@mantine/core';
import YearlyTable from './components/YearlyTable';
import CropTable from './components/CropTable';
import { processAgricultureData, YearlyAggregate, CropAggregate } from './utils/dataProcessor';
import data from './data/agricultureData.json';

const App: React.FC = () => {
  // State to store yearly aggregates and crop aggregates
  // useState initializes these variables with empty arrays.
  const [yearlyData, setYearlyData] = useState<YearlyAggregate[]>([]);
  const [cropData, setCropData] = useState<CropAggregate[]>([]);

  // Effect hook to process agriculture data when component mounts
  useEffect(() => {
    // Process agriculture data from JSON into yearly aggregates and crop aggregates
    const [yearlyAggregates, cropAggregates] = processAgricultureData(data as any[]);
    
    // Set state with processed data
    setYearlyData(yearlyAggregates);
    setCropData(cropAggregates);
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <Container style={{ textAlign: 'center', marginBottom: '1rem', fontWeight: 500 }}>
      {/* Main title for the application */}
      <Title order={1} style={{ marginBottom: '2rem' }}>Indian Agriculture Analytics</Title>
      <div className="tables-container">
        <div className="table-section">
          {/* Title for yearly crop production section */}
          <Title order={2} style={{ marginBottom: '1rem' }}>Yearly Crop Production</Title>
          {/* YearlyTable component to display yearly crop production data */}
          <YearlyTable data={yearlyData} />
        </div>
        <div className="table-section">
          {/* Title for average crop yield and cultivation area section */}
          <Title order={2} style={{ marginBottom: '1rem' }}>Average Crop Yield and Cultivation Area</Title>
          {/* CropTable component to display average crop yield and cultivation area data */}
          <CropTable data={cropData} />
        </div>
      </div>
    </Container>
  );
};

export default App;

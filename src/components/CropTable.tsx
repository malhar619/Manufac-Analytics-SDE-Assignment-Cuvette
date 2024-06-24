import React from 'react';
import { Table, Card, Box } from '@mantine/core';
import { CropAggregate } from '../utils/dataProcessor';


// Defines the structure of the props, which includes an array of CropAggregate
interface CropTableProps {
  data: CropAggregate[];
}

const CropTable: React.FC<CropTableProps> = ({ data }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Box>
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>Crop</th>
              <th>Average Yield of the Crop between 1950-2020</th>
              <th>Average Cultivation Area of the Crop between 1950-2020</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.crop}>
                <td>{row.crop}</td>
                <td>{row.avgYield}</td>
                <td>{row.avgArea}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
    </Card>
  );
};

export default CropTable;

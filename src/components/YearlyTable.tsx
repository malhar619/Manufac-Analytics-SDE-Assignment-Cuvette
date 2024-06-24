import React from 'react';
import { Table, Card, Box } from '@mantine/core';
import { YearlyAggregate } from '../utils/dataProcessor';

interface YearlyTableProps {
  data: YearlyAggregate[];
}

const YearlyTable: React.FC<YearlyTableProps> = ({ data }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Box>
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>Year</th>
              <th>Crop with Maximum Production in that Year</th>
              <th>Crop with Minimum Production in that Year</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.year}>
                <td>{row.year}</td>
                <td>{row.maxCrop}</td>
                <td>{row.minCrop}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
    </Card>
  );
};

export default YearlyTable;

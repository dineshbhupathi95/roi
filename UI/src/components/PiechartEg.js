import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useFetchProjectsMetrics from './FetchProjectMetrics';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const DashboardPie = () => {
  const { data, loading, error } = useFetchProjectsMetrics();
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    if (data) {
      // Extract the sector_wise_count data
      const sectorWiseData = data?.find(item => item.name === 'sector_wise_count')?.value;

      // Transform the sector_wise_count data into the desired format
      const transformedSectorWiseData = sectorWiseData?.map(sector => ({
        name: sector.project_sector || 'Unknown Sector',
        value: sector.count
      }));

      setMetrics(transformedSectorWiseData);
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={metrics}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {metrics?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DashboardPie;

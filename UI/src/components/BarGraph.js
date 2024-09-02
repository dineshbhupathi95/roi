import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useFetchProjectsMetrics from './FetchProjectMetrics';

const BarGraph = () => {
  const { data, loading, error } = useFetchProjectsMetrics();
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    if (data) {
      const filteredData = data.filter(item =>
        item.name === "total_investment" || item.name === "generated_revenue"
      );
      setBarData(filteredData);
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={barData}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarGraph;

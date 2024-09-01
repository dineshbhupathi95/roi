import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import apiConfig from '../AppConfig';
import useFetchProjectsMetrics from './FetchProjectMetrics';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const DashboardPie = () => {
    const { data, loading, error } = useFetchProjectsMetrics();
    const [metrics,setMetrics] = useState([])
    useEffect(()=>{
        
             // Extract the sector_wise_count data
            const sectorWiseData = data?.find(item => item.name === 'sector_wise_count').value;

            // Transform the sector_wise_count data into the desired format
            const transformedSectorWiseData = sectorWiseData?.map(sector => ({
            name: sector.project_sector || 'Unknown Sector',
            value: sector.count
            }));

            console.log(transformedSectorWiseData);
            setMetrics(transformedSectorWiseData)
        
      },metrics)
    //   console.log(data,'pie')
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={metrics}
        cx={200}
        cy={200}
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
  );
};

export default DashboardPie;

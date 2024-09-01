import { useState, useEffect } from 'react';
import axios from 'axios';
import apiConfig from '../AppConfig';

const useFetchProjectsMetrics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${apiConfig.baseURL}/project/metrics/`)
        if(res){
            const metricsData = Object.keys(res.data).map(key => ({
                name: key,
                value: res.data[key]
              }));
              setData(metricsData);
              console.log(data);
        }
        
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  return { data, loading, error };
};

export default useFetchProjectsMetrics;

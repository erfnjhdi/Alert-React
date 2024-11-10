import axios from 'axios';

export const createReport = async (reportData) => {
  const res = await axios.post('/api/reports', reportData);
  return res.data;
};

export const getReports = async () => {
  const res = await axios.get('/api/reports');
  return res.data;
};

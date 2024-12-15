import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const apiService = {
  getRepresentatives: async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.get(`${API_URL}/admin/representatives`, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
  },
  
  getAttendance: async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.get(`${API_URL}/admin/attendance`, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
  }
};

export default apiService;
// services/api.js
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://iei-sc-rcciit.onrender.com/';

export const api = {
  getEvents: () => fetch(`${API_BASE_URL}/api/events/`).then(res => res.json()),
  getTeam: () => fetch(`${API_BASE_URL}/api/team/`).then(res => res.json()),
  // Add other API calls as needed
};

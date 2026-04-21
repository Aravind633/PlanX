
export const getBaseUrl = () => {
  if (window.location.hostname === "planx-financial-assistant.duckdns.org") {
    return "http://planx-financial-assistant.duckdns.org:5000/api/v1"; 
  }
  // 1. If running on your AWS EC2 server
  if (window.location.hostname === "13.233.124.149") {
    return "http://13.233.124.149:5000/api/v1";
  }
  
  // 2. If running on Render
  if (window.location.hostname.includes("onrender.com")) {
    return "https://planx-backend.onrender.com/api/v1";
  }
  
  // 3. Fallback for Local Development (localhost)
  return "http://localhost:5000/api/v1";
};
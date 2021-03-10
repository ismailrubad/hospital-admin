import axios from "axios";

export const addZone = (name, district) => {
   return axios.post('http://localhost:5000/admin/api/zone/add', {
      name,
      district
   })
};

export const editZone = (id, name, district) => {
   return axios.post('http://localhost:5000/admin/api/zone/update', {
      id,
      name,
      district
   })
};


export const fetchZoneList = (currentPage = 1, limit = 10, sort = "name", sortOrder = 1, district, query) => {
   return axios.get('http://localhost:5000/admin/api/zone', {
      params: {
         query,
         limit: limit,
         page: currentPage,
         sort: sort,
         sortOrder: sortOrder,
         resolveDistrict: 1,
         district
      }
   })
};

export const fetchAllZones = () => {
   return axios.get('http://localhost:5000/admin/api/zone', {
      params: {
      }
   })
};

export const fetchZoneDetails = (id) => {
   return axios.get(`http://localhost:5000/admin/api/zone/${id}`, {
      params: {
         resolveDistrict: 1
      }
   })
};


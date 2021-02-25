import axios from "axios";

export const addService = (name, hospital, charge, cover, image, description) => {
   return axios.post('http://localhost:5000/admin/api/service/add', {
      name, hospital, charge, cover, image, description
   })
};

export const editService = (id, name, hospital, charge, cover, image, description) => {
   return axios.post('http://3.6.216.223/admin/api/service/update', {
      id, name, hospital, charge, cover, image, description
   })
};

export const fetchServiceList = (currentPage = 1, limit = 5, sort = "name", sortOrder = 1, hospital, query) => {
   return axios.get('http://localhost:5000/admin/api/service', {
      params: {
         query,
         hospital,
         limit: limit,
         page: currentPage,
         sort: sort,
         sortOrder: sortOrder,
         resolveHospital: 1,
         resolveImage: 1
      }
   })
};

export const fetchServiceDetails = (id) => {
   return axios.get(`http://localhost:5000/admin/api/service/${id}`)
};


export const deleteService = (id) => {
   return axios.get(`http://localhost:5000/admin/api/service/remove/`, {
      params: {
         id
      }
   })
};
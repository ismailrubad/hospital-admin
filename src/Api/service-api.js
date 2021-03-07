import axios from "axios";

export const addService = (name, hospital, charge, cover, image, description) => {
   return axios.post('/admin/api/service/add', {
      name, hospital, charge, cover, image, description
   })
};

export const editService = (id, name, hospital, charge, cover, image, description) => {
   return axios.post('/admin/api/service/update', {
      id, name, hospital, charge, cover, image, description
   })
};

export const fetchServiceList = (currentPage = 1, limit = 10, sort = "name", sortOrder = 1, hospital, query) => {
   return axios.get('/admin/api/service', {
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
   return axios.get(`/admin/api/service/${id}`)
};


export const deleteService = (id) => {
   return axios.get(`/admin/api/service/remove/`, {
      params: {
         id
      }
   })
};
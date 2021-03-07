import axios from "axios";

export const addDisease = (name) => {
   return axios.post('/admin/api/diseaseCategory/add', {
      name
   })
};

export const editDisease = (id, name) => {
   return axios.post('/admin/api/diseaseCategory/update', {
      id, name
   })
};

export const fetchDiseaseCatList = (currentPage = 1, limit = 10,
   sort = "name", sortOrder = 1) => {
   return axios.get('/admin/api/diseaseCategory', {
      params: {
         query: "",
         limit: limit,
         page: currentPage,
         sort: sort,
         sortOrder: sortOrder,
      }
   })
};

export const fetchAllDiseaseCat = () => {
   return axios.get('/admin/api/diseaseCategory', {
      params: {
         // query: "",
         // limit: limit,
         // page: currentPage,
         // sort: sort,
         // sortOrder: sortOrder,
      }
   })
};


export const deleteDiseaseCat = (id) => {
   return axios.get(`admin/api/diseaseCategory/remove/`, {
      params: {
         id
      }
   })
};
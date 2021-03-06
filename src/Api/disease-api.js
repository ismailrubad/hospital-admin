import axios from "axios";

export const addDisease = (name, cover) => {
   return axios.post('http://localhost:5000/admin/api/diseaseCategory/add', {
      name, cover
   })
};

export const editDisease = (id, name) => {
   return axios.post('http://localhost:5000/admin/api/diseaseCategory/update', {
      id, name
   })
};

export const fetchDiseaseCatList = (currentPage = 1, limit = 10,
   sort = "name", sortOrder = 1) => {
   return axios.get('http://localhost:5000/admin/api/diseaseCategory', {
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
   return axios.get('http://localhost:5000/admin/api/diseaseCategory', {
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
   return axios.get(`http://localhost:5000/admin/api/diseaseCategory/remove/`, {
      params: {
         id
      }
   })
};
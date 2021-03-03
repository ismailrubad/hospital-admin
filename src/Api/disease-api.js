import axios from "axios";

export const addDisease = (name) => {
   return axios.post('https://hospitalsheba.com//admin/api/diseaseCategory/add', {
      name
   })
};

export const editDisease = (id, name) => {
   return axios.post('https://hospitalsheba.com/admin/api/diseaseCategory/update', {
      id, name
   })
};

export const fetchDiseaseCatList = (currentPage = 1, limit = 5,
   sort = "name", sortOrder = 1) => {
   return axios.get('https://hospitalsheba.com//admin/api/diseaseCategory', {
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
   return axios.get('https://hospitalsheba.com//admin/api/diseaseCategory', {
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
   return axios.get(`https://hospitalsheba.com//admin/api/diseaseCategory/remove/`, {
      params: {
         id
      }
   })
};
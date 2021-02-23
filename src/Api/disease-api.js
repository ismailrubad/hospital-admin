import axios from "axios";

export const addDisease = (name) => {
   return axios.post('http://3.6.216.223/admin/api/diseaseCategory/add', {
      name
   })
};

export const editDisease = (id, name) => {
   return axios.post('http://3.6.216.223/admin/api/diseaseCategory/update', {
      id, name
   })
};

export const fetchDiseaseCatList = (currentPage = 1, limit = 5,
   sort = "name", sortOrder = 1) => {
   return axios.get('http://3.6.216.223/admin/api/diseaseCategory', {
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
   return axios.get('http://3.6.216.223/admin/api/diseaseCategory', {
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
   return axios.get(`http://3.6.216.223/admin/api/diseaseCategory/remove/`, {
      params: {
         id
      }
   })
};
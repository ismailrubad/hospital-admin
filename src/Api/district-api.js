import axios from "axios";

export const addDistrict = (districtName) => {
   console.log(districtName);
   return axios.post('/admin/api/district/add', {
      name: districtName,
   })
};

export const editDistrict = (id, name) => {
   return axios.post('/admin/api/district/update', {
      id,
      name,
   })
};


export const fetchDistrictList = (currentPage = 1, limit = 10, sort = "name", sortOrder = 1, query) => {
   return axios.get('/admin/api/district', {
      params: {
         query,
         limit: limit,
         page: currentPage,
         sort: sort,
         sortOrder: sortOrder,
         // id: "600403137dcb2cde1148751e"
      }
   })
};

export const fetchAllDistricts = () => {
   return axios.get('/admin/api/district', {
      params: {
         // query: "",
         // limit: 2,
         // page: currentPage,
         id: "600403137dcb2cde1148751e"
      }
   })
};

export const fetchDistrictDetails = (id) => {
   return axios.get(`admin/api/district/${id}`)
};


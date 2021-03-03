import axios from "axios";


export const fetchComissionList = (currentPage = 1, limit = 10,
   sort = "", sortOrder = 1, hospital) => {
   return axios.get('http://localhost:5000/admin/api/comission', {
      params: {
         query: "",
         limit: limit,
         page: currentPage,
         sort: sort,
         sortOrder: sortOrder,
         resolveHospital: 1,
         hospital
      }
   })
};

export const editComission = (hospital, amount, type) => {
   return axios.post('http://localhost:5000/admin/api/comission/update', {
      hospital, amount, type
   })
};
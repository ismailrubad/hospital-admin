import axios from "axios";


export const addStaff = (name, hospital, phone, password) => {
   return axios.post('http://3.6.216.223/admin/api/staff/add', {
      name, hospital, phone, password
   })
};

export const fetchStaffList = (currentPage = 1, limit = 5,
   sort = "name", sortOrder = 1, hospital, query) => {
   return axios.get('http://3.6.216.223/admin/api/staff', {
      params: {
         query,
         hospital,
         limit: limit,
         page: currentPage,
         sort: sort,
         sortOrder: sortOrder,
      }
   })
};

export const fetchStaffDetails = (id) => {
   return axios.get(`http://3.6.216.223/admin/api/staff/${id}`)
};

export const deleteStaff = (id) => {
   return axios.get(`http://3.6.216.223/admin/api/staff/remove/`, {
      params: {
         id
      }
   })
};
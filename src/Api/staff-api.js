import axios from "axios";


export const addStaff = (name, hospital, phone, password) => {
   return axios.post('/admin/api/staff/add', {
      name, hospital, phone, password
   })
};

export const editStaff = (id, name, hospital, phone, password) => {
   return axios.post('/admin/api/staff/update', {
      id, name, hospital, phone, password
   })
};

export const fetchStaffList = (currentPage = 1, limit = 10,
   sort = "name", sortOrder = 1, hospital, query) => {
   return axios.get('/admin/api/staff', {
      params: {
         query,
         hospital,
         limit: limit,
         page: currentPage,
         sort: sort,
         sortOrder: sortOrder,
         resolveHospital: 1
      }
   })
};

export const fetchStaffDetails = (id) => {
   return axios.get(`/admin/api/staff/${id}`)
};

export const deleteStaff = (id) => {
   return axios.get(`/admin/api/staff/remove/`, {
      params: {
         id
      }
   })
};
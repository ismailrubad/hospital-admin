import axios from "axios";

export const fetchCustomerList = (currentPage = 1, limit = 10,
   sort = "name", sortOrder = 1) => {
   return axios.get('http://localhost:5000/admin/api/customer', {
      params: {
         query: "",
         limit: limit,
         page: currentPage,
         sort: sort,
         sortOrder: sortOrder,
      }
   })
};

export const addCustomer = (name, phone, password) => {
   return axios.post('http://localhost:5000/admin/api/customer/add', {
      name, phone, password,
   })
};

export const editCustomer = (id, name, phone, password,) => {
   return axios.post('http://localhost:5000/admin/api/customer/update', {
      id, name, phone, password
   })
};

export const fetchCustomerDetails = (id) => {
   return axios.get(`http://localhost:5000/admin/api/customer/${id}`)
};

export const deleteCustomer = (id) => {
   return axios.get(`http://localhost:5000/admin/api/customer/remove/`, {
      params: {
         id
      }
   })
};
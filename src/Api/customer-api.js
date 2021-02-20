import axios from "axios";

export const fetchCustomerList = (currentPage = 1, limit = 5,
   sort = "name", sortOrder = 1) => {
   return axios.get('http://3.6.216.223/admin/api/customer', {
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
   return axios.post('http://3.6.216.223/admin/api/customer/add', {
      name, phone, password,
   })
};

export const fetchCustomerDetails = (id) => {
   return axios.get(`http://3.6.216.223/admin/api/customer/${id}`)
};

export const deleteCustomer = (id) => {
   return axios.get(`http://3.6.216.223/admin/api/customer/remove/`, {
      params: {
         id
      }
   })
};
import axios from "axios";

export const fetchBillingList = (currentPage = 1, limit = 10,
   sort = "hospital", sortOrder = 1, hospital) => {
   return axios.get('http://localhost:5000/admin/api/bill', {
      params: {
         query: "",
         limit: limit,
         page: currentPage,
         sort: sort,
         sortOrder: sortOrder,
         hospital,
         resolveHospital: 1,
         resolveCustomer: 1,
      }
   })
};

export const fetchBillingDetails = (id) => {
   return axios.get(`https://hospitalsheba.com//admin/api/bill/${id}`, {
      params: {
         resolveHospital: 1,
         resolveCustomer: 1,
         resolveCover: 1
      }
   })
};
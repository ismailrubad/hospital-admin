import axios from "axios";

export const fetchBillingList = (currentPage = 1, limit = 5,
   sort = "hospital", sortOrder = 1) => {
   return axios.get('https://hospitalsheba.com//admin/api/bill', {
      params: {
         query: "",
         limit: limit,
         page: currentPage,
         sort: sort,
         sortOrder: sortOrder,
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
import axios from "axios";

export const addPayment = (hospital, amount) => {
   return axios.post('http://localhost:5000/admin/api/payment/add', {
      hospital, amount
   })
};

export const editPayment = (id, amount) => {
   return axios.post('http://localhost:5000/admin/api/payment/update', {
      id, amount
   })
};

export const fetchPaymentList = (currentPage = 1, limit = 10, sort = "amount", sortOrder = 1, hospital,
   amountLessThan, amountGreaterThan) => {
   return axios.get('http://localhost:5000/admin/api/payment', {
      params: {
         limit: limit,
         page: currentPage,
         sort: sort,
         sortOrder: sortOrder,
         resolveHospital: 1,
         hospital,
         amountLessThan, amountGreaterThan
      }
   })
};

export const fetchPaymentDetails = (id) => {
   return axios.get(`http://localhost:5000/admin/api/payment/${id}`, {
      params: {
         resolveHospital: 1,
      }
   })
};

export const deletePayment = (id) => {
   return axios.get(`http://localhost:5000/admin/api/payment/remove/`, {
      params: {
         id
      }
   })
};

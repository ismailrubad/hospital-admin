import axios from "axios";

export const addPayment = (hospital, amount) => {
   return axios.post('/admin/api/payment/add', {
      hospital, amount
   })
};

export const editPayment = (id, amount) => {
   return axios.post('/admin/api/payment/update', {
      id, amount
   })
};

export const fetchPaymentList = (currentPage = 1, limit = 10, sort = "amount", sortOrder = 1, hospital) => {
   return axios.get('/admin/api/payment', {
      params: {
         limit: limit,
         page: currentPage,
         sort: sort,
         sortOrder: sortOrder,
         resolveHospital: 1,
         hospital
      }
   })
};

export const fetchPaymentDetails = (id) => {
   return axios.get(`/admin/api/payment/${id}`, {
      params: {
         resolveHospital: 1,
      }
   })
};

// export const deleteDoctor = (id) => {
//    return axios.get(`/admin/api/doctor/remove/`, {
//       params: {
//          id
//       }
//    })
// };
import axios from "axios";

export const addDoctor = (name, hospital, diseaseCategory, visitingFee, phone, cover,
   visitingDay, visitingTime, description) => {
   return axios.post('http://localhost:5000/admin/api/doctor/add', {
      name, hospital, diseaseCategory,
      visitingFee, phone, cover, visitingDay, visitingTime, description
   })
};

export const editDoctor = (id, name, hospital, diseaseCategory, visitingFee, phone, cover,
   visitingDay, visitingTime, description) => {
   return axios.post('http://localhost:5000/admin/api/doctor/update', {
      id, name, hospital, diseaseCategory,
      visitingFee, phone, cover, visitingDay, visitingTime, description
   })
};

export const fetchDoctorList = (currentPage = 1, limit = 5, sort = "name", sortOrder = 1, diseaseCategory, hospital, query) => {
   return axios.get('http://localhost:5000/admin/api/doctor', {
      params: {
         query,
         limit: limit,
         page: currentPage,
         sort: sort,
         sortOrder: sortOrder,
         resolveHospital: 1,
         resolveDiseaseCategory: 1,
         diseaseCategory,
         hospital
      }
   })
};

export const fetchDoctorDetails = (id) => {
   return axios.get(`http://localhost:5000/admin/api/doctor/${id}`, {
      params: {
         resolveHospital: 1,
         resolveCover: 1
      }
   })
};

export const deleteDoctor = (id) => {
   return axios.get(`http://localhost:5000/admin/api/doctor/remove/`, {
      params: {
         id
      }
   })
};
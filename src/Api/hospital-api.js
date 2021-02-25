import axios from "axios";

export const addHopital = (name, zone, shortCode, discountAmount, discountAmountTotal, address
   , phone, geoLocation, image, cover, description) => {
   return axios.post('https://hospitalsheba.com/admin/api/hospital/add', {
      name, zone, shortCode, discountAmount, discountAmountTotal,
      address, phone, geoLocation, image, cover, description
   })
};

export const editHospital = (id, name, zone, shortCode, discountAmount, discountAmountTotal, address
   , phone, geoLocation, image, cover, description) => {
   return axios.post('https://hospitalsheba.com/admin/api/hospital/update', {
      id, name, zone, shortCode, discountAmount, discountAmountTotal, address
      , phone, geoLocation, image, cover, description
   })
};

export const fetchHospitaltList = (currentPage = 1, limit = 5, sort = "name", sortOrder = 1, zone, query) => {
   return axios.get('https://hospitalsheba.com//admin/api/hospital', {
      params: {
         query,
         limit: limit,
         page: currentPage,
         sort: sort,
         sortOrder: sortOrder,
         resolveImage: 1,
         resolveZone: 1,
         resolveCover: 1,
         zone
      }
   })
};

export const fetchAllHospital = () => {
   return axios.get('https://hospitalsheba.com//admin/api/hospital', {
      params: {
         // query: "",
         // limit: limit,
         // page: currentPage,
         // sort: sort,
         // sortOrder: sortOrder,
      }
   })
};

export const fetchHospitalDetails = (id) => {
   return axios.get(`https://hospitalsheba.com//admin/api/hospital/${id}`)
};

export const deleteHospital = (id) => {
   return axios.get(`https://hospitalsheba.com//admin/api/hospital/remove/`, {
      params: {
         id
      }
   })
};
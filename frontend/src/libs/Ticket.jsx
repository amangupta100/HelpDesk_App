import axios from "axios";

export const RegisterTicket =async (formData) =>{

 const req = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/ticket/create-ticket`, // replace with your backend URL
       formData,
       {
         headers: {
           'Content-Type': 'multipart/form-data',
         },
       }
     );
const {data} = req
return data
}

export const getAllTickets = async (userId) => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/ticket/allTickets`, {
    params: { userId },
  });
  return response.data;
}
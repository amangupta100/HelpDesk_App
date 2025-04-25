import axios from "axios"

export const CreateAgentFetch = async (agent) => {
    const req = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/create-agent`,agent,{
        withCredentials:true,
        headers:{
            'Content-Type': 'application/json'
        }
        
})
return req.data
}

export const GetAllAgentsFetch = async () => {
    const req = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/all-agents`,{
   
})
return req.data
}
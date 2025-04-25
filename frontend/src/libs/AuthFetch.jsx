import axios from 'axios'

export const SignUpFetch =async (userInp) =>{

const req = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,userInp,{
    withCredentials:true,
    headers:{
        'Content-Type': 'application/json'
    }
})
const {data} = req
return data
}

export const LoginFetch = async (userInp) =>{
    const req = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,userInp,{
        withCredentials:true,
        headers:{
            'Content-Type':'application/json'
        }
    })
    const {data} = req
    return data
}
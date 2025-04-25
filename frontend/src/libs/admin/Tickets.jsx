import axios from "axios"

export const AllTickets =async () => {
    const req = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/ticket/allTickets`)
    return req.data
}
import axios from 'axios'
import { useEffect, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorToast, SuccessToast } from '../../Toast/AllToast';
import { Oval } from 'react-loader-spinner';

const EditStatus = () => {
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const [status,setStatus] = useState("Active")
  const {ticketId} = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
        setLoading(true);
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/ticket/updateStatus/${ticketId}`, {
          status,
        });
        SuccessToast("Status updated successfully.");
        navigate("/admin/dashboard/allTicket");
      } catch (err) {
       ErrorToast("Error updating status.");
      } finally {
        setLoading(false);
      }
    
  }

  return (
    <div className='w-full h-screen absolute top-0 left-0 flex justify-center items-center bg-black/50 backdrop-blur-md'>
      
    <div className="w-[35%] tb:w-[90%] min-h-fit my-4 bg-white relative">
<IoMdClose className='absolute cursor-pointer top-3 right-3 text-2xl' onClick={()=>navigate("/admin/dashboard/allTicket")}/>
        <div className="w-full h-full flex flex-col justify-center items-center gap-4 p-4">
            <h2 className='text-2xl font-semibold'>Edit Status</h2>
            <form onSubmit={handleSubmit} className='w-full flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
                <label htmlFor="status" className='text-sm font-semibold'>Status</label>
                <select value={status}
        onChange={(e)=>setStatus(e.target.value)} name="status" id="status" className='border border-gray-300 rounded-lg p-2'>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Closed">Closed</option>
                </select>
            </div>
            <button disabled={loading}
                                 type="submit"
                                 className={`${loading ? "bg-blue-200 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"} flex items-center justify-center w-full py-2 rounded-xl text-white font-semibold transition duration-200`}
                               >
                                 {
                         loading ? 
                           <Oval visible={true} height="30" width="30" color="#FFFFFF"/> : "Update Status"
                                     }
                               </button>
            </form>
        </div>

    </div>

    </div>
  )
}

export default EditStatus

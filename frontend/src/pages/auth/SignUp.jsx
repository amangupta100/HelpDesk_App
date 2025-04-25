import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import {ErrorToast, SuccessToast} from '../../Toast/AllToast'
import { SignUpFetch } from "../../libs/AuthFetch";
import { Oval } from "react-loader-spinner";
import { AdminCheck } from "../../libs/AdminCheck";

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData,setData] = useState({name:"",email:"",password:""})
  const [loading,setLoading] = useState(false)

  const navigate = useNavigate()

  const togglePassword = () => setShowPassword((prev) => !prev);
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    setLoading(true)
    const res = await SignUpFetch(formData)
    setLoading(false)
    const {success,message} = res
    if(success){
      SuccessToast(message)
      localStorage.setItem("user",JSON.stringify(res.user))
      if(AdminCheck(formData)){
            navigate("/admin/dashboard")
          }
          else navigate("/user/dashboard")
    }
    else{
      ErrorToast(message)
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">SignUp User</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
              Name
            </label>
            <input required value={formData.name} onChange={(e)=>setData({...formData,name:e.target.value})}
              type="text"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input required value={formData.email} onChange={(e)=>setData({...formData,email:e.target.value})}
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input required value={formData.password} onChange={(e)=>setData({...formData,password:e.target.value})}
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ?  <FaEye />:<FaEyeSlash />}
              </button>
            </div>
          </div>
          <button disabled={loading}
            type="submit"
            className={`${loading ? "bg-blue-200 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"} flex items-center justify-center w-full py-2 rounded-xl text-white font-semibold transition duration-200`}
          >
            {
    loading ? 
      <Oval visible={true} height="30" width="30" color="#FFFFFF"/> : "Submit"
                }
          </button>
        </form>
        <h1 className="inline-block mt-4">Already have account?</h1>
        <NavLink to="/login" className="ml-2 text-blue-400">Login Up</NavLink>
      </div>
    </div>
  );
}
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginFetch } from "../../libs/AuthFetch";
import { ErrorToast, SuccessToast } from "../../Toast/AllToast";
import { Oval } from "react-loader-spinner";
import { AdminCheck } from "../../libs/AdminCheck";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data,setData] = useState({email:"",password:""})
  const [loading,setLoading] = useState(false)

  const navigate = useNavigate()

  const togglePassword = () => setShowPassword((prev) => !prev)
  const handleSubmit = async (e) => {
    e.preventDefault()
 
  setLoading(true)
  const res = await LoginFetch(data)
  console.log(res)
  setLoading(false)
  const {success,message} = res
  if(success){
    SuccessToast(message)

    const isAdmin = AdminCheck(data)

    localStorage.setItem("user", JSON.stringify(res.user))
    if(isAdmin){
      navigate("/admin/dashboard")
    }
    
    else if(JSON.parse(localStorage.getItem('user')).role == "Agent") navigate("/agent/dashboard")
    else navigate("/user/dashboard")
    
  } else {
    ErrorToast(message)
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Login User</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input value={data.email} onChange={(e)=>setData({...data,email:e.target.value})}
              type="email" required
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
              <input value={data.password} onChange={(e)=>setData({...data,password:e.target.value})}
                type={showPassword ? "text" : "password"}
                id="password" required
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEye />:<FaEyeSlash />}
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
        <h1 className="inline-block mt-4">Didn't have account?</h1>
        <NavLink to="/register" className="ml-2 text-blue-400">Sign Up</NavLink>
      </div>
    </div>
  );
}
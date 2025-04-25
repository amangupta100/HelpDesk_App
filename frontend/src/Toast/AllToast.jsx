import {toast} from 'react-hot-toast'

export const SuccessToast = (msg) =>{
    toast.success(msg,{
        position:"top-center"
    })
}

export const ErrorToast = (msg) =>{
    toast.error(msg,{
        position:"top-center"
    })
}
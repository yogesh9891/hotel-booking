import { toast } from "react-hot-toast";
export const successToast = (message) => {
    toast.success(message, { autoClose: 2000 });
}


export const errorToast = (err) => {


    console.log(err,"errerrerrerr")
    if (err?.response?.data?.message) {
        toast.error(err?.response?.data?.message, { autoClose: 2000 });
    }
    else if (err?.message) {
        if(err?.message == "canceled"){
        return
        }
        toast.error(err?.message, { autoClose: 2000 });
    }
    else {
        toast.error(err, { autoClose: 2000 });
    }
} 
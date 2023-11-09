import { baseURL } from "../axiosUser";

export const uploadPDF=async(PDFfile:File|null)=>{

    if(PDFfile){
        const form=new FormData
        form.append('pdf',PDFfile)
        const response=await baseURL.post('/post',form)
        return response.data
    }else{
        throw new Error('No PDF found')
    }
    
    
}
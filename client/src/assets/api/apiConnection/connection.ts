import  baseURL  from "../axiosUser";



interface signUpForm {
    name: string,
    email: string,
    password: string
}
interface logInForm {
    email: string,
    password: string
}

//API TO UPLOAD PDF
export const uploadPDF = async (PDFfile: File | null, email: string) => {
    if (PDFfile) {
        const form = new FormData
        form.append('pdf', PDFfile)
        form.append('email', email)
        console.log(form,'formmm');
        
        const response = await baseURL.post('/post', form)
        console.log(response,'api response');

        return response.data
    } else {
        throw new Error('No PDF found')
    }
}

//API TO SIGN UP
export const signUp = async (values: signUpForm) => {
    const response = await baseURL.post('/signup', values)
    return response?.data
}


//API TO LOGIN
export const logIn = async (values: logInForm) => {
    const response = await baseURL.post('/login', values)
    return response?.data
}

//API TO GET ALL PDF UPLOADED BY USER
export const prevPDF = async (email: string) => {
    const response = await baseURL.post('/get-all-pdf', { email })
    return response.data
}


//API TO VIEW A PARTICULAR PDF
export const getPDF = async (pdfName: string) => {
    const response = await baseURL.get(`/pdf/${pdfName}`);
    return response
}

//API TO DELETE PDF
export const PDFDelete= async(pdfName:string,email:string)=>{
    const data={pdfName,email}
    
    const response=await baseURL.put('/deletePDF',data)
    return response.data
    
}
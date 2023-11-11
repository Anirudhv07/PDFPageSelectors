import { baseURL } from "../axiosUser";

interface signUpForm {
    name: string,
    email: string,
    password: string
}
interface logInForm {
    email: string,
    password: string
}
export const uploadPDF = async (PDFfile: File | null, email: string) => {
    if (PDFfile) {
        const form = new FormData
        form.append('pdf', PDFfile)
        form.append('email', email)
        const response = await baseURL.post('/post', form)
        return response.data
    } else {
        throw new Error('No PDF found')
    }
}

export const signUp = async (values: signUpForm) => {
    const response = await baseURL.post('/signup', values)
    return response?.data
}

export const logIn = async (values: logInForm) => {
    const response = await baseURL.post('/login', values)
    return response?.data
}

export const prevPDF = async (email: string) => {
    const response = await baseURL.post('/get-all-pdf', { email })
    return response.data
}


export const getPDF = async (pdfName: string) => {
    const response = await baseURL.get(`/pdf/${pdfName}`);
    return response
}
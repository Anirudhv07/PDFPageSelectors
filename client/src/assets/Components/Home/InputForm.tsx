import {
  Card,
  Input,
 
  Button,
  Typography,
} from "@material-tailwind/react";
import { green } from "@mui/material/colors";
import {useState} from 'react'
import { uploadPDF } from "../../api/apiConnection/connection";
import { toast } from "react-toastify";
import DialogBox from "./Dialog";
 
const InputForm=()=> {

  const [pdfFile,setPdfFile]=useState<File|null>(null)
  const [pdfFileURL,setPdfFileURL]=useState('')

  const [open, setOpen] = useState(false);
 
  const handleOpen = () => setOpen(!open);

  const handlePDF=(e:any)=>{
    const file=e.target.files[0]
    if(file.type=='application/pdf'){
      
      setPdfFile(file)
      const fileURL = URL.createObjectURL(file);
      setPdfFileURL(fileURL)
    }
    
  }

  const handleUploadPDF=async(event: { preventDefault: () => void; })=>{
    event?.preventDefault()

  const response=await uploadPDF(pdfFile)
  if(response.status=='success'){
    toast.success('PDF uploaded Successfully')
    handleOpen()
  }else{
    toast.error('Error occured')
  }
  
  }

  console.log(pdfFileURL,'jklllll');
  
  
  return (
     <Card color="transparent"  className="items-center" shadow={false} >
      <div className="border border-gray-300 p-20 rounded-md w-fill text-center mt-32 bg-white drop-shadow-xl"  >

      <Typography variant="h4" color="green">
        PDF Editor
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
       Upload your PDF
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 " onSubmit={handleUploadPDF} encType="multipart/form-data">
        <div className="mb-1 flex flex-col gap-6">
          {/* <Typography variant="h6" color="blue-gray" className="-mb-3">
            
          </Typography> */}
          <Input
            size="lg"
            type="file"
            placeholder="Add PDF"
            className=" !border-t-blue-gray-200 focus:!border-green-500"
            labelProps={{
              className: "before:content-none after:content-none",
            }} crossOrigin={undefined}   
            onChange={handlePDF}       />
         
        </div>
        {pdfFileURL?  <object data={pdfFileURL} type="application/pdf" width="100%" height="100%">
      {/* <p>Alternative text - include a link <a href="http://africau.edu/images/default/sample.pdf">to the PDF!</a></p> */}
  </object>:<div></div>}
      
       
        <Button className="mt-6 bg-green-500" type="submit" fullWidth>
          Upload
        </Button>
       
      </form>
      </div>
      {pdfFile !== null &&< DialogBox handleOpen={handleOpen} open={open} pdfFile={pdfFile}/>}
    </Card>
  );
}


export default InputForm
import {
  List,
  ListItem,
  ListItemSuffix,
  Card,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PDFDelete, getPDF, prevPDF } from "../../api/apiConnection/connection";
import DialogBox from "../Home/Dialog";
 

 
//Older uploaded PDFs
const OldPDF=()=>{
  const [uploads,setUploads]=useState([])
  const [pdfFile,setPdfFile]=useState<File|null>(null)
  const{email}=useSelector((store:any)=>store.user)
  const [open, setOpen] = useState(false);
 
  const handleOpen = () => setOpen(!open);
  
  useEffect(()=>{
    getAllPDF()

  },[])

  //TO GET ALL PDF UPLOADED BY THE USER
  const getAllPDF=async()=>{
    const response=await prevPDF(email)
    
    setUploads(response)
    
    
  }
  
  //TO VIEW THE PDF SELECTED 
  const handlePDF=async(uploads:string)=>{
    const response=await getPDF(uploads)
    const { data, metadata } = response.data;

        const decodedData = atob(data);

        const uint8Array = new Uint8Array(decodedData.split('').map((char) => char.charCodeAt(0)));

        const pdfFile = new File([uint8Array], metadata.name, { type: metadata.type });
    
    setPdfFile(pdfFile)
    handleOpen()
  }


  //TO DELETE PDF
  const deletePDF=async(pdfName:string)=>{
    const response=await PDFDelete(pdfName,email)
    if(response.status==true){
      setUploads(response.uploadedPDF)
    }

  }


  return (
    <div className="w-full flex flex-col items-center " >

    <Typography variant="h3" color="white" className="p-7 font-body">Previous Project</Typography>
    <div className="w-full flex justify-center flex-col items-center ">
    <Card className="w-3/4">

      <List>
        {uploads.length!=0?uploads.map((uploads)=>{
          return(
            
            <ListItem ripple={false} key={uploads} className="py-1 pr-1 pl-4 flex flex-wrap">
              {uploads}
              <ListItemSuffix className="flex flex-row gap-4">
               
                  <Button onClick={()=>handlePDF(uploads)}>
                    Select Page
                  </Button>
                  <Button color="red" onClick={()=>deletePDF(uploads)}>
                    Delete
                  </Button>
              
              </ListItemSuffix>
            </ListItem>
          
          )
        
          
        }):
        <Typography>No Previous Project</Typography>}
      </List>
      {pdfFile !== null &&< DialogBox handleOpen={handleOpen} open={open} pdfFile={pdfFile}/>}
    </Card>

    </div>
    </div>
  );
}

export default OldPDF
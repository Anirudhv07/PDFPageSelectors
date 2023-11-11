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
import { getPDF, prevPDF } from "../../api/apiConnection/connection";
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
  const getAllPDF=async()=>{
    const response=await prevPDF(email)
    
    setUploads(response)
    
    
  }
  
  const handlePDF=async(uploads:string)=>{
    const response=await getPDF(uploads)
    const { data, metadata } = response.data;

        const decodedData = atob(data);

        const uint8Array = new Uint8Array(decodedData.split('').map((char) => char.charCodeAt(0)));

        const pdfFile = new File([uint8Array], metadata.name, { type: metadata.type });
    
    setPdfFile(pdfFile)
    handleOpen()
  }


  return (
    <div className="w-full flex flex-col items-center " >

    <Typography variant="h3" color="white" className="p-7 font-body">Previous Project</Typography>
    <div className="w-full flex justify-center flex-col items-center ">
    <Card className="w-3/4">

      <List>
        {uploads.map((uploads)=>{
          return(
            
            <ListItem ripple={false} key={uploads} className="py-1 pr-1 pl-4 flex flex-wrap">
              {uploads}
              <ListItemSuffix>
               
                  <Button onClick={()=>handlePDF(uploads)}>
                    Select Page
                  </Button>
              
              </ListItemSuffix>
            </ListItem>
          
          )
        
          
        })}
      </List>
      {pdfFile !== null &&< DialogBox handleOpen={handleOpen} open={open} pdfFile={pdfFile}/>}
    </Card>

    </div>
    </div>
  );
}

export default OldPDF
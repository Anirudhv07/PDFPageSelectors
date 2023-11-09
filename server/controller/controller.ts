import fs from "fs"


const controllers ={
     uploadPDF : (req:any,res: any) => {
      console.log(req.file, 'fileee');
      const fileName=req.file?.filename
      const file= fs.createReadStream(`./pdf_upload/${fileName}`)

    //   file.pipe(res)
    res.json({status:"success"})
    }
  
   
  };
  
  export default controllers;
  
import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';
import { Document, Page, pdfjs } from 'react-pdf';
import { PDFDocument } from 'pdf-lib'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface DialogBoxInterface {
  handleOpen: () => void;
  open: boolean;
  pdfFile: File;
}

const DialogBox: React.FC<DialogBoxInterface> = ({ handleOpen, open, pdfFile }) => {

  const [numPages, setNumPages] = useState(0);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {

    setNumPages(numPages);
  };

  //Select Page
  const togglePageSelection = (pageNumber: number) => {
    setSelectedPages((prevSelectedPages) => {
      if (prevSelectedPages.includes(pageNumber)) {
        return prevSelectedPages.filter((page) => page !== pageNumber);
      } else {
        return [...prevSelectedPages, pageNumber];
      }
    });
  };


  //Download as PDF
  const downloadSelectedPages = async () => {
    const existingPdfBytes = await pdfFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const copiedPages = await pdfDoc.copyPages(pdfDoc, selectedPages);

    const newPdfDoc = await PDFDocument.create();
    for (const copiedPage of copiedPages) {
      const embeddedPage = await newPdfDoc.embedPage(copiedPage);
      const page = newPdfDoc.addPage([copiedPage.getWidth(), copiedPage.getHeight()]);
      page.drawPage(embeddedPage);
    }

    const newPdfBytes = await newPdfDoc.save();

    const blob = new Blob([newPdfBytes], { type: 'application/pdf' });

    if (selectedPages.length != 0) {
      // Create a download link and trigger the download
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = `newPDF-${Date.now()}.pdf`;
      downloadLink.click();
    }
  };

  return (
    <>
      <Dialog open={open} size='lg' handler={handleOpen}>
        <DialogHeader>Select Pages</DialogHeader>
        <DialogBody style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {Array.from(new Array(numPages), (_,index) => (
                <div key={`page-${index}`} style={{ width: '50%' }}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedPages.includes(index)}
                      onChange={() => togglePageSelection(index)}
                    />
                    Page {index + 1}
                  </label>
                  <Page pageNumber={index + 1} width={400} />
                </div>
              ))}
            </div>
          </Document>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
            <span>Cancel</span>
          </Button>
          {selectedPages.length != 0 ? <Button variant="gradient" color="green" onClick={downloadSelectedPages}>
            <span>Download Selected Pages</span>
          </Button> : <div></div>}


        </DialogFooter>
      </Dialog>
    </>
  );
};

export default DialogBox;





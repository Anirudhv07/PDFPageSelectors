import OldPDF from '../Components/PDFList/OldPDF'
import ProfileButton from '../Components/Home/Button'

function PdfList() {
  return (
    <div className=' h-screen'>

    <ProfileButton />
    <div className='flex justify-center'>
      <OldPDF />
    </div>
    </div>
  )
}

export default PdfList

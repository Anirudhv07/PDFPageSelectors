
import ProfileButton from '../Components/Home/Button'
import InputForm from '../Components/Home/InputForm'

function HomePage() {
  return (
    <div className='h-screen'>

      <div className='flex flex-row justify-end'>
      <ProfileButton />

      </div>
    <div className='flex  items-center justify-center'>
      <InputForm />
    </div>
    </div>
  )
}

export default HomePage

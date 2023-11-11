import { Button, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react';
import { ChevronDownIcon, HomeIcon, PrinterIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { setLogOut } from '../../redux/slice';
const ProfileButton = () => {


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { name } = useSelector((store: any) => store.user)
  const [isMenuOpen] = useState(false);

  const signOut = () => {
    dispatch(setLogOut())
    toast.success('Signout Successful')
    navigate('/')
  }
  return (
    <Menu>
      <MenuHandler>


        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Button>
            <div className='flex flex-row gap-2'>

              {name}
              <ChevronDownIcon
                strokeWidth={4}
                className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                  }`}
              />
            </div>
          </Button>
        </Button>

      </MenuHandler>
      <MenuList>




        <Link to={'/'}>

          <MenuItem className="flex items-center gap-2">
            <HomeIcon className='h-5' />
            <Typography variant="small" className="font-normal">
              Home
            </Typography>
          </MenuItem>
        </Link>
        <hr className="my-2 border-blue-gray-50" />

        <Link to={'/prev-project'}>

          <MenuItem className="flex items-center gap-2">
            <PrinterIcon className='h-5' />
            <Typography variant="small" className="font-normal">
              Prev-Project
            </Typography>
          </MenuItem>
        </Link>

        <hr className="my-2 border-blue-gray-50" />
        <MenuItem className="flex items-center gap-2 " onClick={signOut}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
            />
          </svg>
          <Typography variant="small" className="font-normal">
            Sign Out
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}


export default ProfileButton


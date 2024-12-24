import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { FaMoon, FaSearch, FaSun } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/userTheme.js";

function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  return (
    <Navbar className="dark:border-gray-700 bg-purple-600 text-white border-b border-gray-300">
      <Link to={"/"} className="ml-10">
        <h1 className="self-center whitespace-nowrap text-xl sm:text-2xl font-bold dark:text-white">
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-lg text-black">DEV</span>NINJAS
        </h1>
      </Link>
      <form className="flex items-center">
        <TextInput
          className="hidden lg:inline"
          placeholder="Search..."
          icon={FaSearch}
        />
      </form>
      <div className="flex items-center space-x-4 md:order-2">
        <Button className="w-12 h-10 hidden sm:inline" color='gray' pill onClick={() => dispatch(toggleTheme())}>
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown arrowIcon={false} inline label={
            <Avatar alt="user" img={currentUser.profilePicture} rounded className="mr-10" />
          }>
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">{currentUser.email}</span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider></Dropdown.Divider>
            <Dropdown.Item>Sign-Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/login'>
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign-In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <div className="flex flex-col md:flex-row md:space-x-4">
          <Navbar.Link active={path === '/'} as={'div'}>
            <Link to='/' className="px-3 py-2 rounded-md text-sm font-medium">Home</Link>
          </Navbar.Link>
          <Navbar.Link active={path === '/about'} as={'div'}>
            <Link to='/about' className="px-3 py-2 rounded-md text-sm font-medium">About</Link>
          </Navbar.Link>
          <Navbar.Link active={path === '/projects'} as={'div'}>
            <Link to='/projects' className="px-3 py-2 rounded-md text-sm font-medium">Projects</Link>
          </Navbar.Link>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
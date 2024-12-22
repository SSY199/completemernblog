import { Button, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { FaMoon, FaSearch } from "react-icons/fa";

function Header() {
  const path = useLocation().pathname;
  return (
    <Navbar className="border-b-2">
      <Link to={"/"}>
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
        <Button className="w-12 h-10 hidden sm:inline" color='gray' pill>
          <FaMoon/>
        </Button>
        <Link to='/signin'>
          <Button gradientDuoTone="purpleToBlue">
            Sign-In
          </Button>
        </Link>
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

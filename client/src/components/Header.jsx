import { Button, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import {AiOutlineSearch} from 'react-icons/ai';
import {FaMoon} from 'react-icons/fa';

function Header() {
    const path = useLocation().pathname;
  return (
    <Navbar className="border-b-2">
        <Link to="/"className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
        <span className="ps-2 py-1 bg-gradient-to-r from-orange-500 via-green-500 to-blue-500 rounded-lg text-white"> Famouzcoder</span>
            Blog
        </Link>
        <form>
            <TextInput
            type="text"
            placeholder="Search..."
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline"
            />
        </form>
        <Button className="w-12 h-10 lg:hidden" color='gray' pill>
            <AiOutlineSearch />
        </Button>
        <div className="flex gap-2 md:order-2">
            <Button className="w-12 h-10 hidden sm:inline" color='gray' pill>
                <FaMoon />
            </Button>
            <Link to='/sign-in'>
            <Button gradientDuoTone='greenToBlue'>
                Sign In
            </Button>
            </Link>
            <Navbar.Toggle />
        </div>
            <Navbar.Collapse>
                <Navbar.Link active={path ==="/"} as={'div'}>
                    <Link to="/">
                    Home
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path ==="/about"}as={'div'}>
                    <Link to="/about">
                    About
                    </Link>
                </Navbar.Link>

                <Navbar.Link active={path ==="/projects"}as={'div'}>
                    <Link to="/projects">
                    Project
                    </Link>
                </Navbar.Link>
            </Navbar.Collapse>
    </Navbar>
  )
}

export default Header

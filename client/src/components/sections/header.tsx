import Search from '../ui/search'
import Nav from './nav'
import { ModeToggle } from '../ui/mode-toggle'
import { Link } from 'react-router-dom'
import { UserNav } from '../ui/user-nav'

const Header = () => {
  return (
    <div className="flex items-center justify-between py-4 border-b">
      <div className="ml-6 flex items-center space-x-4 lg:space-x-6">
        <Link to="/" className="hidden items-center space-x-2 lg:flex">
          <span className="hidden lg:inline-block">
            <h4>Social Media App</h4>
          </span>
        </Link>
        <Search />
      </div>
      <div className="mr-6 flex items-center space-x-4">
        <Nav className="mx-6" />
        <ModeToggle />
        <UserNav />
      </div>
    </div>
  )
}

export default Header

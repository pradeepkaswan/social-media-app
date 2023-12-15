import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setLogout } from '../../reducers/authReducer'
import { Link, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Bell, HelpCircle, MessageSquare } from 'lucide-react'

const Nav = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  // const fullName = `${user.firstName} ${user.lastName}`

  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      <Button variant="outline" size="icon">
        <Bell className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 " />
      </Button>
      <Button variant="outline" size="icon">
        <MessageSquare className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
      <Button variant="outline" size="icon">
        <HelpCircle className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    </nav>
  )
}

export default Nav

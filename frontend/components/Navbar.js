
import DropdownNavOut from './DropdownNavOut'
import DropdownNavIn from './DropdownNavIn'
import Image from "react";
import Link from 'next/link';
import { useAuth } from './AuthContext';


export default function Navbar() {

  const { authState } = useAuth();
  const { userEmail, userId } = authState;

  return (
    <nav className=' py-2'>
      <div className="flex justify-between align-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <h1 className=''></h1>
        </Link>
        {userId && userEmail ? (
          <DropdownNavIn />
          ) : (
          <DropdownNavOut />
        )}
      </div>
    </nav>
  )
}

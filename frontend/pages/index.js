import Head from 'next/head'
import { useAuth } from '@/components/AuthContext'
import UsernameForm from '@/components/UsernameForm';

export default function Home() {
  const { authState } = useAuth();
  const { username, userEmail, userId } = authState;
  return (
    <>
      {userEmail && userId ? (
        <>
        {username ? (
          <>
          </>
        ) : (
          <UsernameForm/>
        ) }
        </>
      ) : (
        <>

        </>
      )}
    </>
  )
}

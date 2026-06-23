import HomeClient from '@/components/HomeClient'
import { getSession } from '@/lib/getSession'
import React from 'react'

export default async function page() {
  const session =  await getSession()
 
  return (
    <>
    <HomeClient email={session?.user?.email!}/>
    </>
  )
}

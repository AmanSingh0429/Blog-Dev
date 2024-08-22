"use client"

import { SessionProvider } from "next-auth/react"

const SessionWraper = ({ children, session }) => {
  return <SessionProvider session={session} >{children}</SessionProvider>
}

export default SessionWraper;
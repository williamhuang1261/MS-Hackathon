import Image from 'next/image'
import React from 'react'

import logo from "@/public/athenaLogo.jpg"

const Logo = () => {
  return (
    <Image
      src={logo}
      alt="Athena Logo"
      width={220}
      height={220}
      className="rounded-full"
    />
  )
}

export default Logo
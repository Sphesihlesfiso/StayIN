import React from 'react'
import { Button } from '../ui/button'
import { ModeToggle } from '../ModeToggle'

export default function Navbar() {
  return (
    <>
      <header className="flex flex-row justify-between align-middle border-b-2 p-1.5">
        <div className="flex flex-row justify-between">
          <h1 className="p-0.5 font-extrabold ">StayIn</h1>
        </div>
        <div className="flex flex-row">
          <div className="mx-0.5">
            <ModeToggle/>
          </div>
          <div className="mx-0.5">
            <Button className='rounded-xl'>S</Button>
          </div>
        </div>
      </header>
    </>
  )
}

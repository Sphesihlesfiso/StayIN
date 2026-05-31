import React from 'react'

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full text-center align-middle border-t-2 flex flex-row  justify-center">
      <div className=''>
        <p className="p-4 font-bold">© {new Date().getFullYear()} StayIn · Made for South Africa 🇿🇦</p>
      </div>
    </footer>
  )
}

import React from 'react'

export default function Footer() {
  return (
    <footer className="border-t-2 flex flex-row align-middle justify-center">
      <div className=''>
        <p className="p-4 font-bold">© {new Date().getFullYear()} StayIN · Made for South Africa 🇿🇦</p>
      </div>
    </footer>
  )
}

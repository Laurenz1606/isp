import React from 'react'

export default function DocumentHeaderButton({icon, text, action}) {
  return (
    <button
      onClick={action}
      className="bg-white items-center flex py-3 px-5 rounded-full shadow-lg text-accent font-semibold hover:text-white hover:bg-accent space-x-2"
    >
      <span>
        {icon}
      </span>
      <span className="inline-block">{text}</span>
    </button>
  )
}

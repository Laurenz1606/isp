import React from 'react'

export default function DocumentRolesTag({name}) {
  return (
    <div className="text-sm bg-accent m-1 font-semibold group-hover:bg-white rounded-md text-white group-hover:text-accent px-2 shadow-md">
      {name}
    </div>
  )
}

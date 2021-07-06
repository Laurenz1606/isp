import React from 'react'

export default function DocumentRolesTag({name, checked}) {
  return (
    <div className={"text-sm m-1 font-semibold rounded-md px-2 shadow-md group-hover:text-accent group-hover:bg-white" + (!checked ? "  bg-accent text-white" : " bg-white text-accent")}>
      {name}
    </div>
  )
}

import React from "react"

const Menu = () => {
  const getTabs = () => {}
  return (
    <ul className="tabrow flex justify-around bg-secondary px-1 py-3 text-gray-600">
      <li className="selected">
        <a>All</a>
      </li>
      <li>
        <a>Pizza</a>
      </li>
      <li>
        <a>Steak</a>
      </li>
    </ul>
  )
}

export default Menu

import React from "react"
import Tabs from "./Tabs"
import { Link } from "react-router-dom"

const Header = (props) => {
  return (
    <>
      <header className="w-full z-20 bg-third text-center text-lg fixed top-0 left-0">
        <div className="text-secondary font-semibold p-3 w-full">
          <Link to="beers/all">Shopping cart demo</Link>
        </div>

        <Tabs />
        {props.children}
      </header>
    </>
  )
}

export default Header

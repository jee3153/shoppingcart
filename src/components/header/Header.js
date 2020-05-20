import React from "react"
import Tabs from "./Tabs"
import { Link } from "react-router-dom"

const Header = (props) => {
  return (
    <>
      <header className="w-full bg-primary text-center text-2xl">
        <div className="text-white font-black p-3 w-full">
          <Link to="beers/all">Demo App</Link>
        </div>

        <Tabs />
        {props.children}
      </header>
    </>
  )
}

export default Header

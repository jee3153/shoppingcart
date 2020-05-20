import React, { useContext, useEffect, useState } from "react"
import { NavLink, Link, useLocation } from "react-router-dom"
import {
  faUtensils,
  faMugHot,
  faPercentage,
  faSearch,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Context from "../contextAPI/Context"

const Tabs = () => {
  const location = useLocation()
  const { dispatch } = useContext(Context)
  let setTab = (tab) => dispatch({ type: "change-tab", payload: tab })
  const [tIdx, setTIdx] = useState(0)
  const iconArr = [faMugHot, faUtensils, faPercentage, faSearch]

  useEffect(() => {
    const currentpath = location.pathname

    if (currentpath.includes("/beers/")) {
      setTIdx(0)
      setTab(0)
    } else if (currentpath.includes("/food")) {
      setTIdx(1)
      setTab(1)
    } else if (currentpath.includes("/discount")) {
      setTIdx(2)
      setTab(2)
    } else if (currentpath.includes("/search")) {
      setTIdx(3)
      setTab(3)
    }
  }, [location])

  const tabs = iconArr.map((icon, index) => {
    const pathArr = ["/beers/all", "/food", "/discount", "/search"]
    return (
      <Link
        key={index}
        className={`tab ${tIdx === index && "active"}`}
        to={pathArr[index]}
      >
        <li>
          <FontAwesomeIcon icon={icon} />
        </li>
      </Link>
    )
  })

  return (
    <>
      <ul className="flex justify-around">{tabs}</ul>
    </>
  )
}

export default Tabs

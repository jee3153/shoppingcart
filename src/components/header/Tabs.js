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
  const screen = window.innerWidth
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
  }, [location, screen])

  const tabLocation = () => {
    let tabLoc

    if (tIdx === 0) {
      tabLoc = 1
    } else if (tIdx === 1) {
      tabLoc = 0.75
    } else if (tIdx === 2) {
      tabLoc = 0.5
    } else if (tIdx === 3) {
      tabLoc = 0.25
    }

    let style = {
      width: "25vw",
      height: "5vh",
      top: "-2rem",
      transform: `translateX(${screen - screen * tabLoc}px)`,
    }
    return style
  }

  const tabs = iconArr.map((icon, index) => {
    const pathArr = ["/beers/all", "/food", "/discount", "/search"]
    return (
      <Link
        key={index}
        className={`tab__link sm:top-half ${tIdx === index && "active"}`}
        style={{
          gridColumn: `${index + 1}/${index + 2}`,
        }}
        to={pathArr[index]}
      >
        <FontAwesomeIcon icon={icon} className="text-sm md:text-xl" />
      </Link>
    )
  })

  return (
    <div style={{ height: "5vh", width: "100vw" }}>
      <div className="grid grid-cols-4 h-8 relative">{tabs}</div>

      <div className="tab z-20" style={tabLocation()}></div>
      <div className="tab__base z-10 absolute"></div>
    </div>
  )
}

export default Tabs
/* <Link
key={index}
className={`tab ${tIdx === index && "active"}`}
to={pathArr[index]}
>
  <FontAwesomeIcon icon={icon} className="text-sm" />
</Link> */

/* <ul className="flex justify-around">{tabs}</ul> */

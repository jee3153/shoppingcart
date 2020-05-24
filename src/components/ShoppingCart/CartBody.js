import React, { useState, useContext } from "react"

import Context from "../contextAPI/Context"
import {
  faShoppingBasket,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const CartHeader = (props) => {
  const { state, dispatch } = useContext(Context)
  const { storageUpdated, cartIsOpen } = state
  const openACart = (cart) => dispatch({ type: "toggle-cart", payload: cart })

  const openCart = (e) => {
    e.stopPropagation()
    openACart(true)
  }

  const cartOpen = {
    height: "95vh",
    transition: "all 0.2s linear",
  }
  const cartClosed = {
    height: `${window.innerWidth >= 400 ? "6vh" : "10vh"}`,
    transition: "all 0.2s linear",
  }

  return (
    <div
      onClick={openCart}
      className="shopping-cart z-40"
      style={cartIsOpen ? cartOpen : cartClosed}
    >
      <div
        className={`alert ${
          storageUpdated === 0 || cartIsOpen ? "hidden" : ""
        }`}
      >
        {storageUpdated}
      </div>

      {props.children}
    </div>
  )
}

export default CartHeader

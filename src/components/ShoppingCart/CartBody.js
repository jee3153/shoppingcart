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
  const [open, setOpen] = useState(false)

  const openCart = (e) => {
    e.stopPropagation()
    openACart(true)
  }

  const cartOpen = {
    height: "60vh",
    transition: "all 0.2s linear",
  }
  const cartClosed = {
    height: "5vh",
    transition: "all 0.2s linear",
  }

  return (
    // height:60vh, overflow:auto
    <div
      onClick={openCart}
      className="shopping-cart"
      style={cartIsOpen ? cartOpen : cartClosed}
    >
      <div className={`alert z-30 ${storageUpdated === 0 ? "hidden" : ""}`}>
        {storageUpdated}
      </div>

      {props.children}
    </div>
  )
}

export default CartHeader

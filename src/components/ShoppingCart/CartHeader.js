import React, { useState } from "react"

import {
  faShoppingBasket,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Payment from "./Payment"

const CartHeader = (props) => {
  const [open, setOpen] = useState(false)

  const openCart = (e) => {
    setOpen(true)
  }
  const closeCart = (e) => {
    e.stopPropagation()
    setOpen(false)
  }

  return (
    <div
      onClick={openCart}
      className="shopping-cart flex flex-col items-center fixed bottom-0 w-full bg-gray-900 rounded-t-xl py-4 text-gray-600"
    >
      <button
        onClick={closeCart}
        className={`${
          !open ? "hidden" : ""
        } absolute right-0 top-0 text-xl mt-4 mr-4`}
      >
        <FontAwesomeIcon icon={faTimesCircle} />
      </button>

      <div className="flex flex-col items-center mb-3">
        <div className="line bg-gray-600"></div>
        <div className="pt-1">
          <span className="mr-3 mb-1">
            <FontAwesomeIcon icon={faShoppingBasket} />
          </span>
          <span className="font-bold">Shopping Cart</span>
        </div>
      </div>
      {props.children}
      <Payment open={open} />
    </div>
  )
}

export default CartHeader

import React from "react"
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const CartHeader = () => {
  return (
    <div className="flex flex-col items-center mb-3 fixed w-full pt-4 z-20 h-16 bg-gray-200 rounded-t-xl border-t border-third">
      <div className="line bg-gray-600"></div>
      <div className="pt-1">
        <span className="mr-3 mb-1">
          <FontAwesomeIcon icon={faShoppingBasket} />
        </span>
        <span className="font-medium">Shopping Cart</span>
      </div>
    </div>
  )
}

export default CartHeader

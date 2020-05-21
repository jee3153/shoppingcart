import React, { useContext } from "react"
import Context from "../contextAPI/Context"
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSwipeable, Swipeable } from "react-swipeable"

const CartHeader = () => {
  const { dispatch } = useContext(Context)

  const openACart = (cart) => dispatch({ type: "toggle-cart", payload: cart })

  const handlers = useSwipeable({
    onSwipedUp: () => openACart(true),
    onSwipedDown: () => openACart(false),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })

  return (
    <div {...handlers} className="shopping-cart__header">
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

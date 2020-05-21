import React, { useState, useContext, useEffect } from "react"
import Context from "../contextAPI/Context"

import { faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import CartBody from "./CartBody"
import CartHeader from "./CartHeader"
import Payment from "./Payment"

const CartNav = () => {
  const { state, dispatch } = useContext(Context)
  const { storageUpdated, quantityUpdated, cartIsOpen } = state

  const updateStorage = (item) =>
    dispatch({ type: "update-storage", payload: item })
  const quantityChanged = (qt) => dispatch({ type: "add-up", payload: qt })

  const [cart, setCart] = useState([])
  const [quantity, updateQuantity] = useState(quantityChanged)

  const sortOrderInCart = (arr) => {
    arr.sort((a, b) => a.abv - b.abv)
    arr.sort((a, b) => {
      if (a.abv === b.abv) {
        return a.name > b.name ? 1 : -1
      }
      return 0
    })
  }

  useEffect(() => {
    const storageScan = (e) => {
      let items = []
      if (localStorage.length !== 0) {
        for (var i = 0; i < localStorage.length; i++) {
          items.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
        }
      }

      sortOrderInCart(items)
      return items
    }

    setCart(storageScan())
    console.log("storage updated")
  }, [storageUpdated, quantityUpdated])

  const deleteItem = (e) => {
    e.stopPropagation()
    const id = e.currentTarget.parentElement.id
    let items = [...cart]
    let remains = items.filter((item) => item.id !== id)
    sortOrderInCart(remains)
    localStorage.removeItem(`item${id}`)
    setCart(remains)
    updateStorage(storageUpdated - 1)
  }

  const quantityController = (e, operator) => {
    e.stopPropagation()
    const id = e.currentTarget.parentElement.parentElement.id
    let item = JSON.parse(localStorage.getItem(`item${id}`))
    if (operator === -1 && item.quantity === 1) {
      return
    }
    item.quantity = item.quantity + operator
    const itemSerialized = JSON.stringify(item)
    localStorage.setItem(`item${id}`, itemSerialized)
    updateQuantity(!quantity)
    quantityChanged(quantity)
  }

  const addQuantity = (e) => {
    quantityController(e, +1)
  }
  const subtractQuantity = (e) => {
    quantityController(e, -1)
  }

  const cartItems = cart.map((item) => {
    return (
      <div
        id={item.id}
        key={item.id}
        className={`${
          cartIsOpen ? "" : "hidden"
        } cart-item grid w-full my-6 px-3 text-gray-600 text-sm`}
      >
        <div className="flex flex-col items-center">
          <img
            src={item.img}
            className="h-24 py-1 px-3 bg-white rounded-md"
            alt="item"
          />
          <div className="cart-item__price-tag">
            <span className="font-medium">£</span>
            <span>{item.abv.toFixed(2)}</span>
          </div>
        </div>

        <div className="text-center">
          <p className="font-medium mb-1 p-1">
            {item.name.length <= 20
              ? item.name
              : `${item.name.slice(0, 20)}...`}
          </p>
          <div className="text-xs">
            <p>{item.tagline}</p>
            <p>
              <span className="font-medium">{item.abv} </span>
              <span className="font-light">abv</span>
            </p>
          </div>
        </div>

        <div className="flex justify-around items-center w-full">
          <button
            className="counter-btn text-center border border-third rounded-l-lg text-third"
            onClick={subtractQuantity}
          >
            -
          </button>
          <div>{item.quantity < 10 ? `0${item.quantity}` : item.quantity}</div>
          <button
            className="counter-btn bg-third rounded-r-lg text-gray-200"
            onClick={addQuantity}
          >
            +
          </button>
        </div>

        <button onClick={deleteItem}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    )
  })

  if (!cart.length) {
    return (
      <div>
        <CartBody>
          <CartHeader />
          <Payment />
        </CartBody>
      </div>
    )
  } else {
    return (
      <CartBody>
        <CartHeader />
        <div className="w-full mt-12">
          <div className="mt-12">{cartItems}</div>
          <Payment />
        </div>
      </CartBody>
    )
  }
}

export default CartNav

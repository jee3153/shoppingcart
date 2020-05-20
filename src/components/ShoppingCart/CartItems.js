import React, { useState, useContext, useEffect } from "react"
import Context from "../contextAPI/Context"

import { faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import CartHeader from "./CartHeader"

const CartNav = () => {
  const { state, dispatch } = useContext(Context)
  const { storageUpdated, quantityUpdated } = state

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
        className="cart-item grid w-full my-6 px-8"
      >
        <div className="text-center relative">
          <img
            src={item.img}
            className="h-24 py-1 px-3 bg-white rounded-md"
            alt="item"
          />
          <div className="cart-item__price-tag absolute font-medium bg-yellow-500 rounded-lg text-gray-900 px-1">
            £{item.abv}
          </div>
        </div>

        <div className="text-center">
          <div className="text-lg font-bold text-gray-300 mb-2">
            {item.name.length <= 20
              ? item.name
              : `${item.name.slice(0, 20)}...`}
          </div>
          <div>
            <div>{item.tagline}</div>
            <div>
              {item.abv} <span>abv</span>
            </div>
          </div>
        </div>

        <div className="flex justify-around items-center w-full">
          <button
            className="counter-btn text-center border border-secondary rounded-l-lg"
            onClick={subtractQuantity}
          >
            -
          </button>
          <div>{item.quantity < 10 ? `0${item.quantity}` : item.quantity}</div>
          <button
            className="counter-btn bg-yellow-500 rounded-r-lg text-gray-900"
            onClick={addQuantity}
          >
            +
          </button>
        </div>

        <button onClick={deleteItem}>
          <FontAwesomeIcon icon={faTrashAlt} className="text-xl text-red-300" />
        </button>
      </div>
    )
  })

  if (!cart.length) {
    return (
      <>
        <CartHeader />
      </>
    )
  } else {
    return (
      <>
        <CartHeader>{cartItems}</CartHeader>
      </>
    )
  }
}

export default CartNav

import React, { useContext, useEffect, useState } from "react"
import Context from "../contextAPI/Context"

const Payment = ({ open }) => {
  const [price, setPrice] = useState(0)
  const [tip, setTip] = useState(0)
  const [inputIsOpen, setInputIsOpen] = useState(false)
  const { state } = useContext(Context)
  const { cartIsOpen, storageUpdated, quantityUpdated } = state

  useEffect(() => {
    // get quantity and prices from storage
    const getPriceQt = () => {
      const priceInfos = []
      for (let i = 0; i < localStorage.length; i++) {
        const deserialised = JSON.parse(
          localStorage.getItem(localStorage.key(i))
        )
        const priceInfo = deserialised.abv * deserialised.quantity

        priceInfos.push(priceInfo)
      }

      return priceInfos
    }
    const priceArr = getPriceQt()
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    const subtotal = priceArr.reduce(reducer)
    setTip(isNaN(tip) ? 0 : tip)
    setPrice(subtotal)
  }, [cartIsOpen, quantityUpdated, storageUpdated, tip])

  const openStyle = {
    transform: "translateY(0)",
    visibility: "visible",
    opacity: "1",
    transition: "all 0.2s linear",

    marginTop: "16rem",
  }
  const closeStyle = {
    transform: "translateY(110%)",
    visibility: "hidden",
    opacity: "0",
    transition: "all 0.2s linear",
    height: "0",
    marginTop: "0",
  }

  const collapsed = {
    visibility: "visible",
    opacity: "1",
    transition: "all 0.2s linear",
  }
  const holdup = {
    visibility: "hidden",
    height: "0",
    opacity: "0",
    transition: "all 0.2s linear",
  }

  const customTip = (e) => {
    setTip(parseInt(e.target.value))
  }
  const customTipHandler = (e) => {
    setInputIsOpen(true)
  }

  const noTip = (e) => {
    setTip(0)
  }
  const roundupTip = (e) => {
    const roundedPrice = Math.ceil(price)
    const roundedTip = roundedPrice - price
    setTip(roundedTip)
  }
  const tenPercentTip = (e) => {
    setTip(price * 0.1)
  }
  const completeTip = (e) => {
    e.preventDefault()
    setInputIsOpen(false)
  }
  const total = tip + price

  return (
    <div className={` px-12`} style={!open ? closeStyle : openStyle}>
      <div className="shopping-cart__tip text-gray-500">
        <div className="pb-4 font-medium">Tips for waiters</div>
        <div className="font-semibold w-full">
          <button
            className="shopping-cart__tip-method rounded-l-lg btn"
            onClick={noTip}
          >
            ZERO
          </button>
          <button
            className="shopping-cart__tip-method btn"
            onClick={roundupTip}
          >
            ROUND UP
          </button>
          <button
            className="shopping-cart__tip-method btn"
            onClick={tenPercentTip}
          >
            10%
          </button>
          <button
            className="shopping-cart__tip-method btn rounded-r-lg"
            onClick={customTipHandler}
          >
            CUSTOM
          </button>

          <form className="mt-8">
            <input
              className="rounded-lg mr-2 text-center focus:outline-none"
              type="text"
              value={isNaN(tip) ? "" : tip}
              onChange={customTip}
              style={inputIsOpen ? collapsed : holdup}
            />
            <button
              className="btn shopping-cart__tip-method rounded-lg"
              style={inputIsOpen ? collapsed : holdup}
              onClick={completeTip}
            >
              Done
            </button>
          </form>
        </div>
      </div>
      <div className="shopping-cart__subtotal my-6 flex flex-col text-sm">
        <div className="shopping-cart__payment">
          <span>Subtotal</span>
          <span>£{price.toFixed(2)}</span>
        </div>
        <div className="shopping-cart__payment">
          <span>Tips</span>
          <span>£{isNaN(tip) ? "0.00" : tip.toFixed(2)}</span>
        </div>
      </div>

      <div className="shopping-cart__payment my-10 text-lg">
        <span className="">Total</span>
        <span className="font-medium text-gray-300">
          £{isNaN(tip) ? "0.00" : total.toFixed(2)}
        </span>
      </div>
      <div className="flex justify-center my-6">
        <button className="btn text-xl font-bold px-10 py-2 rounded-lg w-4/5">
          Confirm Payment
        </button>
      </div>
    </div>
  )
}

export default Payment
// ${!open ? "hidden" : ""}

import React, { useContext, useState } from "react"
import Context from "../contextAPI/Context"
import { faCaretSquareDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Modal = () => {
  const { state, dispatch } = useContext(Context)
  const setDetail = (item) => dispatch({ type: "show-detail", payload: item })
  const updateStorage = (item) =>
    dispatch({ type: "update-storage", payload: item })

  const [showDescription, setShowDescription] = useState(false)
  const [showFood, setShowFood] = useState(false)

  const { itemDetail, storageUpdated } = state

  const closeHandler = (e) => {
    setDetail({
      id: "",
      name: "",
      tagline: "",
      abv: "",
      description: "",
      food_pairing: "",
      img: "",
      open: false,
    })
  }

  const descriptionHandler = () => {
    setShowDescription(!showDescription)
  }
  const foodPairingHandler = () => {
    setShowFood(!showFood)
  }

  const addItem = () => {
    const item = {
      id: itemDetail.id,
      name: itemDetail.name,
      tagline: itemDetail.tagline,
      abv: Number(itemDetail.abv),
      description: itemDetail.description,
      food_pairing: itemDetail.food_pairing,
      img: itemDetail.img,
      quantity: 1,
    }

    const serializedItem = JSON.stringify(item)
    if (item.length !== 0) {
      localStorage.setItem(`item${itemDetail.id}`, serializedItem)
    }

    setDetail({
      id: itemDetail.id,
      name: itemDetail.name,
      tagline: itemDetail.tagline,
      abv: itemDetail.abv,
      description: itemDetail.description,
      food_pairing: itemDetail.food_pairing,
      img: itemDetail.img,
      open: false,
    })
    updateStorage(storageUpdated + 1)
  }

  const foodArr = itemDetail.food_pairing.split(",")
  const foodArrShort = foodArr.slice(0, 2)
  const foodShortList = foodArrShort.map((food, index) => (
    <li key={index}>{food}</li>
  ))
  const foodList = foodArr.map((food, index) => <li key={index}>{food}</li>)

  const openStyle = {
    opacity: 1,
    visibility: "visible",
    transition: "all 0.2s linear",
  }

  const closeStyle = {
    opacity: 0,
    visibility: "hidden",
    transition: "all 0.2s linear",
    height: 0,
  }

  const arrowup = {
    transform: "rotate(180deg)",
    transition: "all 0.5s ease-in-out",
  }
  const arrowdown = {
    transform: "rotate(360deg)",
    transition: "all 0.5s ease-in-out",
  }

  return (
    <>
      <div className={`modal ${itemDetail.open ? "open" : ""}`}>
        <button
          className="btn btn--close bg-primary text-white absolute"
          onClick={closeHandler}
        >
          CLOSE
        </button>

        <div className="flex justify-around items-center">
          <section className="flex flex-col items-center px-5 text-center">
            <div className="modal__title">{itemDetail.name}</div>
            <div className="modal__info">{itemDetail.tagline}</div>
            <div className="modal__info">
              <span className="font-medium">{itemDetail.abv}</span>{" "}
              <span className="font-light text-sm">abv</span>
            </div>

            <div className="modal__info">
              <button
                className="focus:outline-none"
                onClick={descriptionHandler}
              >
                <span className="font-medium mr-2">Description</span>
                <FontAwesomeIcon
                  icon={faCaretSquareDown}
                  style={showDescription ? arrowup : arrowdown}
                />
              </button>
              <ul>
                <li style={!showDescription ? openStyle : closeStyle}>
                  {`${itemDetail.description.slice(0, 80)}...`}
                </li>
                <li style={showDescription ? openStyle : closeStyle}>
                  {itemDetail.description}
                </li>
              </ul>
            </div>

            <div className="modal__info">
              <button
                className="focus:outline-none"
                onClick={foodPairingHandler}
              >
                <span className="font-medium mr-2">Food Pairing</span>
                <FontAwesomeIcon
                  icon={faCaretSquareDown}
                  style={showFood ? arrowup : arrowdown}
                />
              </button>

              <ul style={!showFood ? openStyle : closeStyle}>
                {foodShortList}
              </ul>
              <ul style={showFood ? openStyle : closeStyle}>{foodList}</ul>
            </div>
          </section>

          <section className="modal-col-2 flex flex-col justify-around items-center px-5">
            <img className="modal__img" src={itemDetail.img} alt="itemImage" />

            <button
              className="btn bg-white text-secondary font-medium"
              onClick={addItem}
            >
              ADD TO CART
            </button>
          </section>
        </div>
      </div>
    </>
  )
}

export default Modal

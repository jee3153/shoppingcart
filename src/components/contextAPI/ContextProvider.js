import React, { useReducer } from "react"
import Context from "./Context"

const ContextProvider = (props) => {
  let initialState = {
    tabIndex: 0,
    cartIsOpen: false,
    storageUpdated: 0,
    quantityUpdated: false,
    itemDetail: {
      id: "",
      name: "",
      tagline: "",
      abv: "",
      description: "",
      food_pairing: "",
      img: "",
      open: false,
    },
  }

  let reducer = (state, action) => {
    switch (action.type) {
      case "change-tab":
        return { ...state, tabIndex: action.payload }
      case "add-up":
        return {
          ...state,
          quantityUpdated: action.payload,
        }
      case "update-storage":
        return {
          ...state,
          storageUpdated: action.payload,
        }
      case "toggle-cart":
        return { ...state, cartIsOpen: action.payload }
      case "show-detail":
        return { ...state, itemDetail: action.payload }
      default:
        return { ...state }
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  const value = {
    state,
    dispatch,
  }

  return <Context.Provider value={value}>{props.children}</Context.Provider>
}

export default ContextProvider

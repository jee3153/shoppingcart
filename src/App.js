import React, { useContext } from "react"

import Context from "./components/contextAPI/Context"
import {
  Route,
  Redirect,
  NavLink,
  BrowserRouter as Router,
} from "react-router-dom"

import SwipeableRoutes from "react-swipeable-routes"

import Header from "./components/header/Header"
import All from "./components/Beers/All"
import Pizza from "./components/Beers/Pizza"
import Steak from "./components/Beers/Steak"
import Food from "./components/Food/Food"
import Discount from "./components/Discount/Discount"
import Search from "./components/Search/Search"
import CartItems from "./components/ShoppingCart/CartItems"
import Modal from "./components/partials/Modal"

const App = () => {
  const { dispatch, state } = useContext(Context)
  const { cartIsOpen, itemDetail } = state
  const openCart = (open) => dispatch({ type: "toggle-cart", payload: open })

  const link = (path, name) => {
    return <NavLink to={path}>{name}</NavLink>
  }

  const nav = () => {
    if (state.tabIndex === 0) {
      return (
        <>
          {link("/beers/all", "All")}
          {link("/beers/pizza", "Pizza")}
          {link("/beers/steak", "Steak")}
        </>
      )
    } else if (state.tabIndex === 1) {
      return <>{link("/food", "All Food")}</>
    } else if (state.tabIndex === 2) {
      return <>{link("/discount", "What is on discount")}</>
    } else {
      return <>{link("/search", "Search your beer")}</>
    }
  }
  const closeCart = (e) => {
    openCart(false)
  }

  return (
    <Router>
      <>
        <div
          className={`App font-sans relative ${
            itemDetail.open && "background"
          }`}
          onClick={closeCart}
        >
          <Header>
            <nav className="flex justify-around bg-gray-200 text-gray-400 py-2 font-bold text-base border-b border-third">
              {nav()}
            </nav>
          </Header>

          <main>
            <Route exact path="/" render={() => <Redirect to="/beers/all" />} />

            <SwipeableRoutes enableMouseEvents>
              <Route path={"/beers/all"}>
                <All />
              </Route>
              <Route path="/beers/pizza">
                <Pizza />
              </Route>
              <Route path="/beers/steak">
                <Steak />
              </Route>
              <Route path="/food">
                <Food />
              </Route>
              <Route path="/discount">
                <Discount />
              </Route>
              <Route path="/search">
                <Search />
              </Route>
            </SwipeableRoutes>
            <Route path="*" render={() => <Redirect to="/beers/all" />} />
          </main>

          <CartItems />
        </div>
        <Modal />
      </>
    </Router>
  )
}

export default App

import React, { useContext } from "react"
import useFetch from "../../hooks/useFetch"
import Context from "../contextAPI/Context"
import SortingBtn from "../partials/SortingBtn"

const Steak = ({ match }) => {
  const { data } = useFetch("https://api.punkapi.com/v2/beers?food=steak")
  const { dispatch } = useContext(Context)
  const setDetail = (item) => dispatch({ type: "show-detail", payload: item })

  const onClick = (e) => {
    const name = e.currentTarget.parentElement.children[1]
    const abv = e.currentTarget.parentElement.children[2]

    setDetail({
      id: e.currentTarget.parentElement.id,
      name: name.textContent,
      tagline: e.currentTarget.parentElement.getAttribute("data-tagline"),
      abv: abv.textContent.split(" ")[0],
      description: e.currentTarget.parentElement.getAttribute(
        "data-description"
      ),
      food_pairing: e.currentTarget.parentElement.getAttribute("data-food"),
      img: e.currentTarget.src,
      open: true,
    })
  }

  return (
    <>
      <SortingBtn data={data} />
      <div className="grid grid-cols-3 w-screen h-screen">
        {data &&
          data.map((beer) => (
            <div
              className="card"
              key={beer.id}
              id={beer.id}
              data-tagline={beer.tagline}
              data-description={beer.description}
              data-food={beer.food_pairing}
            >
              <img
                src={beer.image_url}
                className="card__img hover:bg-gray-200"
                alt="beer"
                onClick={onClick}
              />
              <div className="card__name">{beer.name}</div>
              <div className="card__abv">
                {beer.abv} <span className="card__abv-unit">abv</span>
              </div>
            </div>
          ))}
      </div>
    </>
  )
}

export default Steak

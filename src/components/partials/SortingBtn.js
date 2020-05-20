import React from "react"

const SortingBtn = ({ data }) => {
  const ascAbv = (e) => {
    data.sort((a, b) => a.abv - b.abv)
  }
  const dscAbv = (e) => {
    data.sort((a, b) => b.abv - a.abv)
  }
  const ascName = (e) => {
    data.sort((a, b) => (a.name > b.name ? 1 : -1))
  }
  const dscName = (e) => {
    data.sort((a, b) => (a.name < b.name ? 1 : -1))
  }
  return (
    <div className="sorting w-screen h-10 p-3">
      <button className="sorting-btn" onClick={ascAbv}>
        Asc abv
      </button>
      <button className="sorting-btn" onClick={dscAbv}>
        Dsc abv
      </button>
      <button className="sorting-btn" onClick={ascName}>
        Asc name
      </button>
      <button className="sorting-btn" onClick={dscName}>
        Dsc name
      </button>
    </div>
  )
}

export default SortingBtn

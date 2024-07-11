import { useState } from "react";
import "./filter.scss";
import { useSearchParams } from "react-router-dom";

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    property: searchParams.get("property") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    bedroom: searchParams.get("bedroom") || "",
  });

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = () => {
    setSearchParams(query);
  };

  return (
    <div className="filter">
      <h1>
        Search results for <b>{searchParams.get("city")}</b>
      </h1>

      <div className="bottom">
        <div className="sel">
          <div className="item">
            <label htmlFor="type">Type</label>
            <select
              className="sel"
              name="type"
              id="type"
              onChange={handleChange}
              defaultValue={query.type}
            >
              <option value="">any</option>
              <option value="buy">Buy</option>
              <option value="rent">Rent</option>
            </select>
          </div>
          <div className="item">
            <label htmlFor="property">Property</label>
            <select
              className="sel"
              name="property"
              id="property"
              onChange={handleChange}
              defaultValue={query.property}
            >
              <option value="">any</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
              <option value="land">Land</option>
            </select>
          </div>
        </div>
        <div className="inp">
          <div className="item">
            <label htmlFor="minPrice">Min Price</label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              placeholder="any"
              onChange={handleChange}
              defaultValue={query.minPrice}
            />
          </div>
          <div className="item">
            <label htmlFor="maxPrice">Max Price</label>
            <input
              type="text"
              id="maxPrice"
              name="maxPrice"
              placeholder="any"
              onChange={handleChange}
              defaultValue={query.maxPrice}
            />
          </div>
          <div className="item">
            <label htmlFor="bedroom">Bedroom</label>
            <input
              type="text"
              id="bedroom"
              name="bedroom"
              placeholder="any"
              onChange={handleChange}
              defaultValue={query.bedroom}
            />
          </div>
        </div>
      </div>
      <div className="top">
        <input
          type="text"
          id="city"
          name="city"
          placeholder="City Location"
          onChange={handleChange}
          defaultValue={query.city}
        />
        <button onClick={handleFilter}>
          <img src="/search.png" alt="" />
        </button>
      </div>
    </div>
  );
}

export default Filter;
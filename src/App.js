import React, { useEffect, useState } from "react";

function App() {
  const [endPoint, setEndPoint] = useState("");
  const [content, setContent] = useState([]);

  useEffect(() => {
    fetchMe();
  }, [endPoint]);

  const fetchMe = () => {
    fetch("https://moviesdatabase.p.rapidapi.com/titles/x/upcoming", {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "c0bbf10e46msh199e55dfc7b811fp101109jsn7be17195c12e",
        "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setContent(data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onChangeHandler = (e) => {
    setEndPoint(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="container pt-5">
      <form className="d-flex" role="search" onSubmit={onSubmitHandler}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={endPoint}
          onChange={onChangeHandler}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
      <div className="row m-auto">
        {content &&
          content.map((item) => {
            return (
              <div className="col-md-3 my-3 mx-3" key={item.id}>
                <div className="card" style={{ width: "18rem" }}>
                  <img
                    src={
                      item.primaryImage === null
                        ? "https://m.media-amazon.com/images/M/MV5BMWY3YWY1OTktNjc3Ni00NThiLWI0ODYtOTNjM2E4YjQ2MmJkXkEyXkFqcGdeQXVyMjcyMzI2OTQ@._V1_.jpg"
                        : item.primaryImage.url
                    }
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.titleText.text}</h5>
                    <span className="badge bg-secondary">
                      {item.titleType.text}
                    </span>
                    <p className="card-text">
                      {item.primaryImage === null ? (
                        <p>Coming Soon...</p>
                      ) : (
                        item.primaryImage.caption.plainText
                      )}
                    </p>
                  </div>
                </div>

                {/* <img src={item.primaryImage} alt="..." />
                  <p>{item.titleText.text}</p>
                  <p>{item.titleType.text}</p> */}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;

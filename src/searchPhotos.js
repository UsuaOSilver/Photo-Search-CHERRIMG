import React, { useState, useEffect } from "react";
import axios from 'axios';
import InfiniteScroll from "react-infinite-scroll-component";

const client_id = "uSGMoaRqyVQFEoF_Ld9u4ZEpghrowLD6NQTZKuEMg_A";

export default function SearchPhotos() {
    const [query, setQuery] = useState("matcha");
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
      
    const fetchRequest = () => {
      axios.get(`https://api.unsplash.com/search/photos?query=${query}&client_id=${client_id}&page=${page}`)
       .then(response => {
          setPhotos([...photos, ...response.data.results]);
        })
        .catch(error => {
          console.log(error);
        });
        setPage(page + 1);
    };

    
    const searchPhotos = (event) => {
      if (event.keyCode === 13) {
        setQuery(event.target.value);
        fetchRequest();
        //setPhotos([]);
      }
    };
    
    useEffect(() => {
      fetchRequest();
    }, [query]);

    
    const photoElement = photos.map((pic, key) => {
        return (
            <div className="card" key={key}>
                <img
                    className="card--image"
                    alt="pic.alt_description"
                    src={pic.urls.small}
                    width="66%"
                    height="50%"
                ></img>
            </div>
        );
    })
    
  return (
    <>
      <form className="form" > 
        <label className="label" htmlFor="query"> 
          🍒
        </label>
        <input
          type="text"
          name="query"
          className="input"
          onKeyDown={(event) => searchPhotos(event)}
          placeholder={`Search for anything: e.g "matcha" =====> Enter`}
        />
        <label className="label" htmlFor="query"> 
          🍒
        </label>        
        <InfiniteScroll
          dataLength={photos.length}
          next={fetchRequest}
          hasMore={hasMore}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
        }
      ></InfiniteScroll>
        {/*<button type="submit" className="button" onClick={searchPhotos}>
          Search
      </button>*/}
      </form>
      <div className="card-list" >
        {photoElement}
      </div>
    </>
  );
}
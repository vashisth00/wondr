import React from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import './App.css';
import logo from './0.png'

import ReactDOM from 'react-dom';
import './app.scss'

var CHF ="https://picsum.photos/id/870/200/300?grayscale&blur=2"

const BASE_URL = "https://picsum.photos/v2/list?page=2&limit=100";

const UnsplashImage = ({ url }) => (
  <div className="image-item">
    <img src={url} />
  </div>
);

let Collage = () => {
  const [images, setImages] = React.useState([]);
  const [loaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    fetchImages();
  }, []);



  const fetchImages = (count = 100000) => {
    const apiRoot = "https://picsum.photos/v2/";
    const accessKey =
      "a22f61e98da4efa25d8860e77a91a596867dd335ecdf7feb12e086943db9565a";

    axios
      .get(`${apiRoot}list?page=2&limit=${count}`)
      .then(res => {
        setImages([...images, ...res.data]);
        setIsLoaded(true);

        console.log(images);
      });
  };

  return (
    <div className="hero is-fullheight is-bold is-info">
      <div className="hero-body">
        <div className="container">
          <div className="header content">
            <h2 className="subtitle is-6">Code Challenge #16</h2>
            <h1 className="title is-1">
              Infinite Scroll Unsplash Code Challenge
            </h1>
            <img src={logo}/>
          </div>

          <InfiniteScroll
            dataLength={images}
            next={() => fetchImages(5)}
            hasMore={true}
            loader={
              <img
                src="https://res.cloudinary.com/chuloo/image/upload/v1550093026/scotch-logo-gif_jq4tgr.gif"
                alt="loading"
              />
            }
          >
            <div className="image-grid" style={{ marginTop: "30px" }}>
              {loaded
                ? images.map((image) => (
                    <UnsplashImage
                      url={image.download_url}
                    />
                  ))
                : ""}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<Collage />, document.getElementById("root"));


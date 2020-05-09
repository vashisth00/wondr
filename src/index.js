import React from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import './App.css';
import logo from './0.png'
import ReactDOM from 'react-dom';
import './app.scss'

const UnsplashImage = ({ url,newp }) => (
  <div className="image-item">
    <img onClick={e => {this.showModal();}} src={url} />
    <div>Author: {newp}</div>
  </div>
);

const Author = ({ newp }) => (
<div>{newp}</div>
);

let Collage = () => {
  const [images, setImages] = React.useState([]);
  const [post] = React.useState([]);
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
          <img src={logo}/>
          <div className="hello">
            <h2 className="wondr">Wondr Images</h2>
            </div>
            <h3 className="title is-1">
              Picsum Photo fetch | Image Grid 
            </h3>
            <h4>
              InfiniteScroll + Grayscale Button + Details on Photo Click
            </h4>
            <h5>
              5 Photos in a row in Desktop and 2 in Mobile
            </h5>
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
                      newp={image.author}
                    />
                  ))
                
                : ""}
                  {loaded
                ? post.map((post) => (
                    <Author
                      newp={post.author}
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


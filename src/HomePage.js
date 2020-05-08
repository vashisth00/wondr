import React from "react";
import { getImages } from "./request";
import InfiniteScroll from "react-infinite-scroller";
import Masonry from "react-masonry-component";
import "./HomePage.css";
import { masonryOptions } from "./exports";
function HomePage() {
  const [images, setImages] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const [initialized, setInitialized] = React.useState(false);
  const getAllImages = async (pg = 1) => {
    const response = await getImages(page);
    let imgs = images.concat(response.data.hits);
    setImages(imgs);
    setTotal(response.data.total);
    pg++;
    setPage(pg);
  };
  React.useEffect(() => {
    if (!initialized) {
      getAllImages();
      setInitialized(true);
    }
  });
  return (
    <div className="page">
      <h1 className="text-center">Home</h1>
      <InfiniteScroll
        pageStart={1}
        loadMore={getAllImages}
        hasMore={total > images.length}
      >
        <Masonry
          className={"grid"}
          elementType={"div"}
          options={masonryOptions}
          disableImagesLoaded={false}
          updateOnEachImageLoad={false}
        >
          {images.map((img, i) => {
            return (
              <div key={i}>
                <img src={img.previewURL} style={{ width: 300 }} />
              </div>
            );
          })}
        </Masonry>
      </InfiniteScroll>
    </div>
  );
}
export default HomePage;
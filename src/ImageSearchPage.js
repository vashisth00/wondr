import React from "react";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import InfiniteScroll from "react-infinite-scroller";
import Masonry from "react-masonry-component";
import { masonryOptions } from "./exports";
import { searchImages } from "./request";
const schema = yup.object({
  keyword: yup.string().required("Keyword is required")
});
function ImageSearchPage() {
  const [images, setImages] = React.useState([]);
  const [keyword, setKeyword] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const [searching, setSearching] = React.useState(false);
  const handleSubmit = async evt => {
    const isValid = await schema.validate(evt);
    if (!isValid) {
      return;
    }
    setKeyword(evt.keyword);
    searchAllImages(evt.keyword, 1);
  };
  const searchAllImages = async (keyword, pg = 1) => {
    setSearching(true);
  const response = await searchImages(keyword, page);
    let imgs = response.data.hits;
    setImages(imgs);
    setTotal(response.data.total);
    setPage(pg);
  };
  const getMoreImages = async () => {
    let pg = page;
    pg++;
    const response = await searchImages(keyword, pg);
    const imgs = images.concat(response.data.hits);
    setImages(imgs);
    setTotal(response.data.total);
    setPage(pg);
  };
  React.useEffect(() => {});
  return (
    <div className="page">
      <h1 className="text-center">Search</h1>
      <Formik validationSchema={schema} onSubmit={handleSubmit}>
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isInvalid,
          errors
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} md="12" controlId="keyword">
                <Form.Label>Keyword</Form.Label>
                <Form.Control
                  type="text"
                  name="keyword"
                  placeholder="Keyword"
                  value={values.keyword || ""}
                  onChange={handleChange}
                  isInvalid={touched.keyword && errors.keyword}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.keyword}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Button type="submit" style={{ marginRight: "10px" }}>
              Search
            </Button>
          </Form>
        )}
      </Formik>
      <br />
      <InfiniteScroll
        pageStart={1}
        loadMore={getMoreImages}
        hasMore={searching && total > images.length}
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
export default ImageSearchPage;
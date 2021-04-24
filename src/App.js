import React, { useState, useEffect, useRef } from "react";
import { Heading } from "./components/Heading";
import { UnsplashImage } from "./components/UnsplashImage";
import { Loader } from "./components/Loader";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry from "react-masonry-css";
import "./Mas.css";

import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import Modal from "./Modal";

// Style
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: sans-serif;
  }
`;

function App() {
  const [images, setImage] = useState([]);
  const [modal, setModal] = useState(false);
  const prev = useRef();
  const next = useRef();
  useEffect(() => {
    fetchImages();
  }, []);
  const closeModal = () => {
    setModal(false);
  };
  const nextImage = () => {
    let temp;
    if (modal) {
      [prev.current, temp, next.current] = [
        images[modal[1]],
        images[modal[1] + 1],
        images[modal[1] + 2]
      ];
      setModal((prevModal) => [temp, prevModal[1] + 1]);
    }
  };
  const prevImage = () => {
    let temp;
    if (modal) {
      [prev.current, temp, next.current] = [
        images[modal[1] - 2],
        images[modal[1] - 1],
        images[modal[1]]
      ];
      setModal((prevModal) => [temp, prevModal[1] - 1]);
    }
  };
  const breakpointColumnsObj = {
    default: 5,
    1200: 3,
    992: 3,
    768: 2,
    576: 2
  };

  const fetchImages = (count = 10) => {
    const apiRoot = "https://api.unsplash.com";
    const accessKey = "9eGQO6OglHmXFmEJXBkVj31Bm-1z4leYs15PTZJsOAY";

    axios
      .get(`${apiRoot}/photos/random?client_id=${accessKey}&count=${count}`)
      .then((res) => {
        setImage([...images, ...res.data]);
      });
  };

  return (
    <div>
      {modal && (
        <Modal
          image={modal[0]}
          prevImage={prev.current}
          nextImage={next.current}
          closeModal={closeModal}
          images={images}
        />
      )}
      <Heading />
      <GlobalStyle />
      <InfiniteScroll
        dataLength={images.length}
        next={fetchImages}
        hasMore={true}
        loader={<Loader />}
      >
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          {images.map((image, index) => (
            <UnsplashImage
              url={image.urls.thumb}
              key={image.id}
              onClick={() => setModal([image, index])}
            />
          ))}
        </Masonry>
      </InfiniteScroll>
    </div>
  );
}

export default App;

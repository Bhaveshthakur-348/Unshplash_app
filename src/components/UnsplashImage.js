import React from "react";
import styled from "styled-components";
import "./UnsplashImage.css";

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin-right: 10px;
`;

export const UnsplashImage = ({ url, key, onClick }) => {
  return (
    <div className="row" onClick={onClick}>
      <div className="col-md-12 px-0">
        <div className="rounded-lg overflow-hidden">
          <Img key={key} src={url} alt="" />
        </div>
      </div>
    </div>
  );
};

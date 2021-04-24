import React, { useState } from "react";
import "./Modal.css";
const styles = {
  root: {
    position: "fixed",
    zIndex: 101,
    top: "50%",
    left: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // width: "300px",
    // height: "400px",
    margin: "-200px 0 0 -150px",
    // background: "#fff",
    borderRadius: "4px"
    // padding: "20px",
    // border: "1px solid #E8E8E8"
  },
  blur: {
    height: "100%",
    width: "100%",
    background: "rgba(86, 86, 86, 0.4)",
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: "99"
  },
  closeButton: {
    float: "absolute",
    borderRadius: "50%",
    right: "0",
    top: "0",
    border: "1px solid #8c8c8c",
    padding: "0 4px",
    marginBottom: "2px",
    cursor: "pointer"
  }
};
function Modal({ image, prevImage, nextImage, closeModal, index }) {
  const [currImage, setCurrImage] = useState(image);

  return (
    <div style={styles.blur}>
      <div
        style={styles.closeButton}
        onClick={() => {
          closeModal();
        }}
      >
        X
      </div>
      <div style={styles.root}>
        {prevImage && (
          <div
            style={{
              marginRight: "20px",
              borderRadius: "50%",
              hieght: "30px",
              width: "30px",
              background: "#8c8c8c"
            }}
            onClick={() => setCurrImage(prevImage)}
          >
            {"<"}
          </div>
        )}

        <img className="Img" style={{}} src={currImage.urls.thumb} />

        <div
          style={{
            marginLeft: "20px",
            borderRadius: "50%",
            hieght: "30px",
            width: "30px",
            background: "#8c8c8c"
          }}
          onClick={() => setCurrImage(nextImage)}
        >
          {">"}
        </div>
      </div>
    </div>
  );
}
export default Modal;

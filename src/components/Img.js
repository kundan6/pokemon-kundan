import React, { useState } from "react";
import { Spinner } from "./Spinner";

export const Img = ({ src, alt, className }) => {
  const [loading, setLoading] = useState(true);
  const [img, setImg] = useState(null);

  const image = new Image();
  image.src = src;
  image.onload = () => {
    setLoading(false);
    setImg(src);
  };
  return (
    <>
      {loading ? (
        <Spinner className="mt-5" />
      ) : (
        <img className={className} src={img} alt={alt} />
      )}
    </>
  );
};

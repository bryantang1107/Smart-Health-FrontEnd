import React, { useState, useEffect } from "react";

const Image = (props) => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const reader = new FileReader();
    reader.readAsDataURL(props.blob);
    //so that we can pass the file as url so it can be read by src img
    reader.onloadend = () => {
      setImageSrc(reader.result);
    };
  }, [props.blob]);

  return <img src={imageSrc} style={props.style} alt={props.fileName} />;
};

export default Image;

import React from "react";

const Image = ({ imageSrc, imageAlt }: { imageSrc: string, imageAlt: string }) => {
  return (
    <div>
      <img src={imageSrc} alt={imageAlt} />

    </div>
  );
};

export default Image;
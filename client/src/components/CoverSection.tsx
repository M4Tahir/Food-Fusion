import React from "react";
import { CoverImage, Heading, LinkButton } from "./index.ts";

const CoverSection = () => {
  return (
    <section>
      <div className="relative flex justify-center items-center">
        <div className="relative">
          <div role="img" className="absolute inset-0 img-gradient"></div>
          <CoverImage />
        </div>

        <div className="absolute left-[10%] top-1/2 -translate-y-1/2 ">
          <Heading type="h1" bold={true} className="mb-4 text-text-on-primary">
            60 all-time <br /> dinner recipes
          </Heading>
          <LinkButton to="recipes" type="primary">
            SEE THEM ALL
          </LinkButton>
        </div>
      </div>
    </section>

  );
};

export default CoverSection;
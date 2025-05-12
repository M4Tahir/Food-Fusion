import React from "react";
import { CoverImage, LinkButton } from "./index.ts";

const CoverSection = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative w-full h-[500px]">
        <CoverImage />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent z-10" />
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 px-10 text-white max-w-md">
          <h2 className="text-5xl font-bold leading-tight">
            <strong>69</strong> All Time Best Recipes
          </h2>
          <div className="mt-4">
            <LinkButton to="recipes" type="primary">
              See Them All
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverSection;
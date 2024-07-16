"use client";
import React from "react";
import Image from "next/image";

type Props = {
  imagePath: string;
};

const ImageCell: React.FC<Props> = ({ imagePath }) => {
  return (
    <div className="flex justify-center items-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border m-1">
      <Image src={`${imagePath}`} alt="XO Image" width={80} height={80} className="object-contain" />
    </div>
  );
};

export default ImageCell;

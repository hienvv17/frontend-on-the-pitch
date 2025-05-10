"use client";

import type { ImageProps as NextImageProps } from "next/image";
import type { ImageLoaderProps } from "next/image";

import React from "react";
import NextImage from "next/image";

const imagekitLoader = ({ src, width, quality }: ImageLoaderProps) => {
  console.log("src", src);
  const params = [`w-${width}`];
  if (quality) {
    params.push(`q-${quality}`);
  } else {
    params.push("q-75");
  }
  const paramsString = params.join(",");
  // firebase
  let imageSrc = src;
  if (src.includes("ik.imagekit.io/onthepitch")) {
    imageSrc = src.replace(
      "ik.imagekit.io/onthepitch",
      `ik.imagekit.io/onthepitch/tr:${paramsString}`
    );
  }
  return imageSrc;
};

type ImageProps = Omit<NextImageProps, "loader">;

const Image: React.FC<ImageProps> = (props) => {
  return <NextImage {...props} loader={imagekitLoader} />;
};

export default Image;


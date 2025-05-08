"use client";

import type { ImageProps as NextImageProps } from "next/image";
import type { ImageLoaderProps } from "next/image";

import React from "react";
import NextImage from "next/image";
const baseImageEndpoint = "https://ik.imagekit.io/onthepitch";
const nextImageUrl = (firebaseImageUrl: string) => {
  return (
    "/_next/image?" +
    new URLSearchParams({
      url: firebaseImageUrl || "",
      w: "480",
      q: "75",
    }).toString()
  );
};
const imagekitLoader = ({ src, width, quality }: ImageLoaderProps) => {
  const params = [`w-${width}`];
  !!quality ? params.push(`q-${quality}`) : params.push("q-75");
  const paramsString = params.join(",");
  // firebase
  let imageSrc = "";
  if (src.includes("ik.imagekit.io/onthepitch")) {
    imageSrc = src.replace(
      "ik.imagekit.io/onthepitch",
      `ik.imagekit.io/onthepitch/tr:${paramsString}`
    );
  } else {
    imageSrc = nextImageUrl(src);
  }
  return imageSrc;
};

type ImageProps = Omit<NextImageProps, "loader">;

const Image: React.FC<ImageProps> = (props) => {
  return <NextImage {...props} loader={imagekitLoader} />;
};

export default Image;


"use client";

import { ImagesUploader } from "common";
import Image from "next/image";
import { useState } from "react";

export default function Create() {
  const [images, setImages] = useState<number[]>([]);

  return (
    <ImagesUploader
      apiEndpoint="/api/images"
      onUploaded={(ev) => setImages((c) => [...c, ev])}
      images={images.map((c) => (
        <Image
          key={c}
          alt=""
          width={170}
          height={114}
          src={`/api/images/${c}`}
        />
      ))}
    />
  );
}

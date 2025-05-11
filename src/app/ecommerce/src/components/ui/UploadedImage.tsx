import Image from "next/image";

export type TUploadedImage = Omit<Parameters<typeof Image>[0], "src"> & {
  imageId: number;
};

export const UploadedImage = ({ imageId, ...props }: TUploadedImage) => (
  <Image {...props} src={`/api/images/${imageId}`} />
);

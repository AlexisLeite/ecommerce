import { ReactNode } from "react";
import { HStack } from "../../layout";
import { Uploader } from "./Uploader";
import { IconButton } from "../IconButton";
import { FaPlus } from "@meronex/icons/fa";

export const ImagesUploader = ({
  apiEndpoint,
  images,
  maxImages,
  onUploaded,
}: {
  apiEndpoint: string;
  images?: ReactNode[];
  maxImages?: number;
  onUploaded: (id: number) => unknown;
}) => {
  return (
    <HStack className="images_uploader">
      {images}
      <Uploader
        onUploaded={(file) => {
          onUploaded(file.id);
        }}
        endPoint={apiEndpoint}
        Render={({ onClick }) => (
          <IconButton
            onClick={onClick}
            disabled={(maxImages ?? Infinity) <= (images?.length || 0)}
          >
            <FaPlus />
          </IconButton>
        )}
      />
    </HStack>
  );
};

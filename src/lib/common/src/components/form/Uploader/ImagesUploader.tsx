import { ReactNode } from "react";
import { HStack } from "../../layout";
import { Uploader } from "./Uploader";
import { IconButton } from "../IconButton";
import { FaPlus } from "@meronex/icons/fa";

export const ImagesUploader = ({
  apiEndpoint,
  images,
  onUploaded,
}: {
  apiEndpoint: string;
  images?: ReactNode;
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
          <IconButton onClick={onClick}>
            <FaPlus />
          </IconButton>
        )}
      />
    </HStack>
  );
};

const ProductEdition = async ({
  params,
}: {
  params: Promise<{ imageId: number }>;
}) => {
  return <>Image edition {(await params).imageId}</>;
};

export default ProductEdition;

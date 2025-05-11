const ProductEdition = async ({
  params,
}: {
  params: Promise<{ productId: number }>;
}) => {
  return <>Products edition {(await params).productId}</>;
};

export default ProductEdition;

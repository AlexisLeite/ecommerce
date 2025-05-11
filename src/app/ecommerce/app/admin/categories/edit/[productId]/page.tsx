const CategoriesEdition = async ({
  params,
}: {
  params: Promise<{ categoryId: number }>;
}) => {
  return <>Categories edition {(await params).categoryId}</>;
};

export default CategoriesEdition;

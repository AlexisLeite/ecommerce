export const ErrorMessage = ({ children }: { children?: string }) => {
  if (!children) return null;

  return <div className={"field__error"}>{children}</div>;
};

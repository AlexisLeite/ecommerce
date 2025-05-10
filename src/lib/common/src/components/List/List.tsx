import { DetailedHTMLProps } from "react";

export type ListProps = DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLUListElement>,
  HTMLUListElement
> & {
  ordered?: boolean;
};

export const List = ({ ordered, ...props }: ListProps) => {
  if (ordered) return <ol className={"list"} {...(props as any)} />;

  return <ul className={"list"} {...props} />;
};

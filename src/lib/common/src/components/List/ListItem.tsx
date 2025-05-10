import { DetailedHTMLProps } from "react";

export type ListItemProps = DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>;

export const ListItem = (props: ListItemProps) => {
  return <li className={"list__item"} {...props} />;
};

import { FC, ReactNode } from "react";

export const Header: FC<{
  title?: string;
  subTitle?: string;
  description?: string;
  homeIcon?: ReactNode;
}> = ({ homeIcon, title, subTitle, description }) => (
  <header className={"header"}>
    {homeIcon && <nav className={"header__home"}>{homeIcon}</nav>}
    <section className={"page_info"}>
      {(title || subTitle) && (
        <div className={"header__titles"}>
          {title && <h1>{title}</h1>}
          {subTitle && <h2>{subTitle}</h2>}
        </div>
      )}
      {description && <p>{description}</p>}
    </section>
  </header>
);

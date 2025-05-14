import { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";

export const FieldWithoutLabel: FC<{
  children: ReactNode;
  className?: string;
  error?: string;
  text: string;
  required?: boolean;
}> = ({ className, error, text, required, children }) => {
  const { t } = useTranslation();

  return (
    <div className={`${className || ""} field__wrapper`}>
      <div className={"field__label__wrapper"}>
        {text && (
          <span className={"field__label"}>
            {t(text)}{" "}
            {required && <strong className={"required_mark"}>*</strong>}
          </span>
        )}
        {children}
      </div>
      {error && <div className={"field__error"}>{t(error)}</div>}
    </div>
  );
};

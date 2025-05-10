import { FaStar } from "@meronex/icons/all";
import "./StarsRate.scss";
import { IconButton } from "../form/IconButton";

export const StarsRate = ({
  value,
  onChange,
  disabled,
}: {
  value: number;
  onChange: (nv: number) => unknown;
  disabled?: boolean;
}) => {
  return (
    <div className={`stars_wrapper ${disabled ? "disabled" : ""}`}>
      {new Array(5).fill(1).map((_, i) => (
        <IconButton
          className={`${i <= value ? "filled" : ""} feedback_star`}
          key={`Star${i}`}
          onClick={() => {
            if (!disabled) {
              onChange(i);
            }
          }}
          size={"lg"}
        >
          <FaStar />
        </IconButton>
      ))}
    </div>
  );
};

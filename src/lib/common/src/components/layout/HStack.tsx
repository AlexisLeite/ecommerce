import { StackProps, Stack } from "./Stack";
import { WithChildren } from "./types";

export const HStack: WithChildren<StackProps> = ({ ...props }) => {
  return <Stack {...props} direction={"horizontal"} />;
};

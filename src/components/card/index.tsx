import { FC } from "react";
import { Grid } from "@mui/material";
import { wrapperContent } from "./card.style";

interface IProps {
  children: React.ReactNode;
}

const Card: FC<IProps> = ({ children }) => {
  return <Grid sx={wrapperContent}>{children}</Grid>;
};

export default Card;

import { Grid, TextField } from "@mui/material";
import React, { ChangeEvent, FC, forwardRef, RefObject } from "react";
import { wrapperBox } from "./input.style";

interface IProps {
  value: any;
  handleChange?: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  type: "tel" | "text" | "password" | "number" | "file";
  id?: string;
  placeholder?: string;
  required?: boolean;
  readOnly?: boolean | undefined;
  autoComplete?: string;
  fieldName?: string;
}

const CustomInput: FC<IProps> = forwardRef<RefObject<HTMLInputElement>, IProps>(
  (props, ref) => {
    const {
      value,
      handleChange,
      type,
      id,
      placeholder,
      required,
      readOnly,
      fieldName,
    } = props;

    const onChangeCustom = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      handleChange?: (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => void
    ) => {
      if (typeof handleChange === "function") {
        handleChange(e);
      }
    };

    return (
      <Grid sx={wrapperBox}>
        <TextField
          id={id ? id : `${fieldName}-input`}
          type={type}
          value={value}
          inputRef={ref}
          fullWidth
          onChange={(e) => onChangeCustom(e, handleChange)}
          InputProps={{
            readOnly,
            required,
          }}
          placeholder={placeholder}
        />
      </Grid>
    );
  }
);

export default CustomInput;

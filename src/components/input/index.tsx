import { FormControl, Grid, TextField } from "@mui/material";
import React, { ChangeEvent, FC, forwardRef, RefObject, useState } from "react";

interface IProps {
  value: any;
  handleChange?: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  type: "tel" | "text" | "password" | "number" | "file";
  sx?: any;
  id?: string;
  maxlength?: number;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  fieldName?: string;
}

const CustomInput: FC<IProps> = forwardRef<RefObject<HTMLInputElement>, IProps>(
  (props, ref) => {
    const {
      value,
      handleChange,
      type,
      sx,
      id,
      maxlength,
      placeholder,
      required,
      autoComplete,
      fieldName,
    } = props;

    const [readOnly, setReadonly] = useState<boolean>(autoComplete === "off");
    const onFocusHandler = () => {
      autoComplete === "off" && setReadonly(false);
    };

    return (
      <Grid item container component={FormControl}>
        <Grid item xs={12}>
          <TextField
            id={id ? id : `${fieldName}-input`}
            type={type}
            value={value}
            inputRef={ref}
            fullWidth
            onChange={(e) => handleChange}
            onFocus={onFocusHandler}
            InputProps={{
              readOnly: readOnly,
            }}
            placeholder={placeholder}
          />
        </Grid>
      </Grid>
    );
  }
);

export default CustomInput;

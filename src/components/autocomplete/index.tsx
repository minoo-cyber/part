import { Autocomplete } from "@mui/lab";
import { AutocompleteProps, ChipTypeMap, Grid } from "@mui/material";
import { wrapperBox } from "./autocomplete.style";

interface IProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap["defaultComponent"]
> extends AutocompleteProps<
    T,
    Multiple,
    DisableClearable,
    FreeSolo,
    ChipComponent
  > {}

const CustomAutocomplete = <T,>(
  props: IProps<T, boolean, boolean, boolean>
) => {
  const { ...otherprops } = props;

  return (
    <Grid sx={wrapperBox}>
      <Autocomplete
        size={!!props.size ? props.size : "small"}
        {...otherprops}
      />
    </Grid>
  );
};

export default CustomAutocomplete;

import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Card, Grid, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { FC, SyntheticEvent, useState } from "react";
import CustomInput from "../../../../components/input";
import useAppDispatch from "../../../../hooks/useDispatch";
import { setTaskData } from "../../../../redux/slices/addTaskSlice";
import { setToast } from "../../../../redux/slices/toastSlice";
import { wrapperBox } from "./addTask.style";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AddTask: FC<IProps> = ({ open, setOpen }: IProps) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [gift, setGift] = useState<string>("");
  const [priority, setPriority] = useState<string>("low");

  const handlePriority = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriority(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    let task = {
      id: Date.now(),
      title: title,
      description: description,
      gift: gift,
      priority: priority,
    };

    if (title && description) {
      //@ts-ignore
      dispatch(setTaskData(task));
      setOpen(false);
      dispatch(
        setToast({
          open: true,
          type: "success",
          text: "Task Added Successfully",
        })
      );
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Grid sx={wrapperBox}>
        <Card component="form" onSubmit={handleSubmit}>
          <Box mb={1}>
            <CustomInput
              value={title ? title : ""}
              handleChange={(e) => setTitle(e.target.value)}
              type="text"
              fieldName="title"
              placeholder="Please Enter Task Title"
              required
            />
          </Box>
          <Box mb={1}>
            <CustomInput
              value={description ? description : ""}
              handleChange={(e) => setDescription(e.target.value)}
              type="text"
              multiline={true}
              fieldName="description"
              placeholder="Please Enter Task Description"
              required
            />
          </Box>
          <Box mb={2}>
            <CustomInput
              value={gift ? gift : ""}
              handleChange={(e) => setGift(e.target.value)}
              type="text"
              fieldName="gift"
              placeholder="Gifts And KPI For This task"
            />
          </Box>
          <Grid container mb={4} style={{ justifyContent: "space-between" }}>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={priority}
                onChange={handlePriority}
              >
                <FormControlLabel value="low" control={<Radio />} label="Low" />
                <FormControlLabel
                  value="medium"
                  control={<Radio />}
                  label="Medium"
                />
                <FormControlLabel
                  value="high"
                  control={<Radio />}
                  label="High"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Button variant="outlined" type="submit">
            Add To Task
          </Button>
        </Card>
      </Grid>
    </Modal>
  );
};
export default AddTask;

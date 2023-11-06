import { FormControl } from "@mui/base";
import { Button, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Card, Grid, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { FC, SyntheticEvent, useState } from "react";
import CustomInput from "../../../../components/input";
import useAppDispatch from "../../../../hooks/useDispatch";
import useAppSelector from "../../../../hooks/useSelector";
import {
  setEditTask,
  setTaskDone,
} from "../../../../redux/slices/addTaskSlice";
import { setToast } from "../../../../redux/slices/toastSlice";
import { wrapperBox } from "../addTaskModal/addTask.style";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedId: any;
}

const EditTask: FC<IProps> = ({ open, setOpen, selectedId }: IProps) => {
  const dispatch = useAppDispatch();
  const { taskData } = useAppSelector((state) => state.addTask);
  const [title, setTitle] = useState<string>(
    taskData ? taskData[selectedId]?.title : ""
  );
  const [description, setDescription] = useState<string>(
    taskData ? taskData[selectedId]?.description : ""
  );
  const [gift, setGift] = useState<string>(
    taskData ? taskData[selectedId]?.gift : ""
  );
  const [priority, setPriority] = useState<string>(
    taskData ? taskData[selectedId]?.priority : ""
  );

  const handlePriority = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriority(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setTaskDone(taskData[selectedId]));
    let task = {
      id: taskData[selectedId]?.id,
      title: title,
      description: description,
      gift: gift,
      priority: priority,
    };
    dispatch(setEditTask({ id: taskData[selectedId]?.id, task, selectedId }));
    setOpen(false);
    dispatch(
      setToast({
        open: true,
        type: "success",
        text: "Task Edited Successfully",
      })
    );
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
              defaultValue={taskData ? taskData[selectedId]?.title : ""}
              value={title}
              handleChange={(e) => setTitle(e.target.value)}
              type="text"
              fieldName="title"
              placeholder="Please Enter Task Title"
              required
            />
          </Box>
          <Box mb={1}>
            <CustomInput
              defaultValue={taskData ? taskData[selectedId]?.description : ""}
              value={description}
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
              defaultValue={taskData ? taskData[selectedId]?.gift : ""}
              value={gift}
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
                defaultValue={taskData ? taskData[selectedId]?.priority : ""}
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
            Edit Task
          </Button>
        </Card>
      </Grid>
    </Modal>
  );
};
export default EditTask;

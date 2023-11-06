import { Box, Typography } from "@mui/material";
import { Card, Grid, Modal } from "@mui/material";
import { FC } from "react";
import useAppSelector from "../../../../hooks/useSelector";
import { wrapperViewBox } from "../addTaskModal/addTask.style";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedId: any;
}

const ViewTask: FC<IProps> = ({ open, setOpen, selectedId }: IProps) => {
  const { taskData } = useAppSelector((state) => state.addTask);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Grid sx={wrapperViewBox}>
        <Card>
          <Typography variant="h5" mt={2} mb={3}>
            Task Number {selectedId + 1}
          </Typography>
          <Typography variant="h6" my={2}>
            Title : {taskData[selectedId]?.title}
          </Typography>
          <Typography my={2}>
            Description : {taskData[selectedId]?.description}
          </Typography>
          <Typography my={2}>gift : {taskData[selectedId]?.gift}</Typography>
          <Box>
            {taskData[selectedId]?.priority}
            <RadioButtonCheckedIcon
              style={{
                color:
                  taskData[selectedId]?.priority === "low"
                    ? "#1abc9c"
                    : taskData[selectedId]?.priority === "medium"
                    ? "#f1c40f"
                    : taskData[selectedId]?.priority === "high"
                    ? "#e74c3c"
                    : "#1abc9c",
              }}
            />
          </Box>
        </Card>
      </Grid>
    </Modal>
  );
};
export default ViewTask;

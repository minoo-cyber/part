import { Typography } from "@mui/material";
import { Card, Grid, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import useAppSelector from "../../../../hooks/useSelector";
import { wrapperBox, wrapperTask } from "./doneTask.style";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DoneTask: FC<IProps> = ({ open, setOpen }: IProps) => {
  const { doneData } = useAppSelector((state) => state.doneTask);

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
      <Grid sx={wrapperBox}>
        <Card>
          <Typography variant="h5">Done Tasks</Typography>
          {doneData.length > 0 && (
            <Grid>
              {doneData.map((item: any, index: any) => {
                return (
                  <Box my={2} sx={wrapperTask} key={index}>
                    <Grid container>
                      <Grid item xs={11}>
                        <Box>
                          {item.priority}
                          <RadioButtonCheckedIcon
                            style={{
                              color:
                                item.priority === "low"
                                  ? "#1abc9c"
                                  : item.priority === "medium"
                                  ? "#f1c40f"
                                  : item.priority === "high"
                                  ? "#e74c3c"
                                  : "#1abc9c",
                            }}
                          />
                        </Box>
                        <Typography variant="h6">{item.title}</Typography>
                        <Typography>{item.description}</Typography>
                        {item?.gift && <Typography>{item.gift}</Typography>}
                      </Grid>
                    </Grid>
                  </Box>
                );
              })}
            </Grid>
          )}
        </Card>
      </Grid>
    </Modal>
  );
};
export default DoneTask;

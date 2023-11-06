import { Button, Card, Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import Layout from "../../components/layout";
import useAppSelector from "../../hooks/useSelector";
import AddTask from "./components/addTaskModal";
import { wrapperBox, wrapperTask } from "./home.style";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import EditTask from "./components/editTaskModal";
import useAppDispatch from "../../hooks/useDispatch";
import { setToast } from "../../redux/slices/toastSlice";
import { setTaskDone } from "../../redux/slices/addTaskSlice";
import {
  setTaskClearData,
  setTaskDataList,
} from "../../redux/slices/doneTaskSlice";
import DoneTask from "./components/doneTaskModal";
import ViewTask from "./components/viewTaskModal";

const Home = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [openDone, setOpenDone] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openView, setOpenView] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState();
  const { taskData } = useAppSelector((state) => state.addTask);

  const handleOpen = (id: any, index: any, event: any) => {
    event.stopPropagation();
    setOpenEdit(true);
    setSelectedId(index);
  };

  const handleDone = (index: any, event: any) => {
    event.stopPropagation();
    let done = taskData.filter((row: any) => row.id === index);
    let task = {
      id: done[0].id,
      title: done[0].title,
      description: done[0].description,
      gift: done[0]?.gift,
      priority: done[0].priority,
    };
    //@ts-ignore
    dispatch(setTaskDataList(task));
    dispatch(setTaskDone(index));
    dispatch(
      setToast({
        open: true,
        type: "success",
        text: "Task Done Successfully",
      })
    );
  };

  const handleFirstOpen = () => {
    dispatch(setTaskClearData());
    setOpen(true);
  };

  const handleRowClick = (index: any) => {
    setOpenView(true);
    setSelectedId(index);
  };

  return (
    <Layout>
      <Grid container sx={wrapperBox} pt={5}>
        <Typography variant="h5">Hello Word</Typography>
        <Grid item xs={12}>
          {taskData.length > 0 ? (
            <Grid pt={5}>
              <Button variant="contained" onClick={() => setOpenDone(true)}>
                View Done task
              </Button>
              <DoneTask open={openDone} setOpen={setOpenDone} />
              {taskData.map((item: any, index: any) => {
                return (
                  <Box
                    my={2}
                    sx={wrapperTask}
                    key={index}
                    onClick={() => handleRowClick(index)}
                  >
                    <Card>
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
                          <Typography variant="h5">{item.title}</Typography>
                          <Typography>{item.description}</Typography>
                          {item?.gift && <Typography>{item.gift}</Typography>}
                        </Grid>
                        <Grid item xs={1}>
                          <Button
                            variant="outlined"
                            color="secondary"
                            size="small"
                            onClick={(event) => handleDone(item.id, event)}
                          >
                            Done
                          </Button>
                          <Button
                            variant="outlined"
                            color="success"
                            size="small"
                            onClick={(event) =>
                              handleOpen(item.id, index, event)
                            }
                          >
                            Edit
                          </Button>
                        </Grid>
                      </Grid>
                    </Card>
                  </Box>
                );
              })}
              <ViewTask
                open={openView}
                setOpen={setOpenView}
                selectedId={selectedId}
              />
              <EditTask
                open={openEdit}
                setOpen={setOpenEdit}
                selectedId={selectedId}
              />
              <IconButton aria-label="add" color="primary" size="large">
                <AddCircleIcon onClick={() => setOpen(true)} />
              </IconButton>
              <AddTask open={open} setOpen={setOpen} />
            </Grid>
          ) : (
            <Grid
              container
              sx={{ justifyContent: "center", marginTop: "75vh" }}
            >
              <Button variant="outlined" onClick={handleFirstOpen}>
                Create Your First Task
              </Button>
              <AddTask open={open} setOpen={setOpen} />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Layout>
  );
};
export default Home;

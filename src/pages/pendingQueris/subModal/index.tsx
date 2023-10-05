import { Box, Modal } from "@mui/material";
import { FC } from "react";
import { wrapperBox } from "./modal.style";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SubModal: FC<IProps> = ({ open, setOpen }: IProps) => {
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
      <Box sx={wrapperBox}></Box>
    </Modal>
  );
};
export default SubModal;

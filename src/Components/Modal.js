import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function BasicModal({openM,error}) {
  const [open, setOpen] = useState(false);
  const [handleModal,setHandlemodal] = useState(false);

  
  const handleClose = () => setOpen(false);
  useEffect(() => {
    if (error) {
      setOpen(true);
      error=false;
    }
  }, [error]);
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            City is Not founded.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <button onClick={handleClose}>Close</button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default BasicModal;
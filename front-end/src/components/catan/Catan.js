import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { 
  Alert,
  Button,
  Container,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  Modal
} from '@mui/material';

import * as actionType from '../../constants/actionTypes';

import CatanForm from './CatanForm';
import PlayersForm from './PlayersForm';
import GameTable from './GameTable';

import { 
  getGames,
} from '../../actions/catan';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  maxHeight: '80%',
  boxShadow: 24,
  p: 3,
};

const Catan = () => {
  
  const dispatch = useDispatch();

  const message = useSelector(state => state.message.text);
  //console.log(message);
  const newMessage = useSelector(state => state.message.new);

  const [formType, setFormType] = useState('CATAN_FORM');

  //const [openPlayerForm, setOpenPlayerForm] = useState(false);

  const [openCatanForm, setOpenCatanForm] = useState(false);
  const handleOpenCatanForm = () => {
    setFormType('CATAN_FORM');
    setOpenCatanForm(true);
  }
  const handleOpenPlayerForm = () => {
    setFormType('PLAYER_FORM');
    setOpenCatanForm(true);
  }
  const handleCloseForm = () => {
    setOpenCatanForm(false);
    handleCloseConfirm();
    dispatch({ type: actionType.RESET_FORMS, data: null });
  };

  //const games = useSelector(state => state.catan.games);
  //console.log('Games: ', games)

  useEffect(() => {
    dispatch(getGames());
  }, []);

  // useEffect(() => {
  //   dispatch(getStats());
  // }, []);

  const [openConfirm, setConfirm] = useState(false);

  const handleClickOpenConfirm = () => {
    setConfirm(true);
  };

  const handleCloseConfirm = () => {
    setConfirm(false);
  };

  const handleCloseMessage = () => {
    dispatch({ type: actionType.CLEAR_MESSAGE, data: null })
  };

  return (
    <>
      <Container sx={{ paddingTop: '110px' }}>
        <Button onClick={handleOpenCatanForm}>ADD CATAN GAME</Button>
        <Button onClick={handleOpenPlayerForm}>ADD PLAYER</Button>
        <Modal
          open={openCatanForm}
          onClose={handleClickOpenConfirm}
          disableScrollLock
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          //sx={{ overflow:'scroll', }}
        >
          <Container maxWidth="md" sx={style}>
            {formType === 'CATAN_FORM' ? <CatanForm></CatanForm> : <PlayersForm></PlayersForm>}
          </Container>
        </Modal>
        <GameTable openCatanForm={handleOpenCatanForm}></GameTable>
      </Container>

      <Dialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Close Form"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to close the form? All unsaved changes will be lost. 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>No</Button>
          <Button color="secondary" onClick={handleCloseForm} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={newMessage}
        onClose={handleCloseMessage}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">
          <Alert align="center" variant="standard" severity='error'>
            {message}
          </Alert>
        </DialogTitle> */}
        <DialogContent>
          <Alert align="center" variant="standard" severity='error'>
            {message}
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMessage}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Catan;

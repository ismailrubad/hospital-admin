import React from 'react'
import { makeStyles, Modal, Backdrop, Fade } from '@material-ui/core'
import ImageControl from './ImageControl/ImageControl'
import CloseIcon from '@material-ui/icons/Close'
import './ImageHandlerModal.css'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: '16px 10px 16px 16px',
    height: '450px',
    width: '840px',
    margin: '20px',
    position: 'relative',
    outline: 'none'
  }
}))

const ImageModalPopup = ({ getImageData, handleClose, open, selectOneMood, prevSelectedImageIds }) => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal + ' Test_class'}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className='Close_btn_for_image_modal' onClick={handleClose}>
              <CloseIcon />
            </div>
            <ImageControl
              prevSelectedImageIds = {prevSelectedImageIds}
              closeModal={handleClose}
              getImageData={getImageData}
              selectOneMood={selectOneMood} />
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  )
}

export default ImageModalPopup
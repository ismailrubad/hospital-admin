import React, { Component } from 'react';
import { AppContext } from '../../context/AppContextProvider';
import TextField from '@material-ui/core/TextField';
// import './style.css'
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { fetchAllHospital } from "../../Api/hospital-api";
import { addDisease, editDisease } from "../../Api/disease-api";
import DiseaseCategoryList from './DiseaseCategoryList/DiseaseCategoryList';
import ImageHandler from '../ImageHandlerModal/ImageHandlerModal'
import { Box } from '@material-ui/core';

class DiseaseCategory extends Component {

   state = {
      diseaseList: null,
      createModalOpen: false,
      submittingCreate: false,
      name: null,
      inputError: {},
      editForm: false,
      imageModalCoverOpen: false,
      cover: "",

   }

   handleCreateModalOpen = () => {
      this.setState({
         createModalOpen: true
      })
   }

   handleCreateModalClose = () => {
      this.setState({
         createModalOpen: false,
         inputError: {},
         name: null,
         editForm: false

      })
   }

   handleNameChange = (event) => {
      this.setState({
         name: event.target.value
      })
   }


   handleFormSubmit = () => {
      if (this.state.editForm) {
         this.setState({
            submittingCreate: true
         }, () => {
            editDisease(this.state.diseaseId, this.state.name, this.state.cover[0])
               .then((response) => {
                  console.log(response);
                  this.handleCreateModalClose();
                  this.context.updateDiseaseCatList();
               })
               .catch((error) => {
                  console.log(error);
                  this.setState({
                     submittingCreate: false,
                     inputError: error.response && error.response.data
                  })
               });
         })
      }
      else {
         this.setState({
            submittingCreate: true
         }, () => {
            addDisease(this.state.name, this.state.cover[0])
               .then((response) => {
                  console.log(response);
                  this.handleCreateModalClose();
                  this.context.updateDiseaseCatList();
               })
               .catch((error) => {
                  console.log(error);
                  this.setState({
                     submittingCreate: false,
                     inputError: error.response && error.response.data
                  })
               });
         })
      }

   }

   getImageDataFromModalCover = (imageInfo) => {
      console.log(imageInfo)
      this.setState({ cover: imageInfo })
   }

   handleImageModalCoverClose = () => {
      console.log("closed")
      this.setState({
         imageModalCoverOpen: false
      })
   }

   renderCreateModal = () => {
      return (
         <Modal
            className="modal"
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={this.state.createModalOpen}
            onClose={this.handleCreateModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
               timeout: 500,
            }}
         >
            <Fade in={this.state.createModalOpen}>
               <Grid container spacing={3}>
                  <Grid item xs={6} className="col_center">
                     <Card>
                        <CardHeader
                           action={
                              <IconButton onClick={this.handleCreateModalClose} aria-label="settings">
                                 <CloseIcon />
                              </IconButton>
                           }
                           title={this.state.editForm ? "Edit isease Category" : "Add isease Category"}

                        />
                        <CardContent>
                           <div className="form_wrapper">
                              <form noValidate autoComplete="off">
                                 <TextField
                                    value={this.state.name}
                                    error={this.state.inputError && this.state.inputError.name ? true : false}
                                    helperText={this.state.inputError && this.state.inputError.name}
                                    onChange={this.handleNameChange} id="standard-basic" label="Disease Category Name" />
                                 <Box mb={2}>
                                    <Button onClick={() => this.setState({ imageModalCoverOpen: true })}
                                       variant="contained" color="primary">Upload Cover Image</Button>
                                    {this.state.cover ?
                                       <Box display="inline" ml={2}>
                                          Cover image selected</Box> : null
                                    }
                                 </Box>
                                 <ImageHandler prevSelectedImageIds={this.state.cover}
                                    selectOneMood={true} getImageData={this.getImageDataFromModalCover}
                                    handleClose={this.handleImageModalCoverClose}
                                    open={this.state.imageModalCoverOpen} />

                                 <Button onClick={this.handleFormSubmit} variant="contained" color="primary">
                                    Submit
                                 </Button>
                              </form>
                           </div>
                        </CardContent>
                     </Card>
                  </Grid>
               </Grid>
            </Fade>
         </Modal >
      )
   }

   editDiseaseCategory = (disCat) => {
      console.log(disCat)
      this.setState({
         diseaseId: disCat._id,
         name: disCat.name,
         editForm: true,
         cover: disCat.cover ? [disCat.cover._id] : " ",
      }, () => {
         this.handleCreateModalOpen();
      })
   }

   render() {
      return (
         <div>
            <DiseaseCategoryList editDiseaseCategory={this.editDiseaseCategory} />
            {this.renderCreateModal()}
            <Fab onClick={this.handleCreateModalOpen} color="primary" variant="extended" aria-label="add" className="addIcon">
               <AddIcon />
               Add Disease Category
            </Fab>
         </div>
      );
   }
}

DiseaseCategory.contextType = AppContext;
export default DiseaseCategory;
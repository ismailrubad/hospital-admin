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
import { addDisease } from "../../Api/disease-api";
import DiseaseCategoryList from './DiseaseCategoryList/DiseaseCategoryList';

class DiseaseCategory extends Component {

   state = {
      diseaseList: null,
      createModalOpen: false,
      submittingCreate: false,
      name: null,
      inputError: {}
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
         name: null
      })
   }

   handleNameChange = (event) => {
      this.setState({
         name: event.target.value
      })
   }


   handleFormSubmit = () => {
      this.setState({
         submittingCreate: true
      }, () => {
         addDisease(this.state.name)
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
                           title="Add Disease Category"
                        />
                        <CardContent>
                           <div className="form_wrapper">
                              <form noValidate autoComplete="off">
                                 <TextField
                                    error={this.state.inputError && this.state.inputError.name ? true : false}
                                    helperText={this.state.inputError && this.state.inputError.name}
                                    onChange={this.handleNameChange} id="standard-basic" label="Disease Category Name" />

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

   render() {
      return (
         <div>
            <DiseaseCategoryList />
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
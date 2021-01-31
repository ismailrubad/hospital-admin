import React, { Component } from 'react';
import axios from 'axios';
import { TextField, Button } from '@material-ui/core';
import { AppContext } from '../../context/AppContextProvider';
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
import CircularProgress from '@material-ui/core/CircularProgress';
import { addDistrict } from "../../Api/district-api";

import './style.css'
import DistrictList from './DistrictList/DistrictList';

class District extends Component {

   state = {
      createModalOpen: false,
      districtName: null,
      submittingCreate: false,
      districtNameError: false,
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
         submittingCreate: false,
         districtNameError: false
      })
   }

   handleDistrictNameOnChange = (event) => {
      this.setState({
         districtName: event.target.value
      })
   }

   handleFormSubmit = () => {
      this.setState({
         submittingCreate: true
      }, () => {
         addDistrict(this.state.districtName).then((response) => {
            console.log(response);
            // this.context.addDistrictToContext(response.data[0])
            this.context.updateDistrictList();
            this.handleCreateModalClose();
         }).catch((error) => {
            console.log(error);
            console.log({ res: error.response }, "123")
            this.setState({
               submittingCreate: false,
               districtNameError: true,
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
                           title="Add District"
                        />
                        <CardContent>
                           <div className="form_wrapper">
                              <form noValidate autoComplete="off">
                                 <TextField
                                    onChange={this.handleDistrictNameOnChange} id="standard-basic"
                                    label="District Name"
                                    error={this.state.inputError && this.state.inputError.name ? true : false}
                                    helperText={this.state.inputError && this.state.inputError.name} />

                                 <Button onClick={this.handleFormSubmit} variant="contained" color="primary">
                                    {this.state.submittingCreate ?
                                       <CircularProgress style={{ marginRight: 5 }} color="#fff" size={18} /> : null}
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
      console.log(this.context)
      return (
         <div className="">
            <DistrictList />
            {this.renderCreateModal()}
            <Fab onClick={this.handleCreateModalOpen} variant="extended" color="primary" aria-label="add" className="addIcon">
               <AddIcon />
               Add District
            </Fab>
         </div>
      );
   }
}

District.contextType = AppContext;

export default District;

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
import { editComission } from "../../Api/comission-api";
import ComissionList from './ComissionList/ComissionList';

class Comission extends Component {

   state = {
      diseaseList: null,
      createModalOpen: false,
      submittingCreate: false,
      amount: null,
      inputError: {},
      editForm: false
   }

   handleCreateModalOpen = () => {
      console.log("sfdds")
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

   handleAmountChange = (event) => {
      this.setState({
         amount: event.target.value
      })
   }

   handleTypeChange = (event) => {
      this.setState({
         selectedType: event.target.value
      })
   }


   handleFormSubmit = (type) => {
      this.setState({
         submittingCreate: true
      }, () => {
         editComission(this.state.hospitalId, this.state.amount, type)
            .then((response) => {
               console.log(response);
               this.handleCreateModalClose();
               this.context.updateComissionList();
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
                           title="Update Amount"

                        />
                        <CardContent>
                           <div className="form_wrapper">
                              <form noValidate autoComplete="off">
                                 <TextField
                                    value={this.state.amount}
                                    error={this.state.inputError && this.state.inputError.amount ? true : false}
                                    helperText={this.state.inputError && this.state.inputError.amount}
                                    onChange={this.handleAmountChange} id="standard-basic" label="Amount" />


                                 <Button style={{ marginRight: "20px" }} onClick={() => { this.handleFormSubmit("add") }} variant="contained" color="primary">
                                    Add
                                 </Button>
                                 <Button onClick={() => { this.handleFormSubmit("subtract") }} variant="contained" color="primary">
                                    Subtract
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

   editComission = (com) => {
      this.setState({
         hospitalId: com.hospital,
         name: com.name,
         editForm: true
      }, () => {
         this.handleCreateModalOpen();
      })
   }

   render() {
      return (
         <div>
            <ComissionList editComission={this.editComission} />
            {this.renderCreateModal()}
         </div>
      );
   }
}

Comission.contextType = AppContext;
export default Comission;
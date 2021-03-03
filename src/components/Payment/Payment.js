import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { AppContext } from '../../context/AppContextProvider';

import './style.css'
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
import { addPayment, editPayment } from "../../Api/payment-api";
import PaymentList from './PaymentList/PaymentList';

class Payment extends Component {

   state = {
      hospitalList: null,
      diseaseCatList: null,
      createModalOpen: false,
      submittingCreate: false,
      selectedHospital: null,
      amount: null, hospital: null,
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
         doctorId: null,
         name: null,
         selectedHospital: null,
         selectedDiseaseCategory: null,
         visitingFee: null,
         editForm: false
      })
   }

   handleAmountChange = (event) => {
      this.setState({
         amount: event.target.value
      })
   };


   handleHospitalChange = (event) => {
      this.setState({
         selectedHospital: event.target.value
      })
   }


   handleFormSubmit = () => {
      if (this.state.editForm) {
         this.setState({
            submittingCreate: true
         }, () => {
            editPayment(this.state.paymentId, this.state.amount)
               .then((response) => {
                  console.log(response);
                  this.handleCreateModalClose();
                  this.context.updatePaymentList();
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
            addPayment(this.state.selectedHospital, this.state.amount)
               .then((response) => {
                  console.log(response);
                  this.handleCreateModalClose();
                  this.context.updatePaymentList();
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
                           title={this.state.editForm ? "Edit Payment" : "Add Payment"}
                        />
                        <CardContent>
                           <div className="form_wrapper">
                              <form noValidate autoComplete="off">

                                 {!this.state.editForm ?
                                    <TextField
                                       id="standard-select-currency"
                                       select
                                       label="Select Hospital"
                                       error={this.state.inputError && this.state.inputError.hospital ? true : false}
                                       elperText={this.state.inputError && this.state.inputError.hospital}
                                       value={this.state.selectedHospital}
                                       onChange={this.handleHospitalChange}
                                    >
                                       {
                                          this.state.hospitalList ?
                                             this.state.hospitalList.data.map((option) => (
                                                <MenuItem key={option._id} value={option._id}>
                                                   {option.name}
                                                </MenuItem>
                                             )) : null
                                       }
                                    </TextField>
                                    : null
                                 }

                                 <TextField
                                    value={this.state.amount}
                                    error={this.state.inputError && this.state.inputError.amount ? true : false}
                                    helperText={this.state.inputError && this.state.inputError.amount}
                                    onChange={this.handleAmountChange} id="standard-basic" label="Amount" />


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

   componentDidMount() {
      fetchAllHospital().then((response) => {
         this.setState({
            hospitalList: response.data
         })
         console.log(response);
      })
         .catch(function (error) {
            console.log(error);
         })
         .then(function () {
            // always executed
         });

   }
   // this.state.name, this.state.selectedHospital, this.state.selectedDiseaseCategory, this.state.visitingFee,
   editPayment = (payment) => {
      this.setState({
         paymentId: payment._id,
         amount: payment.amount,
         selectedHospital: payment.hospital._id,
         editForm: true
      }, () => {
         this.handleCreateModalOpen()
      })
   }

   render() {
      return (
         <div>
            <PaymentList editPayment={this.editPayment} />
            {this.renderCreateModal()}
            <Fab onClick={this.handleCreateModalOpen} color="primary" variant="extended" aria-label="add" className="addIcon">
               <AddIcon />
               Add Payment
            </Fab>
         </div>
      );
   }
}


Payment.contextType = AppContext;

export default Payment;
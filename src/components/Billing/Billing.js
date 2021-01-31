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
import { fetchAllDiseaseCat } from "../../Api/disease-api";
import { addDoctor, editDoctor } from "../../Api/doctor-api";
import BillingList from './BillingList/BillingList';

class Billing extends Component {

   state = {
      hospitalList: null,
      diseaseCatList: null,
      createModalOpen: false,
      submittingCreate: false,
      selectedHospital: null,
      selectedDiseaseCategory: null,
      name: null, hospital: null, visitingFee: null,
      phone: null, cover: null,
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

   handleNameChange = (event) => {
      this.setState({
         name: event.target.value
      })
   }

   handleVisitingFeeChange = (event) => {
      this.setState({
         visitingFee: event.target.value
      })
   };

   handleHospitalChange = (event) => {
      this.setState({
         selectedHospital: event.target.value
      })
   }

   handlediseaseCategoryChange = (event) => {
      this.setState({
         selectedDiseaseCategory: event.target.value
      })
   }

   handleFormSubmit = () => {
      if (this.state.editForm) {
         this.setState({
            submittingCreate: true
         }, () => {
            editDoctor(this.state.doctorId, this.state.name, this.state.selectedHospital, this.state.selectedDiseaseCategory, this.state.visitingFee,
               "789-461-3214", "600bfdc59032b3a812a5a32d")
               .then((response) => {
                  console.log(response);
                  this.handleCreateModalClose();
                  this.context.updateDoctorList();
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
            addDoctor(this.state.name, this.state.selectedHospital, this.state.selectedDiseaseCategory, this.state.visitingFee,
               "789-461-3214", "600bfdc59032b3a812a5a32d")
               .then((response) => {
                  console.log(response);
                  this.handleCreateModalClose();
                  this.context.updateDoctorList();
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
                           title="Add Doctor"
                        />
                        <CardContent>
                           <div className="form_wrapper">
                              <form noValidate autoComplete="off">
                                 <TextField
                                    value={this.state.name}
                                    error={this.state.inputError && this.state.inputError.name ? true : false}
                                    helperText={this.state.inputError && this.state.inputError.name}
                                    onChange={this.handleNameChange} id="standard-basic" label="Doctor Name" />

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
                                 <TextField
                                    id="standard-select-currency"
                                    select
                                    label="Select Disease Category"
                                    error={this.state.inputError && this.state.inputError.diseaseCategory ? true : false}
                                    elperText={this.state.inputError && this.state.inputError.diseaseCategory}
                                    value={this.state.selectedDiseaseCategory}
                                    onChange={this.handlediseaseCategoryChange}
                                 >
                                    {
                                       this.state.diseaseCatList ?
                                          this.state.diseaseCatList.data.map((option) => (
                                             <MenuItem key={option._id} value={option._id}>
                                                {option.name}
                                             </MenuItem>
                                          )) : null
                                    }
                                 </TextField>
                                 <TextField
                                    value={this.state.visitingFee}
                                    error={this.state.inputError && this.state.inputError.visitingFee ? true : false}
                                    helperText={this.state.inputError && this.state.inputError.visitingFee}
                                    onChange={this.handleVisitingFeeChange} id="standard-basic" label="visiting Fee" />

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

      fetchAllDiseaseCat().then((response) => {
         this.setState({
            diseaseCatList: response.data
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
   editDoctor = (doctor) => {
      this.setState({
         doctorId: doctor._id,
         name: doctor.name,
         selectedHospital: doctor.hospital._id,
         selectedDiseaseCategory: doctor.diseaseCategory._id,
         visitingFee: doctor.visitingFee,
         editForm: true
      }, () => {
         this.handleCreateModalOpen()

      })
   }

   render() {
      return (
         <div>
            <BillingList editDoctor={this.editDoctor} />
            {this.renderCreateModal()}
            {/* <Fab onClick={this.handleCreateModalOpen} color="primary" variant="extended" aria-label="add" className="addIcon">
               <AddIcon />
               Add Billing
            </Fab> */}
         </div>
      );
   }
}


Billing.contextType = AppContext;

export default Billing;
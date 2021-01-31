import React, { Component } from 'react';
import { AppContext } from '../../context/AppContextProvider';
import TextField from '@material-ui/core/TextField';
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
import { addService } from "../../Api/service-api";
import ServiceList from './ServiceList/ServiceList';

class Service extends Component {

   state = {
      hospitalList: null,
      createModalOpen: false,
      submittingCreate: false,
      selectedHospital: null,
      name: null, hospital: null, charge: null,
      cover: null, image: null,
      inputError: {}
   }

   handleCreateModalOpen = () => {
      this.setState({
         createModalOpen: true
      })
   }

   handleCreateModalClose = () => {
      this.setState({
         createModalOpen: false
      })
   }

   handleNameChange = (event) => {
      this.setState({
         name: event.target.value
      })
   }

   handleChargeChange = (event) => {
      this.setState({
         charge: event.target.value
      })
   };

   handleHospitalChange = (event) => {
      this.setState({
         selectedHospital: event.target.value
      })
   }

   handleFormSubmit = () => {
      this.setState({
         submittingCreate: true
      }, () => {
         addService(this.state.name, this.state.selectedHospital, this.state.charge,
            "600bfdc59032b3a812a5a32d", ["600bfdc59032b3a812a5a32d"])
            .then((response) => {
               console.log(response);
               this.handleCreateModalClose();
               this.context.updateServiceList();
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
                           title="Add Service"
                        />
                        <CardContent>
                           <div className="form_wrapper">
                              <form noValidate autoComplete="off">
                                 <TextField
                                    error={this.state.inputError && this.state.inputError.name ? true : false}
                                    helperText={this.state.inputError && this.state.inputError.name}
                                    onChange={this.handleNameChange} id="standard-basic" label="Service Name" />
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
                                    error={this.state.inputError && this.state.inputError.charge ? true : false}
                                    helperText={this.state.inputError && this.state.inputError.charge}
                                    onChange={this.handleChargeChange} id="standard-basic" label="Charge" />

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

   handleHospitalChange = (id) => {
      // this.context.updateDoctorList(1, this.context.state.doctorTableRowNumber,
      //    this.context.state.doctorTableSort.sort, this.context.state.doctorTableSort.sortOrder, id)
      this.setState({
         hospitalList: this.state.hospitalList.map(item => {
            if (item._id === id)
               item['status'] = true;
            else
               item['status'] = false;

            return item;
         }),
         selectedHospital: id
      }, () => {
         this.context.updateDoctorList(1, this.context.state.doctorTableRowNumber,
            this.context.state.doctorTableSort.sort, this.context.state.doctorTableSort.sortOrder, this.state.selectedDiseaseCat,
            this.state.selectedHospital, this.state.searchQuery)

      })
   }

   render() {
      return (
         <div>
            <ServiceList />
            {this.renderCreateModal()}
            <Fab onClick={this.handleCreateModalOpen} color="primary" variant="extended" aria-label="add" className="addIcon">
               <AddIcon />
               Add Service
            </Fab>
         </div>
      );
   }
}



Service.contextType = AppContext;

export default Service;
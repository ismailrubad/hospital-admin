import React, { Component } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/AppContextProvider';
import { TextField, Button } from '@material-ui/core';
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
import ZoneList from './zoneList/ZoneList';
import { addZone, editZone } from "../../Api/zone-api";
import { fetchAllDistricts } from "../../Api/district-api";


class Zone extends Component {

   state = {
      zoneId: null, // used for editing a zone
      zoneName: "",
      selectedDistrict: "",
      createModalOpen: false,
      districtList: null,
      submittingCreate: false,
      inputError: {},
      editForm: false
   }

   handleZoneNameOnChange = (event) => {
      this.setState({
         zoneName: event.target.value
      })
   }

   handleCreateModalOpen = () => {
      this.setState({
         createModalOpen: true
      })
   }

   handleCreateModalClose = () => {
      this.setState({
         createModalOpen: false,
         zoneName: null, selectedDistrict: null
      })
   }

   handleDistrictChange = (event) => {
      this.setState({
         selectedDistrict: event.target.value
      })
   }

   handleFormSubmit = () => {

      if (this.state.editForm) {
         this.setState({
            submittingCreate: true
         }, () => {
            editZone(this.state.zoneId, this.state.zoneName, this.state.selectedDistrict)
               .then((response) => {
                  // console.log(response);
                  // this.context.addZoneToContext(response.data[0])
                  this.context.updateZoneList();
                  this.handleCreateModalClose();
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
            addZone(this.state.zoneName, this.state.selectedDistrict)
               .then((response) => {
                  // console.log(response);
                  // this.context.addZoneToContext(response.data[0])
                  this.context.updateZoneList();
                  this.handleCreateModalClose();
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
                           title={this.state.editForm ? "Edit Zone" : "Add Zone"}
                        />
                        <CardContent>
                           <div className="form_wrapper">
                              <form noValidate autoComplete="off">
                                 <TextField
                                    error={this.state.inputError && this.state.inputError.name ? true : false}
                                    helperText={this.state.inputError && this.state.inputError.name}
                                    value={this.state.zoneName}
                                    onChange={this.handleZoneNameOnChange} id="standard-basic" label="Zone Name" />
                                 <TextField
                                    id="standard-select-currency"
                                    select
                                    label="Select a district"
                                    error={this.state.inputError && this.state.inputError.district ? true : false}
                                    helperText={this.state.inputError && this.state.inputError.district}
                                    value={this.state.selectedDistrict}
                                    onChange={this.handleDistrictChange}
                                 >
                                    {
                                       this.state.districtList ?
                                          this.state.districtList.data.map((option) => (
                                             <MenuItem key={option._id} value={option._id}>
                                                {option.name}
                                             </MenuItem>
                                          )) : null
                                    }
                                 </TextField>
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

   editZone = (zone) => {
      console.log(zone)
      this.handleCreateModalOpen()
      this.setState({
         zoneId: zone._id,
         zoneName: zone.name,
         selectedDistrict: zone.district._id,
         editForm: true
      })
   }

   componentDidMount() {
      fetchAllDistricts().then((response) => {
         this.setState({
            districtList: response.data
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
   render() {
      // console.log(this.props)
      // console.log(this.state)
      return (
         <div className="  ">
            <ZoneList editZone={this.editZone} districtList={this.state.districtList ? this.state.districtList.data : []} />

            {this.renderCreateModal()}
            <Fab onClick={() => {
               this.setState({
                  editForm: false
               }, () => {
                  this.handleCreateModalOpen()
               })
            }} color="primary" variant="extended" aria-label="add" className="addIcon">
               <AddIcon />
               Add Zone
            </Fab>
         </div>
      );
   }
}

Zone.contextType = AppContext;

export default Zone;
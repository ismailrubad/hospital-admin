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
import HospitalList from './HospitalList/HospitalList'
import { fetchAllZones } from '../../Api/zone-api'
import { addHopital, editHospital } from '../../Api/hospital-api'
import ImageHandler from '../ImageHandlerModal/ImageHandlerModal'
import { Box } from '@material-ui/core';

class Hospital extends Component {

   state = {
      hospitalId: null,
      currency: "EUR",
      zone: "z1",
      createModalOpen: false,
      zoneList: null,
      hospitalName: null,
      selectedZone: null,
      discountAmount: null,
      discountAmountTotal: null,
      shortCode: null,
      description: null,
      submittingCreate: false,
      image: [],
      cover: "",
      inputError: {},

      imageModalOpen: false,
      imageModalCoverOpen: false
   }

   handleCreateModalOpen = () => {
      this.setState({
         createModalOpen: true
      })
   }

   handleCreateModalClose = () => {
      this.setState({
         createModalOpen: false,

         hospitalId: null,
         hospitalName: null,
         selectedZone: null,
         shortCode: null,
         discountAmount: null,
         address: null,
         editForm: false
      })
   }

   handleHospitalNameOnChange = (event) => {
      this.setState({
         hospitalName: event.target.value
      })
   }

   handleZoneChange = (event) => {
      this.setState({
         selectedZone: event.target.value
      })
   }

   handleDiscountAmountOnChange = (event) => {
      this.setState({
         discountAmount: event.target.value
      })
   };

   handleDiscountAmountTotalOnChange = (event) => {
      this.setState({
         discountAmountTotal: event.target.value
      })
   }

   handleAddressOnChange = (event) => {
      this.setState({
         address: event.target.value
      })
   };
   handleDescriptionOnChange = (event) => {
      this.setState({
         description: event.target.value
      })
   };

   handleShortCodeOnChange = (event) => {
      this.setState({
         shortCode: event.target.value
      })
   }

   handleFormSubmit = () => {
      if (this.state.editForm) {
         this.setState({
            submittingCreate: true
         }, () => {
            editHospital(this.state.hospitalId, this.state.hospitalName, this.state.selectedZone, this.state.shortCode,
               this.state.discountAmount, this.state.discountAmountTotal, this.state.address, "789-461-3214", {
               "latitude": 71.8998,
               "longitude": 125.8464
            }, this.state.image, this.state.cover[0], this.state.description)
               .then((response) => {
                  console.log(response);
                  this.handleCreateModalClose();
                  this.context.updateHospitalList();
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
            addHopital(this.state.hospitalName, this.state.selectedZone, this.state.shortCode,
               this.state.discountAmount, this.state.discountAmountTotal, this.state.address, "789-461-3214", {
               "latitude": 71.8998,
               "longitude": 125.8464
            }, this.state.image, this.state.cover[0], this.state.description)
               .then((response) => {
                  console.log(response);
                  this.handleCreateModalClose();
                  this.context.updateHospitalList();
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

   getImageDataFromModalOne = (imageInfo) => {
      console.log(imageInfo)
      this.setState({ image: imageInfo })
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


   handleImageModalClose = () => {
      console.log("closed")
      this.setState({
         imageModalOpen: false
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
                           title={this.state.editForm ? "Edit Hospital" : "Add Hospital"}
                        />
                        <CardContent>
                           <div className="form_wrapper" style={{ maxHeight: 500, overflowY: "scroll" }}>
                              <form noValidate autoComplete="off">
                                 <TextField
                                    value={this.state.hospitalName}
                                    error={this.state.inputError && this.state.inputError.name ? true : false}
                                    helperText={this.state.inputError && this.state.inputError.name}
                                    onChange={this.handleHospitalNameOnChange} id="standard-basic" label="Hospital Name" />
                                 <TextField
                                    id="standard-select-currency"
                                    select
                                    label="Select a zone"
                                    error={this.state.inputError && this.state.inputError.district ? true : false}
                                    helperText={this.state.inputError && this.state.inputError.district}
                                    value={this.state.selectedZone}
                                    onChange={this.handleZoneChange}
                                 >
                                    {
                                       this.state.zoneList ?
                                          this.state.zoneList.data.map((option) => (
                                             <MenuItem key={option._id} value={option._id}>
                                                {option.name}
                                             </MenuItem>
                                          )) : null
                                    }
                                 </TextField>
                                 <Box mb={2}>
                                    <Button onClick={() => this.setState({ imageModalCoverOpen: true })}
                                       variant="contained" color="primary">Upload Cover Image</Button>
                                    {this.state.cover ?
                                       <Box display="inline" ml={2}>
                                          Cover image selected</Box> : null
                                    }
                                 </Box>
                                 <ImageHandler prevSelectedImageIds={this.state.cover} selectOneMood={true} getImageData={this.getImageDataFromModalCover}
                                    handleClose={this.handleImageModalCoverClose}
                                    open={this.state.imageModalCoverOpen} />

                                 <Box>
                                    <Button onClick={() => this.setState({ imageModalOpen: true })}
                                       variant="contained" color="primary">Upload gallery Images</Button>
                                    {this.state.image.length > 0 ?
                                       <Box display="inline" ml={2}>
                                          {this.state.image.length} images selected</Box> : null
                                    }
                                 </Box>
                                 <ImageHandler prevSelectedImageIds={this.state.image} selectOneMood={false}
                                    getImageData={this.getImageDataFromModalOne}
                                    handleClose={this.handleImageModalClose}
                                    open={this.state.imageModalOpen} />
                                 <TextField
                                    value={this.state.discountAmount}
                                    error={this.state.inputError && this.state.inputError.discountAmount ? true : false}
                                    helperText={this.state.inputError && this.state.inputError.discountAmount}
                                    onChange={this.handleDiscountAmountOnChange} id="standard-basic" label="Discount Amount" />
                                 <TextField
                                    value={this.state.discountAmountTotal}
                                    error={this.state.inputError && this.state.inputError.discountAmountTotal ? true : false}
                                    helperText={this.state.inputError && this.state.inputError.discountAmountTotal}
                                    onChange={this.handleDiscountAmountTotalOnChange} id="standard-basic" label="Discount Amount Total" />
                                 <TextField
                                    value={this.state.shortCode}
                                    error={this.state.inputError && this.state.inputError.shortCode ? true : false}
                                    helperText={this.state.inputError && this.state.inputError.shortCode}
                                    onChange={this.handleShortCodeOnChange} id="standard-basic" label="Short Code" />
                                 <TextField
                                    value={this.state.address}
                                    error={this.state.inputError && this.state.inputError.address ? true : false}
                                    helperText={this.state.inputError && this.state.inputError.address}
                                    onChange={this.handleAddressOnChange} id="standard-basic" label="Address" />
                                 <TextField
                                    value={this.state.description}
                                    error={this.state.inputError && this.state.inputError.description ? true : false}
                                    helperText={this.state.inputError && this.state.inputError.description}
                                    onChange={this.handleDescriptionOnChange} id="standard-basic" label="Description" />
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


   editHospital = (hospital) => {
      this.handleCreateModalOpen()

      // this.state.hospitalName, this.state.selectedZone, this.state.shortCode,
      //       this.state.discountAmount, this.state.address

      this.setState({
         hospitalId: hospital._id,
         hospitalName: hospital.name,
         selectedZone: hospital.zone,
         shortCode: hospital.shortCode,
         discountAmount: hospital.discountAmount,
         address: hospital.address,
         editForm: true
      })
   }

   componentDidMount() {
      fetchAllZones().then((response) => {
         this.setState({
            zoneList: response.data
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
      console.log(this.state.image)
      return (
         <div>
            <HospitalList editHospital={this.editHospital} />
            {this.renderCreateModal()}
            <Fab onClick={this.handleCreateModalOpen} color="primary" variant="extended" aria-label="add" className="addIcon">
               <AddIcon />
               Add Hospital
            </Fab>
         </div>
      )
   }
}

Hospital.contextType = AppContext;

export default Hospital;
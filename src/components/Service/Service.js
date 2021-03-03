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
import { addService, editService } from "../../Api/service-api";
import ServiceList from './ServiceList/ServiceList';
import ImageHandler from '../ImageHandlerModal/ImageHandlerModal'
import { Box } from '@material-ui/core';

class Service extends Component {

   state = {
      hospitalList: null,
      createModalOpen: false,
      submittingCreate: false,
      selectedHospital: null,
      name: null, hospital: null, charge: null,
      cover: null, image: null, description: null,
      editForm: false,
      image: [],
      inputError: {}
   }

   handleCreateModalOpen = () => {
      this.setState({
         createModalOpen: true
      })
   }

   handleCreateModalClose = () => {
      this.setState({
         editForm: false,
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

   handleDescriptionChange = (event) => {
      this.setState({
         description: event.target.value
      })
   };

   handleHospitalChange = (event) => {
      this.setState({
         selectedHospital: event.target.value
      })
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

   getImageDataFromModalOne = (imageInfo) => {
      console.log(imageInfo)
      this.setState({ image: imageInfo })
   }

   handleImageModalClose = () => {
      console.log("closed")
      this.setState({
         imageModalOpen: false
      })
   }

   handleFormSubmit = () => {
      if (this.state.editForm) {
         this.setState({
            submittingCreate: true
         }, () => {
            editService(this.state.serviceId, this.state.name, this.state.selectedHospital, this.state.charge,
               "600bfdc59032b3a812a5a32d", ["600bfdc59032b3a812a5a32d"], this.state.description)
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
      else {
         this.setState({
            submittingCreate: true
         }, () => {
            addService(this.state.name, this.state.selectedHospital, this.state.charge,
               this.state.cover[0], this.state.image, this.state.description)
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
                           title={this.state.editForm ? "Edit Service" : "Add Service"}
                        />
                        <CardContent>
                           <div className="form_wrapper">
                              <form noValidate autoComplete="off">
                                 <TextField
                                    value={this.state.name}
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
                                 <Box mb={2}>
                                    <Button onClick={() => this.setState({ imageModalCoverOpen: true })}
                                       variant="contained" color="primary">Upload Cover Image</Button>
                                    {this.state.cover && this.state.cover.length > 0 ?
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
                                    value={this.state.charge}
                                    error={this.state.inputError && this.state.inputError.charge ? true : false}
                                    helperText={this.state.inputError && this.state.inputError.charge}
                                    onChange={this.handleChargeChange} id="standard-basic" label="Charge" />

                                 <TextField
                                    value={this.state.description}
                                    error={this.state.inputError && this.state.inputError.description ? true : false}
                                    helperText={this.state.inputError && this.state.inputError.description}
                                    onChange={this.handleDescriptionChange} id="standard-basic" label="Description" />

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


   editService = (service) => {
      console.log(service)
      this.setState({
         serviceId: service._id,
         name: service.name,
         cover: service.cover ? [service.cover._id] : [],
         image: service.image.map((item) => item._id),
         selectedHospital: service.hospital._id,
         charge: service.charge,
         description: service.description,
         editForm: true
      }, () => {
         this.handleCreateModalOpen();
      })
   }


   render() {
      return (
         <div>
            <ServiceList editService={this.editService} />
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
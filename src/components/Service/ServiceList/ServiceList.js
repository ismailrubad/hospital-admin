import React, { Component } from 'react';
import { AppContext } from '../../../context/AppContextProvider';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import Pagination from '@material-ui/lab/Pagination';
import { fetchZoneList } from "../../../Api/zone-api";
import { Box, CircularProgress } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import CardHeader from '@material-ui/core/CardHeader';
import CloseIcon from '@material-ui/icons/Close';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { fetchAllHospital } from "../../../Api/hospital-api";

import { fetchServiceDetails, deleteService } from "../../../Api/service-api";

class ServiceList extends Component {

   state = {
      currentPage: 1,
      serviceTableSort: {
         sort: "name",
         sortOrder: 1
      },
      serviceDetails: null,
      serviceDetailsModalOpen: false,
      isloading: false,
      searchQuery: null
   }

   startLoading = () => {
      this.setState({ isloading: true })
   };


   stopLoading = () => {
      this.setState({ isloading: false })
   };


   handleServiceDelete = (id) => {

      var r = window.confirm("Do you want to delete the item?");
      if (r == true) {
         deleteService(id)
            .then((response) => {
               console.log(response);
               this.context.updateServiceList()
            })
            .catch(function (error) {
               console.log(error);
            })
            .then(function () {
               // always executed
            });
      } else {

      }
   }

   handleRowChange = (event) => {
      console.log(event.target.value)
      // this.context.updateServiceTableRowNumber(event.target.value)
      this.context.updateServiceList(1, event.target.value, this.context.state.serviceTableSort.sort,
         this.context.state.serviceTableSort.sortOrder, this.state.selectedHospital, this.state.searchQuery)
   }

   handleServiceEdit = (id) => {
      console.log(id)
   }


   handlePaginationClick = (event, value) => {
      // this.startLoading();
      // this.context.updateCurrentServicelistPageNumber(value, this.stopLoading)
      this.context.updateServiceList(value, this.context.state.serviceTableRowNumber, this.context.state.serviceTableSort.sort,
         this.context.state.serviceTableSort.sortOrder, this.state.selectedHospital, this.state.searchQuery)
   }

   handleSortClick = (sort) => {
      this.setState(preState => {
         return {
            serviceTableSort: {
               sort,
               sortOrder: preState.serviceTableSort.sortOrder == 1 ? -1 : 1
            },
            currentPage: 1
         }
      }, () => {
         // console.log(this.state)
         // this.context.sortServicetable(this.state.serviceTableSort.sort, this.state.serviceTableSort.sortOrder)
         this.context.updateServiceList(1, this.context.state.serviceTableRowNumber, this.state.serviceTableSort.sort,
            this.state.serviceTableSort.sortOrder, this.state.selectedHospital, this.state.searchQuery)
      })
   }

   handleServiceDetailsModalOpen = () => {
      this.setState({
         serviceDetailsModalOpen: true
      })
   }

   handleServiceDetailsModalClose = () => {
      this.setState({
         serviceDetailsModalOpen: false
      })
   }

   renderServiceDetailsModal = () => {
      return (
         <Modal
            className="modal"
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={this.state.serviceDetailsModalOpen}
            onClose={this.handleServiceDetailsModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
               timeout: 500,
            }}
         >
            <Fade in={this.state.serviceDetailsModalOpen}>
               <Grid container spacing={3}>
                  <Grid item xs={6} className="col_center">
                     <Card>
                        <CardHeader
                           action={
                              <IconButton onClick={this.handleServiceDetailsModalClose} aria-label="settings">
                                 <CloseIcon />
                              </IconButton>
                           }
                           title="Service Details"
                        />
                        <CardContent>
                           {
                              this.state.serviceDetails ?


                                 <TableContainer component={Paper}>
                                    {this.state.serviceDetails.cover ?
                                       <div style={{
                                          height: 200, backgroundSize: 'cover', backgroundPosition: 'center', marginBottom: 10,
                                          backgroundImage: `url(http://3.6.216.223${this.state.serviceDetails.cover.full})`
                                       }}>

                                       </div> : null
                                    }
                                    <Table size="small" aria-label="simple table">

                                       <TableBody>
                                          <TableRow>
                                             <TableCell align=""><strong>Service Name</strong></TableCell>
                                             <TableCell align="">{this.state.serviceDetails.name}</TableCell>
                                          </TableRow>
                                          <TableRow>
                                             <TableCell align=""><strong>Charge</strong></TableCell>
                                             <TableCell align="">{this.state.serviceDetails.charge}</TableCell>
                                          </TableRow>
                                          <TableRow>
                                             <TableCell align=""><strong>Hospital Name</strong></TableCell>
                                             <TableCell align="">{this.state.serviceDetails.hospital ?
                                                this.state.serviceDetails.hospital.name : null}</TableCell>
                                          </TableRow>
                                          <TableRow>
                                             <TableCell align=""><strong>Hospital Address</strong></TableCell>
                                             <TableCell align="">{this.state.serviceDetails.hospital ?
                                                this.state.serviceDetails.hospital.address : null}</TableCell>
                                          </TableRow>
                                          <TableRow>
                                             <TableCell align=""><strong>Description</strong></TableCell>
                                             <TableCell align="">{this.state.serviceDetails.description}</TableCell>
                                          </TableRow>
                                          <TableRow>
                                             <TableCell align=""><strong>Images</strong></TableCell>
                                             <TableCell align="">
                                                {
                                                   this.state.serviceDetails.image ?
                                                      this.state.serviceDetails.image.map(item => {

                                                         return (<Box display="inline" mr={1}>
                                                            <img src={`http://3.6.216.223${item.thumbnail}`} />
                                                         </Box>)

                                                      }) : null
                                                }
                                             </TableCell>
                                          </TableRow>
                                       </TableBody>
                                    </Table>
                                 </TableContainer>

                                 // <Grid container spacing={3}>
                                 //    <Grid item xs={6}>
                                 //       <Box display="flex">
                                 //          <Typography variant="h6" component="h6" gutterBottom>
                                 //             Zone Name: </Typography>
                                 //       </Box>
                                 //    </Grid>
                                 //    <Grid item xs={6}>
                                 //       <Box alignItems="center" display="flex" style={{ height: '100%' }}>
                                 //          <Typography variant="body1" gutterBottom>{this.state.serviceDetails.name}</Typography>
                                 //       </Box>
                                 //    </Grid>
                                 // </Grid>
                                 : null
                           }
                        </CardContent>
                     </Card>
                  </Grid>
               </Grid>
            </Fade>
         </Modal >
      )
   }

   handleServiceDetails = (id) => {
      fetchServiceDetails(id).then((response) => {
         this.setState({
            serviceDetails: response.data
         }, () => {
            this.setState({
               serviceDetailsModalOpen: true
            })
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

   handleSearchQueryChange = (searchQuery) => {
      // this.context.updateDoctorList(1, this.context.state.doctorTableRowNumber,
      //    this.context.state.doctorTableSort.sort, this.context.state.doctorTableSort.sortOrder, id)
      this.setState({
         searchQuery
      }, () => {

         this.context.updateServiceList(1, this.context.state.serviceTableRowNumber, this.state.serviceTableSort.sort,
            this.state.serviceTableSort.sortOrder, this.state.selectedHospital, this.state.searchQuery)

      })
   }

   handleHospitalChange = (id) => {
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
         this.context.updateServiceList(1, this.context.state.serviceTableRowNumber, this.state.serviceTableSort.sort,
            this.state.serviceTableSort.sortOrder, this.state.selectedHospital, this.state.searchQuery)

      })
   }

   componentDidMount() {
      this.context.updateServiceList();
      fetchAllHospital().then((response) => {
         this.setState({
            hospitalList: response.data.data.map(item => {
               item['status'] = false;
               return item;
            })
         });

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
      return (
         <>
            <Grid container spacing={3}>

               <Grid item xs={3}>
                  <Card>
                     <CardContent>
                        <Typography variant="h6" gutterBottom>Filter By</Typography>
                        <Box mb={2}>
                           <TextField onChange={(e) => { this.handleSearchQueryChange(e.target.value) }} id="standard-basic" label="Search By Name" />
                        </Box>
                        <Accordion>
                           <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel2a-content"
                              id="panel2a-header"
                           >
                              <Typography >Hospital</Typography>
                           </AccordionSummary>
                           <AccordionDetails>
                              <div className="accMaxHight">

                                 {this.state.hospitalList ?

                                    this.state.hospitalList.map((item) => {
                                       return (
                                          <div>
                                             <FormControlLabel
                                                control={
                                                   <Checkbox
                                                      checked={item.status}
                                                      onChange={() => {
                                                         this.handleHospitalChange(item._id)
                                                      }}
                                                      name="checkedB"
                                                      color="primary"
                                                   />
                                                }
                                                label={item.name}
                                             />
                                          </div>

                                       )
                                    })

                                    : null
                                 }
                              </div>
                           </AccordionDetails>
                        </Accordion>
                     </CardContent>
                  </Card>
               </Grid>
               <Grid item xs={9}>
                  {this.context.state.serviceList ?
                     <div className="table_wrapper">
                        {this.state.isloading &&
                           <div className="loader_area">
                              <CircularProgress />
                           </div>
                        }
                        <TableContainer style={{ maxHeight: 500, }} component={Paper}>
                           <Table stickyHeader={true} aria-label="simple table" size="small" >
                              <TableHead>
                                 <TableRow>
                                    <TableCell>Service Name <IconButton onClick={() => { this.handleSortClick("name") }}>
                                       {
                                          this.state.serviceTableSort.sort == "name" ?
                                             this.state.serviceTableSort.sortOrder == 1 ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />
                                             : <ArrowUpwardIcon style={{ opacity: .2 }} />
                                       }

                                    </IconButton></TableCell>
                                    <TableCell align="">Hospital</TableCell>
                                    <TableCell align="">charge <IconButton onClick={() => { this.handleSortClick("charge") }}>
                                       {
                                          this.state.serviceTableSort.sort == "charge" ?
                                             this.state.serviceTableSort.sortOrder == 1 ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />
                                             : <ArrowUpwardIcon style={{ opacity: .2 }} />
                                       }

                                    </IconButton></TableCell>
                                    <TableCell align="">Actions</TableCell>
                                 </TableRow>
                              </TableHead>
                              <TableBody>
                                 {
                                    this.context.state.serviceList ?
                                       this.context.state.serviceList.data.map((row) => (

                                          <TableRow key={row._id}>
                                             <TableCell component="th" scope="row">{row.name}</TableCell>
                                             <TableCell align="">{row.hospital ? row.hospital.name : null} </TableCell>
                                             <TableCell align="">{row.charge} </TableCell>
                                             <TableCell align="">
                                                <IconButton onClick={() => this.handleServiceDetails(row._id)} aria-label="delete">
                                                   <VisibilityIcon />
                                                </IconButton>
                                                <IconButton onClick={() => this.props.editService(row)} aria-label="delete">
                                                   <EditIcon />
                                                </IconButton>
                                                <IconButton onClick={() => this.handleServiceDelete(row._id)} aria-label="delete">
                                                   <DeleteIcon />
                                                </IconButton>
                                             </TableCell>
                                          </TableRow>
                                       )) : null
                                 }
                              </TableBody>

                           </Table>

                        </TableContainer>
                        <Card>
                           <Box p={2} justifyContent="flex-end" display="flex">
                              <div className="pageRowWp">
                                 <span>Page per row</span>
                                 <TextField

                                    style={{ maxWidth: 50, margin: 0 }}
                                    id="standard-select-currency-native"
                                    select
                                    onChange={this.handleRowChange}
                                    SelectProps={{
                                       native: true,
                                    }}
                                 >
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                 </TextField>
                              </div>
                              <Pagination variant="outlined" page={this.context.state.currentServicelistPageNumber} shape="rounded" count={this.context.state.serviceList.page.totalPage}
                                 onChange={(event, value) => { this.handlePaginationClick(event, value) }} />
                           </Box>
                        </Card>
                     </div> : "no data found"
                  }
               </Grid>
            </Grid>
            {this.renderServiceDetailsModal()}
         </>
      );
   }
}

ServiceList.contextType = AppContext;

export default ServiceList;
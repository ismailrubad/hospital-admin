import React, { Component } from 'react';
import { AppContext } from '../../../context/AppContextProvider';
import '../style.css';
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
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import CloseIcon from '@material-ui/icons/Close';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { fetchAllDiseaseCat } from "../../../Api/disease-api";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import { fetchBillingDetails } from "../../../Api/billing-api";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class billingList extends Component {

   state = {
      diseaseCatList: [],
      hospitalList: [],
      selectedDiseaseCat: null,
      selectedHospital: null,
      searchQuery: null,

      currentPage: 1,
      doctorTableSort: {
         sort: "name",
         sortOrder: 1
      },
      billingDetails: null,
      billingDetailsModalOpen: false,
      isloading: false
   }

   startLoading = () => {
      this.setState({ isloading: true })
   };


   stopLoading = () => {
      this.setState({ isloading: false })
   };


   handleDoctorDelete = (id) => {
      // var r = window.confirm("Do you want to delete the item?");
      // if (r == true) {
      //    deleteDoctor(id)
      //       .then((response) => {
      //          console.log(response);
      //          this.context.updatebillingList()
      //       })
      //       .catch(function (error) {
      //          console.log(error);
      //       })
      //       .then(function () {
      //          // always executed
      //       });
      // } else {

      // }
   }

   handleRowChange = (event) => {
      // console.log(event.target.value)
      // this.setState({
      //    currentPage: 1
      // })

      this.context.updatebillingList(1, event.target.value,
         this.context.state.doctorTableSort.sort, this.context.state.doctorTableSort.sortOrder, this.state.selectedDiseaseCat,
         this.state.selectedHospital, this.state.searchQuery)
   }

   handleDoctorEdit = (id) => {
      console.log(id)
   }


   handlePaginationClick = (event, value) => {
      // this.startLoading();
      // this.setState({
      //    currentPage: value
      // })
      // this.context.updateCurrentbillingListPageNumber(value, this.stopLoading)
      this.context.updatebillingList(value, this.context.state.doctorTableRowNumber,
         this.context.state.doctorTableSort.sort, this.context.state.doctorTableSort.sortOrder, this.state.selectedDiseaseCat,
         this.state.selectedHospital, this.state.searchQuery)
   }

   handleSortClick = (sort) => {
      this.setState(preState => {
         return {
            doctorTableSort: {
               sort,
               sortOrder: preState.doctorTableSort.sortOrder == 1 ? -1 : 1
            },
            currentPage: 1
         }
      }, () => {
         console.log(this.state)
         // this.context.sortDoctortable(this.state.doctorTableSort.sort, this.state.doctorTableSort.sortOrder)
         this.context.updatebillingList(1, this.context.state.doctorTableRowNumber,
            this.state.doctorTableSort.sort, this.state.doctorTableSort.sortOrder, this.state.selectedDiseaseCat,
            this.state.selectedHospital, this.state.searchQuery)
      })
   }

   handlebillingDetailsModalOpen = () => {
      this.setState({
         billingDetailsModalOpen: true
      })
   }

   handleDoctorDetailsModalClose = () => {
      this.setState({
         billingDetailsModalOpen: false
      })
   }

   renderDoctorDetailsModal = () => {
      return (
         <Modal
            className="modal"
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={this.state.billingDetailsModalOpen}
            onClose={this.handleDoctorDetailsModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
               timeout: 500,
            }}
         >
            <Fade in={this.state.billingDetailsModalOpen}>
               <Grid container spacing={3}>
                  <Grid item xs={6} className="col_center">
                     <Card>
                        <CardHeader
                           action={
                              <IconButton onClick={this.handleDoctorDetailsModalClose} aria-label="settings">
                                 <CloseIcon />
                              </IconButton>
                           }
                           title="Details"
                        />
                        <CardContent>
                           {
                              this.state.billingDetails ?

                                 <TableContainer component={Paper}>
                                    {/* <p>{this.state.billingDetails.image}</p> */}

                                    {this.state.billingDetails.image ?
                                       <div style={{
                                          height: 200, backgroundSize: 'cover', backgroundPosition: 'center', marginBottom: 10,
                                          backgroundImage: `url(http://3.6.216.223/${this.state.billingDetails.image.full})`
                                       }}>

                                       </div> : null
                                    }
                                    <Table size="small" aria-label="simple table">

                                       <TableBody>
                                          <TableRow>
                                             <TableCell align=""><strong>Hospital Name</strong></TableCell>
                                             <TableCell align="">{this.state.billingDetails.hospital.name}</TableCell>
                                          </TableRow>
                                          <TableRow>
                                             <TableCell align=""><strong>Hospital Address</strong></TableCell>
                                             <TableCell align="">{this.state.billingDetails.hospital.address}</TableCell>
                                          </TableRow>
                                          <TableRow>
                                             <TableCell align=""><strong>Hospital Discount</strong></TableCell>
                                             <TableCell align="">{this.state.billingDetails.hospital.discountAmount}</TableCell>
                                          </TableRow>
                                          <TableRow>
                                             <TableCell align=""><strong>Hospital Phone</strong></TableCell>
                                             <TableCell align="">{this.state.billingDetails.hospital.phone}</TableCell>
                                          </TableRow>
                                       </TableBody>
                                    </Table>
                                 </TableContainer>
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

   handleDoctorDetails = (id) => {
      fetchBillingDetails(id).then((response) => {
         this.setState({
            billingDetails: response.data
         }, () => {
            this.setState({
               billingDetailsModalOpen: true
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

   componentDidMount() {

      this.context.updateBillingList();

   }

   handleDiseaseCatChange = (id) => {
      // this.context.updatebillingList(1, this.context.state.doctorTableRowNumber,
      //    this.context.state.doctorTableSort.sort, this.context.state.doctorTableSort.sortOrder, id)
      this.setState({
         diseaseCatList: this.state.diseaseCatList.map(item => {
            if (item._id === id)
               item['status'] = true;
            else
               item['status'] = false;

            return item;
         }),
         selectedDiseaseCat: id
      }, () => {

         this.context.updatebillingList(1, this.context.state.doctorTableRowNumber,
            this.context.state.doctorTableSort.sort, this.context.state.doctorTableSort.sortOrder, this.state.selectedDiseaseCat,
            this.state.selectedHospital, this.state.searchQuery)

         // let selectedDiseaseCalList = [];

         // this.state.diseaseCatList.map(item => {
         //    if (item.status) selectedDiseaseCalList.push(item._id)
         // })

         // this.setState({
         //    selectedDiseaseCalList
         // }, () => {
         //    this.context.updatebillingList(1, this.context.state.doctorTableRowNumber,
         //       this.context.state.doctorTableSort.sort, this.context.state.doctorTableSort.sortOrder, this.state.selectedDiseaseCalList)
         // })

      });
   }

   handleHospitalChange = (id) => {
      // this.context.updatebillingList(1, this.context.state.doctorTableRowNumber,
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
         this.context.updatebillingList(1, this.context.state.doctorTableRowNumber,
            this.context.state.doctorTableSort.sort, this.context.state.doctorTableSort.sortOrder, this.state.selectedDiseaseCat,
            this.state.selectedHospital, this.state.searchQuery)

      })
   }

   handleSearchQueryChange = (searchQuery) => {
      // this.context.updatebillingList(1, this.context.state.doctorTableRowNumber,
      //    this.context.state.doctorTableSort.sort, this.context.state.doctorTableSort.sortOrder, id)
      this.setState({
         searchQuery
      }, () => {
         this.context.updatebillingList(1, this.context.state.doctorTableRowNumber,
            this.context.state.doctorTableSort.sort, this.context.state.doctorTableSort.sortOrder, this.state.selectedDiseaseCat,
            this.state.selectedHospital, this.state.searchQuery)

      })
   }

   render() {
      // console.log(this.props)
      console.log(this.state)
      return (
         <>
            <Grid container spacing={3}>

               <Grid item xs={12}>
                  {this.context.state.billingList ?
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
                                    <TableCell align="">Customer</TableCell>
                                    <TableCell>Hospital Name <IconButton onClick={() => { this.handleSortClick("hospital") }}>
                                       {
                                          this.state.doctorTableSort.sort == "hospital" ?
                                             this.state.doctorTableSort.sortOrder == 1 ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />
                                             : <ArrowUpwardIcon style={{ opacity: .2 }} />
                                       }

                                    </IconButton></TableCell>
                                    <TableCell align="">Discount Amount</TableCell>
                                    <TableCell align="">Date <IconButton onClick={() => { this.handleSortClick("date") }}>
                                       {
                                          this.state.doctorTableSort.sort == "date" ?
                                             this.state.doctorTableSort.sortOrder == 1 ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />
                                             : <ArrowUpwardIcon style={{ opacity: .2 }} />
                                       }

                                    </IconButton></TableCell>
                                    <TableCell align="">Actions</TableCell>
                                 </TableRow>
                              </TableHead>
                              <TableBody>
                                 {

                                    this.context.state.billingList.data.length > 0 ?
                                       this.context.state.billingList.data.map((row) => (

                                          <TableRow key={row._id}>
                                             <TableCell align="">{row.customer ? row.customer.name : null} </TableCell>
                                             <TableCell component="th" scope="row">{row.hospital ? row.hospital.name : null}</TableCell>
                                             <TableCell align="">{row.discountAmount} </TableCell>
                                             <TableCell align="">{row.created} </TableCell>
                                             <TableCell align="">
                                                <IconButton onClick={() => this.handleDoctorDetails(row._id)} aria-label="delete">
                                                   <VisibilityIcon />
                                                </IconButton>
                                                <IconButton onClick={() => this.props.editDoctor(row)} aria-label="delete">
                                                   <EditIcon />
                                                </IconButton>
                                                <IconButton onClick={() => this.handleDoctorDelete(row._id)} aria-label="delete">
                                                   <DeleteIcon />
                                                </IconButton>
                                             </TableCell>
                                          </TableRow>
                                       )) : <TableCell colSpan={5} align="center" component="th" scope="row">No Data Found</TableCell>

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
                                    value={this.context.state.billingTableRowNumber}
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
                              <Pagination variant="outlined" shape="rounded"
                                 page={this.context.state.currentBillinglistPageNumber} count={this.context.state.billingList.page.totalPage}
                                 onChange={(event, value) => { this.handlePaginationClick(event, value) }} />
                           </Box>
                        </Card>
                     </div> : "no data found"
                  }
               </Grid>
            </Grid>

            {this.renderDoctorDetailsModal()}
         </>
      );
   }
}

billingList.contextType = AppContext;

export default billingList;
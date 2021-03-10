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
import { fetchPaymentDetails, deletePayment } from "../../../Api/payment-api";
import { fetchAllHospital } from "../../../Api/hospital-api";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Slider from '@material-ui/core/Slider';

class PaymentList extends Component {

   state = {
      diseaseCatList: [],
      hospitalList: [],
      selectedDiseaseCat: null,
      selectedHospital: null,
      searchQuery: null,

      currentPage: 1,
      paymentTableSort: {
         sort: "name",
         sortOrder: 1
      },
      paymentDetails: null,
      doctorDetailsModalOpen: false,
      amountLessThan: null,
      amountGreaterThan: null,
      isloading: false
   }

   startLoading = () => {
      this.setState({ isloading: true })
   };


   stopLoading = () => {
      this.setState({ isloading: false })
   };


   handleDoctorDelete = (id) => {
      var r = window.confirm("Do you want to delete the item?");
      if (r == true) {
         deletePayment(id)
            .then((response) => {
               console.log(response);
               this.context.updatePaymentList()
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
      // console.log(event.target.value)
      // this.setState({
      //    currentPage: 1
      // })

      this.context.updatePaymentList(1, event.target.value,
         this.context.state.paymentTableSort.sort, this.context.state.paymentTableSort.sortOrder)
   }

   handleDoctorEdit = (id) => {
      console.log(id)
   }


   handlePaginationClick = (event, value) => {
      // this.startLoading();
      // this.setState({
      //    currentPage: value
      // })
      // this.context.updateCurrentDoctorlistPageNumber(value, this.stopLoading)
      this.context.updatePaymentList(value, this.context.state.paymentTableRowNumber,
         this.context.state.paymentTableSort.sort, this.context.state.paymentTableSort.sortOrder)
   }

   handleSortClick = (sort) => {
      this.setState(preState => {
         return {
            paymentTableSort: {
               sort,
               sortOrder: preState.paymentTableSort.sortOrder == 1 ? -1 : 1
            },
            currentPage: 1
         }
      }, () => {
         console.log(this.state)
         // this.context.sortDoctortable(this.state.doctorTableSort.sort, this.state.doctorTableSort.sortOrder)
         this.context.updatePaymentList(1, this.context.state.paymentTableRowNumber,
            this.state.paymentTableSort.sort, this.state.paymentTableSort.sortOrder)
      })
   }

   handleDoctorDetailsModalOpen = () => {
      this.setState({
         doctorDetailsModalOpen: true
      })
   }

   handleDoctorDetailsModalClose = () => {
      this.setState({
         doctorDetailsModalOpen: false
      })
   }

   renderDetailsModal = () => {
      return (
         <Modal
            className="modal"
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={this.state.doctorDetailsModalOpen}
            onClose={this.handleDoctorDetailsModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
               timeout: 500,
            }}
         >
            <Fade in={this.state.doctorDetailsModalOpen}>
               <Grid container spacing={3}>
                  <Grid item xs={6} className="col_center">
                     <Card>
                        <CardHeader
                           action={
                              <IconButton onClick={this.handleDoctorDetailsModalClose} aria-label="settings">
                                 <CloseIcon />
                              </IconButton>
                           }
                           title="Payment Details"
                        />
                        <CardContent>
                           {
                              this.state.paymentDetails ?

                                 <TableContainer component={Paper}>
                                    <Table size="small" aria-label="simple table">

                                       <TableBody>
                                          <TableRow>
                                             <TableCell align=""><strong>Hospital Name</strong></TableCell>
                                             <TableCell align="">{this.state.paymentDetails.hospital.name}</TableCell>
                                          </TableRow>
                                          <TableRow>
                                             <TableCell align=""><strong>Amount</strong></TableCell>
                                             <TableCell align="">{this.state.paymentDetails.amount}</TableCell>
                                          </TableRow>
                                          <TableRow>
                                             <TableCell align=""><strong>Payment Method</strong></TableCell>
                                             <TableCell align="">{this.state.paymentDetails.paymentMethod}</TableCell>
                                          </TableRow>
                                          <TableRow>
                                             <TableCell align=""><strong>Payment Status</strong></TableCell>
                                             <TableCell align="">{this.state.paymentDetails.paymentStatus}</TableCell>
                                          </TableRow>
                                          <TableRow>
                                             <TableCell align=""><strong>Date</strong></TableCell>
                                             <TableCell align="">{`${new Date(this.state.paymentDetails.created).getDate()} / ${new Date(this.state.paymentDetails.created).getMonth()} / ${new Date(this.state.paymentDetails.created).getFullYear()}`}</TableCell>
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
      fetchPaymentDetails(id).then((response) => {
         this.setState({
            paymentDetails: response.data
         }, () => {
            this.setState({
               doctorDetailsModalOpen: true
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

      this.context.updatePaymentList();
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



   handleHospitalChange = (id) => {
      this.setState({
         hospitalList: this.state.hospitalList.map(item => {
            if (item._id === id) {
               if (item.status)
                  item['status'] = false;
               else
                  item['status'] = true;
            }
            return item;
         }),
      }, () => {
         let selectedHospital = [];
         this.state.hospitalList.map(itemList => {
            if (itemList.status === true) {
               selectedHospital = [...selectedHospital, itemList._id]
            }
         })
         this.setState({
            selectedHospital: selectedHospital.toString()
         }, () => {
            this.context.updatePaymentList(1, this.context.state.paymentTableRowNumber,
               this.context.state.paymentTableSort.sort, this.context.state.paymentTableSort.sortOrder,
               this.state.selectedHospital)
         })

      })

   }

   handleAmountLessThanSlider = (event, newValue) => {
      this.setState({
         amountLessThan: newValue
      }, () => {
         this.context.updatePaymentList(1, this.context.state.paymentTableRowNumber,
            this.context.state.paymentTableSort.sort, this.context.state.paymentTableSort.sortOrder,
            this.state.selectedHospital, this.state.amountLessThan, this.state.amountGreaterThan)
      })
   }


   handleAmountGreaterThanSlider = (event, newValue) => {
      this.setState({
         amountGreaterThan: newValue
      }, () => {
         this.context.updatePaymentList(1, this.context.state.paymentTableRowNumber,
            this.context.state.paymentTableSort.sort, this.context.state.paymentTableSort.sortOrder,
            this.state.selectedHospital, this.state.amountLessThan, this.state.amountGreaterThan)
      })
   }

   sliderValueText = (value) => {
      return value;
   }

   render() {
      // console.log(this.props)
      console.log(this.state)
      return (
         <>
            <Grid container spacing={3}>

               <Grid item xs={3}>
                  <Card>
                     <CardContent>
                        <Typography variant="h6" gutterBottom>Filter By</Typography>

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
                                                className="hospitalItem"
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
                        <Box mt={5}>
                           <Typography gutterBottom>Amount Less Than</Typography>
                           <Slider
                              max="1000"
                              // value={this.state.amountRange}
                              defaultValue={20}
                              onChange={this.handleAmountLessThanSlider}
                              valueLabelDisplay="auto"
                              // aria-labelledby="range-slider"
                              getAriaValueText={this.sliderValueText}
                           />
                        </Box>
                        <Box mt={5}>
                           <Typography gutterBottom>Amount Greater Than</Typography>
                           <Slider
                              max="1000"
                              // value={this.state.amountRange}
                              defaultValue={20}
                              onChange={this.handleAmountGreaterThanSlider}
                              valueLabelDisplay="auto"
                              // aria-labelledby="range-slider"
                              getAriaValueText={this.sliderValueText}
                           />
                        </Box>


                     </CardContent>
                  </Card>
               </Grid>
               <Grid item xs={9}>
                  {this.context.state.paymentList ?
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
                                    <TableCell align="">Hospital</TableCell>
                                    <TableCell>Amount <IconButton onClick={() => { this.handleSortClick("amount") }}>
                                       {
                                          this.state.paymentTableSort.sort == "amount" ?
                                             this.state.paymentTableSort.sortOrder == 1 ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />
                                             : <ArrowUpwardIcon style={{ opacity: .2 }} />
                                       }

                                    </IconButton></TableCell>
                                    <TableCell align="">Payment Method</TableCell>
                                    <TableCell align="">Payment Status</TableCell>
                                    <TableCell align="">Date</TableCell>
                                    <TableCell align="">Actions</TableCell>
                                 </TableRow>
                              </TableHead>
                              <TableBody>
                                 {

                                    this.context.state.paymentList.data.length > 0 ?
                                       this.context.state.paymentList.data.map((row) => (

                                          <TableRow key={row._id}>
                                             <TableCell component="th" scope="row">{row.hospital ? row.hospital.name : ""}</TableCell>
                                             <TableCell align="">{row.amount} </TableCell>
                                             <TableCell align="">{row.paymentMethod} </TableCell>
                                             <TableCell align="">{row.paymentStatus} </TableCell>
                                             <TableCell align="">{`${new Date(row.created).getDate()} / ${new Date(row.created).getMonth()} / ${new Date(row.created).getFullYear()}`} </TableCell>
                                             <TableCell align="">
                                                <IconButton onClick={() => this.handleDoctorDetails(row._id)} aria-label="delete">
                                                   <VisibilityIcon />
                                                </IconButton>
                                                <IconButton onClick={() => this.props.editPayment(row)} aria-label="delete">
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
                                    value={this.context.state.paymentTableRowNumber}
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
                              <Pagination variant="outlined" shape="rounded" page={this.context.state.currentPaymentlistPageNumber}
                                 count={this.context.state.paymentList.page.totalPage}
                                 onChange={(event, value) => { this.handlePaginationClick(event, value) }} />
                           </Box>
                        </Card>
                     </div> : "no data found"
                  }
               </Grid>
            </Grid>

            {this.renderDetailsModal()}
         </>
      );
   }
}

PaymentList.contextType = AppContext;

export default PaymentList;
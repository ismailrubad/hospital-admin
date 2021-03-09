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
import { fetchAllHospital } from "../../../Api/hospital-api";

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
      //          this.context.updateBillingList()
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

      this.context.updateBillingList(1, event.target.value,
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
      this.context.updateBillingList(value, this.context.state.doctorTableRowNumber,
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
         this.context.updateBillingList(1, this.context.state.doctorTableRowNumber,
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
                        <CardContent style={{ maxHeight: 530, overflowY: "scroll" }}>
                           {
                              this.state.billingDetails ?

                                 <TableContainer component={Paper}>
                                    {/* <p>{this.state.billingDetails.image}</p> */}

                                    {this.state.billingDetails.image ?
                                       <div style={{
                                          height: 200, backgroundSize: 'cover', backgroundPosition: 'center', marginBottom: 10,
                                          backgroundImage: `url(http://localhost:5000/${this.state.billingDetails.image.full})`
                                       }}>

                                       </div> : null
                                    }
                                    <Table size="small" aria-label="simple table">

                                       <TableBody>
                                          <TableRow>
                                             <TableCell align=""><strong>Short Code</strong></TableCell>
                                             <TableCell align="">{this.state.billingDetails.hospital.shortCode}</TableCell>
                                          </TableRow>
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
                                          <TableRow>
                                             <TableCell align=""><strong>Date</strong></TableCell>
                                             <TableCell align="">{`${new Date(this.state.billingDetails.created).getDate()} / ${new Date(this.state.billingDetails.created).getMonth()} / ${new Date(this.state.billingDetails.created).getFullYear()}`} </TableCell>
                                          </TableRow>
                                       </TableBody>
                                    </Table>

                                    <Table className="border0Table" size="small" aria-label="simple table" >
                                       <TableBody>
                                          <TableRow>
                                             <TableCell align=""><strong>Discount Amount</strong></TableCell>
                                             <TableCell align="right">{this.state.billingDetails.discountAmount}%</TableCell>
                                          </TableRow>
                                          <TableRow>
                                             <TableCell align=""><strong>Discount</strong></TableCell>
                                             <TableCell align="right">BDT {this.state.billingDetails.discount} /=</TableCell>
                                          </TableRow>
                                       </TableBody>
                                    </Table>

                                    <Table className="border0Table" size="small" aria-label="simple table" >
                                       <TableBody>
                                          <TableRow>
                                             <TableCell align=""><strong>Total Bill</strong></TableCell>
                                             <TableCell align="right">{this.state.billingDetails.totalBill} /=</TableCell>
                                          </TableRow>
                                          <TableRow>
                                             <TableCell align=""><strong>Bill After Discount</strong></TableCell>
                                             <TableCell align="right">{this.state.billingDetails.billAfterDiscount} /=</TableCell>
                                          </TableRow>
                                       </TableBody>
                                    </Table>

                                    <Table className="border0Table" size="small" aria-label="simple table" >
                                       <TableBody>
                                          <TableRow>
                                             <TableCell align=""><strong>Comission Amount</strong></TableCell>
                                             <TableCell align="right">{this.state.billingDetails.comissionAmount ? this.state.billingDetails.comissionAmount
                                                : "N/A"}</TableCell>
                                          </TableRow>
                                          <TableRow>
                                             <TableCell align=""><strong>Comission</strong></TableCell>
                                             <TableCell align="right">{this.state.billingDetails.comission ? this.state.billingDetails.comission
                                                : "N/A"}</TableCell>
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

   handleDiseaseCatChange = (id) => {
      // this.context.updateBillingList(1, this.context.state.doctorTableRowNumber,
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

         this.context.updateBillingList(1, this.context.state.doctorTableRowNumber,
            this.context.state.doctorTableSort.sort, this.context.state.doctorTableSort.sortOrder, this.state.selectedDiseaseCat,
            this.state.selectedHospital, this.state.searchQuery)

         // let selectedDiseaseCalList = [];

         // this.state.diseaseCatList.map(item => {
         //    if (item.status) selectedDiseaseCalList.push(item._id)
         // })

         // this.setState({
         //    selectedDiseaseCalList
         // }, () => {
         //    this.context.updateBillingList(1, this.context.state.doctorTableRowNumber,
         //       this.context.state.doctorTableSort.sort, this.context.state.doctorTableSort.sortOrder, this.state.selectedDiseaseCalList)
         // })

      });
   }

   handleHospitalChange = (id) => {
      // this.context.updateBillingList(1, this.context.state.doctorTableRowNumber,
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
         this.context.updateBillingList(1, this.context.state.doctorTableRowNumber,
            this.context.state.doctorTableSort.sort, this.context.state.doctorTableSort.sortOrder,
            this.state.selectedHospital, this.state.searchQuery)

      })
   }

   handleSearchQueryChange = (searchQuery) => {
      // this.context.updateBillingList(1, this.context.state.doctorTableRowNumber,
      //    this.context.state.doctorTableSort.sort, this.context.state.doctorTableSort.sortOrder, id)
      this.setState({
         searchQuery
      }, () => {
         this.context.updateBillingList(1, this.context.state.doctorTableRowNumber,
            this.context.state.doctorTableSort.sort, this.context.state.doctorTableSort.sortOrder, this.state.selectedDiseaseCat,
            this.state.selectedHospital, this.state.searchQuery)

      })
   }

   componentDidMount() {
      this.context.updateBillingList();
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
   } s

   render() {
      // console.log(this.props)
      console.log(this.state)
      return (
         <>
            <Grid container spacing={3}>
               <Grid item xs={3}>
                  <Card>
                     <CardContent>
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
                                    <TableCell align="">Short Code</TableCell>
                                    <TableCell align="">Hospital Name</TableCell>

                                    <TableCell align="">Customer</TableCell>
                                    <TableCell>Hospital Name <IconButton onClick={() => { this.handleSortClick("hospital") }}>
                                       {
                                          this.state.doctorTableSort.sort == "hospital" ?
                                             this.state.doctorTableSort.sortOrder == 1 ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />
                                             : <ArrowUpwardIcon style={{ opacity: .2 }} />
                                       }

                                    </IconButton></TableCell>
                                    <TableCell align="">Total Bill</TableCell>
                                    <TableCell align="">Discount</TableCell>
                                    <TableCell align="">Date <IconButton onClick={() => { this.handleSortClick("created") }}>
                                       {
                                          this.state.doctorTableSort.sort == "created" ?
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
                                             <TableCell align="">{row.hospital ? row.hospital.shortCode : null} </TableCell>
                                             <TableCell align="">{row.hospital ? row.hospital.name : null} </TableCell>
                                             <TableCell align="">{row.customer ? row.customer.name : null} </TableCell>
                                             <TableCell component="th" scope="row">{row.hospital ? row.hospital.name : null}</TableCell>
                                             <TableCell align="">{row.totalBill} </TableCell>
                                             <TableCell align="">{row.discount} </TableCell>
                                             <TableCell align="">{`${new Date(row.created).getDate()} / ${new Date(row.created).getMonth()} / ${new Date(row.created).getFullYear()}`} </TableCell>
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
                                       )) : <TableCell colSpan={8} align="center" component="th" scope="row">No Data Found</TableCell>

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
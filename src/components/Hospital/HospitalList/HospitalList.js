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
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import CloseIcon from '@material-ui/icons/Close';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { fetchAllZones } from '../../../Api/zone-api'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { fetchHospitalDetails, deleteHospital } from "../../../Api/hospital-api";

class HospitalList extends Component {

   state = {
      currentPage: 1,
      hospitalTableSort: {
         sort: "name",
         sortOrder: 1
      },
      hospitalDetails: null,
      hospitalDetailsModalOpen: false,
      isloading: false,
      zoneList: null,
      selectedZone: null,
      searchQuery: null
   }

   startLoading = () => {
      this.setState({ isloading: true })
   };


   stopLoading = () => {
      this.setState({ isloading: false })
   };


   handleHospitalDelete = (id) => {

      var r = window.confirm("Do you want to delete the item?");
      if (r == true) {
         deleteHospital(id)
            .then((response) => {
               console.log(response);
               this.context.updateHospitalList()
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
      // this.setState({
      //    currentPage: 1
      // })
      this.context.updateHospitalList(1, event.target.value, this.context.state.hospitalTableSort.sort,
         this.context.state.hospitalTableSort.sortOrder)
   }

   handleHospitalEdit = (id) => {
      console.log(id)
   }


   handlePaginationClick = (event, value) => {
      // this.startLoading();
      // this.setState({
      //    currentPage: value
      // })
      this.context.updateHospitalList(value, this.context.state.hospitalTableRowNumber, this.context.state.hospitalTableSort.sort,
         this.context.state.hospitalTableSort.sortOrder)
   }

   handleSortClick = (sort) => {
      this.setState(preState => {
         return {
            hospitalTableSort: {
               sort,
               sortOrder: preState.hospitalTableSort.sortOrder == 1 ? -1 : 1
            },
            currentPage: 1
         }
      }, () => {
         console.log(this.state)
         this.context.updateHospitalList(1, this.context.state.hospitalTableRowNumber, this.state.hospitalTableSort.sort,
            this.state.hospitalTableSort.sortOrder)
      })
   }

   handleHospitalDetailsModalOpen = () => {
      this.setState({
         hospitalDetailsModalOpen: true
      })
   }

   handleHospitalDetailsModalClose = () => {
      this.setState({
         hospitalDetailsModalOpen: false
      })
   }

   renderHospitalDetailsModal = () => {
      return (
         <Modal
            className="modal"
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={this.state.hospitalDetailsModalOpen}
            onClose={this.handleHospitalDetailsModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
               timeout: 500,
            }}
         >
            <Fade in={this.state.hospitalDetailsModalOpen}>
               <Grid container spacing={3}>
                  <Grid item xs={6} className="col_center">
                     <Card>
                        <CardHeader
                           action={
                              <IconButton onClick={this.handleHospitalDetailsModalClose} aria-label="settings">
                                 <CloseIcon />
                              </IconButton>
                           }
                           title="Hospital Details"
                        />
                        <CardContent style={{ maxHeight: 530, overflowY: "scroll" }}>


                           {
                              this.state.hospitalDetails ?

                                 <TableContainer component={Paper}>

                                    {this.state.hospitalDetails.cover ?
                                       <div style={{
                                          height: 200, backgroundSize: 'cover', backgroundPosition: 'center', marginBottom: 10,
                                          backgroundImage: `url(http://localhost:5000${this.state.hospitalDetails.cover.full})`
                                       }}>

                                       </div> : null
                                    }
                                    <Table size="small" aria-label="simple table">

                                       <TableBody>
                                          <TableRow>
                                             <TableCell ><strong>Hospital Name</strong></TableCell>
                                             <TableCell >{this.state.hospitalDetails.name}</TableCell>
                                          </TableRow>
                                          <TableRow>
                                             <TableCell ><strong>Zone Name</strong></TableCell>
                                             <TableCell >{this.state.hospitalDetails.zone ? this.state.hospitalDetails.zone.name : null}</TableCell>
                                          </TableRow>
                                          <TableRow>
                                             <TableCell ><strong>Address</strong></TableCell>
                                             <TableCell >{this.state.hospitalDetails.address}</TableCell>
                                          </TableRow>
                                          <TableRow>
                                             <TableCell ><strong>Phone</strong></TableCell>
                                             <TableCell >{this.state.hospitalDetails.phone}</TableCell>
                                          </TableRow>
                                          <TableRow>
                                             <TableCell ><strong>ShortCode</strong></TableCell>
                                             <TableCell >{this.state.hospitalDetails.shortCode}</TableCell>
                                          </TableRow>
                                          <TableRow>
                                             <TableCell ><strong>DiscountAmount</strong></TableCell>
                                             <TableCell >{this.state.hospitalDetails.discountAmount}</TableCell>
                                          </TableRow>
                                          <TableRow>
                                             <TableCell ><strong>discountAmountTotal</strong></TableCell>
                                             <TableCell >{this.state.hospitalDetails.discountAmountTotal}</TableCell>
                                          </TableRow>
                                          <TableRow>
                                             <TableCell ><strong>Description</strong></TableCell>
                                             <TableCell >{this.state.hospitalDetails.description}</TableCell>
                                          </TableRow>
                                          <TableRow>
                                             <TableCell ><strong>Images</strong></TableCell>
                                             <TableCell >
                                                {
                                                   this.state.hospitalDetails.image ?
                                                      this.state.hospitalDetails.image.map(item => {

                                                         return (<Box display="inline" mr={1}>
                                                            <img src={`http://localhost:5000${item.thumbnail}`} />
                                                         </Box>)

                                                      }) : null
                                                }

                                             </TableCell>
                                          </TableRow>
                                          <a target="_blank" href={`http://localhost:5000/admin/api/hospital/${this.state.hospitalDetails._id}/qrcode`}>Generate QR Code</a>
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

   handleHospitalDetails = (id) => {
      fetchHospitalDetails(id).then((response) => {
         this.setState({
            hospitalDetails: response.data
         }, () => {
            this.setState({
               hospitalDetailsModalOpen: true
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

   handleZoneChange = (id) => {
      // this.context.updateDoctorList(1, this.context.state.doctorTableRowNumber,
      //    this.context.state.doctorTableSort.sort, this.context.state.doctorTableSort.sortOrder, id)
      this.setState({
         zoneList: this.state.zoneList.map(item => {
            if (item._id === id)
               item['status'] = true;
            else
               item['status'] = false;

            return item;
         }),
         selectedZone: id
      }, () => {
         this.context.updateHospitalList(1, this.context.state.hospitalTableRowNumber, this.context.state.hospitalTableSort.sort,
            this.context.state.hospitalTableSort.sortOrder, this.state.selectedZone, this.state.searchQuery)

      })
   }

   componentDidMount() {
      this.context.updateHospitalList();
      fetchAllZones().then((response) => {
         this.setState({
            zoneList: response.data.data.map(item => {
               item['status'] = false;
               return item;
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
      this.setState({
         searchQuery
      }, () => {

         this.context.updateHospitalList(1, this.context.state.hospitalTableRowNumber, this.context.state.hospitalTableSort.sort,
            this.context.state.hospitalTableSort.sortOrder, this.state.selectedZone, this.state.searchQuery)

      })
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
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                           >
                              <Typography >Zone</Typography>
                           </AccordionSummary>
                           <AccordionDetails>
                              <div className="accMaxHight">
                                 {this.state.zoneList ?

                                    this.state.zoneList.map((item) => {
                                       return (
                                          <div key={item._id}>
                                             <FormControlLabel
                                                control={
                                                   <Checkbox
                                                      checked={item.status}
                                                      onChange={() => {
                                                         this.handleZoneChange(item._id)
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
                  {this.context.state.hospitalList ?
                     <div className="table_wrapper">
                        {this.state.isloading &&
                           <div className="loader_area">
                              <CircularProgress />
                           </div>
                        }
                        <TableContainer style={{ maxHeight: 500, }} component={Paper}>
                           <Table stickyHeader={true} aria-label="simple table" size="small"  >
                              <TableHead>
                                 <TableRow>
                                    <TableCell>Hospital Name <IconButton onClick={() => { this.handleSortClick("name") }}>
                                       {
                                          this.state.hospitalTableSort.sort == "name" ?
                                             this.state.hospitalTableSort.sortOrder == 1 ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />
                                             : <ArrowUpwardIcon style={{ opacity: .2 }} />
                                       }

                                    </IconButton></TableCell>
                                    <TableCell >Address <IconButton onClick={() => { this.handleSortClick("address") }}>
                                       {
                                          this.state.hospitalTableSort.sort == "address" ?
                                             this.state.hospitalTableSort.sortOrder == 1 ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />
                                             : <ArrowUpwardIcon style={{ opacity: .2 }} />
                                       }

                                    </IconButton></TableCell>
                                    <TableCell >Phone</TableCell>
                                    <TableCell >Discount Amount <IconButton onClick={() => { this.handleSortClick("discountAmount") }}>
                                       {
                                          this.state.hospitalTableSort.sort == "discountAmount" ?
                                             this.state.hospitalTableSort.sortOrder == 1 ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />
                                             : <ArrowUpwardIcon style={{ opacity: .2 }} />
                                       }

                                    </IconButton></TableCell>
                                    <TableCell >Discount Amount Total <IconButton onClick={() => { this.handleSortClick("discountAmountTotal") }}>
                                       {
                                          this.state.hospitalTableSort.sort == "discountAmountTotal" ?
                                             this.state.hospitalTableSort.sortOrder == 1 ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />
                                             : <ArrowUpwardIcon style={{ opacity: .2 }} />
                                       }

                                    </IconButton></TableCell>
                                    <TableCell >Short Code</TableCell>
                                    <TableCell >Actions</TableCell>
                                 </TableRow>
                              </TableHead>
                              <TableBody>
                                 {
                                    this.context.state.hospitalList ?
                                       this.context.state.hospitalList.data.map((row) => (

                                          <TableRow key={row._id}>
                                             <TableCell width="200" component="th" scope="row">{row.name}</TableCell>
                                             <TableCell >{row.address} </TableCell>
                                             <TableCell >{row.phone} </TableCell>
                                             <TableCell width="300">{row.discountAmount} </TableCell>
                                             <TableCell >{row.discountAmountTotal} </TableCell>
                                             <TableCell >{row.shortCode} </TableCell>
                                             <TableCell >
                                                <IconButton onClick={() => this.handleHospitalDetails(row._id)} aria-label="delete">
                                                   <VisibilityIcon />
                                                </IconButton>
                                                <IconButton onClick={() => this.props.editHospital(row)} aria-label="delete">
                                                   <EditIcon />
                                                </IconButton>
                                                <IconButton onClick={() => this.handleHospitalDelete(row._id)} aria-label="delete">
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
                                    value={this.context.state.hospitalTableRowNumber}
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
                              <Pagination variant="outlined" page={this.context.state.currentHospitallistPageNumber} shape="rounded" count={this.context.state.hospitalList.page.totalPage}
                                 onChange={(event, value) => { this.handlePaginationClick(event, value) }} />
                           </Box>
                        </Card>
                     </div> : "no data found"
                  }
               </Grid>

            </Grid>

            {this.renderHospitalDetailsModal()}
         </>
      );
   }
}

HospitalList.contextType = AppContext;

export default HospitalList;
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
import { Box } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import CloseIcon from '@material-ui/icons/Close';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { fetchDistrictDetails, editDistrict } from "../../../Api/district-api";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { TextField, Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';


class DistrictList extends Component {

   state = {
      editModalOpen: false,
      submittingEdit: false,
      currentPage: null,
      districtDetailsModalOpen: false,
      districtTableSort: {
         sort: "name",
         sortOrder: 1
      },
      districtDetails: null,
      districtName: "",
      selectedDistricId: null,
      searchQuery: null,
      inputError: {}
   }

   handleDistrictDelete = (id) => {
      var r = window.confirm("Do you want to delete the item?");
      if (r == true) {
         axios.get(`http://localhost:5000/admin/api/district/remove?id=${id}`, {
            params: {

            }
         })
            .then((response) => {
               console.log(response);
               this.context.updateDistrictList()
            })
            .catch(function (error) {
               console.log(error);
            })
            .then(function () {
               // always executed
            });
      }


   }

   handleDistrictEdit = (districtItem) => {
      this.handleEditModalOpen();
      this.setState({
         districtName: districtItem.name,
         selectedDistricId: districtItem._id
      })
   }


   handlePaginationClick = (event, value) => {
      this.context.updateDistrictList(value, this.context.state.districtTableRowNumber,
         this.context.state.districtTableSort.sort, this.context.state.districtTableSort.sortOrder, this.state.searchQuery)
   }

   handleRowChange = (event) => {
      console.log(event.target.value)
      this.context.updateDistrictList(1, event.target.value,
         this.context.state.districtTableSort.sort, this.context.state.districtTableSort.sortOrder, this.state.searchQuery)
   }

   handleDistrictDetailsModalOpen = () => {
      this.setState({
         districtDetailsModalOpen: true
      })
   }

   handleDistrictDetailsModalClose = () => {
      this.setState({
         districtDetailsModalOpen: false
      })
   }

   handleDistrictDetails = (id) => {
      console.log(id)
      fetchDistrictDetails(id).then((response) => {
         this.setState({
            districtDetails: response.data
         }, () => {
            this.setState({
               districtDetailsModalOpen: true
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

   handleSortClick = (sort) => {
      this.setState(preState => {
         return {
            districtTableSort: {
               sort,
               sortOrder: preState.districtTableSort.sortOrder == 1 ? -1 : 1
            }
         }
      }, () => {
         console.log(this.state)
         this.context.updateDistrictList(1, this.context.state.districtTableRowNumber,
            this.state.districtTableSort.sort, this.state.districtTableSort.sortOrder, this.state.searchQuery)
      })
   }

   renderDistrictDetailsModal = () => {
      return (
         <Modal
            className="modal"
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={this.state.districtDetailsModalOpen}
            onClose={this.handleDistrictDetailsModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
               timeout: 500,
            }}
         >
            <Fade in={this.state.districtDetailsModalOpen}>
               <Grid container spacing={3}>
                  <Grid item xs={6} className="col_center">
                     <Card>
                        <CardHeader
                           action={
                              <IconButton onClick={this.handleDistrictDetailsModalClose} aria-label="settings">
                                 <CloseIcon />
                              </IconButton>
                           }
                           title="District Details"
                        />
                        <CardContent>
                           {
                              this.state.districtDetails ?

                                 <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                       <Box display="flex">
                                          <Typography variant="h6" component="h6" gutterBottom>
                                             District Name: </Typography>
                                       </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                       <Box alignItems="center" display="flex" style={{ height: '100%' }}>
                                          <Typography variant="body1" gutterBottom>{this.state.districtDetails.name}</Typography>
                                       </Box>
                                    </Grid>
                                 </Grid> : null
                           }
                        </CardContent>
                     </Card>
                  </Grid>
               </Grid>
            </Fade>
         </Modal >
      )
   }

   handleEditModalOpen = () => {
      this.setState({
         editModalOpen: true
      })
   }

   handleEditModalClose = () => {
      this.setState({
         editModalOpen: false,
         submittingEdit: false,
      })
   }

   handleDistrictNameOnChange = (event) => {
      this.setState({
         districtName: event.target.value
      })
   }

   handleFormSubmit = () => {
      this.setState({
         submittingEdit: true
      }, () => {
         editDistrict(this.state.selectedDistricId, this.state.districtName).then((response) => {
            console.log(response);
            // this.context.addDistrictToContext(response.data[0])
            this.context.updateDistrictList();
            this.handleEditModalClose();
         }).catch((error) => {
            console.log(error);
            console.log({ res: error.response }, "123")
            this.setState({
               submittingEdit: false,
               districtNameError: true,
               inputError: error.response && error.response.data
            })
         });
      })
   }

   renderEditModal = () => {
      return (
         <Modal
            className="modal"
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={this.state.editModalOpen}
            onClose={this.handleEditModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
               timeout: 500,
            }}
         >
            <Fade in={this.state.editModalOpen}>
               <Grid container spacing={3}>
                  <Grid item xs={6} className="col_center">
                     <Card>
                        <CardHeader
                           action={
                              <IconButton onClick={this.handleEditModalClose} aria-label="settings">
                                 <CloseIcon />
                              </IconButton>
                           }
                           title="Edit District"
                        />
                        <CardContent>
                           <div className="form_wrapper">
                              <form noValidate autoComplete="off">
                                 <TextField
                                    onChange={this.handleDistrictNameOnChange} id="standard-basic"
                                    label="District Name"
                                    value={this.state.districtName}
                                    error={this.state.inputError && this.state.inputError.name ? true : false}
                                    helperText={this.state.inputError && this.state.inputError.name} />

                                 <Button onClick={this.handleFormSubmit} variant="contained" color="primary">
                                    {this.state.submittingEdit ?
                                       <CircularProgress style={{ marginRight: 5 }} color="#fff" size={18} /> : null}
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

   handleSearchQueryChange = (searchQuery) => {
      this.setState({
         searchQuery
      }, () => {
         this.context.updateDistrictList(1, this.context.state.districtTableRowNumber,
            this.context.state.districtTableSort.sort, this.context.state.districtTableSort.sortOrder,
            this.state.searchQuery)
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
                     </CardContent>
                  </Card>
               </Grid>
               <Grid item xs={9}>
                  {this.context.state.districtList ?
                     <div>
                        <TableContainer style={{ maxHeight: 500, }} s component={Paper}>
                           <Table stickyHeader={true} aria-label="simple table" size="small">
                              <TableHead>
                                 <TableRow>
                                    <TableCell >District Name
                                 <IconButton onClick={() => { this.handleSortClick("name") }}>
                                          {
                                             this.state.districtTableSort.sort == "name" ?
                                                this.state.districtTableSort.sortOrder == 1 ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />
                                                : <ArrowUpwardIcon style={{ opacity: .2 }} />
                                          }

                                       </IconButton>
                                    </TableCell>
                                    <TableCell align="" >Actions</TableCell>
                                 </TableRow>
                              </TableHead>
                              <TableBody>
                                 {
                                    this.context.state.districtList.data.length > 0 ?
                                       this.context.state.districtList.data.map((row) => (
                                          <TableRow key={row._id}>
                                             <TableCell component="th" scope="row">{row.name}</TableCell>
                                             <TableCell align="">
                                                <IconButton onClick={() => this.handleDistrictDetails(row._id)} aria-label="delete">
                                                   <VisibilityIcon />
                                                </IconButton>
                                                <IconButton onClick={() => this.handleDistrictEdit(row)} aria-label="delete">
                                                   <EditIcon />
                                                </IconButton>
                                                <IconButton onClick={() => this.handleDistrictDelete(row._id)} aria-label="delete">
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
                                    value={this.context.state.districtTableRowNumber}
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
                              <Pagination variant="outlined" shape="rounded" count={this.context.state.districtList.page.totalPage}
                                 onChange={(event, value) => { this.handlePaginationClick(event, value) }} />
                           </Box>
                        </Card>
                     </div> : "no data found"
                  }
               </Grid>
            </Grid>
            { this.renderDistrictDetailsModal()}
            { this.renderEditModal()}
         </>
      );
   }
}

DistrictList.contextType = AppContext;

export default DistrictList;
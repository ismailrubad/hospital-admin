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

import { deleteDiseaseCat } from "../../../Api/disease-api";

class ComissionList extends Component {

   state = {
      currentPage: 1,
      comissionTableSort: {
         sort: "name",
         sortOrder: 1
      },
      diseaseCatDetails: null,
      diseaseCatDetailsModalOpen: false,
      isloading: false
   }

   startLoading = () => {
      this.setState({ isloading: true })
   };


   stopLoading = () => {
      this.setState({ isloading: false })
   };


   handleDiseaseCatDelete = (id) => {

      var r = window.confirm("Do you want to delete the item?");
      if (r == true) {
         deleteDiseaseCat(id)
            .then((response) => {
               console.log(response);
               this.context.updateDiseaseCatList()
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
      this.context.updateDiseaseCatList(1, event.target.value, this.context.state.comissionTableSort.sort,
         this.context.state.comissionTableSort.sortOrder)
   }

   handleDiseaseCatEdit = (id) => {
      console.log(id)
   }


   handlePaginationClick = (event, value) => {
      // this.startLoading();
      this.context.updateDiseaseCatList(value, this.context.state.diseaseCatTableRowNumber,
         this.context.state.comissionTableSort.sort, this.context.state.comissionTableSort.sortOrder)
      // this.context.updateCurrentDiseaseCatlistPageNumber(value, this.stopLoading)
   }

   handleSortClick = (sort) => {
      this.setState(preState => {
         return {
            comissionTableSort: {
               sort,
               sortOrder: preState.comissionTableSort.sortOrder == 1 ? -1 : 1
            },
            currentPage: 1
         }
      }, () => {
         console.log(this.state)
         // this.context.sortDiseaseCattable(this.state.comissionTableSort.sort,
         //    this.state.comissionTableSort.sortOrder)

         this.context.updateDiseaseCatList(1, this.context.state.diseaseCatTableRowNumber, this.state.comissionTableSort.sort,
            this.state.comissionTableSort.sortOrder)
      })
   }

   handleDiseaseCatDetailsModalOpen = () => {
      this.setState({
         diseaseCatDetailsModalOpen: true
      })
   }

   handleDiseaseCatDetailsModalClose = () => {
      this.setState({
         diseaseCatDetailsModalOpen: false
      })
   }

   renderDiseaseCatDetailsModal = () => {
      return (
         <Modal
            className="modal"
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={this.state.diseaseCatDetailsModalOpen}
            onClose={this.handleDiseaseCatDetailsModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
               timeout: 500,
            }}
         >
            <Fade in={this.state.diseaseCatDetailsModalOpen}>
               <Grid container spacing={3}>
                  <Grid item xs={6} className="col_center">
                     <Card>
                        <CardHeader
                           action={
                              <IconButton onClick={this.handleDiseaseCatDetailsModalClose} aria-label="settings">
                                 <CloseIcon />
                              </IconButton>
                           }
                           title="Service Details"
                        />
                        <CardContent>
                           {
                              this.state.diseaseCatDetails ?
                                 <TableContainer component={Paper}>
                                    <Table size="small" aria-label="simple table">
                                       <TableBody>
                                          <TableRow>
                                             <TableCell align=""><strong>Disease Category Name</strong></TableCell>
                                             <TableCell align="">{this.state.diseaseCatDetails.name}</TableCell>
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

   handleDiseaseCatDetails = (id) => {
      // fetchDiseaseCatDetails(id).then((response) => {
      //    this.setState({
      //       diseaseCatDetails: response.data
      //    }, () => {
      //       this.setState({
      //          diseaseCatDetailsModalOpen: true
      //       })
      //    })
      //    console.log(response);
      // })
      //    .catch(function (error) {
      //       console.log(error);
      //    })
      //    .then(function () {
      //       // always executed
      //    });
   }

   componentDidMount() {
      this.context.updateComissionList()
   }

   render() {
      return (
         <>
            {this.context.state.comissionList ?
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
                              <TableCell>Hospital </TableCell>
                              <TableCell>Amount <IconButton onClick={() => { this.handleSortClick("amount") }}>
                                 {
                                    this.state.comissionTableSort.sort == "amount" ?
                                       this.state.comissionTableSort.sortOrder == 1 ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />
                                       : <ArrowUpwardIcon style={{ opacity: .2 }} />
                                 }

                              </IconButton></TableCell>
                              <TableCell align="">Actions</TableCell>
                           </TableRow>
                        </TableHead>
                        <TableBody>
                           {
                              this.context.state.comissionList ?
                                 this.context.state.comissionList.data.map((row) => (

                                    <TableRow key={row._id}>
                                       <TableCell component="th" scope="row">{row.hospital}</TableCell>
                                       <TableCell component="th" scope="row">{row.amount}</TableCell>
                                       <TableCell align="">
                                          <IconButton onClick={() => this.handleDiseaseCatDetails(row._id)} aria-label="delete">
                                             <VisibilityIcon />
                                          </IconButton>
                                          <IconButton onClick={() => this.props.editComission(row)} aria-label="delete">
                                             <EditIcon />
                                          </IconButton>
                                          <IconButton onClick={() => this.handleDiseaseCatDelete(row._id)} aria-label="delete">
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
                              value={this.context.state.diseaseCatTableRowNumber}
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
                        <Pagination variant="outlined" page={this.context.state.currentComissionlistPageNumber} shape="rounded"
                           count={this.context.state.comissionList.page.totalPage}
                           onChange={(event, value) => { this.handlePaginationClick(event, value) }} />
                     </Box>
                  </Card>
               </div> : "no data found"
            }
            {this.renderDiseaseCatDetailsModal()}
         </>
      );
   }
}

ComissionList.contextType = AppContext;

export default ComissionList;
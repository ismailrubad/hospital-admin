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
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { fetchZoneDetails } from "../../../Api/zone-api";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { fetchAllDistricts } from "../../../Api/district-api";

class ZoneList extends Component {

   state = {
      selectedDistrict: null,
      districtList: null,
      searchQuery: null,

      currentPage: null,
      zoneTableSort: {
         sort: "name",
         sortOrder: 1
      },
      zoneDetails: null,
      zoneDetailsModalOpen: false,
      isloading: false
   }

   startLoading = () => {
      this.setState({ isloading: true })
   };


   stopLoading = () => {
      this.setState({ isloading: false })
   };


   handleZoneDelete = (id) => {

      var r = window.confirm("Do you want to delete the item?");
      if (r == true) {
         axios.get(`/admin/api/zone/remove?id=${id}`, {
            params: {

            }
         })
            .then((response) => {
               console.log(response);
               this.context.updateZoneList()
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
      // this.context.updateTableRowNumber(event.target.value)

      this.context.updateZoneList(1, event.target.value, this.context.state.zoneTableSort.sort,
         this.context.state.zoneTableSort.sortOrder, this.state.selectedDistrict, this.state.searchQuery)
   }

   handleZoneEdit = (id) => {
      console.log(id)
   }

   handlePaginationClick = (event, value) => {
      // this.startLoading();
      // this.context.updateCurrentZonelistPageNumber(value, this.stopLoading)
      this.context.updateZoneList(value, this.context.state.zoneTableRowNumber, this.context.state.zoneTableSort.sort,
         this.context.state.zoneTableSort.sortOrder, this.state.selectedDistrict, this.state.searchQuery)
   }

   handleSortClick = (sort) => {
      this.setState(preState => {
         return {
            zoneTableSort: {
               sort,
               sortOrder: preState.zoneTableSort.sortOrder == 1 ? -1 : 1
            }
         }
      }, () => {
         this.context.updateZoneList(1, this.context.state.zoneTableRowNumber, this.state.zoneTableSort.sort,
            this.state.zoneTableSort.sortOrder, this.state.selectedDistrict, this.state.searchQuery)

      })
   }

   handleZoneDetailsModalOpen = () => {
      this.setState({
         zoneDetailsModalOpen: true
      })
   }

   handleZoneDetailsModalClose = () => {
      this.setState({
         zoneDetailsModalOpen: false
      })
   }

   renderZoneDetailsModal = () => {
      return (
         <Modal
            className="modal"
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={this.state.zoneDetailsModalOpen}
            onClose={this.handleZoneDetailsModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
               timeout: 500,
            }}
         >
            <Fade in={this.state.zoneDetailsModalOpen}>
               <Grid container spacing={3}>
                  <Grid item xs={6} className="col_center">
                     <Card>
                        <CardHeader
                           action={
                              <IconButton onClick={this.handleZoneDetailsModalClose} aria-label="settings">
                                 <CloseIcon />
                              </IconButton>
                           }
                           title="Zone Details"
                        />
                        <CardContent>
                           {
                              this.state.zoneDetails ?

                                 <Grid container spacing={3}>
                                    <Grid item xs={4}>
                                       <Box display="flex">
                                          <Typography variant="h6" component="h6" gutterBottom>
                                             Zone Name: </Typography>
                                       </Box>
                                    </Grid>
                                    <Grid item xs={8}>
                                       <Box alignItems="center" display="flex" style={{ height: '100%' }}>
                                          <Typography variant="body1" gutterBottom>{this.state.zoneDetails.name}</Typography>
                                       </Box>
                                    </Grid>
                                    <Grid item xs={4}>
                                       <Box display="flex">
                                          <Typography variant="h6" component="h6" gutterBottom>
                                             District Name: </Typography>
                                       </Box>
                                    </Grid>
                                    <Grid item xs={8}>
                                       <Box alignItems="center" display="flex" style={{ height: '100%' }}>
                                          <Typography variant="body1" gutterBottom>
                                             {this.state.zoneDetails.district.name}</Typography>
                                       </Box>
                                    </Grid>
                                 </Grid>
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

   handleZoneDetails = (id) => {
      fetchZoneDetails(id).then((response) => {
         this.setState({
            zoneDetails: response.data
         }, () => {
            this.setState({
               zoneDetailsModalOpen: true
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

   // static getDerivedStateFromProps(nextProps, prevState) {
   //    if (prevState.districtList !== nextProps.districtList) {
   //       return {
   //          districtList: nextProps.districtList.map(item => {
   //             item['status'] = false;
   //             return item;
   //          })
   //       };
   //    }

   //    return null;
   // }

   componentDidMount() {
      this.context.updateZoneList()
      fetchAllDistricts().then((response) => {
         this.setState({
            districtList: response.data.data.map(item => {
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

   // shouldComponentUpdate(nextProps) {
   //    // Rendering the component only if  
   //    // passed props value is changed 

   //    if (nextProps !== this.props) {
   //       return true;
   //    } else {
   //       return false;
   //    }
   // }

   handleDistrictChange = (id) => {
      this.setState({
         districtList: this.state.districtList.map(item => {
            if (item._id === id)
               item['status'] = true;
            else
               item['status'] = false;

            return item;
         }),
         selectedDistrict: id
      }, () => {

         this.context.updateZoneList(1, this.context.state.zoneTableRowNumber, this.state.zoneTableSort.sort,
            this.state.zoneTableSort.sortOrder, this.state.selectedDistrict, this.state.searchQuery)
      });
   }

   handleSearchQueryChange = (searchQuery) => {
      this.setState({
         searchQuery
      }, () => {
         this.context.updateZoneList(1, this.context.state.zoneTableRowNumber, this.state.zoneTableSort.sort,
            this.state.zoneTableSort.sortOrder, this.state.selectedDistrict, this.state.searchQuery)
      })
   }

   render() {
      console.log("zone list rendered")
      console.log(this.state)
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
                              <Typography >District</Typography>
                           </AccordionSummary>
                           <AccordionDetails>
                              <div className="accMaxHight">
                                 {this.state.districtList ?

                                    this.state.districtList.map((item) => {
                                       return (
                                          <div>
                                             <FormControlLabel
                                                control={
                                                   <Checkbox
                                                      checked={item.status}
                                                      onChange={() => {
                                                         this.handleDistrictChange(item._id)
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

                  {this.context.state.zoneList ?
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
                                    <TableCell>Zone Name <IconButton onClick={() => { this.handleSortClick("name") }}>
                                       {
                                          this.state.zoneTableSort.sort == "name" ?
                                             this.state.zoneTableSort.sortOrder == 1 ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />
                                             : <ArrowUpwardIcon style={{ opacity: .2 }} />
                                       }

                                    </IconButton></TableCell>
                                    <TableCell >District Name <IconButton onClick={() => { this.handleSortClick("district") }}>
                                       {
                                          this.state.zoneTableSort.sort == "district" ?
                                             this.state.zoneTableSort.sortOrder == 1 ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />
                                             : <ArrowUpwardIcon style={{ opacity: .2 }} />
                                       }

                                    </IconButton></TableCell>
                                    <TableCell >Actions</TableCell>
                                 </TableRow>
                              </TableHead>
                              <TableBody>
                                 {
                                    this.context.state.zoneList ?
                                       this.context.state.zoneList.data.map((row) => (

                                          <TableRow key={row._id}>
                                             <TableCell component="th" scope="row">{row.name}</TableCell>
                                             <TableCell >{row.district ? row.district.name : null} </TableCell>
                                             <TableCell >
                                                <IconButton onClick={() => this.handleZoneDetails(row._id)} aria-label="delete">
                                                   <VisibilityIcon />
                                                </IconButton>
                                                <IconButton onClick={() => this.props.editZone(row)} aria-label="delete">
                                                   <EditIcon />
                                                </IconButton>
                                                <IconButton onClick={() => this.handleZoneDelete(row._id)} aria-label="delete">
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
                                    value={this.context.state.zoneTableRowNumber}
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
                              <Pagination variant="outlined" page={this.context.state.currentZonelistPageNumber} shape="rounded" count={this.context.state.zoneList.page.totalPage}
                                 onChange={(event, value) => { this.handlePaginationClick(event, value) }} />
                           </Box>
                        </Card>
                     </div> : "no data found"
                  }
               </Grid>
            </Grid>

            {this.renderZoneDetailsModal()}
         </>
      );
   }
}

ZoneList.contextType = AppContext;

export default ZoneList;
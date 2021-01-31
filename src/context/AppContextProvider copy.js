import React from 'react';
import { fetchDistrictList } from "../Api/district-api";
import { fetchZoneList } from "../Api/zone-api";
import { fetchHospitaltList } from "../Api/hospital-api";
import { fetchDoctorList } from "../Api/doctor-api";
import { fetchServiceList } from "../Api/service-api";
import { fetchDiseaseCatList } from "../Api/disease-api";

// first we will make a new context
export const AppContext = React.createContext();


// Then create a provider Component
export class AppProvider extends React.Component {
    state = {
        appName: '',
        districtList: null,
        zoneList: null,
        hospitalList: null,
        doctorList: null,
        serviceList: null,
        diseaseCatList: null,
        currentZonelistPageNumber: null,
        currentDistrictlistPageNumber: null,
        tableRowNumber: 5,
        districtTableRowNumber: 5,
        zoneTableSort: {
            sort: "name",
            sortOrder: 1
        },
        districtTableSort: {
            sort: "name",
            sortOrder: 1
        },

        currentHospitallistPageNumber: null,
        hospitalTableRowNumber: 5,
        hospitalTableSort: {
            sort: "name",
            sortOrder: 1
        },

        currentDoctorlistPageNumber: 1,
        doctorTableRowNumber: 5,
        doctorTableSort: {
            sort: "name",
            sortOrder: 1
        },

        currentServicelistPageNumber: 1,
        serviceTableRowNumber: 5,
        serviceTableSort: {
            sort: "name",
            sortOrder: 1
        },

        currentDiseaseCatlistPageNumber: 1,
        diseaseCatTableRowNumber: 5,
        diseaseCatTableSort: {
            sort: "name",
            sortOrder: 1
        },
    }

    setDistrictList = () => {
        fetchDistrictList().then((response) => {
            this.setState({
                districtList: response.data
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

    setZoneList = () => {
        fetchZoneList().then((response) => {

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

    setHospitalList = () => {
        fetchHospitaltList().then((response) => {

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

    setDoctorList = () => {
        fetchDoctorList().then((response) => {
            this.setState({
                doctorList: response.data
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

    setServiceList = () => {
        fetchServiceList().then((response) => {
            this.setState({
                serviceList: response.data
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

    setDiseaseCatList = () => {
        fetchDiseaseCatList().then((response) => {
            this.setState({
                diseaseCatList: response.data
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


    componentWillMount() {
        this.setDistrictList();
        this.setZoneList();
        this.setHospitalList();
        this.setDoctorList();
        this.setServiceList();
        this.setDiseaseCatList();
    }


    render() {
        console.log(this.state)
        // console.log(JSON.parse(window.localStorage.getItem('userState')));
        return (
            <AppContext.Provider
                value={{
                    state: this.state,
                    addDistrictToContext: (district) => {
                        this.setState({
                            districtList: [...this.state.districtList, district]
                        })
                    },
                    addZoneToContext: (zone) => {
                        this.setState({
                            zoneList: {
                                ...this.state.zoneList,
                                data: [...this.state.zoneList.data, zone]
                            }
                        })
                    },
                    deleteZoneFromContext: (id) => {
                        this.setState({
                            zoneList: {                   // object that we want to update
                                ...this.state.zoneList,    // keep all other key-value pairs
                                data: this.state.zoneList.data.filter(zone => {
                                    if (zone._id !== id) {
                                        return zone;
                                    }
                                })
                            }
                        });
                    },
                    updateCurrentZonelistPageNumber: (currentZonelistPageNumber, stopLoading) => {
                        this.setState({
                            currentZonelistPageNumber
                        }, () => {
                            fetchZoneList(this.state.currentZonelistPageNumber, this.state.tableRowNumber).then((response) => {
                                this.setState({
                                    zoneList: response.data
                                }, () => {
                                    stopLoading()
                                })
                                console.log("updateCurrentZonelistPageNumber");
                                console.log(this.state.zoneList);
                            })
                                .catch(function (error) {
                                    console.log(error);
                                })
                                .then(function () {
                                    // always executed
                                });
                        })
                    },
                    updateZoneList: () => {

                        fetchZoneList(this.state.currentZonelistPageNumber, this.state.tableRowNumber).then((response) => {
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
                    },
                    updateCurrentDistrictlistPageNumber: (currentDistrictlistPageNumber) => {
                        this.setState({
                            currentDistrictlistPageNumber
                        }, () => {
                            fetchDistrictList(this.state.currentDistrictlistPageNumber).then((response) => {
                                this.setState({
                                    districtList: response.data
                                })
                                console.log(response);
                            })
                                .catch(function (error) {
                                    console.log(error);
                                })
                                .then(function () {
                                    // always executed
                                });
                        })
                    },
                    updateDistrictList: () => {
                        fetchDistrictList(this.state.currentDistrictlistPageNumber).then((response) => {
                            this.setState({
                                districtList: response.data
                            })
                            console.log(response);
                        })
                            .catch(function (error) {
                                console.log(error);
                            })
                            .then(function () {
                                // always executed
                            });
                    },

                    updateDistrictTableRowNumber: (districtTableRowNumber) => {
                        this.setState({
                            districtTableRowNumber
                        }, () => {
                            fetchDistrictList(this.state.currentDistrictlistPageNumber, this.state.districtTableRowNumber)
                                .then((response) => {
                                    this.setState({
                                        districtList: response.data
                                    })
                                    console.log(response);
                                })
                                .catch(function (error) {
                                    console.log(error);
                                })
                                .then(function () {
                                    // always executed
                                });
                        })
                    },


                    updateTableRowNumber: (tableRowNumber) => {
                        this.setState({
                            tableRowNumber
                        }, () => {
                            fetchZoneList(this.state.currentZonelistPageNumber, this.state.tableRowNumber).then((response) => {
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
                        })
                    },
                    sortZonetable: (sort, sortOrder) => {

                        console.log(sort, sortOrder)
                        this.setState({
                            zoneTableSort: {
                                sort, sortOrder
                            }
                        }, () => {
                            fetchZoneList(this.state.currentZonelistPageNumber, this.state.tableRowNumber,
                                this.state.zoneTableSort.sort, this.state.zoneTableSort.sortOrder)
                                .then((response) => {
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
                        })
                    },
                    sortDistricttable: (sort, sortOrder) => {

                        console.log(sort, sortOrder)
                        this.setState({
                            districtTableSort: {
                                sort, sortOrder
                            }
                        }, () => {
                            fetchDistrictList(this.state.currentDistrictlistPageNumber, this.state.districtTableRowNumber,
                                this.state.districtTableSort.sort, this.state.districtTableSort.sortOrder)
                                .then((response) => {
                                    this.setState({
                                        districtList: response.data
                                    })
                                    console.log(response);
                                })
                                .catch(function (error) {
                                    console.log(error);
                                })
                                .then(function () {
                                    // always executed
                                });
                        })
                    },

                    updateCurrentHospitallistPageNumber: (currentHospitallistPageNumber, stopLoading) => {
                        this.setState({
                            currentHospitallistPageNumber
                        }, () => {
                            fetchHospitaltList(this.state.currentHospitallistPageNumber).then((response) => {
                                this.setState({
                                    hospitalList: response.data
                                }, () => {
                                    stopLoading()
                                })
                                console.log(response);
                            })
                                .catch(function (error) {
                                    console.log(error);
                                })
                                .then(function () {
                                    // always executed
                                });
                        })
                    },
                    updateHospitalTableRowNumber: (hospitalTableRowNumber) => {
                        this.setState({
                            hospitalTableRowNumber
                        }, () => {
                            fetchHospitaltList(1, this.state.hospitalTableRowNumber)
                                .then((response) => {
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
                        })
                    },
                    sortHospitaltable: (sort, sortOrder) => {

                        console.log(sort, sortOrder)
                        this.setState({
                            hospitalTableSort: {
                                sort, sortOrder
                            }
                        }, () => {
                            fetchHospitaltList(1, this.state.hospitalTableRowNumber,
                                this.state.hospitalTableSort.sort, this.state.hospitalTableSort.sortOrder)
                                .then((response) => {
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
                        })
                    },
                    updateHospitalList: () => {

                        fetchHospitaltList().then((response) => {
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
                    },





                    updateCurrentDoctorlistPageNumber: (currentDoctorlistPageNumber, stopLoading) => {
                        this.setState({
                            currentDoctorlistPageNumber
                        }, () => {
                            fetchDoctorList(this.state.currentDoctorlistPageNumber).then((response) => {
                                this.setState({
                                    doctorList: response.data
                                }, () => {
                                    stopLoading()
                                })
                                console.log(response);
                            })
                                .catch(function (error) {
                                    console.log(error);
                                })
                                .then(function () {
                                    // always executed
                                });
                        })
                    },
                    updateDoctorTableRowNumber: (doctorTableRowNumber) => {
                        this.setState({
                            doctorTableRowNumber
                        }, () => {
                            fetchDoctorList(1, this.state.doctorTableRowNumber)
                                .then((response) => {
                                    this.setState({
                                        doctorList: response.data
                                    })
                                    console.log(response);
                                })
                                .catch(function (error) {
                                    console.log(error);
                                })
                                .then(function () {
                                    // always executed
                                });
                        })
                    },
                    sortDoctortable: (sort, sortOrder) => {
                        console.log(sort, sortOrder)
                        this.setState({
                            doctorTableSort: {
                                sort, sortOrder
                            }
                        }, () => {
                            fetchDoctorList(1, this.state.doctorTableRowNumber,
                                this.state.doctorTableSort.sort, this.state.doctorTableSort.sortOrder)
                                .then((response) => {
                                    this.setState({
                                        doctorList: response.data
                                    })
                                    console.log(response);
                                })
                                .catch(function (error) {
                                    console.log(error);
                                })
                                .then(function () {
                                    // always executed
                                });
                        })
                    },
                    // updateDoctorList: () => {

                    //     fetchDoctorList().then((response) => {
                    //         this.setState({
                    //             doctorList: response.data
                    //         })
                    //         console.log(response);
                    //     })
                    //         .catch(function (error) {
                    //             console.log(error);
                    //         })
                    //         .then(function () {
                    //             // always executed
                    //         });
                    // },


                    updateDoctorList: (currentDoctorlistPageNumber, doctorTableRowNumber, sort, sortOrder) => {
                        fetchDoctorList(currentDoctorlistPageNumber, doctorTableRowNumber, sort, sortOrder).then((response) => {
                            this.setState({
                                currentDoctorlistPageNumber: response.data.page.currentPage,
                                doctorTableSort: {
                                    sort: response.data.page.sort ? response.data.page.sort : "",
                                    sortOrder: response.data.page.sortOrder ? response.data.page.sortOrder : 0
                                },
                                doctorTableRowNumber: response.data.page.limit,
                                doctorList: response.data
                            })
                            console.log(response);
                        })
                            .catch(function (error) {
                                console.log(error);
                            })
                            .then(function () {
                                // always executed
                            });
                    },








                    updateCurrentServicelistPageNumber: (currentServicelistPageNumber, stopLoading) => {
                        this.setState({
                            currentServicelistPageNumber
                        }, () => {
                            fetchServiceList(this.state.currentServicelistPageNumber).then((response) => {
                                this.setState({
                                    serviceList: response.data
                                }, () => {
                                    stopLoading()
                                })
                                console.log(response);
                            })
                                .catch(function (error) {
                                    console.log(error);
                                })
                                .then(function () {
                                    // always executed
                                });
                        })
                    },
                    updateServiceTableRowNumber: (serviceTableRowNumber) => {
                        this.setState({
                            serviceTableRowNumber
                        }, () => {
                            fetchServiceList(1, this.state.serviceTableRowNumber)
                                .then((response) => {
                                    this.setState({
                                        currentServicelistPageNumber: 1,
                                        serviceList: response.data
                                    })
                                    console.log(response);
                                })
                                .catch(function (error) {
                                    console.log(error);
                                })
                                .then(function () {
                                    // always executed
                                });
                        })
                    },
                    sortServicetable: (sort, sortOrder) => {
                        console.log(sort, sortOrder)
                        this.setState({
                            serviceTableSort: {
                                sort, sortOrder
                            }
                        }, () => {
                            fetchServiceList(1, this.state.serviceTableRowNumber,
                                this.state.serviceTableSort.sort, this.state.serviceTableSort.sortOrder)
                                .then((response) => {
                                    this.setState({
                                        currentServicelistPageNumber: 1,
                                        serviceList: response.data
                                    })
                                    console.log(response);
                                })
                                .catch(function (error) {
                                    console.log(error);
                                })
                                .then(function () {
                                    // always executed
                                });
                        })
                    },
                    updateServiceList: () => {

                        fetchServiceList().then((response) => {
                            this.setState({
                                currentServicelistPageNumber: 1,
                                serviceList: response.data
                            })
                            console.log(response);
                        })
                            .catch(function (error) {
                                console.log(error);
                            })
                            .then(function () {
                                // always executed
                            });
                    },



                    updateDiseaseCatList: (currentDiseaseCatlistPageNumber, diseaseCatTableRowNumber, sort, sortOrder) => {
                        fetchDiseaseCatList(currentDiseaseCatlistPageNumber, diseaseCatTableRowNumber, sort, sortOrder).then((response) => {
                            this.setState({
                                currentDiseaseCatlistPageNumber: response.data.page.currentPage,
                                diseaseCatTableSort: {
                                    sort: response.data.page.sort ? response.data.page.sort : "",
                                    sortOrder: response.data.page.sortOrder ? response.data.page.sortOrder : 0
                                },
                                diseaseCatTableRowNumber: response.data.page.limit,
                                diseaseCatList: response.data
                            })
                            console.log(response);
                        })
                            .catch(function (error) {
                                console.log(error);
                            })
                            .then(function () {
                                // always executed
                            });
                    },

                }}>

                {this.props.children}

            </AppContext.Provider>
        )
    }
}
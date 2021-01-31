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

        currentZonelistPageNumber: 1,
        zoneTableRowNumber: 5,
        zoneTableSort: {
            sort: "name",
            sortOrder: 1
        },

        currentDistrictlistPageNumber: null,
        districtTableRowNumber: 5,
        districtTableSort: {
            sort: "name",
            sortOrder: 1
        },

        currentHospitallistPageNumber: 1,
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
        // this.setZoneList();
        this.setHospitalList();
        this.setDoctorList();
        this.setServiceList();
        this.setDiseaseCatList();
    }


    render() {
        // console.log(this.state)
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
                    updateDistrictList: (currentDoctorlistPageNumber, districtTableRowNumber, sort, sortOrder, query) => {
                        fetchDistrictList(currentDoctorlistPageNumber, districtTableRowNumber, sort, sortOrder, query).then((response) => {
                            this.setState({
                                currentDoctorlistPageNumber: response.data.page.currentPage,
                                districtTableSort: {
                                    sort: response.data.page.sort ? response.data.page.sort : "name",
                                    sortOrder: response.data.page.sortOrder ? response.data.page.sortOrder : 1
                                },
                                districtTableRowNumber: response.data.page.limit,
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
                    updateZoneList: (currentZonelistPageNumber, zoneTableRowNumber, sort, sortOrder, district, query) => {
                        fetchZoneList(currentZonelistPageNumber, zoneTableRowNumber, sort, sortOrder, district, query).then((response) => {
                            this.setState({
                                currentZonelistPageNumber: response.data.page.currentPage,
                                zoneTableSort: {
                                    sort: response.data.page.sort ? response.data.page.sort : "name",
                                    sortOrder: response.data.page.sortOrder ? response.data.page.sortOrder : 1
                                },
                                zoneTableRowNumber: response.data.page.limit,
                                zoneList: response.data
                            })
                            // console.log(response);
                        })
                            .catch(function (error) {
                                console.log(error);
                            })
                            .then(function () {
                                // always executed
                            });
                    },

                    updateHospitalList: (currentHospitallistPageNumber, hospitalTableRowNumber, sort, sortOrder, zone, query) => {
                        fetchHospitaltList(currentHospitallistPageNumber, hospitalTableRowNumber, sort, sortOrder, zone, query).then((response) => {
                            this.setState({
                                currentHospitallistPageNumber: response.data.page.currentPage,
                                hospitalTableSort: {
                                    sort: response.data.page.sort ? response.data.page.sort : "name",
                                    sortOrder: response.data.page.sortOrder ? response.data.page.sortOrder : 1
                                },
                                hospitalTableRowNumber: response.data.page.limit,
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

                    updateDoctorList: (currentDoctorlistPageNumber, doctorTableRowNumber, sort, sortOrder, diseaseCategory, hospital, query) => {
                        fetchDoctorList(currentDoctorlistPageNumber, doctorTableRowNumber, sort, sortOrder, diseaseCategory, hospital
                            , query).then((response) => {
                                this.setState({
                                    currentDoctorlistPageNumber: response.data.page.currentPage,
                                    doctorTableSort: {
                                        sort: response.data.page.sort ? response.data.page.sort : "name",
                                        sortOrder: response.data.page.sortOrder ? response.data.page.sortOrder : 1
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

                    updateServiceList: (currentServicelistPageNumber, serviceTableRowNumber, sort, sortOrder, hospital, query) => {
                        fetchServiceList(currentServicelistPageNumber, serviceTableRowNumber, sort, sortOrder, hospital, query).then((response) => {
                            this.setState({
                                currentServicelistPageNumber: response.data.page.currentPage,
                                serviceTableSort: {
                                    sort: response.data.page.sort ? response.data.page.sort : "name",
                                    sortOrder: response.data.page.sortOrder ? response.data.page.sortOrder : 1
                                },
                                serviceTableRowNumber: response.data.page.limit,
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
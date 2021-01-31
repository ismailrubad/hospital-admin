import React, { Component } from 'react';
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import Layout from '../Layout'
import Dashboard from '../Dashboard/Dashboard';
import District from '../Area/District';
import Hospital from '../Hospital/Hospital';
import Zone from '../Area/Zone';
import Doctor from '../Doctor/Doctor'
import Service from '../Service/Service'
import DiseaseCategory from '../DiseaseCategory/DiseaseCategory'
import Staff from '../Staff/Staff'
import Billing from '../Billing/Billing'

export default class MainApp extends Component {
   render() {
      const { match } = this.props;

      return (
         <Layout currentUrl={match.url}>
            <Switch>
               <Redirect exact from={`${match.url}/`} to={`${match.url}/dashboards`} />
               <Route path={`${match.url}/dashboards`} component={Dashboard} />
               <Route path={`${match.url}/district`} component={District} />
               <Route path={`${match.url}/zone`} component={Zone} />
               <Route path={`${match.url}/hospital`} component={Hospital} />
               <Route path={`${match.url}/doctor`} component={Doctor} />
               <Route path={`${match.url}/service`} component={Service} />
               <Route path={`${match.url}/disease-category`} component={DiseaseCategory} />
               <Route path={`${match.url}/customer`} component={Staff} />
               <Route path={`${match.url}/billing`} component={Billing} />
            </Switch>
         </Layout>
      );
   }
}

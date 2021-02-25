import React from 'react';
import PropTypes from 'prop-types';
import {
   AppBar, CssBaseline, Menu, Hidden, Drawer, IconButton,
   List, ListItem, Grid, ListItemText, Toolbar, Typography,
   Dialog, DialogTitle, DialogContent, ExpansionPanelDetails, ExpansionPanelSummary,
   MenuItem, FormLabel, FormControlLabel, Radio, RadioGroup, Select, FormControl, Button

} from '@material-ui/core';

import { withStyles, makeStyles, createStyles, fade, Theme } from "@material-ui/core/styles";
import { Link, withRouter, Route, NavLink, BrowserRouter, Redirect } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import './style.css';
import logo from "../../logo.png";

import {
   DashboardOutlined, LocationOnOutlined, BusinessOutlined, FaceOutlined,
   LocalHospitalOutlined, CategoryOutlined, SupervisorAccountOutlined, PersonOutline, DescriptionOutlined,
   PowerSettingsNewOutlined
} from "@material-ui/icons"

const drawerWidth = 260;

const useStyles = theme => ({
   root: {
      display: 'flex',
   },
   drawer: {
      [theme.breakpoints.up('sm')]: {
         width: drawerWidth,
         flexShrink: 0,
      },
   },
   appBar: {
      // marginLeft: drawerWidth,

      [theme.breakpoints.up('sm')]: {
         width: `calc(100% - ${drawerWidth}px)`,
      },
   },
   menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
         display: 'none',
      },
   },
   toolbar: theme.mixins.toolbar,
   drawerPaper: {
      width: drawerWidth,
   },
   content: {
      flexGrow: 1,
      // [theme.breakpoints.up("sm")]: {
      //   width: `calc(100% - ${drawerWidth * 2}px)`
      // },
      padding: theme.spacing(3),
      marginTop: '64px'

   },
   sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
         display: 'flex',
      },
   },
   sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
         display: 'none',
      },
   },


   search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
         backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
         marginLeft: theme.spacing(3),
         width: 'auto',
      },
   },
   searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   },
   inputRoot: {
      color: 'inherit',
   },
   inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      // transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
         width: 200,
      },
   },
});




class DrawerLayout extends React.Component {
   state = {
      mobileOpenChapter: false, mobileOpenSettings: false,
      anchorEl: null, anchorElHeaderController: null, anchorElControllerList: null,
      addCustomerDialogOpen: false,
      right: false,
      areaListOpen: true
   }


   handleDrawerToggleChapter = () => {
      this.setState({ mobileOpenChapter: !this.state.mobileOpenChapter })
   }

   handleAreaListClick = () => {
      this.setState({
         areaListOpen: !this.state.areaListOpen
      })
   }

   isSelected(routeName) {
      if (window.location.href.includes(routeName)) return true
   }


   render() {
      const { mobileOpenChapter, mobileOpenSettings } = this.state;
      const { classes } = this.props;
      console.log(this.props)

      const linkStyle = {
         display: 'flex',
         width: '100%',
         alignItems: 'center',
         textDecoration: 'none',
         color: 'inherit'
      },
         nestedList = {
            paddingLeft: 40
         };

      const drawer = (
         <div>
            <div className={classes.toolbar + " logo_wrapper"} style={{ textAlign: "center", padding:10}}>
               <img src={logo} style={{ height: 160, width: "auto" }} />
            </div>
            {/* <Divider /> */}
            <List>
               <ListItem selected={this.isSelected("dashboardOutDashboardOutlineds")} button key={"dashboard"}>
                  <NavLink to={`${this.props.currentUrl}/dashboards`} style={linkStyle}>
                     <DashboardOutlined />
                     <ListItemText primary={"Dashboard"} />
                  </NavLink>
               </ListItem>

               <ListItem button key={"key"} onClick={this.handleAreaListClick}>
                  <LocationOnOutlined />
                  <ListItemText primary="Area" />
                  {this.state.areaListOpen ? <ExpandLess /> : <ExpandMore />}
               </ListItem>
               <Collapse in={this.state.areaListOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                     <ListItem selected={this.isSelected("district")} button style={nestedList}>
                        <NavLink to={`${this.props.currentUrl}/district`} style={linkStyle}>
                           <ListItemText primary="District" />
                        </NavLink>
                     </ListItem>
                  </List>
                  <List component="div" disablePadding>
                     <ListItem selected={this.isSelected("zone")} button style={nestedList}>
                        <NavLink to={`${this.props.currentUrl}/zone`} style={linkStyle}>
                           <ListItemText primary="Zone" />
                        </NavLink>
                     </ListItem>
                  </List>
               </Collapse>
               <ListItem selected={this.isSelected("hospital")} button key={"hospital"}>
                  <NavLink to={`${this.props.currentUrl}/hospital`} style={linkStyle}>
                     <BusinessOutlined />
                     <ListItemText primary={"Hospital"} />
                  </NavLink>
               </ListItem>
               <ListItem selected={this.isSelected("doctor")} button key={"doctor"}>
                  <NavLink to={`${this.props.currentUrl}/doctor`} style={linkStyle}>
                     <FaceOutlined />
                     <ListItemText primary={"Doctor"} />
                  </NavLink>
               </ListItem>
               <ListItem selected={this.isSelected("service")} button key={"service"}>
                  <NavLink to={`${this.props.currentUrl}/service`} style={linkStyle}>
                     <LocalHospitalOutlined />
                     <ListItemText primary={"Service"} />
                  </NavLink>
               </ListItem>
               <ListItem selected={this.isSelected("disease-category")} button key={"disease-category"}>
                  <NavLink to={`${this.props.currentUrl}/disease-category`} style={linkStyle}>
                     <CategoryOutlined />
                     <ListItemText primary={"Disease Category"} />
                  </NavLink>
               </ListItem>
               <ListItem selected={this.isSelected("staff")} button key={"staff"}>
                  <NavLink to={`${this.props.currentUrl}/staff`} style={linkStyle}>
                     <SupervisorAccountOutlined />
                     <ListItemText primary={"Staff"} />
                  </NavLink>
               </ListItem>
               <ListItem selected={this.isSelected("customer")} button key={"customer"}>
                  <NavLink to={`${this.props.currentUrl}/customer`} style={linkStyle}>
                     <PersonOutline />
                     <ListItemText primary={"Customer"} />
                  </NavLink>
               </ListItem>
               <ListItem selected={this.isSelected("billing")} button key={"billing"}>
                  <NavLink to={`${this.props.currentUrl}/billing`} style={linkStyle}>
                     <DescriptionOutlined />
                     <ListItemText primary={"Billing"} />
                  </NavLink>
               </ListItem>

               <ListItem selected={this.isSelected("logout")} button key={"logout"}>
                  <PowerSettingsNewOutlined />
                  <a target="_blank" href={`http://localhost:5000/admin/auth/logout`} style={{color: "inherit", textDecoration: "none"}}>
                     Log Out</a>
               </ListItem>


            </List>
         </div>
      );


      return (
         <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar} style={{boxShadow:  "none", background:"#359d9e"}} >
               <Toolbar style={{ justifyContent: "space-between" }}>
                  <IconButton
                     color="inherit"
                     aria-label="open drawer"
                     edge="start"
                     onClick={this.handleDrawerToggleChapter}
                     className={classes.menuButton}
                  >
                     <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" noWrap>
                     Hospital Sheba
                  </Typography>
               </Toolbar>
            </AppBar>
            <nav className={classes.drawer + " " + "chapters-nav"} aria-label="mailbox folders">
               {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
               <Hidden smUp implementation="css">
                  <Drawer
                     variant="temporary"
                     open={mobileOpenChapter}
                     onClose={this.handleDrawerToggleChapter}
                     classes={{
                        paper: classes.drawerPaper,
                     }}
                     ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                     }}
                     onClick={this.handleDrawerToggleChapter}
                  >
                     {drawer}
                  </Drawer>
               </Hidden>
               <Hidden xsDown implementation="css">
                  <Drawer
                     classes={{
                        paper: classes.drawerPaper,
                     }}
                     variant="permanent"
                     open
                  >
                     {drawer}
                  </Drawer>
               </Hidden>
            </nav>
            <main className={classes.content}>
               {this.props.children}
            </main>

         </div>
      );
   }
}

DrawerLayout.propTypes = {
   classes: PropTypes.object.isRequired,
};


export default withStyles(useStyles)(DrawerLayout);
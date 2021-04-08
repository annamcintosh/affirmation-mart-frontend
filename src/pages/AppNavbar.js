import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@material-ui/icons/Delete";
import { Box, Button, Link, Typography } from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import {
  getOrderAsync,
  removeProductFromOrderAsync,
} from "../features/order/orderSlice";
import { logout } from "../features/user/userSlice";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  content: {
    flexGrow: 1,
    padding: "10px",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

export function AppNavbar() {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getOrderAsync("lovetosing94al@gmail.luv"));
  }, [dispatch]);

  const { order } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleRemoveFromCart = (productId, unitPrice) => {
    console.log("You removed an item!", { productId, unitPrice });
    dispatch(removeProductFromOrderAsync({ productId, unitPrice }));
  };

  return (
    <Box className={classes.root}>
      <CssBaseline />
      <AppBar
        color="inherit"
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          {user ? (
            <Button color="secondary" onClick={dispatch(logout())}>
              Sign Out
            </Button>
          ) : (
            <Link href="/sign-in" color="secondary">
              Sign In
            </Link>
          )}
          <Link
            variant="h4"
            color="secondary"
            noWrap
            className={classes.title}
            href="/"
            style={{
              fontSize: "1.5rem",
              textDecoration: "none",
            }}
          >
            Affirmation-Mart
          </Link>
          <IconButton
            color="secondary"
            variant="contained"
            size="medium"
            aria-label="open shopping cart"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <Box className={classes.drawerHeader} />
      </Box>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Box className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </Box>
        <Divider />
        <h1>Shopping Cart</h1>
        <Divider />
        <List>
          {order.products ? (
            order.products.map(({ productId, name, unitPrice }) => (
              <ListItem key={productId}>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  style={{
                    marginLeft: "0px",
                    marginRight: "2px",
                    paddingLeft: "0px",
                  }}
                  id={productId}
                  onClick={() => handleRemoveFromCart(productId, unitPrice)}
                >
                  <DeleteIcon />
                </IconButton>
                <ListItemText primary={name} />
                <ListItemSecondaryAction>
                  <ListItemText>{unitPrice}</ListItemText>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          ) : (
            <Typography>Your shopping cart is empty.</Typography>
          )}
        </List>
        <Divider />
        <h3>Total: {order.total}</h3>
        <Divider />
        <Link
          color="secondary"
          variant="button"
          href="/checkout"
          aria-label="checkout order"
          size="large"
          style={{
            padding: "6px",
            fontSize: "1.2rem",
          }}
        >
          Checkout
        </Link>
      </Drawer>
    </Box>
  );
}

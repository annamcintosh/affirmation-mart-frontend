import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import ShippingForm from "./ShippingForm";
import PaymentForm from "./PaymentForm";
import OrderReview from "./OrderReview";
import { Box } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { getOrderAsync } from "../features/order/orderSlice";
import { placeOrderAsync } from "../features/user/userSlice";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © Anna McIntosh "}
      {new Date().getFullYear()}
      {" |"}{" "}
      <Link
        color="inherit"
        href="https://github.com/annamcintosh/affirmation-mart-frontend"
      >
        Code for Nerds
      </Link>{" "}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Delivery address", "Payment details", "Review your order"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <ShippingForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <OrderReview />;
    default:
      throw new Error("Unknown step");
  }
}

export function Checkout() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [placedOrder, setPlacedOrder] = useState();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { order } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrderAsync({ user }));
  }, [dispatch, user]);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  async function handlePlaceOrder() {
    setPlacedOrder(order.id);
    await setActiveStep(activeStep + 1);
    await dispatch(placeOrderAsync({ user }));
  }

  return (
    <React.Fragment>
      <CssBaseline />
      {user ? (
        <Box className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your order!
                  </Typography>
                  <Typography variant="subtitle1">
                    Your order number is #{placedOrder}. We have emailed your
                    order confirmation, and your order will be on its way soon!
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <Box className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} className={classes.button}>
                        Back
                      </Button>
                    )}
                    {activeStep !== 0 && order.total > 50 ? (
                      <Button
                        variant="contained"
                        disabled
                        color="secondary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        Next
                      </Button>
                    ) : activeStep === 2 ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handlePlaceOrder}
                        className={classes.button}
                      >
                        Place Order
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        Next
                      </Button>
                    )}
                  </Box>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
          <Copyright />
        </Box>
      ) : (
        <Typography>
          Well this is a suprise. You found the checkout without being logged
          in! Very clever and/or sneaky of you. Head back to the homepage to
          sign up or sign in.
        </Typography>
      )}
    </React.Fragment>
  );
}

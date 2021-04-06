import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Divider } from "@material-ui/core";

export default function PaymentForm() {
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Payment method
      </Typography>
      <Typography variant="h7" gutterBottom>
        We do things a little differently around here. We believe that everyone
        should have access to affirmations, no matter what's in your bank
        account. Every day, you'll start out with 50 credits to spend on
        affirmations.
      </Typography>
      <Divider style={{margin: "15px"}} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h7" gutterBottom>
            Your account balance is:
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h7" gutterBottom>
            Your order total is:
          </Typography>
        </Grid>
        </Grid>
        <Typography variant="h6" gutterBottom style={{margin: "15px"}}>
          You're good to go! Click next to review your order.
        </Typography>
    </React.Fragment>
  );
}

import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export default function ShippingForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Delivery Instructions
      </Typography>
      <Typography variant="h7" gutterBottom>
        Your order of affirmations will be emailed to the address tied to your account.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Email Address"
            fullWidth
            autoComplete="email address"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
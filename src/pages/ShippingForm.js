import React from "react";
// import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
// import TextField from '@material-ui/core/TextField';
import { useSelector } from "react-redux";
import { Divider } from "@material-ui/core";

export default function ShippingForm() {
  const { user } = useSelector((state) => state.user);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Delivery Information
      </Typography>
      <Typography variant="h7" gutterBottom>
        Your order of affirmations will be emailed to you at the address tied to
        your account:
      </Typography>
      <Divider style={{ margin: "10px" }} />
      <Typography variant="h7" gutterBottom>
        {user.id}
      </Typography>
      <Divider style={{ margin: "10px" }} />
      {/* <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            fullWidth
            autoComplete="given-name"
            value={user.data.name}
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
            value={user.data.id}
          />
        </Grid>
      </Grid> */}
    </React.Fragment>
  );
}

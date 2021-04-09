import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Divider } from "@material-ui/core";
import { useSelector } from "react-redux";

export default function PaymentForm() {
  const { order } = useSelector((state) => state.order);

  const isUnderFifty = order.total <= 50;

  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Credit Check
      </Typography>
      <Typography variant="h7" gutterBottom>
        But not that kind of credit check, you know? Let's make sure you have
        enough credits to cover your order of affirmations. Don't worry - if you
        don't have enough right now, you can place another order.
      </Typography>
      <Divider style={{ margin: "15px" }} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h7" gutterBottom>
            Your account balance is: 50 credits
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h7" gutterBottom>
            Your order total is: {order.total} credits
          </Typography>
        </Grid>
      </Grid>
      <Divider style={{ margin: "15px" }} />
      {isUnderFifty ? (
        <Typography variant="h7" gutterBottom style={{ margin: "15px" }}>
          You're good to go! Click next to review your order.
        </Typography>
      ) : (
        <Typography variant="h7" gutterBottom style={{ margin: "15px" }}>
          Uh oh, looks like you have too many items in your cart right now.
          Remember, you can break this order into smaller orders.
        </Typography>
      )}
    </React.Fragment>
  );
}

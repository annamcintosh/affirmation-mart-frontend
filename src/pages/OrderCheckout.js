import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import { Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

export function OrderCheckout() {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Typography variant="h3" className={classes.title}>
        Order Checkout
      </Typography>
      <div className={classes.demo}>
        <List>
          {generate(
            <ListItem>
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
              <ListItemText
                primary="Single-line item"
              />
              <ListItemSecondaryAction>
                <ListItemText>Price: $$$</ListItemText>
              </ListItemSecondaryAction>
            </ListItem>
          )}
        </List>
      </div>
      <Typography variant="h4">
        Order Total: $$$
      </Typography>
      <Link color="secondary" size="md" href="/" variant="button">
        Cancel
      </Link>
      <Button variant="contained" color="secondary" size="md">
        Place Order
      </Button>
    </Container>
  );
}

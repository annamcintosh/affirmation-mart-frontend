import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import Grid from '@material-ui/core/Grid';
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function OrderReview() {
  const classes = useStyles();

  const { order } = useSelector((state) => state.order);
  const { products, total } = order;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map(({name, id, description, unitPrice}) => (
          <ListItem className={classes.listItem} key={id}>
            <ListItemText primary={name} secondary={description} />
            <Typography variant="body2">{unitPrice}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {total}
          </Typography>
        </ListItem>
      </List>
    </React.Fragment>
  );
}

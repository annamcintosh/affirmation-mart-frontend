import React, { useEffect } from "react";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

import { useSelector, useDispatch } from "react-redux";
import { getProductsAsync } from "../features/products/productsSlice";
import { addProductToOrderAsync } from "../features/order/orderSlice";

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
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  cardActions: {
    display: "flex",
    justifyContent: "center",
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export function ProductContainer() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsAsync());
  }, [dispatch]);

  const { products } = useSelector((state) => state.products);
  // const orderId = { id: "c75820f2-4d41-4e45-b25b-cefedc2b44c7" };

  const handleAddToCart = (id, name, unitPrice) => {
    console.log("You added an item!", { id, name, unitPrice });
    dispatch(addProductToOrderAsync({ id, name, unitPrice }));
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              variant="h4"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Welcome to Affirmation-Mart!
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              This is your premiere shop for daily pick-me-ups. We believe in
              celebrating every victory, no matter how big or small.
            </Typography>
            <Typography
              variant="subtitle2"
              align="center"
              color="textSecondary"
              paragraph
            >
              Everyone should have access to affirmations, so for each order you
              place, you'll have 50 credits to spend. Happy shopping!
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {products ? (
              products.map(({ data, description, name, unitPrice, id }) => (
                <Grid item key={id} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image="https://source.unsplash.com/random"
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {name}
                      </Typography>
                      <Typography>{description}</Typography>
                    </CardContent>
                    <CardActions className={classes.cardActions}>
                      <Typography variant="button" color="secondary">
                        {unitPrice} credits
                      </Typography>
                      {data === "inStock" ? (
                        <Button
                          size="medium"
                          label={id}
                          color="secondary"
                          variant="outlined"
                          onClick={() => handleAddToCart(id, name, unitPrice)}
                        >
                          Add to Cart
                          <AddShoppingCartIcon />
                        </Button>
                      ) : (
                        <Button size="medium" variant="text" disabled>
                          Out of Stock
                          <AddShoppingCartIcon />
                        </Button>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography>
                Uh oh, looks like we don't have any products right now. Check
                back again soon!
              </Typography>
            )}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Hope you feel affirmed - you always deserve it!
        </Typography>
        <Copyright />
      </footer>
    </React.Fragment>
  );
}

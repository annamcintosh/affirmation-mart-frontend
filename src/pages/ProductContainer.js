import React, { useEffect, useState } from "react";
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
import Modal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box";
// import { v4 as uuid } from "uuid";

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

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
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
    paddingTop: "56.25%",
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
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export function ProductContainer() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  // const [available, setAvailable] = useState(false);

  useEffect(() => {
    dispatch(getProductsAsync());
  }, [dispatch]);

  const { products } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);

  const handleAddToCart = (id, name, unitPrice) => {
    dispatch(addProductToOrderAsync({ user, id, name, unitPrice }));
  };

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  // const handleProductAvailable = () => {
  //   setAvailable(true);
  // };

  // const handleProductUnavailable = () => {
  //   setAvailable(false);
  // };

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
              products.map(
                ({ data, description, name, unitPrice, image, id }) => (
                  <Grid item key={id} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                      {image ? (
                        <CardMedia
                          className={classes.cardMedia}
                          image={image}
                          title={name}
                        />
                      ) : (
                        <CardMedia
                          className={classes.cardMedia}
                          image="https://source.unsplash.com/random"
                          title="Image title"
                        />
                      )}
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
                          user ? (
                            <Button
                              size="medium"
                              label={id}
                              color="secondary"
                              variant="outlined"
                              onClick={() =>
                                handleAddToCart(id, name, unitPrice)
                              }
                            >
                              Add to Cart
                              <AddShoppingCartIcon />
                            </Button>
                          ) : (
                            <>
                              <Button
                                size="medium"
                                label={id}
                                color="secondary"
                                variant="outlined"
                                onClick={handleModalOpen}
                              >
                                Add to Cart
                                <AddShoppingCartIcon />
                              </Button>
                              <Modal
                                open={open}
                                onClose={handleModalClose}
                                aria-labelledby="sign in reminder modal"
                                aria-describedby="modal reminder you to sign in or sign up to add items to your cart"
                              >
                                <Box
                                  style={modalStyle}
                                  className={classes.paper}
                                >
                                  <h1 id="simple-modal-title">
                                    You have great taste!
                                  </h1>
                                  <h3 id="simple-modal-description">
                                    Sign in or sign up to add this item to your
                                    cart.
                                  </h3>
                                  <Button
                                    label="close-modal"
                                    color="secondary"
                                    variant="outlined"
                                    onClick={handleModalClose}
                                  >
                                    Got it
                                  </Button>
                                </Box>
                              </Modal>
                            </>
                          )
                        ) : (
                          <Button size="medium" variant="text" disabled>
                            Out of Stock
                            <AddShoppingCartIcon />
                          </Button>
                        )}
                      </CardActions>
                    </Card>
                  </Grid>
                )
              )
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

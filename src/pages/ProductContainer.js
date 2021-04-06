// const products = [
//     {
//         productName: "Star",
//         details: "This is a star.",
//         id: "1",
//         image: ""
//     },
//     {
//         productName: "Square",
//         details: "This is a square.",
//         id: "2",
//         image: ""
//     },
//     {
//         productName: "Circle",
//         details: "This is a circle.",
//         id: "3",
//         image: ""
//     },
// ]
// <Link size="md" color="secondary" variant="button" href="/id">
//   Details
// </Link>
// <Button size="md" color="secondary" variant="text">
//   Add to Cart
//   <AddShoppingCartIcon />
// </Button>

import React from "react";
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

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © Anna McIntosh "}
      {new Date().getFullYear()}
      {" |"}{" "}
      <Link color="inherit" href="https://material-ui.com/">
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
    padding: theme.spacing(8, 0, 6),
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
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export function ProductContainer() {
  const classes = useStyles();

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
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe
                      the content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="md" color="secondary">
                      View
                    </Button>
                    <Button size="md" color="secondary" variant="text">
                      Add to Cart
                      <AddShoppingCartIcon />
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
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

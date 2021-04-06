import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export function LoginModal() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        size="md"
        onClick={handleClickOpen}
        style={{
          margin: "0 20px",
        }}
      >
        Sign In
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="sign in modal">
        <DialogTitle id="sign in modal">Sign In to Your Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Welcome back, Friend! Please enter your email and password below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Sign In
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

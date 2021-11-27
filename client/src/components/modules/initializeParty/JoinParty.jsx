import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const JoinParty = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [partyUrl, setPartyUrl] = React.useState("");
  const handleSubmit = async (e) => {
    if (!partyUrl) return;
    window.location = partyUrl;
  };
  return (
    <div>
      <button
        className="button-action button-tertiary"
        variant="contained"
        onClick={handleClickOpen}
      >
        Join Party
      </button>
      <Dialog
        maxWidth={"lg"}
        classes={{
          paper: "dialog-root",
        }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle classes={{ root: "dialog-title-root" }}>
          Join Birthday Party
        </DialogTitle>
        <DialogContent>
          <TextField
            onChange={(e) => {
              setPartyUrl(e.target.value);
            }}
            autoFocus
            label="Party Link"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <button
            className={"button-action button-cancel"}
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className={"button-action button-primary"}
            onClick={handleSubmit}
          >
            Join Party
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default JoinParty;

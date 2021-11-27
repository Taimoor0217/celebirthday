import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createParty } from "../../../utils/firebaseUtils";
import { useNavigate } from "react-router-dom";
import { removeSpacesAndEncode } from "../../../utils/computers";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const CreateParty = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const [partyName, setPartyName] = React.useState("");
  const handleSubmit = async (e) => {
    if (!partyName) return;
    e.preventDefault();
    await createParty(partyName, {
      isPublic: true,
    });
    navigate(`/party?partyId=${removeSpacesAndEncode(partyName)}`);
  };
  return (
    <div>
      <button
        className="button-action button-secondary"
        variant="contained"
        onClick={handleClickOpen}
      >
        Create Party
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
          Create Birthday Party
        </DialogTitle>
        <DialogContent>
          <TextField
            onChange={(e) => {
              setPartyName(e.target.value);
            }}
            autoFocus
            label="Party Name"
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
            className={"button-action button-secondary"}
            onClick={handleSubmit}
          >
            Create Party
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default CreateParty;

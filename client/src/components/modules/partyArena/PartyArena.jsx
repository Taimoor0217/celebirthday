import React from "react";
import { VoxeetSessionProvider } from "../../../providers/VoxeetSessionProvider";
import { getParty } from "../../../utils/firebaseUtils";
import { MainRoom } from "../mainRoom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { initializeVoxeet } from "../../../utils/voxeetUtils";
import { AppControls } from "../../AppControls";
import "./PartyArena.scss";
import SettingsIcon from "../../assets/SettingsIcon";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const PartyArena = () => {
  initializeVoxeet();
  const [userName, setUserName] = React.useState(
    `RandomName-${Date.now() - Math.random()}`.slice(0, 20)
  );
  const [partyExists, setPartyExists] = React.useState(true);
  const params = new URLSearchParams(window.location.search);
  const partyId = params.get("partyId");
  // eslint-disable-next-line no-unused-vars
  const [partyConfig, setPartyConfig] = React.useState({});
  React.useEffect(() => {
    if (partyId && partyExists) {
      getParty(partyId, setPartyConfig, () => setPartyExists(false));
    }
  }, [partyExists, partyId]);
  if (!partyExists) {
    return <h1>Party does not exist</h1>;
  }
  return (
    <VoxeetSessionProvider name={userName}>
      <div className="party-arena">
        <div className="app-controls-holder">
          <AppControls />
          <Settings userName={userName} setUserName={setUserName} />
        </div>
        <div className="room-container">
          <MainRoom meetingId={partyId} userName={userName} />
        </div>
      </div>
    </VoxeetSessionProvider>
  );
};
const Settings = ({ userName, setUserName }) => {
  const [val, setVal] = React.useState(userName);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleRenameSubmit = (e) => {
    e.preventDefault();
    setUserName(val);
    handleClose();
  };
  return (
    <div>
      <div className="app-controls__button" onClick={handleClickOpen}>
        <SettingsIcon width={24} height={24} fill={"white"} />
      </div>
      <Dialog
        maxWidth={"lg"}
        classes={{
          paper: "dialog-root",
        }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle classes={{ root: "dialog-title-root" }}>
          Settings
        </DialogTitle>
        <DialogContent>
          <TextField
            id="updated-name"
            autoFocus
            label="You Name"
            fullWidth
            variant="standard"
            value={val}
            onChange={(e) => {
              setVal(e.target.value);
            }}
          />
          <button
            onClick={handleRenameSubmit}
            className={"button-action button-secondary-settings"}
            type="submit"
          >
            Change Name
          </button>
        </DialogContent>
        <DialogActions>
          <button
            className={"button-action button-cancel"}
            onClick={handleClose}
          >
            Close
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default PartyArena;

import React from "react";
import { VoxeetSessionProvider } from "../../../providers/VoxeetSessionProvider";
import { getParty } from "../../../utils/firebaseUtils";
import { MainRoom } from "../mainRoom";
import TextField from "@mui/material/TextField";
import { initializeVoxeet } from "../../../utils/voxeetUtils";
import { AppControls } from "../../AppControls";
import SettingsIcon from "../../assets/SettingsIcon";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SideCards from "./SideCards";
import CakeArea from "../cake/CakeArea";
import Blessings from "../blessings/Blessings";
import Memories from "../memories/Memories";
import "./PartyArena.scss";

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
  const [currentRoom, setCurrentRoom] = React.useState(1);
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
          <div>
            <AppControls />
            <Settings userName={userName} setUserName={setUserName} />
          </div>
          <SideCards {...{ currentRoom, setCurrentRoom }} />
        </div>
        <div className="room-container">
          <MainRoom
            {...{
              meetingId: partyId,
              userName,
              partyConfig,
              partyId,
              hidden: currentRoom !== 1,
            }}
          />
          {currentRoom === 2 && (
            <Memories
              {...{ partyConfig, partyId, back: () => setCurrentRoom(1) }}
            />
          )}
          {currentRoom === 3 && (
            <Blessings
              {...{ partyConfig, partyId, back: () => setCurrentRoom(1) }}
            />
          )}
          {currentRoom === 4 && (
            <CakeArea
              {...{ partyConfig, partyId, back: () => setCurrentRoom(1) }}
            />
          )}
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

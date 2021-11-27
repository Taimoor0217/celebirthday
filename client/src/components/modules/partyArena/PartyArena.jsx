import React from "react";
import { VoxeetSessionProvider } from "../../../providers/VoxeetSessionProvider";
import { getParty } from "../../../utils/firebaseUtils";
import { MainRoom } from "../mainRoom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { initializeVoxeet } from "../../../utils/voxeetUtils";
import './PartyArena.scss'
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
          {/* <NameChangeForm userName={userName} setUserName={setUserName} /> */}
        <div>
        </div>
        <div className="room-container">
          <MainRoom meetingId={partyId} userName={userName} />
        </div>
      </div>
    </VoxeetSessionProvider>
  );
};
const NameChangeForm = ({ userName, setUserName }) => {
  const [val, setVal] = React.useState(userName);
  const handleSubmit = (e) => {
    e.preventDefault();
    setUserName(val);
  };
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      onSubmit={handleSubmit}
    >
      <TextField
        id="updated-name"
        label="Your Name"
        variant="outlined"
        value={val}
        onChange={(e) => {
          setVal(e.target.value);
        }}
      />
      <Button variant="contained" type="submit">
        Change Name
      </Button>
    </Box>
  );
};
export default PartyArena;

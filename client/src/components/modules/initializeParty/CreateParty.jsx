import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createParty } from "../../../utils/firebaseUtils";
import { useNavigate } from "react-router-dom";
import { removeSpacesAndEncode } from "../../../utils/computers";
const CreateParty = () => {
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
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      onSubmit={handleSubmit}
    >
      <TextField
        onChange={(e) => {
          setPartyName(e.target.value);
        }}
        id="outlined-basic"
        label="Party Name"
        variant="outlined"
      />
      <Button variant="contained" type="submit">
        Create Party
      </Button>
    </Box>
  );
};
export default CreateParty;

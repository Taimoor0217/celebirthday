import "./LandingPage.scss";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/create");
        }}
      >
        Create Party
      </Button>
      <Button
        onClick={() => {
          navigate("/join");
        }}
        variant="contained"
      >
        Join Party
      </Button>
    </Stack>
  );
};
export default LandingPage;

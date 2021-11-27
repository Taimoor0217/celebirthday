import "./LandingPage.scss";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import Stack from "@mui/material/Stack";
const LandingPage = () => {
  return (
    <div className="page-paper">
      <div className="landing-page-content">
        <div className="text-section">
          <h1 className="heading">CeleBirthday</h1>
          <hr className="bottom-line" />
          <p className="description">
            Celebirthday is an online space for celebrating birthdays virtually,
            while maintaining real-time communication with your friends,
            colleagues and family members. Equipped with Dolby’s state of the
            art communication solutions, you can now perform a number of
            activities including placing the participants in immersive virtual
            rooms, sharing memories and anonymous wishes.
          </p>
          <Buttons />
        </div>
        <div className="photo-section">
          <div className="photo" />
        </div>
      </div>
    </div>
  );
};
const Buttons = () => {
  const navigate = useNavigate();
  return (
    <Stack direction="row" spacing={2}>
      <button
        className="button-action button-secondary"
        variant="contained"
        onClick={() => {
          navigate("/create");
        }}
      >
        Create Party
      </button>
      <button
        className="button-action button-tertiary"
        onClick={() => {
          navigate("/join");
        }}
        variant="contained"
      >
        Join Party
      </button>
    </Stack>
  );
};
export default LandingPage;

import React from "react";
import "./Blessings.scss";
import Carousel from "react-elastic-carousel";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextareaAutosize } from "@mui/material";
import { createBlessing, fetchBlessings } from "../../../utils/firebaseUtils";
const Blessings = ({ partyConfig, partyId, back }) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [newBlessing, setNewBlessing] = React.useState("");
  const [messages, setMessages] = React.useState({
    default: "A Very Happy Birthday From Us",
  });
  React.useEffect(() => {
    fetchBlessings(partyId, setMessages);
  }, [partyId]);
  const handleSubmit = async () => {
    console.log(newBlessing);
    await createBlessing(partyId, newBlessing);
    setNewBlessing("");
    setOpen(false);
  };
  return (
    <div className="blessings-room room">
      <h1 className="blessings-header">"Yours Sincerely"</h1>
      <Carousel
        itemsToShow={1}
        showArrows={false}
        autoPlaySpeed={2000}
        enableAutoPlay={true}
      >
        {Object.values(messages).map((message, index) => {
          return (
            <div className={"blessing-card"}>
              <h1 className="blessing-card-content">{`"${message}""`}</h1>
            </div>
          );
        })}
      </Carousel>

      <div>
        <div className="blessings-room-actions">
          <button className={"button-action button-cancel"} onClick={back}>
            Go Back
          </button>
          <button
            className="button-action button-tertiary"
            variant="contained"
            onClick={handleClickOpen}
          >
            Add Yours
          </button>
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
            Add Your Best Whishes
          </DialogTitle>
          <DialogContent>
            <TextareaAutosize
              style={{ width: "100%" }}
              minRows={15}
              value={newBlessing}
              onChange={(e) => {
                setNewBlessing(e.target.value);
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
              Add
            </button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};
export default Blessings;

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
  // const messages = [
  //   "Stay Happy",
  //   "Family celebrating a birthday around a dinner table as they read happy birthday quotes When you sit down with a blank greeting card in front of you, don’t be surprised if you can’t seem to put pen to paper. Many of us get a case of writer’s block when we sit down to write a birthday card greeting, especially to the people we love the most. Sure, the birthday honoree knows just how much you love and appreciate him or her, but it doesn’t hurt to remind them on their day",
  //   "Count your life by smiles, not tears. Count your age by friends, not years. Happy birthday!",
  //   "Another adventure filled year awaits you. Welcome it by celebrating your birthday with pomp and splendor. Wishing you a very happy and fun-filled birthday!",
  // ];
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

import React from "react";
import Carousel from "react-elastic-carousel";
import './Memories.scss';
import {
  fetchPartyImageUrls,
  saveImageUrl,
} from "../../../utils/firebaseUtils";
const Memories = ({ partyConfig, partyId , back}) => {
  const [memories, setMemories] = React.useState({
    "default": "https://icon-library.com/images/memories-icon/memories-icon-4.jpg"
  });
  React.useEffect(() => {
    fetchPartyImageUrls(partyId, setMemories);
  }, [partyId]);
  // eslint-disable-next-line no-undef
  const uploadWidget = cloudinary.createUploadWidget(
    {
      cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
      uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        const url = result.info.secure_url;
        saveImageUrl(partyId, url);
        // console.log("Done! Here is the image info: ", result.info);
      }
    }
  );
  return (
    <div className="memories-room room">
      <h1 className="memories-header">"The best thing about memories is making them"</h1>
      <Carousel
        itemsToShow={1}
        showArrows={false}
        autoPlaySpeed={2000}
        enableAutoPlay={true}
      >
        {Object.values(memories).map((memory, index) => {
          return (
            <div className={"memory-card"}>
              <div className={"memory-card-image"} style={{
                backgroundImage: `url(${memory})`
              }} />
            </div>
          );
        })}
      </Carousel>
      <div className="blessings-room-actions">
        <button className={"button-action button-cancel"} onClick={back}>
          Go Back
        </button>
        <button
          className="button-action button-tertiary"
          variant="contained"
          onClick={() => {
            uploadWidget.open();
          }}
        >
          Upload
        </button>
      </div>
    </div>
  );
};
export default Memories;

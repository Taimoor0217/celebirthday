import { Container, Typography } from '@mui/material';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import CloudinaryUploader from './CloudinaryUploader';

import { useEffect, useState } from 'react';

import { fetchMemories } from "../../../utils/firebaseUtils";

const Memories = ({ partyConfig, partyId, back }) => {

  const [images, setImages] = useState([
    {
      original: "https://res.cloudinary.com/celebirthday/image/upload/kk0fqex0zafwedjaqkte.jpg",
    }
  ]);

    useEffect(() => {
      fetchMemories(partyId, setImages);
      console.log(images)
    }, [partyId]);

    return (
      <Container>
        <Typography variant="h3" gutterBottom component="div" align="center" style={{
          fontWeight: "bold", 
          color: "white"
          }}>
          "Memories are timeless treasures of the heart."
        <CloudinaryUploader partyId={partyId} />

        </Typography>
        <ImageGallery items={
            Object.values(images).map((img, index) => {
              return (
                {
                  original: `https://res.cloudinary.com/celebirthday/image/upload/${img}.jpg`,
                  thumbnail: `https://res.cloudinary.com/celebirthday/image/upload/h_100,w_100/${img}.jpg`
                }
              );
            })
          } thumbnailPosition="left" />
      </Container>
    )
}

export default Memories;

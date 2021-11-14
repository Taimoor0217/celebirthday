import { useState, useEffect } from "react";
import { ref, onValue, off} from "firebase/database";
import { db } from "../../providers/Firebase";
// Gets the position of the avatars representing remote users from Firebase.
export const useRemotePositions = ({ joinInfo, meetingId }) => {
  const [positions, setPositions] = useState([]);

  // Subscribe for updates to remote positions.
  useEffect(() => {
    // Do nothing until we've joined the meeting and have our ID to filter out.
    if (!joinInfo) return;

    // The unique ID that identifies this client.
    const selfId = joinInfo.id;

    const valueRef = ref(db, meetingId);
    const callback = (snapshot) => {
      // This is an object where keys are user ids
      // and values are positions.
      const value = snapshot.val();

      // Guard against null case, before initialization of data in Firebase.
      if (value) {
        // Isolate the array of values to render.
        const positions = Object.values(value)

          // Don't render ourselves here - that is done elsewhere.
          .filter(({ id }) => id !== selfId);

        //console.log(JSON.stringify(positions, null, 2));

        setPositions(positions);
      }
    };
    onValue(valueRef, callback);
    return () => off(callback);
  }, [meetingId, joinInfo]);

  return positions;
};

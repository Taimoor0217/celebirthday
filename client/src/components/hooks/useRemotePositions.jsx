import { useState, useEffect } from "react";
import { ref, onValue, off } from "firebase/database";
import { db } from "../../providers/Firebase";
// Gets the position of the avatars representing remote users from Firebase.
export const useRemotePositions = ({ joinInfo, meetingId }) => {
  const [positions, setPositions] = useState([]);

  // Subscribe for updates to remote positions.
  useEffect(() => {
    if (!joinInfo) return;

    const selfId = joinInfo.id;

    const valueRef = ref(db, meetingId);
    const callback = (snapshot) => {
      const value = snapshot.val();
      if (value) {
        const positions = Object.values(value)
          // Don't render ourselves here - that is done elsewhere.
          .filter(({ id }) => id !== selfId);
        setPositions(positions);
      }
    };
    onValue(valueRef, callback);
    return () => off(valueRef);
  }, [meetingId, joinInfo]);

  return positions;
};

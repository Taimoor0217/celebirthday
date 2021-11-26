import { useEffect } from "react";
import {  ref, set } from "firebase/database";
// Broadcast the user's position to other clients using Firebase.
import { db } from "../../providers/Firebase";
export const useBroadcastPosition = ({
  joinInfo,
  position,
  meetingId,
  selfColor,
  selfIcon,
  userName
}) => {
  // Write position data into Firebase.
  useEffect(() => {
    // Do nothing until we've joined the meeting and have our ID.
    if (!joinInfo) return;

    // The unique ID that identifies this client.
    const selfId = joinInfo.id;

    // Persist to Firebase.

    set(ref(db, `${meetingId}/user${selfId}`), {
      position,
      color: selfColor,
      icon: selfIcon,
      id: selfId,
      userName
    });
  }, [meetingId, position, selfColor, selfIcon, joinInfo, userName]);

  // Remove users when they close the browser.
  useEffect(() => {
    if (!joinInfo) return;
    const selfId = joinInfo.id;

    // Hack to be able to clear out positions manually.
    window.clearPositions = () => {
      set(ref(db, `${meetingId}`), {});
    };

    // TODO see if we can use Dolby API events to track this more robustly.
    const callback = () => {
      set(ref(db, `${meetingId}/user${selfId}`), null);
    };
    window.addEventListener("beforeunload", callback);
    return () => window.removeEventListener("beforeunload", callback);
  }, [meetingId, joinInfo]);
};

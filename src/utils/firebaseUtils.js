import { getDatabase, ref, get, valueOn} from "firebase/database";
import { db } from "../providers/Firebase";
export const getFirebaseDataOnce = async ({ meetingId }) => {
  const dbRef = ref(db);
  return await get(dbRef, meetingId);
};

export const subscribeToAttributeUpdates = ({
  meetingId,
  attribute,
  callback,
}) => {
  const valueRef = ref(db, `${meetingId}/${attribute}`);

  valueOn(valueRef, (snapshot) => {
    callback({ newData: snapshot.val() });
  });
};

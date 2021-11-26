import { ref, get, set, onValue } from "firebase/database";
import { db } from "../providers/Firebase";
import { removeSpacesAndEncode } from "./computers";
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

  onValue(valueRef, (snapshot) => {
    callback({ newData: snapshot.val() });
  });
};


export const createParty = async (partyName, metaData) => {
  await set(ref(db, `parties/${removeSpacesAndEncode(partyName)}`), {
    ...metaData,
    createdAt: Date.now(),
    partyName,
  });
};

export const getParty = async (partyId, callBack, error) => {
  const valueRef = ref(db, `parties/${partyId}`);
  onValue(valueRef, (snapshot) => {
    if(!snapshot.exists()) {
      error();
    }else{
      callBack(snapshot.val());
    }
  });
};
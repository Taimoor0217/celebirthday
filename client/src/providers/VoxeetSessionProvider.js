import { useState, useEffect } from "react";
import { session } from "@voxeet/voxeet-web-sdk";

export const VoxeetSessionProvider = ({ name, children }) => {
  const [isSessionLoaded, setIsSessionLoaded] = useState(false);

  useEffect(() => {
    session.open({ name }).then(() => {
      console.log("created a session");
      setIsSessionLoaded(true);
    });
  }, []);

  return isSessionLoaded ? (
    children
  ) : (
    <div className="initializing">
      Initializing ...
    </div>
  );
};

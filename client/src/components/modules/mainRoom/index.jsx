// import { useMemo } from 'react';
import { AppControls } from "../../AppControls";
import { icons } from "./Avatar";
import { AvatarOrVideo } from "./AvatarOrVideo";
import { useAvatarPosition } from "../../hooks/useAvatarPosition";
import { useRemotePositions } from "../../hooks/useRemotePositions";
// import { HexGridOverlay, positionToH3 } from './HexGridOverlay';
import { useMeeting } from "../../hooks/useMeeting";
import { useBroadcastPosition } from "../../hooks/useBroadcastPosition";
// import { useStopAudio } from '../../hooks/useStopAudio';
import { useParticipants } from "../../hooks/useParticipants";
import { useKillZombies } from "../../hooks/useKillZombies";
import "./index.scss";
import BackGround from "../../../assets/room1.svg"

// The color that your avatar will appear.
const colors = [
  "#4c2582",
  "#4b5ca8",
  "#86cbc8",
];

const selfColor = colors[Math.floor(Math.random() * colors.length)];

const iconNames = Object.keys(icons);
const selfIcon = iconNames[Math.floor(Math.random() * iconNames.length)];

const svgWidth = "100%";
const svgHeight = "100%";

const initialPosition = [200, 200];

export function MainRoom({ meetingId, userName , hidden}) {
  // Place the user in a live meeting based on the activeHexId they are in.
  const joinInfo = useMeeting(meetingId);

  // The position of the avatar representing the user.
  // This hook implements the arrow key interactions.
  const position = useAvatarPosition({ initialPosition });

  // The id of the "active" hexagon - the one the user avatar is inside.
  // const activeHexId = useMemo(() => positionToH3(position), [position]);

  // Broadcast the user's position to other clients using Firebase.
  useBroadcastPosition({
    joinInfo,
    position,
    meetingId,
    selfColor,
    selfIcon,
    userName,
  });

  // Get the positions of the remote users from Firebase.
  const remotePositions = useRemotePositions({ joinInfo, meetingId, userName });

  // Ensure there are no stale Firebase entries for people who have left.
  useKillZombies({ meetingId, remotePositions });

  const participants = useParticipants(joinInfo);

  return (
    <div 
    className={["main-room room", hidden ? "hidden" : ""].join(" ")}
    style={{
      backgroundImage: `url(${BackGround})`,
    }}
    >
      <div className="map-image-container">
        <svg width={svgWidth} height={svgHeight} className="birthday-room">
          {remotePositions.map(({ position, color, id, icon, userName }) => (
            <AvatarOrVideo
              key={id}
              id={id}
              position={position}
              color={color}
              icon={icon}
              participants={participants}
              userName={userName}
            />
          ))}
          <AvatarOrVideo
            color={selfColor}
            icon={selfIcon}
            position={position}
            id={joinInfo ? joinInfo.id : null}
            isSelf
            participants={participants}
            userName={userName}
          />
        </svg>
      </div>
    </div>
  );
}

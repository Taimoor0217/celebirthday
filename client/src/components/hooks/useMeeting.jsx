import { useEffect, useState } from 'react';
import { conference, session } from '@voxeet/voxeet-web-sdk';

const meetingId = (meetingId) => `celebirthday-${meetingId}`;

// This hook joins a meeting and returns joining info.
// That joining info contains the ID we can use with Dolby APIs
// to identify the user for the purposes of stopping/starting audio.
export const useMeeting = (id) => {
  // Keep track of joining info, which contains the generated ID for our user.
  const [joinInfo, setJoinInfo] = useState(false);

  // Join the conference and store the generated ID.
  useEffect(() => {
    const join = async () => {
      const conf = await conference.create({ alias: meetingId(id) });
      await conference.join(conf, {});
      setJoinInfo({ id: session.participant.id });
    };
    join();

    // Clean up when we move between cells.
    return () => {
      conference.leave();
    };
  }, [id]);

  return joinInfo;
};

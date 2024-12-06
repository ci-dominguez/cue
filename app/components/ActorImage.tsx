import { useEffect, useState } from 'react';
import { getActorImageUrl } from '~/utils/tmdb';
import Pfp from '../../imgs/profile.svg';

const ActorImage = ({
  profilePath,
  name,
}: {
  profilePath: string | null;
  name: string;
}) => {
  const [imageUrl, setImageUrl] = useState<string>(Pfp);

  useEffect(() => {
    getActorImageUrl(profilePath).then(setImageUrl);
  }, [profilePath]);

  if (!profilePath)
    return (
      <img
        src={Pfp}
        alt={name}
        className='w-10 h-10 rounded-full object-cover'
      />
    );

  return (
    <img
      src={imageUrl}
      alt={name}
      className='w-12 h-12 rounded-full object-cover'
    />
  );
};

export default ActorImage;

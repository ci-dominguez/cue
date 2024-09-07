import { useEffect, useState } from 'react';
import { getActorImageUrl } from '~/utils/tmdb';
import Pfp from '../../public/imgs/profile.svg';

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

  return (
    <img
      src={imageUrl}
      alt={name}
      className="w-12 h-12 rounded-full object-cover"
    />
  );
};

export default ActorImage;

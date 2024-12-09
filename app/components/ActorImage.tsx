import { useEffect, useState } from 'react';
import { getActorImageUrl } from '~/utils/tmdb';
import { CircleUserRound } from 'lucide-react';

const ActorImage = ({
  profilePath,
  name,
}: {
  profilePath: string | null;
  name: string;
}) => {
  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    getActorImageUrl(profilePath).then(setImageUrl);
  }, [profilePath]);

  if (!profilePath || !imageUrl)
    return <CircleUserRound className='size-12 stroke-text' />;

  return (
    <img
      src={imageUrl}
      alt={name}
      className='w-12 h-12 rounded-full object-cover'
    />
  );
};

export default ActorImage;

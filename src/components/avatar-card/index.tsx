import { FALLBACK_IMAGE } from '../../constants';
import { Profile } from '../../interfaces/profile';
import { skeleton } from '../../utils';
import LazyImage from '../lazy-image';

interface AvatarCardProps {
  profile: Profile | null;
  loading: boolean;
  avatarRing: boolean;
  resumeFileUrl?: string;
}

/**
 * Renders an AvatarCard component.
 * @param profile - The profile object.
 * @param loading - A boolean indicating if the profile is loading.
 * @param avatarRing - A boolean indicating if the avatar should have a ring.
 * @param resumeFileUrl - The URL of the resume file.
 * @returns JSX element representing the AvatarCard.
 */
const AvatarCard: React.FC<AvatarCardProps> = ({
  profile,
  loading,
  avatarRing,
  resumeFileUrl,
}): React.JSX.Element => {
  // Kattappa-specific information
  const kattappaName = "Kattappa";
  const kattappaBio = "Loyal commander of the Mahishmati kingdom's army and mentor to Amarendra Baahubali. Known for his unwavering sense of duty, sacrifice, and legendary oath to the throne.";
  
  // Use profile avatar if available, otherwise fall back to a stable Kattappa image, then your default FALLBACK_IMAGE
  const avatarSrc = profile?.avatar || "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Sathyaraj_filming_Bahubali_the_Conclusion_%28cropped%29.jpg/440px-Sathyaraj_filming_Bahubali_the_Conclusion_%28cropped%29.jpg" || FALLBACK_IMAGE;

  return (
    <div className="card shadow-lg card-sm bg-base-100">
      <div className="grid place-items-center py-8">
        {loading || !profile ? (
          <div className="avatar opacity-90">
            <div className="mb-8 rounded-full w-32 h-32">
              {skeleton({
                widthCls: 'w-full',
                heightCls: 'h-full',
                shape: '',
              })}
            </div>
          </div>
        ) : (
          <div className="avatar opacity-90">
            <div
              className={`mb-8 rounded-full w-32 h-32 ${
                avatarRing
                  ? 'ring-3 ring-primary ring-offset-base-100 ring-offset-2'
                  : ''
              }`}
            >
              <LazyImage
                src={avatarSrc}
                alt={`${kattappaName} Avatar`}
                placeholder={skeleton({
                  widthCls: 'w-full',
                  heightCls: 'h-full',
                  shape: '',
                })}
              />
            </div>
          </div>
        )}
        
        <div className="text-center mx-auto px-8">
          <h5 className="font-bold text-2xl">
            {loading || !profile ? (
              skeleton({ widthCls: 'w-48', heightCls: 'h-8' })
            ) : (
              <span className="text-base-content opacity-70">
                {kattappaName}
              </span>
            )}
          </h5>
          <div className="mt-3 text-base-content font-mono">
            {loading || !profile ? (
              skeleton({ widthCls: 'w-48', heightCls: 'h-5' })
            ) : (
              kattappaBio
            )}
          </div>
        </div>
        
        {resumeFileUrl &&
          (loading ? (
            <div className="mt-6">
              {skeleton({ widthCls: 'w-40', heightCls: 'h-8' })}
            </div>
          ) : (
            <a
              href={resumeFileUrl}
              target="_blank"
              className="btn btn-outline btn-sm text-xs mt-6 opacity-50"
              download
              rel="noreferrer"
            >
              Download Resume
            </a>
          ))}
      </div>
    </div>
  );
};

export default AvatarCard;

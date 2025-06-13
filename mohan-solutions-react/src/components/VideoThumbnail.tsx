import React, { useState, useEffect, useCallback } from 'react';
import { WistiaPlayer } from '@wistia/wistia-player-react';

interface VideoThumbnailProps {
  videoId: string;
  aspectRatio?: number;
  className?: string;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ 
  videoId, 
  aspectRatio = 16 / 9,
  className = "" 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');

  useEffect(() => {
    // Preload thumbnail
    const img = new Image();
    img.onload = () => {
      setThumbnailUrl(`https://fast.wistia.com/embed/medias/${videoId}/swatch`);
    };
    img.src = `https://fast.wistia.com/embed/medias/${videoId}/swatch`;
  }, [videoId]);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
    
    // Push a new state to history so back button can close modal
    window.history.pushState({ modalOpen: true, videoId }, '', window.location.href);
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
    
    // Go back in history if we pushed a state when opening
    if (window.history.state?.modalOpen && window.history.state?.videoId === videoId) {
      window.history.back();
    }
  }, [videoId]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isModalOpen, closeModal]);

  // Handle browser back button
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (isModalOpen && (!event.state?.modalOpen || event.state?.videoId !== videoId)) {
        // User pressed back button while modal was open - just close without pushing to history
        setIsModalOpen(false);
        document.body.style.overflow = 'auto';
      }
    };

    if (isModalOpen) {
      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, [isModalOpen, videoId]);

  return (
    <>
      {/* Thumbnail */}
      <div 
        className={`video-wrapper ${className}`}
        onClick={openModal}
        style={{
          backgroundImage: thumbnailUrl ? `url(${thumbnailUrl})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          cursor: 'pointer'
        }}
      >
        <div className="video-overlay">
          <button 
            className="play-button" 
            aria-label="Play video testimonial"
            onClick={(e) => {
              e.stopPropagation();
              openModal();
            }}
          >
            <i className="ri-play-fill"></i>
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="video-modal active">
          <div className="modal-content">
            <button 
              className="modal-close" 
              onClick={closeModal}
              aria-label="Close video"
            >
              <i className="ri-close-line"></i>
            </button>
            <div className="modal-container">
              <WistiaPlayer
                mediaId={videoId}
                aspect={aspectRatio}
                autoplay={true}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoThumbnail;

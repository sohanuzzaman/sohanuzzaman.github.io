import React, { useEffect, useState } from 'react';

interface VideoModalProps {}

const VideoModal: React.FC<VideoModalProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [videoId, setVideoId] = useState<string>('');

  useEffect(() => {
    const handleOpenVideo = (event: CustomEvent) => {
      setVideoId(event.detail.videoId);
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    };

    window.addEventListener('openVideo', handleOpenVideo as EventListener);
    
    return () => {
      window.removeEventListener('openVideo', handleOpenVideo as EventListener);
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    if (isOpen && videoId) {
      // Load Wistia video
      const modalContainer = document.getElementById('modalVideoContainer');
      if (modalContainer && window.Wistia) {
        modalContainer.innerHTML = `
          <div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;">
            <div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;">
              <div class="wistia_embed wistia_async_${videoId} videoFoam=true" style="height:100%;position:relative;width:100%">
                <div class="wistia_swatch" style="height:100%;left:0;opacity:0;overflow:hidden;position:absolute;top:0;transition:opacity 200ms;width:100%;">
                  <img src="https://fast.wistia.com/embed/medias/${videoId}/swatch" style="filter:blur(5px);height:100%;object-fit:contain;width:100%;" alt="" aria-hidden="true" onload="this.parentNode.style.opacity=1;" />
                </div>
              </div>
            </div>
          </div>
        `;
      }
    }
  }, [isOpen, videoId]);

  const closeModal = () => {
    setIsOpen(false);
    setVideoId('');
    document.body.style.overflow = 'auto';
    
    // Clear the modal content
    const modalContainer = document.getElementById('modalVideoContainer');
    if (modalContainer) {
      modalContainer.innerHTML = '';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="video-modal" id="videoModal">
      <div className="modal-content">
        <button className="modal-close" onClick={closeModal}>
          <i className="ri-close-line"></i>
        </button>
        <div className="modal-container" id="modalVideoContainer"></div>
      </div>
    </div>
  );
};

export default VideoModal;

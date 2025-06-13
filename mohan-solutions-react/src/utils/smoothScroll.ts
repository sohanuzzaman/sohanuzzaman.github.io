// Smooth scrolling utilities for React app

export const scrollToElement = (elementId: string, offset: number = 80): void => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.warn(`Element with id "${elementId}" not found`);
    return;
  }

  const headerOffset = offset;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
};

export const scrollToTop = (): void => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

export const scrollToSection = (sectionName: string): void => {
  // Common section mappings
  const sectionMappings: Record<string, string> = {
    'about': 'about',
    'services': 'services', 
    'process': 'process',
    'testimonials': 'testimonials',
    'contact': 'cta'
  };

  const targetId = sectionMappings[sectionName] || sectionName;
  scrollToElement(targetId);
};

// Hook for smooth scroll navigation
export const useSmoothScroll = () => {
  return {
    scrollToElement,
    scrollToTop,
    scrollToSection
  };
};

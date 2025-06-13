// Global type definitions for external libraries and custom properties

declare global {
  interface Window {
    Wistia?: any;
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill: any;
        utm: any;
      }) => void;
    };
    loadWistia?: () => void;
  }

  interface HTMLImageElement {
    fetchPriority?: string;
  }
}

export {};

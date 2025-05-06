export {};

declare global {
  interface Window {
    electronAPI?: {
      saveFile: (data: string, type: string) => Promise<boolean>;
    };
  }
} 
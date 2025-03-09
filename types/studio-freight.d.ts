declare module '@studio-freight/compono' {
  export const RealViewport: React.FC;
}

declare module '@studio-freight/tempus' {
  const Tempus: {
    add: (callback: (time: number) => void, priority?: number) => void;
  };
  export default Tempus;
}

declare module '@studio-freight/react-lenis' {
  export function useLenis(callback?: (instance: any) => void): any;
} 


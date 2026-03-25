declare module "animejs" {
  interface AnimeParams {
    targets?: string | object | HTMLElement | SVGElement | NodeList | null;
    duration?: number;
    delay?: number | Function;
    easing?: string;
    loop?: boolean | number;
    direction?: "normal" | "reverse" | "alternate";
    autoplay?: boolean;
    d?: Array<{ value: string }>;
    opacity?: number | number[];
    translateY?: number | number[];
    rotateX?: number | number[];
    rotateZ?: number | number[];
    scale?: number | number[];
    [key: string]: unknown;
  }

  interface AnimeInstance {
    pause: () => void;
    play: () => void;
    restart: () => void;
    reverse: () => void;
    seek: (time: number) => void;
    finished: Promise<void>;
  }

  interface AnimeStatic {
    (params: AnimeParams): AnimeInstance;
    stagger: (value: number, options?: object) => Function;
  }

  const anime: AnimeStatic;
  export default anime;
}

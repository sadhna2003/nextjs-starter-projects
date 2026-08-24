import { useMediaQuery } from '@react-hook/media-query';

export const useTailwindScreenSize = (minSize: string) => {
  const sm = useMediaQuery('(min-width: 640px)');
  const md = useMediaQuery('(min-width: 768px)');
  const lg = useMediaQuery('(min-width: 1024px)');
  const xl = useMediaQuery('(min-width: 1280px)');

  if (minSize === 'xl' && xl) {
    return true;
  } else if (minSize === 'lg' && (lg || xl)) {
    return true;
  } else if (minSize === 'md' && (md || lg || xl)) {
    return true;
  } else if (minSize === 'sm' && (sm || md || lg || xl)) {
    return true;
  } else {
    return false;
  }
};
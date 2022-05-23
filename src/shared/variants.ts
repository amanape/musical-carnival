// eslint-disable-next-line import/prefer-default-export
import { Variants } from 'framer-motion';

export const buttonVariants: Variants = {
  hover: {
    scale: 1.1,
  },
  tap: {
    scale: 0.9,
  },
};

export const pVariants: Variants = {
  hidden: (custom: 'y' | 'x') => ({
    opacity: 0,
    y: custom === 'y' ? -20 : 0,
    x: custom === 'x' ? -20 : 0,
  }),
  visible: (custom: 'y' | 'x') => ({
    opacity: 1,
    y: 0,
    x: custom === 'x' ? '100%' : 0,
  }),
  exit: (custom: 'y' | 'x') => ({
    opacity: 0,
    y: custom === 'y' ? 20 : 0,
    x: custom === 'x' ? '110%' : 0,
    transition: {
      duration: 0.2,
    },
  }),
};

export const taskListVariants: Variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

export const lineThroughVariants: Variants = {
  initial: {
    width: 0,
  },
  visible: {
    width: '100%',
  },
};

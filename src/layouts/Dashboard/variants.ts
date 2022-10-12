import { Variants } from 'framer-motion'

export const variantsLayoutContent: Variants = {
  collapsed: {
    marginLeft: 88,
    transition: {
      stiffness: 0,
    },
  },
  opened: {
    marginLeft: 240,
    transition: {
      stiffness: 0,
    },
  },
  mobile: {
    marginLeft: 0,
    transition: {
      stiffness: 0,
    },
  },
}

import { Variants } from 'framer-motion'

export const variantsSidebarWrapper: Variants = {
  collapsed: {
    x: 0,
    width: 88,
    transition: {
      stiffness: 0,
    },
  },
  opened: {
    x: 0,
    width: 240,
    transition: {
      stiffness: 0,
    },
  },
}

export const variantsTitle: Variants = {
  collapsed: {
    x: -240,
    transition: {
      stiffness: 0,
    },
  },
  opened: {
    x: 0,
    transition: {
      stiffness: 0,
    },
  },
}

export const variantsCollapse: Variants = {
  collapsed: {
    x: 0,
    rotate: 180,
    transition: {
      stiffness: 0,
    },
  },
  opened: {
    x: 160,
    transition: {
      stiffness: 0,
    },
  },
}

export const variantsListItemIcon: Variants = {
  collapsed: {
    x: 3,
    transition: {
      stiffness: 0,
    },
  },
  opened: {
    x: 0,
    transition: {
      stiffness: 0,
    },
  },
}

export const variantsListItemText: Variants = {
  collapsed: {
    x: -240,
    transition: {
      stiffness: 0,
    },
  },
  opened: {
    x: 24,
    transition: {
      stiffness: 0,
    },
  },
}

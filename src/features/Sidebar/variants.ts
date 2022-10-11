import { Variants } from 'framer-motion'

export const variantsSidebarWrapper: Variants = {
  collapsed: {
    width: 88,
  },
  opened: {
    width: 240,
  },
}

export const variantsTitle: Variants = {
  collapsed: {
    x: -300,
  },
  opened: {
    x: 0,
  },
}

export const variantsCollapse: Variants = {
  collapsed: {
    x: 0,
    rotate: 180,
  },
  opened: {
    x: 160,
  },
}

export const variantsListItemIcon: Variants = {
  collapsed: {
    x: 4,
  },
  opened: {
    x: 0,
  },
}

export const variantsListItemText: Variants = {
  collapsed: {
    x: 24,
    maxWidth: 0,
  },
  opened: {
    x: 24,
    maxWidth: '100%',
  },
}

export const variantsProfileInfo: Variants = {
  collapsed: {
    x: -300,
  },
  opened: {
    x: 0,
  },
}

export const variantsProfileLogout: Variants = {
  collapsed: {
    x: 0,
  },
  opened: {
    x: 164,
  },
}

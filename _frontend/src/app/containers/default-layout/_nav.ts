import { INavData } from '@coreui/angular';

// export const navItems: INavData[] = [
//   {
//     name: 'Dashboard',
//     url: '/dashboard',
//     iconComponent: { name: 'cil-speedometer' },
//     // badge: {
//     //   color: 'info',
//     //   text: 'NEW'
//     // }
//   },
//   // {
//   //   title: true,
//   //   name: 'Theme'
//   // },
//   {
//     name: 'Colors',
//     url: '/theme/colors',
//     iconComponent: { name: 'cil-drop' }
//   },
//   {
//     name: 'Typography',
//     url: '/theme/typography',
//     linkProps: { fragment: 'someAnchor' },
//     iconComponent: { name: 'cil-pencil' }
//   }
// ];

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cilHome' }
  },
  {
    name: 'Songs',
    url: '/songs',
    iconComponent: { name: 'cilMusicNote' }
  },
  {
    name: 'Chapters',
    url: '/chapters',
    iconComponent: { name: 'cilMusicNote' }
  },
  {
    name: 'Self Affirmation',
    url: '/self_affirmation',
    iconComponent: { name: 'cilMusicNote' }
  },
  {
    name: 'Android App Version',
    url: '/android_app_version',
    iconComponent: { name: 'cilScreenSmartphone' }
  },
  {
    name: 'Daily Update Alert',
    url: '/daily_update_alert',
    iconComponent: { name: 'cil-triangle' }
  },
  {
    name: 'Users',
    url: '/users',
    iconComponent: { name: 'cil-user' }
  },
  {
    name: 'API Keys',
    url: '/api_keys',
    iconComponent: { name: 'cil-lock-unlocked' }
  }
]
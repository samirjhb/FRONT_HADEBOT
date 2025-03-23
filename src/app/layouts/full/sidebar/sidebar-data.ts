import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Inicio',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-grid-add',
    route: '/dashboard',
  },

  {
    navCap: 'Componentes UI',
  },
  {
    displayName: 'Insignias',
    iconName: 'archive',
    route: '/ui-components/badge',
  },
  {
    displayName: 'Chips',
    iconName: 'info-circle',
    route: '/ui-components/chips',
  },
  {
    displayName: 'Listas',
    iconName: 'list-details',
    route: '/ui-components/lists',
  },
  {
    displayName: 'Menú',
    iconName: 'file-text',
    route: '/ui-components/menu',
  },
  {
    displayName: 'Tooltips',
    iconName: 'file-text-ai',
    route: '/ui-components/tooltips',
  },
  {
    displayName: 'Formularios',
    iconName: 'clipboard-text',
    route: '/ui-components/forms',
  },
  {
    displayName: 'Tablas',
    iconName: 'table',
    route: '/ui-components/tables',
  },

  {
    navCap: 'Extra',
  },
  {
    displayName: 'Iconos',
    iconName: 'mood-smile',
    route: '/extra/icons',
  },
  {
    displayName: 'Página de Ejemplo',
    iconName: 'brand-dribbble',
    route: '/extra/sample-page',
  },

  {
    navCap: 'Autenticación',
  },
  {
    displayName: 'Iniciar Sesión',
    iconName: 'login',
    route: '/authentication/login',
  },
  {
    displayName: 'Registrarse',
    iconName: 'user-plus',
    route: '/authentication/register',
  },
];

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
    navCap: 'Herramientas de Trabajo',
  },
  {
    displayName: 'Paciente',
    iconName: 'clipboard-text',
    route: '/herramientas-de-trabajo/paciente',
  },
  {
    displayName: 'Insignias',
    iconName: 'archive',
    route: '/herramientas-de-trabajo/badge',
  },
  {
    displayName: 'Chips',
    iconName: 'info-circle',
    route: '/herramientas-de-trabajo/chips',
  },
  {
    displayName: 'Listas',
    iconName: 'list-details',
    route: '/herramientas-de-trabajo/lists',
  },
  {
    displayName: 'Menú',
    iconName: 'file-text',
    route: '/herramientas-de-trabajo/menu',
  },
  {
    displayName: 'Tooltips',
    iconName: 'file-text-ai',
    route: '/herramientas-de-trabajo/tooltips',
  },
  {
    displayName: 'Tablas',
    iconName: 'table',
    route: '/herramientas-de-trabajo/tables',
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

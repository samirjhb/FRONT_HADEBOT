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
    navCap: 'Gestión Clínica',
  },
  {
    displayName: 'Pacientes',
    iconName: 'users',
    route: '/herramientas-de-trabajo/paciente',
  },
  {
    displayName: 'Fichas Clínicas',
    iconName: 'file-text',
    route: '/herramientas-de-trabajo/fichaClinica',
  },
  {
    displayName: 'Citas',
    iconName: 'calendar',
    route: '/citas',
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

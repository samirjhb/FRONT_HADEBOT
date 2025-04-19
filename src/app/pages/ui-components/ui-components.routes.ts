import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'fichaClinica',
        loadComponent: () =>
          import('../../components/ficha-clinica/ficha-clinica.component').then(
            (c) => c.FichaClinicaComponent
          ),
        title: 'Ficha Clínica',
      },
      {
        path: 'paciente',
        loadComponent: () =>
          import('../../components/paciente/paciente.component').then(
            (c) => c.PacienteComponent
          ),
        title: 'Pacientes',
      }
    ],
  },
];

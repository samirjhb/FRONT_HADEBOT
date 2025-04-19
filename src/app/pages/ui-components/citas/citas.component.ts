import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ThemePalette } from '@angular/material/core';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
  inject,
  signal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipsModule,
} from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

export interface Appointment {
  _id?: string;
  paciente: {
    _id: string;
    name: string;
    rut: string;
    cel: number;
    email: string;
    record: string;
    birthDate: Date;
    evaluations?: any[];
    clinicalRecords?: any[];
  } | string;
  fecha: Date;
  hora: string;
  completada?: boolean;
  cancelada?: boolean;
}

export interface Patient {
  _id: string;
  name: string;
  rut: string;
  cel: number;
  email: string;
  record: string;
  birthDate: Date;
  evaluations?: any[];
  clinicalRecords?: any[];
}

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    TablerIconsModule,
    MatSnackBarModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CitasComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private appointmentsSubject = new BehaviorSubject<Appointment[]>([]);
  private patientsSubject = new BehaviorSubject<Patient[]>([]);

  appointments$ = this.appointmentsSubject.asObservable();
  patients$ = this.patientsSubject.asObservable();
  
  appointmentForm: FormGroup;
  apiUrl = environment.apiUrl;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.appointmentForm = this.fb.group({
      paciente: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', [Validators.required, Validators.pattern('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$')]],
    });
  }

  ngOnInit() {
    this.loadAppointments();
    this.loadPatients();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadAppointments() {
    this.http.get<Appointment[]>(`${this.apiUrl}/citas`)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (appointments) => {
          const now = new Date();
          const filteredAppointments = appointments.filter(appointment => {
            // Crear una fecha combinando la fecha y hora de la cita
            const appointmentDate = new Date(appointment.fecha);
            const [hours, minutes] = appointment.hora.split(':').map(Number);
            
            // Establecer la hora y minutos en la fecha de la cita
            appointmentDate.setHours(hours, minutes, 0, 0);
            
            // Calcular el tiempo de expiración (30 minutos después)
            const expirationTime = new Date(appointmentDate.getTime() + (30 * 60 * 1000));
            
            console.log('Cita:', {
              original: appointmentDate.toLocaleString(),
              expiracion: expirationTime.toLocaleString(),
              ahora: now.toLocaleString(),
              visible: expirationTime > now
            });
            
            return expirationTime > now;
          });
          
          this.appointmentsSubject.next(filteredAppointments);
          this.isLoading = false;
          console.log('Appointments loaded:', filteredAppointments);
        },
        error: (error) => {
          console.error('Error loading appointments:', error);
          this.isLoading = false;
          this.snackBar.open('Error al cargar las citas', 'Cerrar', {
            duration: 3000,
          });
        },
      });
  }

  loadPatients() {
    this.http.get<any>(`${this.apiUrl}/patient`)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.patientsSubject.next(response?.patients || []);
          console.log('Patients loaded:', this.patientsSubject.value);
        },
        error: (error) => {
          console.error('Error loading patients:', error);
          this.snackBar.open('Error al cargar los pacientes', 'Cerrar', { duration: 3000 });
        }
      });
  }

  createAppointment() {
    if (this.appointmentForm.valid) {
      this.isLoading = true;
      const formValue = this.appointmentForm.value;
      
      // Asegurarnos de que el paciente exista
      const selectedPatient = this.patientsSubject.value.find(p => p._id === formValue.paciente);
      if (!selectedPatient) {
        this.snackBar.open('Paciente no encontrado', 'Cerrar', { duration: 3000 });
        this.isLoading = false;
        return;
      }

      const appointmentData = {
        paciente: formValue.paciente,
        fecha: formValue.fecha.toISOString().split('T')[0],
        hora: formValue.hora
      };

      console.log('Creating appointment:', appointmentData);

      this.http.post<Appointment>(`${this.apiUrl}/citas`, appointmentData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            const currentAppointments = this.appointmentsSubject.value;
            this.appointmentsSubject.next([...currentAppointments, response]);
            this.appointmentForm.reset();
            this.snackBar.open('Cita creada exitosamente', 'Cerrar', { duration: 3000 });
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error creating appointment:', error);
            this.snackBar.open(error.error?.message || 'Error al crear la cita', 'Cerrar', { duration: 3000 });
            this.isLoading = false;
          }
        });
    } else {
      this.markFormGroupTouched(this.appointmentForm);
    }
  }

  deleteAppointment(id: string) {
    this.http.delete(`${this.apiUrl}/citas/${id}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          const currentAppointments = this.appointmentsSubject.value;
          this.appointmentsSubject.next(
            currentAppointments.filter(appointment => appointment._id !== id)
          );
          this.snackBar.open('Cita eliminada exitosamente', 'Cerrar', { duration: 3000 });
        },
        error: (error) => {
          console.error('Error deleting appointment:', error);
          this.snackBar.open('Error al eliminar la cita', 'Cerrar', { duration: 3000 });
        }
      });
  }

  getPatientFullName(paciente: any): string {
    if (!paciente) return 'Paciente no encontrado';
    
    // Si paciente es un objeto (respuesta populada)
    if (typeof paciente === 'object' && paciente.name) {
      return paciente.name;
    }
    
    // Si paciente es un ID, buscar en la lista de pacientes
    if (typeof paciente === 'string') {
      const patient = this.patientsSubject.value.find(p => p._id === paciente);
      return patient ? patient.name : 'Paciente no encontrado';
    }
    
    return 'Paciente no encontrado';
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('es-ES');
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  getErrorMessage(field: string): string {
    const control = this.appointmentForm.get(field);
    if (!control) return '';
    
    if (control.hasError('required')) {
      return 'Este campo es requerido';
    }
    
    if (field === 'hora' && control.hasError('pattern')) {
      return 'Formato inválido. Use HH:MM (24 horas)';
    }
    
    return '';
  }
}

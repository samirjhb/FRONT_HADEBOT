import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private http: HttpClient) { }

  async createPaciente(paciente: any) {
    const token = localStorage.getItem('token');
    return await firstValueFrom(this.http.post<any>(`${environment.apiUrl}/patient`, paciente, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }));
  }

  async getPacientes() {
    const token = sessionStorage.getItem('token');
    return await firstValueFrom(this.http.get<any>(`${environment.apiUrl}/patient`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }));
  }

  async deletePaciente(id: number) {
    const token = sessionStorage.getItem('token');
    return await firstValueFrom(this.http.delete<any>(`${environment.apiUrl}/patient/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }));
  }
}

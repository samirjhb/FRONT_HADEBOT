import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SessionManagerService } from '../../../services/session-manager.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(
  private http: HttpClient,
  private sessionManager: SessionManagerService
) { }

async registerService(data: any) {
  try {
   const response: any = await firstValueFrom(this.http.post(`${environment.apiUrl}/auth/register`, data));
   console.log(response);
   
   // Store the token in session storage
   if (response && response.token) {
     this.sessionManager.setToken(response.token);
   }
   
   return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async loginService(data: any) {
  try {
    const response: any = await firstValueFrom(this.http.post(`${environment.apiUrl}/auth/login`, data));
    console.log(response);
    
    // Store the token in session storage
    if (response && response.token) {
      this.sessionManager.setToken(response.token);
    }
    
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

logout() {
  // Clear the token from session storage
  this.sessionManager.clearToken();
}

isAuthenticated() {
  return this.sessionManager.isAuthenticated();
}

}

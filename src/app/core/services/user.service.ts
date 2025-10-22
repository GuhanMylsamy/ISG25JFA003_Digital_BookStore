import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address, Cart, Order, User } from '../../features/user-profile/user-profile';

export interface UpdateUserPayload {
  fullName: string;
  oldPassword?: string;
  newPassword?: string;
}

export interface AddressPayload {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    // Example: retrieving a JWT token from local storage.
    const token = localStorage.getItem('token');
    if (!token) {
      // Handle case where the user is not authenticated
      console.error('No authentication token found.');
      return new HttpHeaders({
        'Content-Type': 'application/json',
      });
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  getCurrentUser(): Observable<User> {
    const payLoad = {
      email: 'sarthakvyadav@gmal.com',
      fullName: 'Sarthak Yadav',
      password: 123456,
    };
    return this.http.get<User>(`${this.baseUrl}/users/profile`, {
      headers: this.getAuthHeaders(),
    });
  }

  // This now expects an array of the new, more complex Order objects
  getUserOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/orders/user`, {
      headers: this.getAuthHeaders(),
    });
  }

  getUserCart(): Observable<Cart> {
    return this.http.get<Cart>(`${this.baseUrl}/cart/user`, {
      headers: this.getAuthHeaders(),
    });
  }

  getUserAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.baseUrl}/addresses/user`, {
      headers: this.getAuthHeaders(),
    });
  }

  addUserAddress(payload: AddressPayload): Observable<Address> {
    return this.http.post<Address>(`${this.baseUrl}/addresses`, payload, {
      headers: this.getAuthHeaders(),
    });
  }

  updateUserProfile(payload: UpdateUserPayload): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/profile/update`, payload, { 
      headers: this.getAuthHeaders(),
      responseType: 'text' 
    });
  }
}

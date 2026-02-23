import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  department: string;
  status: 'Active' | 'Inactive' | 'Pending';
  joinDate: string;
}

const MOCK_USERS: User[] = [
  { id: 1, firstName: 'Alice', lastName: 'Johnson', email: 'alice.johnson@example.com', role: 'Admin', department: 'Engineering', status: 'Active', joinDate: '2023-01-15' },
  { id: 2, firstName: 'Bob', lastName: 'Williams', email: 'bob.williams@example.com', role: 'Editor', department: 'Marketing', status: 'Active', joinDate: '2023-02-20' },
  { id: 3, firstName: 'Carol', lastName: 'Davis', email: 'carol.davis@example.com', role: 'Viewer', department: 'Sales', status: 'Inactive', joinDate: '2023-03-10' },
  { id: 4, firstName: 'David', lastName: 'Brown', email: 'david.brown@example.com', role: 'Editor', department: 'Engineering', status: 'Active', joinDate: '2023-04-05' },
  { id: 5, firstName: 'Eva', lastName: 'Martinez', email: 'eva.martinez@example.com', role: 'Admin', department: 'HR', status: 'Active', joinDate: '2023-05-12' },
  { id: 6, firstName: 'Frank', lastName: 'Garcia', email: 'frank.garcia@example.com', role: 'Viewer', department: 'Finance', status: 'Pending', joinDate: '2023-06-18' },
  { id: 7, firstName: 'Grace', lastName: 'Lee', email: 'grace.lee@example.com', role: 'Editor', department: 'Design', status: 'Active', joinDate: '2023-07-22' },
  { id: 8, firstName: 'Henry', lastName: 'Wilson', email: 'henry.wilson@example.com', role: 'Viewer', department: 'Engineering', status: 'Active', joinDate: '2023-08-01' },
  { id: 9, firstName: 'Iris', lastName: 'Taylor', email: 'iris.taylor@example.com', role: 'Admin', department: 'Operations', status: 'Inactive', joinDate: '2023-08-15' },
  { id: 10, firstName: 'Jack', lastName: 'Anderson', email: 'jack.anderson@example.com', role: 'Editor', department: 'Marketing', status: 'Active', joinDate: '2023-09-03' },
  { id: 11, firstName: 'Karen', lastName: 'Thomas', email: 'karen.thomas@example.com', role: 'Viewer', department: 'Sales', status: 'Pending', joinDate: '2023-09-20' },
  { id: 12, firstName: 'Leo', lastName: 'Jackson', email: 'leo.jackson@example.com', role: 'Editor', department: 'Engineering', status: 'Active', joinDate: '2023-10-08' },
  { id: 13, firstName: 'Mia', lastName: 'White', email: 'mia.white@example.com', role: 'Admin', department: 'HR', status: 'Active', joinDate: '2023-10-25' },
  { id: 14, firstName: 'Nathan', lastName: 'Harris', email: 'nathan.harris@example.com', role: 'Viewer', department: 'Finance', status: 'Active', joinDate: '2023-11-11' },
  { id: 15, firstName: 'Olivia', lastName: 'Clark', email: 'olivia.clark@example.com', role: 'Editor', department: 'Design', status: 'Inactive', joinDate: '2023-11-28' },
  { id: 16, firstName: 'Paul', lastName: 'Lewis', email: 'paul.lewis@example.com', role: 'Viewer', department: 'Engineering', status: 'Active', joinDate: '2023-12-05' },
  { id: 17, firstName: 'Quinn', lastName: 'Walker', email: 'quinn.walker@example.com', role: 'Admin', department: 'Operations', status: 'Active', joinDate: '2024-01-10' },
  { id: 18, firstName: 'Rachel', lastName: 'Hall', email: 'rachel.hall@example.com', role: 'Editor', department: 'Marketing', status: 'Pending', joinDate: '2024-01-22' },
  { id: 19, firstName: 'Sam', lastName: 'Young', email: 'sam.young@example.com', role: 'Viewer', department: 'Sales', status: 'Active', joinDate: '2024-02-14' },
  { id: 20, firstName: 'Tina', lastName: 'King', email: 'tina.king@example.com', role: 'Editor', department: 'Engineering', status: 'Active', joinDate: '2024-03-01' },
  { id: 21, firstName: 'Ulrich', lastName: 'Scott', email: 'ulrich.scott@example.com', role: 'Viewer', department: 'HR', status: 'Inactive', joinDate: '2024-03-18' },
  { id: 22, firstName: 'Vera', lastName: 'Adams', email: 'vera.adams@example.com', role: 'Admin', department: 'Finance', status: 'Active', joinDate: '2024-04-02' },
  { id: 23, firstName: 'Walter', lastName: 'Baker', email: 'walter.baker@example.com', role: 'Editor', department: 'Design', status: 'Active', joinDate: '2024-04-20' },
  { id: 24, firstName: 'Xena', lastName: 'Carter', email: 'xena.carter@example.com', role: 'Viewer', department: 'Operations', status: 'Pending', joinDate: '2024-05-07' },
  { id: 25, firstName: 'Yusuf', lastName: 'Reed', email: 'yusuf.reed@example.com', role: 'Editor', department: 'Marketing', status: 'Active', joinDate: '2024-05-25' },
];

const MOCK_FORM_DATA = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  dateOfBirth: new Date(1990, 5, 15),
  gender: 'male',
  bio: 'Software developer with 10 years of experience in web technologies.',
  street: '123 Main Street',
  city: 'Springfield',
  state: 'Illinois',
  zipCode: '62701',
  country: 'United States',
  role: 'developer',
  skills: ['Angular', 'TypeScript', 'RxJS'],
  experience: 7,
  newsletter: true,
  notifications: false,
  theme: 'light',
  notes: '',
};

@Injectable({ providedIn: 'root' })
export class MockDataService {
  getUsers(): Observable<User[]> {
    return of(MOCK_USERS).pipe(delay(600));
  }

  getFormData(): Observable<typeof MOCK_FORM_DATA> {
    return of({ ...MOCK_FORM_DATA }).pipe(delay(500));
  }

  saveFormData(data: Record<string, unknown>): Observable<{ success: boolean; message: string }> {
    console.log('Mock save:', data);
    return of({ success: true, message: 'Data saved successfully' }).pipe(delay(1000));
  }

  deleteUser(id: number): Observable<{ success: boolean }> {
    console.log('Mock delete user:', id);
    return of({ success: true }).pipe(delay(500));
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MockDataService } from '../../services/mock-data.service';
import { Observable, map, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSnackBarModule,
    MatProgressBarModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss',
})
export class FormsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private mockData = inject(MockDataService);
  private snackBar = inject(MatSnackBar);

  form!: FormGroup;
  loading = false;
  saving = false;
  filteredCountries$!: Observable<string[]>;

  readonly countries = [
    'Australia', 'Brazil', 'Canada', 'France', 'Germany',
    'India', 'Italy', 'Japan', 'Mexico', 'Netherlands',
    'South Korea', 'Spain', 'Sweden', 'United Kingdom', 'United States',
  ];

  readonly states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
    'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
    'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
    'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
    'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'Tennessee', 'Texas', 'Utah',
    'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
  ];

  readonly roles = [
    { value: 'developer', label: 'Developer' },
    { value: 'designer', label: 'Designer' },
    { value: 'manager', label: 'Project Manager' },
    { value: 'qa', label: 'QA Engineer' },
    { value: 'devops', label: 'DevOps Engineer' },
  ];

  countryControl = new FormControl('');

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      dateOfBirth: [null as Date | null],
      gender: [''],
      bio: [''],
      street: [''],
      city: [''],
      state: [''],
      zipCode: ['', Validators.pattern(/^\d{5}(-\d{4})?$/)],
      country: this.countryControl,
      role: [''],
      experience: [0],
      newsletter: [false],
      notifications: [false],
      theme: ['light'],
      notes: [''],
    });

    this.filteredCountries$ = this.countryControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterCountries(value || '')),
    );

    this.loadData();
  }

  private filterCountries(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.countries.filter(c => c.toLowerCase().includes(filterValue));
  }

  private loadData(): void {
    this.loading = true;
    this.mockData.getFormData().subscribe(data => {
      this.form.patchValue(data);
      this.loading = false;
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving = true;
    this.mockData.saveFormData(this.form.value).subscribe(result => {
      this.saving = false;
      this.snackBar.open(result.message, 'Close', { duration: 3000 });
    });
  }

  onReset(): void {
    this.form.reset();
    this.snackBar.open('Form has been reset', 'Close', { duration: 2000 });
  }
}

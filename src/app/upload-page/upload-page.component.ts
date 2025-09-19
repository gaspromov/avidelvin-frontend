import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../consts';
import { finalize } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'avi-upload-page',
  templateUrl: './upload-page.component.html',
  styles: ``,
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  providers: [MatSnackBar],
})
export class UploadPageComponent {
  readonly form = new FormGroup({
    password: new FormControl('', Validators.required),
  });

  readonly file = signal<null | File>(null);

  readonly loading = signal(false);

  constructor(private http: HttpClient, private snBar: MatSnackBar) {}

  onSubmit() {
    this.form.markAllAsTouched();
    const file = this.file();

    if (!file) {
      this.snBar.open('Выбери файл', undefined, { duration: 3000 });
    }

    if (!file || this.form.invalid) {
      return;
    }
    this.loading.set(true);
    const data = new FormData();
    data.append('file', file);

    this.http
      .post(API_URL + '/api/images', data, {
        headers: new HttpHeaders({
          authorization: this.form.controls.password.value!,
        }),
      })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () =>
          this.snBar.open('Файл создан', undefined, { duration: 3000 }),
        error: (e) =>
          this.snBar.open(e.error.error, undefined, { duration: 3000 }),
      });
  }

  onFileSelected(data: Event) {
    const input = data.target as HTMLInputElement; // Cast event.target to HTMLInputElement

    if (input.files && input.files.length > 0) {
      const file = input.files[0]; // Get the first selected file
      this.file.set(file);
    } else {
      this.file.set(null);
    }
  }
}

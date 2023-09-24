import { Injectable, inject } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ApiErrorService {
  snackBar = inject(MatSnackBar);

  handleError(error: HttpErrorResponse): void {
    const status = error?.status;

    switch (status) {
      case 500:
      case 502:
        this.snackBar.open(
          'Something went wrong with the server.',
          'Server Error'
        );
        break;
      case 400:
      default:
        this.snackBar.open('Input is in an incorrect format.', 'Invalid Input');
        break;
      case 404:
        this.snackBar.open('Cannot access URL entered.', 'Not found');
        break;
    }
  }
}

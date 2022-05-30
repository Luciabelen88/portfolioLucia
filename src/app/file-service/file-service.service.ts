import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { url } from '../components/service/url';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from '../components/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FileServiceService {

  constructor(private http: HttpClient, private authService: AuthService) {}

  uploadFile(resource: FormData) {
    return this.http
      .post(url + '/uploadFile', resource)
      .pipe(
        catchError((error) => {
          console.log(error);
          return throwError(() => error);
        })
      );
  }

  downloadFile(fileName: string) {
    return this.http
      .get(url + '/downloadFile/' + fileName)
      .pipe(
        catchError((error) => {
          console.log(error);
          return throwError(() => error);
        })
      );
  }

  deleteFile(fileName: string) {
    return this.http
      .delete(url + '/deleteFile/' + fileName)
      .pipe(
        catchError((error) => {
          console.log(error);
          return throwError(() => error);
        })
      );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class DataService {
  
  constructor(@Inject(String) private url: string, private http: HttpClient) {}

  getAll() {
    return this.http.get(this.url, { responseType: 'json' }).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => error);
      })
    );
  }
  
  edit(form: any) {
    return this.http.put(this.url, form, { responseType: 'json' }).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => error);
      })
    );
  }

  add(form: any) {
    return this.http.post(this.url, form, { responseType: 'json' }).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => error);
      })
    );
  }
  
  delete(id: any) {
    return this.http.delete(this.url + "/" + id, { responseType: 'json' }).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => error);
      })
    );
  }
}

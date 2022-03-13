import { Injectable } from '@angular/core';
import { url } from './url';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { DataService } from './data.service';

export interface AboutType {
  about_text: string;
  date_birth: string;
  email: string;
  country: string;
  city: string;
}

@Injectable({
  providedIn: 'root',
})
export class AboutService extends DataService {
  
 
  constructor( http: HttpClient) {
    super( url + "/author", http);
  }
}

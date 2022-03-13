import { Injectable } from '@angular/core';
import { url } from './url';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';


@Injectable({
  providedIn: 'root',
})
export class EducationService extends DataService {
  

  constructor( http: HttpClient) {
    super( url + "/education", http);
  } 
}

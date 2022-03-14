import { Injectable } from '@angular/core';
import { url } from './url';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService extends DataService {
  

  constructor( http: HttpClient) {
    super( url + "/projects", http);
  } 
}

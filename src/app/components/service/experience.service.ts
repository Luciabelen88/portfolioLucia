import { Injectable } from '@angular/core';
import { url } from './url';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';

export interface ExperienceType {
  logo: string;
  title: string;
  start_period: string;
  finish_period: string;
  site: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExperienceService extends DataService{
  
  constructor( http: HttpClient) {
    super( url + "/experience", http);
  }
}

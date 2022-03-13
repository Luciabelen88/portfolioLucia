import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url } from './url';
import { DataService } from './data.service';

export enum levelSkillEnum {"beginner", "intermediate", "advanced"}

export interface SkillType {
  title: String,
  description: String, 
  level: String
}


@Injectable({
  providedIn: 'root'
})
export class SkillsService extends DataService{
  
  constructor( http: HttpClient) {
    super( url + "/hardsoftskills", http);
  }
}

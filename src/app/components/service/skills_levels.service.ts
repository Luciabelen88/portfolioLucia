import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url } from './url';
import { DataService } from './data.service';

export enum levelSkillEnum {"beginner", "intermediate", "advanced"}

export interface SkillType { 
    level_value: String
}


@Injectable({
  providedIn: 'root'
})
export class SkillsLevelsService extends DataService{
  

  constructor( http: HttpClient) {
    super( url + "/skillslevel", http);
  }
}

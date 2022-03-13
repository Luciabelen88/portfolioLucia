import { Injectable } from '@angular/core';
import { url } from './url';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { DataService } from './data.service';


@Injectable({
  providedIn: 'root',
})
export class IntroService extends DataService{

  constructor( http: HttpClient) {
    super( url + "/author", http);
  }
}

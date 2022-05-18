import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url } from './url';
import { DataService } from './data.service';


@Injectable({providedIn: 'root'})
export class ImageUploadService extends DataService{
  

   constructor( http: HttpClient) {
     super( url + "/upload/image", http);
   }





 
  
  
}







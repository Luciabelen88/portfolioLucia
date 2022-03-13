import { Component, OnInit } from '@angular/core';
import { AboutService } from '../service/about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {


  aboutObject : any = {};

  constructor(private service: AboutService) {
   
  }

  ngOnInit(): void {
    this.service.getAll().subscribe(
      (response:any) => {
        this.aboutObject = response;
        this.aboutObject = this.aboutObject[0];
      },
      (error: Response) => {
        if (error.status === 404) {
          alert("We can't find the resource");
        } else {
          alert('An unexpected error ocurred');
        }
      }
    );
  }
} 

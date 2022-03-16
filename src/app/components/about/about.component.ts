import { Component, OnInit, Input } from '@angular/core';
import { AboutService } from '../service/about.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  @Input() user_name: string ='';
 

  aboutObject : any = {};

  constructor(public service: AboutService, public Authervice: AuthService) {
   
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

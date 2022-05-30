import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faSuitcase } from '@fortawesome/free-solid-svg-icons';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faTools } from '@fortawesome/free-solid-svg-icons';
import { AboutService } from '../service/about.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  faUser = faUser;
  faBook= faBook;
  faSuitcase =faSuitcase;
  faNewspaper =faNewspaper;
  faBookOpen =faBookOpen;
  faBars =faBars;
  faTools =faTools;

  author:any;
  authorProfilePicture: String = '';

  constructor(public service: AboutService) { 
    
  }

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (response) => {
        this.author = response;
        this.author = this.author[0];
        this.authorProfilePicture = this.author.profile_img;
      }});
  }

}

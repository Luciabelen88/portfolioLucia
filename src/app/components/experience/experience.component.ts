import { Component, OnInit, Input } from '@angular/core';
import { ExperienceService } from '../service/experience.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
    
  experienceList : any = [{}];
  public currentPageExperience: number = 1;

  constructor(private service: ExperienceService) {
     
  }

  ngOnInit(): void {
    this.service.getAll().subscribe(
      (response:any) => {
        this. experienceList = response;
        this. experienceList = this. experienceList[0];
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

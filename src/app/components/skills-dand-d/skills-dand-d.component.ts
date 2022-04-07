import { Component, OnInit, Input } from '@angular/core';
import { SkillsService } from '../service/skills.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../service/auth.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-skills-dand-d',
  templateUrl: './skills-dand-d.component.html',
  styleUrls: ['./skills-dand-d.component.css']
})
export class SkillsDandDComponent implements OnInit {
  skillsList: any[any] = [];
  @Input() skillId: number = 0;
  @Input() title:string ='';
  @Input() description:string ='';
  @Input() skill_level:string = '';

  levelClass() : { classColor: String, percent: String} {

    switch (this.skill_level) {
    case 'beginner' && '1':
      return {classColor:'colorBeginner', percent:'20%'};
      break;
    case 'intermediate' && '6':

      return {classColor:'colorIntermediate', percent:'55%'};
      break;
    case 'advanced' && '8':

      return {classColor:'colorAdvanced', percent:'90%'};
      break;
      default:
        return  {classColor:'', percent:''};
    }

  }
  levelClassVariable : any;

  constructor(private service: SkillsService, public Authervice: AuthService) { }

  //drag and drop logic 
  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.skillsList, event.previousIndex, event.currentIndex);
  }

  ngOnInit(): void {
    this.levelClassVariable =  this.levelClass() ;
    
    this.service.getAll().subscribe({
      next: (response) => {
        this.skillsList = response;
      },
    });
  }
  
  
}

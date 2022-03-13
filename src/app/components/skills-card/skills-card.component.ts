import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-skills-card',
  templateUrl: './skills-card.component.html',
  styleUrls: ['./skills-card.component.css']
})
export class SkillsCardComponent implements OnInit {
  
  @Input() skillId: number = 0;
  @Input() title:string ='';
  @Input() description:string ='';
  @Input() skill_level:string = '';

  @Output() newItemEvent = new EventEmitter(); 

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

  constructor(public service: AuthService) {
  
  }


  deleteSkill(){
    this.newItemEvent.emit(
      {
      id: this.skillId, 
      title: this.title
      });
  }
  ngOnInit(): void {
    this.levelClassVariable =  this.levelClass() ;
  }

}

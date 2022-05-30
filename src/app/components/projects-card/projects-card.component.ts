import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { url } from '../service/url';

@Component({
  selector: 'app-projects-card',
  templateUrl: './projects-card.component.html',
  styleUrls: ['./projects-card.component.css']
})
export class ProjectsCardComponent implements OnInit {
  @Input() projectId: number = 0;
  @Input() title:string ='';
  @Input() description:string ='';
  @Input() date:string = '';
  @Input() project_img:string = '';
  @Input() link_github: string = '';
  @Input() deletehash: string = '';

  @Output() newItemEvent = new EventEmitter();

  public projectImage: String = '';

  constructor(public service: AuthService) { }

  deleteProject() {
    this.newItemEvent.emit({
      id: this.projectId,
      title: this.title,
      //project_img: this.project_img,
      deletehash: this.deletehash
    });
  } 

  ngOnInit(): void {
    this.projectImage = this.project_img;
  }

}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-projects-card',
  templateUrl: './projects-card.component.html',
  styleUrls: ['./projects-card.component.css']
})
export class ProjectsCardComponent implements OnInit {

  @Input() title:string ='';
  @Input() description:string ='';
  @Input() date:string = '';
  @Input() projectImage:string = '';
  @Input() linkGithub: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}

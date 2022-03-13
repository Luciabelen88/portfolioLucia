import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../service/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projectsList: any = [];

  public currentPageProject: number = 1;

  constructor(ServiceClass: ProjectsService) {
    let service = new ProjectsService();
    this.projectsList = service.getProject();
  }

  ngOnInit(): void {
  }

}

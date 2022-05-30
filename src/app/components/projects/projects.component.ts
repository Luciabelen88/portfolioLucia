import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../service/projects.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBar } from 'src/app/buttons/snackBarFunction';
import { AuthService } from '../service/auth.service';
import { FileServiceService } from 'src/app/file-service/file-service.service';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  projectsList: any[any] = [];
  AuxiliarProjectsList: any[any] = [];
  public currentPageProject: number = 1;

  constructor(
    private service: ProjectsService,
    private snackBar: MatSnackBar,
    public Authervice: AuthService,
    public fileService: FileServiceService
  ) {}

  deleteProject(event: any) {
    this.projectsList = this.projectsList.filter(
      (node: any) => node.project_id !== event.id
    );
    this.service
      .delete(event.id)
      .pipe(
        mergeMap((res) => {
          return this.fileService.deleteFile(
            event.deletehash
          );
        })
      )
      .subscribe({
        next: (response: any) => {
          this.AuxiliarProjectsList = this.projectsList;
          snackBar(
            this.snackBar,
            " Project: '" + event.title + " 'eliminated",
            'green-snackbar',
            'X'
          );
        },
        error: (error: any) => {
          snackBar(
            this.snackBar,
            `Sorry ${event.title} could not be eliminated because of error ${error?.message}`,
            'red-snackbar',
            'X'
          );
          this.projectsList = this.AuxiliarProjectsList;
        },
      });
  }

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (response: any) => {
        this.projectsList = response;
        this.AuxiliarProjectsList = response;
      },
    });
  }
}

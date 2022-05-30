import { Component, OnInit } from '@angular/core';
import { EducationService } from '../service/education.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBar } from 'src/app/buttons/snackBarFunction';
import { AuthService } from '../service/auth.service';
import { FileServiceService } from 'src/app/file-service/file-service.service';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent implements OnInit {
  educationList: any[any] = [];
  AuxiliarEducationList: any[any] = [];
  public currentPageEducation: number = 1;

  constructor(
    private service: EducationService,
    private snackBar: MatSnackBar,
    private fileService: FileServiceService,
    public AuthService: AuthService
  ) {}

  deleteEducation(event: any) {
    this.educationList = this.educationList.filter(
      (node: any) => node.education_id !== event.id
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
          this.AuxiliarEducationList = this.educationList;
          snackBar(
            this.snackBar,
            " Education: '" + event.title + " 'eliminated",
            'green-snackbar',
            'X'
          );
        },
        error: (error: any) => {
          snackBar(
            this.snackBar,
            `Sorry ${event.title} could not be eliminated because of error ${error.error.error}`,
            'red-snackbar',
            'X'
          );
          this.educationList = this.AuxiliarEducationList;
        },
      });
  }

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (response: any) => {
        this.educationList = response;
        this.AuxiliarEducationList = response;
      },
    });
  }
}

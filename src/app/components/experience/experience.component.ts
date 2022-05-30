import { Component, OnInit } from '@angular/core';
import { ExperienceService } from '../service/experience.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBar } from 'src/app/buttons/snackBarFunction';
import { AuthService } from '../service/auth.service';
import { mergeMap } from 'rxjs';
import { FileServiceService } from 'src/app/file-service/file-service.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent implements OnInit {
  experienceList: any[any] = [];
  AuxiliarExperienceList: any[any] = [];
  public currentPageExperience: number = 1;

  constructor(
    private service: ExperienceService,
    private snackBar: MatSnackBar,
    private fileService: FileServiceService,
    public AuthService: AuthService
  ) {}
 
  deleteExperience(event: any) {
    this.experienceList = this.experienceList.filter(
      (node: any) => node.experience_id !== event.id
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
          this.AuxiliarExperienceList = this.experienceList;
          snackBar(
            this.snackBar,
            " Experience: '" + event.title + " 'eliminated",
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
          this.experienceList = this.AuxiliarExperienceList;
        },
      });
  }

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (response: any) => {
        this.experienceList = response;
        this.AuxiliarExperienceList = response;
      },
    });
  }
}

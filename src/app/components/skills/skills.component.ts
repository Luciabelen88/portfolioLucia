import { Component, OnInit } from '@angular/core';
import { SkillsService } from '../service/skills.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBar } from 'src/app/buttons/snackBarFunction';
import { AuthService } from '../service/auth.service';

  
@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements OnInit {
  public currentPageSkill: number = 1;
  skillsList: any[any] = [];
  auxiliarSkillsList: any[any] = [];

  constructor(private service: SkillsService, private snackBar: MatSnackBar, public Authervice: AuthService) {
  
  }

  deleteSkill(event: any) {
    this.skillsList = this.skillsList.filter(
      (item: any) => item.skills_id !== event.id
    );
    this.service.delete(event.id).subscribe({
      next: (response) => {
        this.auxiliarSkillsList = this.skillsList;
        snackBar(
          this.snackBar,
          " Hard or Soft Skill '" + event.title + " 'deleted",
          'green-snackbar',
          'X'
        ); 
      },
      error: (error: any) => {
        snackBar(
          this.snackBar,
          `Skill ${event.title} could not be deleted because of error ${error.error.error}`,
          'red-snackbar',
          'X'
        );
        this.skillsList = this.auxiliarSkillsList;
      },
    });
  }

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (response) => {
        this.skillsList = response;
        this.auxiliarSkillsList = response;
      },
    });
  }
}

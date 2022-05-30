import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SkillsService } from 'src/app/components/service/skills.service';
import { IntroService } from 'src/app/components/service/intro.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBar } from 'src/app/buttons/snackBarFunction';
import { Router } from '@angular/router';
import { SkillsLevelsService } from 'src/app/components/service/skills_levels.service';

@Component({
  selector: 'app-skills-add-form',
  templateUrl: './skills-add-form.component.html',
  styleUrls: ['./skills-add-form.component.css'],
})
export class SkillsAddFormComponent implements OnInit {
  IsProcessing = 'hidden';
  invalidAdd = 'hidden';

  skillform = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    skill_level: new FormControl('', Validators.required),
  });

  get title() {
    return this.skillform.get('title');
  }

  get description() {
    return this.skillform.get('description');
  }

  get skill_level() {
    return this.skillform.get('skill_level');
  }
  authorData: any;
  user_name: string = '';
  levels: any;

  constructor(
    public service: SkillsService,
    public author: IntroService,
    private snackBar: MatSnackBar,
    public router: Router,
    public skillsLevelsService: SkillsLevelsService
  ) {}

  onSubmit(event: Event) {
    this.IsProcessing = 'visible';
    event.preventDefault;
    if (this.skillform.valid) {
      this.service
        .add({
          skills_id: "",
          title: this.title?.value,
          description: this.description?.value,
          skill_level: this.skill_level?.value,
          author: this.user_name,
        })
        .subscribe({
          next: (response) => {
            this.IsProcessing = 'hidden';

            snackBar(
              this.snackBar,
              'New HardSkill Added : ' + "'" + this.title?.value + "'",
              'green-snackbar',
              'x'
            );
           
            this.skillform.markAsUntouched();
            this.router.navigate(['/']);
          },
          error: (error: any) => {
            this.invalidAdd = 'visible';
            this.IsProcessing = 'hidden';
            
            snackBar(
              this.snackBar,
              `${error.error.error}`,
              'red-snackbar',
              'x'
            );
          },
        });
    } else {
      this.skillform.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    this.author.getAll().subscribe({
      next: (response) => {
        this.authorData = response;
        this.user_name = this.authorData[0].username;
      },
      error: (error: any) => {
        this.router.navigate([
          `error/${error.error.status}/${error.error.error}`,
        ]);
      },
    });

    this.skillsLevelsService.getAll().subscribe({
      next: (response) => {
        this.levels = response;
      },
    });
  }
}

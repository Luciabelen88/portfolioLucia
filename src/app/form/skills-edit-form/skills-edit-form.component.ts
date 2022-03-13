import { Component, OnInit } from '@angular/core';
import { SkillsService } from 'src/app/components/service/skills.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { snackBar } from 'src/app/buttons/snackBarFunction';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IntroService } from 'src/app/components/service/intro.service';
import { SkillsLevelsService } from 'src/app/components/service/skills_levels.service';

@Component({
  selector: 'app-skills-edit-form',
  templateUrl: './skills-edit-form.component.html',
  styleUrls: ['./skills-edit-form.component.css'],
})
export class SkillsEditFormComponent implements OnInit {
  skillsList: any = [];
  skillsIdUpdate: any;
  skillsUpdate: any;
  levels: any;
  authorData: any;
  user_name: string = '';

  skillform = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    skill_level: new FormControl(''),
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

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public service: SkillsService,
    public skillsLevelsService: SkillsLevelsService,
    public author: IntroService
  ) {}

  onSubmit(event: Event) {
    event.preventDefault;
    if (this.skillform.valid) {
      //this.loadingRequest = "visible";
      this.service
        .edit({
          skills_id: this.skillsUpdate.skills_id,
          title: this.title?.value,
          description: this.description?.value,
          skill_level: this.skill_level?.value,
          author: this.skillsUpdate.author,
        })
        .subscribe({
          next: (response: any) => {
            snackBar(
              this.snackBar,
              "Update Skill  : '" +
                this.skillsUpdate.description +
                " ' to '" +
                this.description?.value +
                "'",
              'green-snackbar',
              'X'
            );
            this.router.navigate(['/']);
          },
          error: (error: any) => {
            snackBar(
              this.snackBar,
              `${error.error.error}`,
              'red-snackbar',
              'X'
            );
          },
        });
    } else {
      this.skillform.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (param) => {
        if (param.get('skillId')) {
          this.skillsIdUpdate = param.get('skillId');
        }
      },
    });

    this.author.getAll().subscribe({
      next: (response) => {
        this.authorData = response;
        this.user_name = this.authorData[0].user_name;
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

    this.service.getAll().subscribe({
      next: (response: any) => {
        this.skillsList = response;
        this.skillsUpdate =
          this.skillsList[
            this.skillsList
              .map((node: any) => node.skills_id)
              .indexOf(parseInt(this.skillsIdUpdate))
          ];
        console.log(this.skillsUpdate);
        if (!this.skillsUpdate) {
          this.router.navigate(['/notfound']);
        }
      },
      error: (error: any) => {
        this.router.navigate([
          `error/${error.error.status}/${error.error.error}`,
        ]);
        snackBar(this.snackBar, `${error.error.error}`, 'red-snackbar', 'X');
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectsService } from 'src/app/components/service/projects.service';
import { IntroService } from 'src/app/components/service/intro.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBar } from 'src/app/buttons/snackBarFunction';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects-add-form',
  templateUrl: './projects-add-form.component.html',
  styleUrls: ['./projects-add-form.component.css']
})
export class ProjectsAddFormComponent implements OnInit {
  IsProcessing = 'hidden';
  invalidAdd = 'hidden';

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    project_img: new FormControl('', Validators.required),
    link_github: new FormControl('', Validators.required),
  });

  get title() {
    return this.form.get('title');
  }
  get description() {
    return this.form.get('description');
  }
  get date() {
    return this.form.get('date');
  }
  get project_img() {
    return this.form.get('project_img');
  }
  get link_github() {
    return this.form.get('link_github');
  }
  constructor(public router: Router,
    private snackBar: MatSnackBar,
    public service: ProjectsService,
    public introService: IntroService) { }
 
    private authorData: any;
    private userName: string = '';
  
    onSubmit(event: Event) {
      this.IsProcessing = 'visible';
      event.preventDefault;
      if (this.form.valid) {
        this.service
          .add({
            project_id: "",
            description: this.description?.value,
            date: this.date?.value,
            project_img: this.project_img?.value,
            link_github: this.link_github?.value,
            author: this.userName
          })
          .subscribe({
            next: (response) => {
              this.IsProcessing = 'hidden';
              snackBar(
                this.snackBar,
                'New Education Added : ' + "'" + this.title?.value + "'",
                'green-snackbar',
                'X'
              );
              this.form.reset();
              this.form.markAsUntouched();
            },
            error: (error: any) => {
              this.invalidAdd = 'visible';
              this.IsProcessing = 'hidden';
              snackBar(
                this.snackBar,
                `${error.error.error}`,
                'red-snackbar',
                'X'
              );
            },
          });
      } else {
        this.form.markAllAsTouched();
      }
    }
  
    ngOnInit(): void {
      this.introService.getAll().subscribe({
        next: (response: any) => {
          this.authorData = response;
          this.userName = this.authorData[0].user_name;
        },
        error: (error: any) => {
          this.router.navigate([
            `error/${error.error.status}/${error.error.error}`,
          ]);
          // snackBar(
          //   this.snackBar,
          //   `${error.error.error}`,
          //   "red-snackbar",
          //   "x"
          // );
        },
      });
    }

}

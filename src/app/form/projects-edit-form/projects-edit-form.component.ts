import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectsService } from 'src/app/components/service/projects.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { snackBar } from 'src/app/buttons/snackBarFunction';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-projects-edit-form',
  templateUrl: './projects-edit-form.component.html',
  styleUrls: ['./projects-edit-form.component.css']
})
export class ProjectsEditFormComponent implements OnInit {
  projectObject: any = [];
  projectIdUpdate: any;
  projectUpdate: any;
  IsProcessing = 'hidden';
  invalidEdit = 'hidden';

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
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public service: ProjectsService) { }

    onSubmit(event: Event) {
      this.IsProcessing = 'visible';
      event.preventDefault;
      if (this.form.valid) {
        this.service
          .edit({
            project_id: this.projectUpdate.project_id,
            description: this.description?.value,
            date: this.date?.value,
            project_img: this.project_img?.value,
            link_github: this.link_github?.value,
            author: this.projectUpdate.author,
          })
          .subscribe({
            next: (response: any) => {
              this.IsProcessing = 'hidden';
              snackBar(
                this.snackBar,
                "Update Project  : '" +
                  this.projectUpdate.title +
                  " ' to '" +
                  this.title?.value +
                  "'",
                'green-snackbar',
                'X'
              );
              this.router.navigate(['/']);
            },
            error: (error: any) => {
              this.invalidEdit = 'visible';
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
      this.route.paramMap.subscribe({
        next: (param) => {
          if (param.get('projectId')) {
            this.projectIdUpdate = param.get('projectId');
          }
        },
      });
  
      this.service.getAll().subscribe({
        next: (response: any) => {
          this.projectObject = response;
          this.projectUpdate =
            this.projectObject[
              this.projectObject
                .map((node: any) => node.project_id)
                .indexOf(parseInt(this.projectIdUpdate))
            ];        
          this.title?.setValue(this.projectUpdate.title);
          this.date?.setValue(this.projectUpdate.date);
          this.project_img?.setValue(this.projectUpdate.project_img);
          this.link_github?.setValue(this.projectUpdate.link_github);
          this.description?.setValue(this.projectUpdate.description);
  
          if (!this.projectUpdate) {
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
 
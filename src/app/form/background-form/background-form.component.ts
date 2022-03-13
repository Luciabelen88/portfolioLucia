import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EducationService } from 'src/app/components/service/education.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { snackBar } from 'src/app/buttons/snackBarFunction';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-background-form',
  templateUrl: './background-form.component.html',
  styleUrls: ['./background-form.component.css'],
})
export class BackgroundFormComponent implements OnInit {
  educationObject: any = [];
  educationIdUpdate: any;
  educationUpdate: any;
  IsProcessing = 'hidden';
  invalidEdit = 'hidden';

  form = new FormGroup({
    logo_url: new FormControl(''),
    title: new FormControl(''),
    start_period: new FormControl(''),
    finish_period: new FormControl(''),
    site: new FormControl(''),
    description: new FormControl(''),
  });

  get logo_url() {
    return this.form.get('logo_url');
  }
  get title() {
    return this.form.get('title');
  }
  get start_period() {
    return this.form.get('start_period');
  }
  get finish_period() {
    return this.form.get('finish_period');
  }
  get site() {
    return this.form.get('site');
  }
  get description() {
    return this.form.get('description');
  }

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public service: EducationService
  ) {}

  onSubmit(event: Event) {
    this.IsProcessing = 'visible';
    event.preventDefault;
    if (this.form.valid) {
      this.service
        .edit({
          education_id: this.educationUpdate.education_id,
          logo_url: this.logo_url?.value,
          title: this.title?.value,
          start_period: this.start_period?.value,
          finish_period: this.finish_period?.value,
          site: this.site?.value,
          description: this.description?.value,
          author: this.educationUpdate.author,
        })
        .subscribe({
          next: (response: any) => {
            this.IsProcessing = 'hidden';
            snackBar(
              this.snackBar,
              "Update Education  : '" +
                this.educationUpdate.title +
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
        if (param.get('educationId')) {
          this.educationIdUpdate = param.get('educationId');
        }
      },
    });

    this.service.getAll().subscribe({
      next: (response: any) => {
        this.educationObject = response;
        this.educationUpdate =
          this.educationObject[
            this.educationObject
              .map((node: any) => node.education_id)
              .indexOf(parseInt(this.educationIdUpdate))
          ];        
        this.title?.setValue(this.educationUpdate.title);
        this.start_period?.setValue(this.educationUpdate.start_period);
        this.finish_period?.setValue(this.educationUpdate.finish_period);
        this.site?.setValue(this.educationUpdate.site);
        this.description?.setValue(this.educationUpdate.description);

        if (!this.educationUpdate) {
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

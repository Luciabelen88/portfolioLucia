import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EducationService } from 'src/app/components/service/education.service';
import { IntroService } from 'src/app/components/service/intro.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBar } from 'src/app/buttons/snackBarFunction';
import { Router } from '@angular/router';

@Component({
  selector: 'app-education-add-form',
  templateUrl: './education-add-form.component.html',
  styleUrls: ['./education-add-form.component.css'],
})
export class EducationAddFormComponent implements OnInit {
  IsProcessing = 'hidden';
  invalidAdd = 'hidden';
  
  form = new FormGroup({
    logo_url: new FormControl(''),
    title: new FormControl('', Validators.required),
    start_period: new FormControl('', Validators.required),
    finish_period: new FormControl('', Validators.required),
    site: new FormControl('', Validators.required),
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
    private snackBar: MatSnackBar,
    public service: EducationService,
    public introService: IntroService
  ) {}

  private authorData: any;
  private userName: string = '';

  onSubmit(event: Event) {
    this.IsProcessing = 'visible';
    event.preventDefault;
    if (this.form.valid) {
      this.service
        .add({
          education_id: "",
          logo_url: this.logo_url?.value,
          title: this.title?.value,
          start_period: this.start_period?.value,
          finish_period: this.finish_period?.value,
          site: this.site?.value,
          description: this.description?.value,
          author: this.userName,
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

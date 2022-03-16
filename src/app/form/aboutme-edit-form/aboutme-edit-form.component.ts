import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AboutService } from 'src/app/components/service/about.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { snackBar } from 'src/app/buttons/snackBarFunction';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-aboutme-edit-form',
  templateUrl: './aboutme-edit-form.component.html',
  styleUrls: ['./aboutme-edit-form.component.css'],
})
export class AboutmeEditFormComponent implements OnInit {
  aboutmeObject: any = [];
  aboutmeIdUpdate: any;
  aboutmeUpdate: any;
  IsProcessing = 'hidden';
  invalidEdit = 'hidden';

  form = new FormGroup({
    email: new FormControl('', Validators.required),
    complete_name: new FormControl('', Validators.required),
    profession: new FormControl('', Validators.required),
    profile_img: new FormControl('', Validators.required),
    backgound_img: new FormControl('', Validators.required),
    cv_doc: new FormControl(''),
    about_text: new FormControl(''),
    date_birth: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
  });

  get email() {
    return this.form.get('email');
  }
  get complete_name() {
    return this.form.get('complete_name');
  }
  get profession() {
    return this.form.get('profession');
  }
  get profile_img() {
    return this.form.get('profile_img');
  }
  get backgound_img() {
    return this.form.get('backgound_img');
  }
  get cv_doc() {
    return this.form.get('cv_doc');
  }
  get about_text() {
    return this.form.get('about_text');
  }
  get date_birth() {
    return this.form.get('date_birth');
  }
  get country() {
    return this.form.get('country');
  }
  get city() {
    return this.form.get('city');
  }

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public service: AboutService
  ) {}

  onSubmit(event: Event) {
    this.IsProcessing = 'visible';
    event.preventDefault;
    if (this.form.valid) {
      this.service
        .edit({
          user_name: this.aboutmeUpdate.user_name,
          complete_name: this.complete_name?.value,
          profession: this.profession?.value,
          profile_img: this.profile_img?.value,
          backgound_img: this.backgound_img?.value,
          cv_doc: this.cv_doc?.value,
          about_text: this.about_text?.value,
          date_birth: this.date_birth?.value,
          country: this.country?.value,
          city: this.city?.value,
          author: this.aboutmeUpdate.author,
        })
        .subscribe({
          next: (response: any) => {
            this.IsProcessing = 'hidden';
            snackBar(
              this.snackBar,
              'Update Author information ',
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
        if (param.get('user_name')) {
          this.aboutmeIdUpdate = param.get('user_name');
        }
      },
    });

    this.service.getAll().subscribe({
      next: (response: any) => {
        this.aboutmeObject = response;
        this.aboutmeUpdate =
          this.aboutmeObject[
            this.aboutmeObject
              .map((node: any) => node.user_name)
              .indexOf(parseInt(this.aboutmeIdUpdate))
          ];
        this.email?.setValue(this.aboutmeUpdate.email);
        this.complete_name?.setValue(this.aboutmeUpdate.complete_name);
        this.profession?.setValue(this.aboutmeUpdate.profession);
        this.profile_img?.setValue(this.aboutmeUpdate.profile_img);
        this.backgound_img?.setValue(this.aboutmeUpdate.backgound_img);
        this.cv_doc?.setValue(this.aboutmeUpdate.cv_doc);
        this.about_text?.setValue(this.aboutmeUpdate.about_text);
        this.date_birth?.setValue(this.aboutmeUpdate.date_birth);
        this.country?.setValue(this.aboutmeUpdate.country);
        this.city?.setValue(this.aboutmeUpdate.city);

        if (!this.aboutmeUpdate) {
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

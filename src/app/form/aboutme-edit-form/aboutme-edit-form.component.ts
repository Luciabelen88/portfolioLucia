import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AboutService } from 'src/app/components/service/about.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { snackBar } from 'src/app/buttons/snackBarFunction';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileServiceService } from 'src/app/file-service/file-service.service';
import { forkJoin, Observable, of, mergeMap } from 'rxjs';

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

  authorData: any = '';

  public previewBackground = '';
  public previewProfilePicture = '';
  public fileMessageBackground: any = 'Choose a background image';
  public fileMessageProfilePicture: any = 'Choose a profile image';
  public fileMessageCV: any = 'Choose CV';
  public profileImage: any;
  public cv: any;
  public backgroundImage: any;

  form = new FormGroup({
    email: new FormControl('', Validators.required),
    complete_name: new FormControl('', Validators.required),
    profession: new FormControl('', Validators.required),
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
  get cv_doc() {
    return this.form.get('cv_doc');
  }
  getProfile_img(imageFile: any) {
    
    this.profileImage = imageFile;
  }

  getBackgound_img(imageFile: any) {
    this.backgroundImage = imageFile;
  }

  getCV(file: any) {
    this.cv = file;
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
    private snackBar: MatSnackBar,
    public service: AboutService,
    public fileService: FileServiceService
  ) {}
 
  onSubmit(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      this.IsProcessing = 'visible';
      this.service
        .edit({
          username: this.authorData.username,
          password: this.authorData.password,
          email: this.authorData.email,
          complete_name: this.complete_name?.value,
          profession: this.profession?.value,
          profile_img: this.authorData.profile_img,
          background_img: this.authorData.background_img,
          cv_doc: this.cv_doc?.value,
          about_text: this.about_text?.value,
          date_birth: this.date_birth?.value,
          country: this.country?.value,
          city: this.city?.value,
          deletehash_profile: this.authorData.deletehash_profile,
          deletehash_background: this.authorData.deletehash_background,
        })
        .pipe(
          mergeMap((res:any) => {
            if (this.backgroundImage || this.profileImage) {
              let imageToUpload: File[] = [];
              let typeEntity: string[] = [];
              let deletehashArray: string[] = [];
              if (this.backgroundImage) {
                imageToUpload.push(this.backgroundImage);
                typeEntity.push('background');
                deletehashArray.push(this.authorData.deletehash_background);
              }
              if (this.profileImage) {
                imageToUpload.push(this.profileImage);
                typeEntity.push('profile');
                deletehashArray.push(this.authorData.deletehash_profile);
              }
              let observableToSubscribe: Observable<unknown>[] = [];
              for (let i = 0; i < imageToUpload.length; i++) {
                const formData = new FormData();
                let imageFileToUpload = new File(
                  [imageToUpload[i]],
                  imageToUpload[i].name
                );
                formData.append('file', imageFileToUpload);
                formData.append('typeEntity', typeEntity[i]);
                formData.append('idEntity', 'lucia');
                observableToSubscribe.push(
                  this.fileService.deleteFile(deletehashArray[i]).pipe(
                    mergeMap((re: any) => {
                      return this.fileService.uploadFile(formData);
                    })
                  )
                );
              }
              return forkJoin(observableToSubscribe).pipe(
                mergeMap((r: any) => {
                  return of({});
                })
              );
            }

            return of({});
          })
        )
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
                `${error?.message}`,
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
 

    this.service.getAll().subscribe({
      next: (response: any) => {
        this.authorData =  response[0];
        
        this.previewBackground = this.authorData.background_img;
        this.previewProfilePicture = this.authorData.profile_img;
        this.email?.setValue(this.authorData.email);
        this.complete_name?.setValue(this.authorData.complete_name);
        this.profession?.setValue(this.authorData.profession);
        this.cv_doc?.setValue(this.authorData.cv_doc);
        this.about_text?.setValue(this.authorData.about_text);
        this.date_birth?.setValue(this.authorData.date_birth);
        this.country?.setValue(this.authorData.country);
        this.city?.setValue(this.authorData.city);

      },
      error: (error: any) => {
        this.router.navigate([
          `error/${error.error.status}/${error.error.error}`,
        ]);
        snackBar(this.snackBar, `${error?.message}`, 'red-snackbar', 'X');
      },
    });
  }
}

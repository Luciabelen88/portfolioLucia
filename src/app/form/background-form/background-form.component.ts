import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EducationService } from 'src/app/components/service/education.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { snackBar } from 'src/app/buttons/snackBarFunction';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin, mergeMap, Observable, of } from 'rxjs';
import { FileServiceService } from 'src/app/file-service/file-service.service';
import { AboutService } from 'src/app/components/service/about.service';

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

  public imageFile: any;
  private imageFileToUpload: any;
  public preview: any;
  public fileMessage: any;
  private authorData: any;
  private userName: string = '';

  getImageFile(imageFile: any) {
    this.imageFile = imageFile;
  }


  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public service: EducationService,
    public fileService: FileServiceService,
    public authorService: AboutService
  ) {}

  onSubmit(event: Event) {
    this.IsProcessing = 'visible';
    event.preventDefault;
    if (this.form.valid) {
      this.service
        .edit({
          education_id: this.educationUpdate.education_id,
          logo_url: this.educationUpdate.logo_url,
          title: this.title?.value,
          start_period: this.start_period?.value,
          finish_period: this.finish_period?.value,
          site: this.site?.value,
          description: this.description?.value,
          author: this.educationUpdate.author,
          education_img_deletehash: this.educationUpdate.education_img_deletehash
        })
        .pipe(
          mergeMap((res: any) => {
            if (this.imageFile) {
              const formData = new FormData();
              this.imageFileToUpload = new File(
                [this.imageFile],
                this.imageFile.name
              );
              formData.append('file', this.imageFileToUpload);
              formData.append('typeEntity', 'education');
              formData.append('idEntity', res.toString());
              return this.fileService
                .deleteFile(
                  this.educationUpdate
                    .education_img_deletehash
                )
                .pipe(
                  mergeMap((re: any) => {
                    return this.fileService.uploadFile(formData);
                  })
                );
            }
            return of({});
          })
        )
        .subscribe({
          next: (response: any) => {
            this.router.navigate(['/']);
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
              `${error?.message}`,
              'red-snackbar',
              'X'
            );
          },
        });
    } else {
      this.form.markAllAsTouched();
      if (!this.imageFile) {
        this.imageFile = false;
      }
    }
  }

  ngOnInit(): void {
    this.authorService.getAll().subscribe({
      next: (response) => {
        this.authorData = response;
        this.userName = this.authorData[0].username;
      },
    });

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
        this.preview = this.educationUpdate.logo_url;
    
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

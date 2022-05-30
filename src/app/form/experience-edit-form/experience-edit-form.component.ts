import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExperienceService } from 'src/app/components/service/experience.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { snackBar } from 'src/app/buttons/snackBarFunction';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin, mergeMap, Observable, of } from 'rxjs';
import { FileServiceService } from 'src/app/file-service/file-service.service';
import { AboutService } from 'src/app/components/service/about.service';

@Component({
  selector: 'app-experience-edit-form',
  templateUrl: './experience-edit-form.component.html',
  styleUrls: ['./experience-edit-form.component.css']
})
export class ExperienceEditFormComponent implements OnInit {
  experienceObject: any = [];
  experienceIdUpdate: any;
  experienceUpdate: any;
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
    public service: ExperienceService,
    public fileService: FileServiceService,
    public authorService: AboutService
  ) {}

  onSubmit(event: Event) {
    this.IsProcessing = 'visible';
    event.preventDefault;
    if (this.form.valid) {
      this.service
        .edit({
          experience_id: this.experienceUpdate.experience_id,
          logo_url: this.experienceUpdate.logo_url,
          title: this.title?.value,
          start_period: this.start_period?.value,
          finish_period: this.finish_period?.value,
          site: this.site?.value,
          description: this.description?.value,
          author: this.experienceUpdate.author,
          experience_Img_deletehash: this.experienceUpdate.experience_Img_deletehash
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
              formData.append('typeEntity', 'experience');
              formData.append('idEntity', res.experience_id.toString());
              return this.fileService
                .deleteFile(
                  this.experienceUpdate
                    .experience_Img_deletehash
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
              "Update Experience  : '" +
                this.experienceUpdate.title +
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
        if (param.get('experienceId')) {
          this.experienceIdUpdate = param.get('experienceId');
        }
      },
    });

    this.service.getAll().subscribe({
      next: (response: any) => {
        this.experienceObject = response;
        this.experienceUpdate =
          this.experienceObject[
            this.experienceObject
              .map((node: any) => node.experience_id)
              .indexOf(parseInt(this.experienceIdUpdate))
          ];        
        this.title?.setValue(this.experienceUpdate.title);
        this.start_period?.setValue(this.experienceUpdate.start_period);
        this.finish_period?.setValue(this.experienceUpdate.finish_period);
        this.site?.setValue(this.experienceUpdate.site);
        this.description?.setValue(this.experienceUpdate.description);
        this.preview = this.experienceUpdate.logo_url;
        if (!this.experienceUpdate) {
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

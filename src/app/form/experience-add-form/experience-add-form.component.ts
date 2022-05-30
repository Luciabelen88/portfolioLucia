import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExperienceService } from 'src/app/components/service/experience.service';
import { IntroService } from 'src/app/components/service/intro.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBar } from 'src/app/buttons/snackBarFunction';
import { Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { FileServiceService } from 'src/app/file-service/file-service.service';

@Component({
  selector: 'app-experience-add-form',
  templateUrl: './experience-add-form.component.html',
  styleUrls: ['./experience-add-form.component.css'],
})
export class ExperienceAddFormComponent implements OnInit {
  IsProcessing = 'hidden';
  invalidAdd = 'hidden';

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    start_period: new FormControl('', Validators.required),
    finish_period: new FormControl('', Validators.required),
    site: new FormControl('', Validators.required),
    description: new FormControl(''),
  });

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
    public service: ExperienceService,
    public introService: IntroService,
    public fileService: FileServiceService
  ) {}

  public noImageUpload: any;
  private authorData: any;
  private userName: string = '';
  public imageFile: any;
  private imageFileToUpload: any;
  public preview: any;
  public fileMessage: any;

  getImageFile(imageFile: any) {
    this.imageFile = imageFile;
    this.noImageUpload = true;
  }
 
  onSubmit(event: Event) {
    event.preventDefault;
    if (this.form.valid && this.imageFile) {
      this.IsProcessing = 'visible';
      this.service
        .add({
          experience_id: '',
          logo_url: '',
          title: this.title?.value,
          start_period: this.start_period?.value,
          finish_period: this.finish_period?.value,
          site: this.site?.value,
          description: this.description?.value,
          author: this.userName,
          experience_Img_deletehash: '',
        })
        .pipe(
          mergeMap((res: any) => {
            const formData = new FormData();
            this.imageFileToUpload = new File(
              [this.imageFile],
              this.imageFile.name
            );
            console.log(res);
            formData.append('file', this.imageFileToUpload);
            formData.append('typeEntity', 'experience');
            formData.append('idEntity', res.toString());
            return this.fileService.uploadFile(formData);
          })
        )
        .subscribe({
          next: (response) => {
            this.IsProcessing = 'hidden';
            snackBar(
              this.snackBar,
              'New Experience Added : ' + "'" + this.title?.value + "'",
              'green-snackbar',
              'X'
            );
            this.form.markAsUntouched();
            this.router.navigate(['/']);
          },
          error: (error: any) => {
            this.invalidAdd = 'visible';
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
        this.noImageUpload = false;
      }
    }
  }

  ngOnInit(): void {
    this.noImageUpload = true;
    this.introService.getAll().subscribe({
      next: (response: any) => {
        this.authorData = response;
        this.userName = this.authorData[0].username;
      },
      error: (error: any) => {
        this.router.navigate([
          `error/${error.error.status}/${error.error.error}`,
        ]);
        snackBar(this.snackBar, `${error?.message}`, 'red-snackbar', 'x');
      },
    });
  }
} 

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectsService } from 'src/app/components/service/projects.service';
import { IntroService } from 'src/app/components/service/intro.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBar } from 'src/app/buttons/snackBarFunction';
import { Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { FileServiceService } from 'src/app/file-service/file-service.service';
 
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

  get link_github() {
    return this.form.get('link_github');
  }
  constructor(public router: Router,
    private snackBar: MatSnackBar,
    public service: ProjectsService,
    public introService: IntroService,
    public fileService: FileServiceService,) { }
 
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
            project_id: '',
            title: this.title?.value,
            description: this.description?.value,
            date: this.date?.value,
            project_img: '',
            link_github: this.link_github?.value,
            author: this.userName,
            img_deletehash: '',
          })
          .pipe(
            mergeMap((res: any) => {
              const formData = new FormData();
              this.imageFileToUpload = new File(
                [this.imageFile],
                this.imageFile.name
              );
              formData.append('file', this.imageFileToUpload);
              formData.append('typeEntity', 'project');
              formData.append('idEntity', res.toString());
              return this.fileService.uploadFile(formData);
            })
          ) 
          .subscribe({
            next: (response) => {
              this.IsProcessing = 'hidden';
              snackBar(
                this.snackBar,
                'New Education Added : ' + "'" + this.title?.value + "'",
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

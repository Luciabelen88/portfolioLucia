import { Component, Output, EventEmitter, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {

  @Output() imageToUpload = new EventEmitter();
  @Input() previewUrl: any;
  @Input() fileName = '';

  constructor(private sanitizer: DomSanitizer) {}

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  onFileSelected(event: any) {
    const file: any = event.target.files[0];

    if (file) {
      if (file.name.match(/\.[0-9a-z]+$/i)[0] != '.pdf') {
        this.previewUrl = this.getSantizeUrl(URL.createObjectURL(file));
      }

      this.fileName = file.name;

      this.imageToUpload.emit(file);
    }
  }

}

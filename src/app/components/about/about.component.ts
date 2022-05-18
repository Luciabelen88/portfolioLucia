import { Component, OnInit, Input } from '@angular/core';
import { AboutService } from '../service/about.service';
import { AuthService } from '../service/auth.service';
import { url } from '../service/url';
import { Router } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  PageLoading: string = 'visible';
  havePadding: any;
  author: any = '';
  urlServerDownloadFile = url + '/downloadFile/';

  @Input() user_name: string = '';

  constructor(public service: AboutService, public Authervice: AuthService, public breakpointObserver: BreakpointObserver, private router: Router) {}

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (response) => {
        this.author = response;
        this.author = this.author[0];
        this.PageLoading = 'hidden';
      },
      error: (error: any) => {
        this.router.navigate([
          `error/${error.error.status}/${error.error.error}`,
        ]);
      },
    });
  }
}

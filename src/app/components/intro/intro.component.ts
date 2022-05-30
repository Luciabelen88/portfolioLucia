import { Component, OnInit, Input } from '@angular/core';
import { IntroService } from '../service/intro.service';
import { Router } from "@angular/router";
import { AuthService } from '../service/auth.service';
import { url } from '../service/url';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css'],
})
export class IntroComponent implements OnInit {
  PageLoading: string = 'visible';
  havePadding: any;
  urlServerDownloadFile = url + '/downloadFile/';
  author: any = '';

  @Input() user_name: string ='';

  constructor(private service: IntroService, private router: Router, public Authervice: AuthService, public breakpointObserver: BreakpointObserver) {}

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

    this.breakpointObserver
      .observe(['(min-width: 1000px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.havePadding = true;
        } else {
          this.havePadding = false;
        }
      });
  }
}
  
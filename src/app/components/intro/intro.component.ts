import { Component, OnInit, Input } from '@angular/core';
import { IntroService } from '../service/intro.service';
import { Router } from "@angular/router";
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css'],
})
export class IntroComponent implements OnInit {
  introObject: any = {};
  @Input() user_name: string ='';

  constructor(private service: IntroService, private router: Router, public Authervice: AuthService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe(
      {next: (response) => {
        this.introObject = response;
        this.introObject = this.introObject[0];
      },
      error: (error: any) => {
        this.router.navigate([
          `error/${error.error.status}/${error.error.error}`,
        ]);
      }}
    );
  }
}
 
import { Component, OnInit } from '@angular/core';
import { IntroService } from '../service/intro.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css'],
})
export class IntroComponent implements OnInit {
  introObject: any = {};

  constructor(private service: IntroService, private router: Router) {}

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
 
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  
  status_code : string = "";
  status_description : string = "";

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap
    .subscribe( {
      next: param => {
      if (param.get('statusdescription') && param.get('statuscode') ) {
        this.status_code  = param.get('statuscode')! ;
        this.status_description  = param.get('statusdescription')!;
      }
    }})
    
  }

}

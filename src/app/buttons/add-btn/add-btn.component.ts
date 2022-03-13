import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-add-btn',
  templateUrl: './add-btn.component.html',
  styleUrls: ['./add-btn.component.css']
})
export class AddBtnComponent implements OnInit {
  @Input() formUrl : string = "";

  constructor() { }

  ngOnInit(): void {
  }

}

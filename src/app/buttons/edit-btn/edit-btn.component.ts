import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-edit-btn',
  templateUrl: './edit-btn.component.html',
  styleUrls: ['./edit-btn.component.css']
})
export class EditBtnComponent implements OnInit {

  @Input() formEditUrl : string = "";

  constructor() { }

  ngOnInit(): void {
  }

}

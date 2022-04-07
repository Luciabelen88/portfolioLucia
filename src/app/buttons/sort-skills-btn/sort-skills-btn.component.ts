import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sort-skills-btn',
  templateUrl: './sort-skills-btn.component.html',
  styleUrls: ['./sort-skills-btn.component.css']
})
export class SortSkillsBtnComponent implements OnInit {
  @Input() sortSkillsUrl : string = "";
  constructor() { }

  ngOnInit(): void {
  }

}

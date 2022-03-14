import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-experience-card',
  templateUrl: './experience-card.component.html',
  styleUrls: ['./experience-card.component.css']
})
export class ExperienceCardComponent implements OnInit {
  @Input() experienceId: number = 0;
  @Input() logo_url: string = '';
  @Input() title: string = '';
  @Input() start_period: string = '';
  @Input() finish_period: string = '';
  @Input() site: string = '';
  @Input() description: string = '';

  @Output() newItemEvent = new EventEmitter();

  constructor(public service: AuthService) {}

  deleteExperience() {
    this.newItemEvent.emit({
      id: this.experienceId,
      title: this.title
    });
  } 

  ngOnInit(): void {
  }

} 

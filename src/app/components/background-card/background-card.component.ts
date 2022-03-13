import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-background-card',
  templateUrl: './background-card.component.html',
  styleUrls: ['./background-card.component.css'],
})
export class BackgroundCardComponent implements OnInit {
  @Input() educationId: number = 0;
  @Input() logo_url: string = '';
  @Input() title: string = '';
  @Input() start_period: string = '';
  @Input() finish_period: string = '';
  @Input() site: string = '';
  @Input() description: string = '';

  @Output() newItemEvent = new EventEmitter();

  constructor(public service: AuthService) {}

  deleteEducation() {
    this.newItemEvent.emit({
      id: this.educationId,
      title: this.title
    });
  } 

  ngOnInit(): void {} 
}
 
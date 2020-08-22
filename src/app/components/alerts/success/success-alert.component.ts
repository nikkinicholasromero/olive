import { Component, Input } from '@angular/core';
import { SuccessData } from './success-data';

@Component({
  selector: 'app-success-alert',
  templateUrl: './success-alert.component.html',
  styleUrls: ['./success-alert.component.css']
})
export class SuccessAlertComponent {
  @Input()
  public readonly successData: SuccessData;
}

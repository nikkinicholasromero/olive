import { Component, Input } from '@angular/core';
import { ErrorData } from './error-data';

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.css']
})
export class ErrorAlertComponent {
  @Input()
  public readonly errorData: ErrorData;
}

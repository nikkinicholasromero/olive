import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css']
})
export class FormFieldComponent implements OnInit {
  @Input()
  public readonly parent: FormGroup;

  @Input()
  public readonly fieldName: string;
  
  @Input()
  public readonly field: FormControl;
  
  @Input()
  public readonly type: string;

  public fieldId: string;
  
  constructor() { }

  ngOnInit(): void {
    Object.keys(this.parent.controls).forEach(key => {
      if (this.parent.controls[key] === this.field) {
        this.fieldId = key;
      }
    });
  }
}

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { SuccessAlertComponent } from './success-alert.component';
import { SuccessData } from './success-data';

describe('SuccessAlertComponent', () => {
    @Component({
        template: `<app-success-alert [successData]="successData"></app-success-alert>`
    })
    class TestHostComponent {
        successAlertComponent: SuccessAlertComponent;

        public successData: SuccessData = {
            title: "Some Title",
            text: "Some Text",
            okCallback: () => { }
        };

        @ViewChild(SuccessAlertComponent)
        set setSuccessAlertComponent(successAlertComponent: SuccessAlertComponent) {
            this.successAlertComponent = successAlertComponent;
        };
    }

    let hostFixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [SuccessAlertComponent, TestHostComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        hostFixture = TestBed.createComponent(TestHostComponent);
        hostComponent = hostFixture.componentInstance;
        hostFixture.detectChanges();
    });

    it('should create', () => {
        expect(hostComponent.successAlertComponent).toBeTruthy();
    });
});

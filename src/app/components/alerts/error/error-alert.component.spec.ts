import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorAlertComponent } from './error-alert.component';
import { ErrorData } from './error-data';

describe('ErrorAlertComponent', () => {
    @Component({
        template: `<app-error-alert [errorData]="errorData"></app-error-alert>`
    })
    class TestHostComponent {
        errorAlertComponent: ErrorAlertComponent;

        public errorData: ErrorData = {
            title: "Some Title",
            text: "Some Text",
            okCallback: () => { }
        };

        @ViewChild(ErrorAlertComponent)
        set setErrorAlertComponent(errorAlertComponent: ErrorAlertComponent) {
            this.errorAlertComponent = errorAlertComponent;
        };
    }

    let hostFixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [ErrorAlertComponent, TestHostComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        hostFixture = TestBed.createComponent(TestHostComponent);
        hostComponent = hostFixture.componentInstance;
        hostFixture.detectChanges();
    });

    it('should create', () => {
        expect(hostComponent.errorAlertComponent).toBeTruthy();
    });
});

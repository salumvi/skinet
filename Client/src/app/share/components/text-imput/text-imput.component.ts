import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Self,
} from '@angular/core';
import { ControlValueAccessor, NgControl, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-text-imput',
  templateUrl: './text-imput.component.html',
  styleUrls: ['./text-imput.component.scss'],
})
export class TextImputComponent implements OnInit, ControlValueAccessor {
  @ViewChild('input', { static: true }) input: ElementRef;
  @Input() type = 'text';
  @Input() label: string;


  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }
  errors: any[] = [];
  ngOnInit(): void {
    const  control = this.controlDir.control;
    const validators = control.validator ? [control.validator] : [];
    const asyncValidators = control.asyncValidator ? [control.asyncValidator] : [];
    
    this.resetErrors(control.errors);

    control.setValidators(validators);
    control.setAsyncValidators(asyncValidators);
    control.updateValueAndValidity();
  }


  onChange(event) {
    // console.log('onchange');
  }
  onKeyup(){
    this.resetErrors(this.controlDir.control.errors);
  }

  onTouched() {
    // console.log('ontouch');
  }
  writeValue(obj: any): void {
    this.input.nativeElement.value = obj || '';
    // console.log('writevalue');
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
    // console.log('registeronchange');
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
    // console.log('regsterontouch');
  }

  private resetErrors(objErrors ){
    for (const property in objErrors) {
      if (objErrors){
      this.errors.push(objErrors[property]);
      }
    }
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  formData = {
    title: '',
    concern: '',
  };

  onSubmit() {
    console.log('Submitted form data:', this.formData);

    this.formData = {
      title: '',
      concern: '',
    };
  }
}

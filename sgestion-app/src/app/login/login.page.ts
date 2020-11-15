import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;
  public errorMessage: string;

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, { updateOn: "blur", validators: Validators.required }),
      password: new FormControl(null, { updateOn: "blur", validators: Validators.required })
    });
    this.loginForm.markAllAsTouched();
  }

  ngOnInit() {
    this.errorMessage = "";
  }

  public async login() {
    console.log("Validate credentials...");
  }

}

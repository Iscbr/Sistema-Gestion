import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { UtilUiService } from "../../services/util/util-ui.service";
import { AppComponent } from "../app.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;
  public errorMessage: string;

  constructor(
    private authService: AuthService,
    private uiService: UtilUiService,
    private appComponent: AppComponent
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, { updateOn: "blur", validators: [Validators.required, Validators.email] }),
      password: new FormControl(null, { updateOn: "blur", validators: Validators.required })
    });
    this.loginForm.markAllAsTouched();
  }

  ngOnInit() {  }

  ionViewWillEnter() {
    this.errorMessage = "";
  }

  public async login() {
    if (this.loginForm.get("email").invalid || this.loginForm.get("password").invalid) {
      this.errorMessage = "El email y el password son obligatorios";
      return;
    }
    await this.uiService.showLoadingAlert("Validando credenciales...");
    this.authService.login(this.loginForm.get("email").value, this.loginForm.get("password").value).subscribe(
      response => {
        this.authService.saveUser(response.access_token);
        this.authService.saveToken(response.access_token);
        this.appComponent.initializeUserSession();
        this.uiService.dismissLoadingAlert();
      },
      error => {
        if (error.status === 400) {
          this.errorMessage = "Credenciales incorrectas, verifíquelo";
        }
        this.uiService.dismissLoadingAlert();
      }
    );
  }

}

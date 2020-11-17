import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from "@angular/router";

import { AuthService } from "../services/auth.service";
import { UtilUiService } from "../services/util/util-ui.service";

import { User } from "../model/user.model";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  public userLoggedIn: boolean;
  public user: User;
  public selectedIndex = 0;

  public appSellerPages = [
    {
      title: 'Ventas',
      url: '/sales',
      icon: 'cart'
    }
  ];
  public appAdminPages = [
    {
      title: 'Inteligencia',
      url: '/intelligence',
      icon: 'podium'
    },
    {
      title: 'Inventario',
      url: '/inventory',
      icon: 'receipt'
    }
  ];

  public appPages = [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private uiService: UtilUiService,
    private authService: AuthService
  ) {
    this.initializeApp();
    this.initializeUserSession().then();
  }

  ngOnInit() {}

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  public async initializeUserSession(): Promise<void> {
    this.userLoggedIn = this.authService.isAuthenticated;
    if (this.userLoggedIn) {
      this.user = this.authService.user;
      if (this.user.roles.includes("ROLE_ADMIN")) {
        this.appPages = this.appAdminPages;
        await this.router.navigate(["/", "intelligence"]);
        this.selectIndex();
      } else if (this.user.roles.includes("ROLE_SELLER")) {
        this.appPages = this.appSellerPages;
        await this.router.navigate(["/", "sales"]);
        this.selectIndex();
      } else {
        await this.uiService.showMessageAlert(
          false,
          "Usuario sin roles",
          "Su usuario no cuenta con ningún rol, por lo cual no puede iniciar sesión. Contacte al " +
          "administrador del sistema para que le asigne roles a su usuario y vuelva a intentarlo.",
          ["OK"]
        );
      }
    } else {
      await this.router.navigate(["/", "login"]);
    }
  }

  private selectIndex() {
    const path = window.location.pathname;
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.url.toLowerCase() === path.toLowerCase());
    }
  }

  public async logout() {
    await this.uiService.showMessageAlert(
      false,
      "Cierre de sesión",
      "¿Está seguro de que desea cerrar sesión?",
      [
        {
          text: "Sí",
          handler: () => {
            this.authService.logout();
            this.userLoggedIn = this.authService.isAuthenticated;
            this.router.navigate(["/", "login"]);
          }
        },
        {
          text: "Cancelar"
        }
      ]
    );

  }
}

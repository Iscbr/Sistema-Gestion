import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public userLoggedIn: boolean;
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
    private router: Router,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  public async ngOnInit() {
    this.userLoggedIn = false;
    const path = window.location.pathname;
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.url.toLowerCase() === path.toLowerCase());
    }
    await this.router.navigate(["/", "login"]);
  }
}

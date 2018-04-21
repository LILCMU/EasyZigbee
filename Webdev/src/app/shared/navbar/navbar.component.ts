import { Component, OnInit, Renderer, ViewChild, ElementRef, TemplateRef, NgZone } from '@angular/core';
import { ROUTES } from '../../sidebar/sidebar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Http, Response } from '@angular/http';
import { AuthService, AppGlobals } from 'angular2-google-login';
@Component({
    moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
    private nativeElement: Node;
    private toggleButton;
    private sidebarVisible: boolean;
    modalRef: BsModalRef;
    statuslogin: any = null;
    username: any = null;
    log: any = null;
    query: any = null;
    checklogin: any = null;
    imageURL: string;
    email: string;
    name: string;
    token: string;
    
    @ViewChild("navbar-cmp") button;

    constructor(location: Location, private renderer: Renderer, private element: ElementRef, private modalService: BsModalService, private _http: Http,private auth: AuthService, private zone: NgZone) {
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }
    private apiUrl = 'http://api4ezzigbee.herokuapp.com';
    
    ngOnInit() {
         //Set your Google Client ID here
    AppGlobals.GOOGLE_CLIENT_ID = '1035405859695-0utjl9nq6lbmpg5c09q7i4bh9dsdnb6b.apps.googleusercontent.com';
   
    setTimeout(() => { this.googleAuthenticate() }, 50);
    this.getData();
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        var navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        
       
    }
    getTitle() {
        var titlee = window.location.pathname;
        titlee = titlee.substring(1);
        for (var item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }
    sidebarToggle() {
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];

        if (this.sidebarVisible == false) {
            setTimeout(function () {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }

    // signin(username: string, password: string) {

    // if(username != "" && password != "") {
    //     this.query = "/GetTable?email=" + username + "&password=" + password;
    //     this._http.get(this.apiUrl + this.query)
    //         .map((res: Response) => res.json())
    //         .subscribe(checklogin => {
    //             this.checklogin = checklogin;
    //           if (this.checklogin.status = 1) {
    //             this.statuslogin = "welcome..." + username;
    //             this.log = "Logout";
    //             console.log(username);
    //             console.log(password);
    //             localStorage.setItem('Username', username);
    //             localStorage.setItem('log', "SIGN OUT");
    //             var Username = localStorage.getItem('Username');
    //             window.location.reload();
    //         }
    //         else { this.statuslogin = "Fail, please check username or password again."; }
    //         });
    //     }
    //     else { this.log = "SIGN IN" }

    // }
    /**
   * Calling Google Authentication service
   */
  googleAuthenticate() {
    this.auth.authenticateUser((result) => {
      //Using Angular2 Zone dependency to manage the scope of variables
      this.zone.run(() => {
        this.getData();
        window.location.reload();
      });
    });
  }

  /**
   * Getting data from browser's local storage
   */
  getData() {
    
     this.token = localStorage.getItem('token');
    this.imageURL = localStorage.getItem('image');
    this.name = localStorage.getItem('name');
     this.email = localStorage.getItem('email');
  }

  /**
   * Logout user and calls function to clear the localstorage
   */
  logout() {
    let scopeReference = this;
    this.auth.userLogout(function () {

      scopeReference.clearLocalStorage();
      window.location.href = 'http://ezsetup.herokuapp.com' ;
    });

  }

  /**
   * Clearing Localstorage of browser
   */
  clearLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('image');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('coid');
    
  }
}

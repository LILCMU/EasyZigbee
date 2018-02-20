import { Component, OnInit, Renderer, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { ROUTES } from '../../sidebar/sidebar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Http, Response } from '@angular/http';
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
    @ViewChild("navbar-cmp") button;

    constructor(location: Location, private renderer: Renderer, private element: ElementRef, private modalService: BsModalService, private _http: Http) {
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }
    private apiUrl = 'http://api4ezzigbee.herokuapp.com';
    openModal(template: TemplateRef<any>) {
        var Username = localStorage.getItem('Username');
        console.log(Username);
        if (Username == null) { this.modalRef = this.modalService.show(template); }
        else {
            localStorage.clear();
            window.location.reload();
        }


    }
    ngOnInit() {
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        var navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        //get username
        var Username = localStorage.getItem('Username');
        this.username = Username;
        var log = localStorage.getItem('log');
        console.log(log);
        if (log == null) { this.log = "SIGN IN" }
        else { this.log = log; }

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

    signin(username: string, password: string) {

    if(username != "" && password != "") {
        this.query = "/login?username=" + username + "&password=" + password;
        this._http.get(this.apiUrl + this.query)
            .map((res: Response) => res.json())
            .subscribe(checklogin => {
                this.checklogin = checklogin;
              if (this.checklogin.status = 1) {
                this.statuslogin = "welcome..." + username;
                this.log = "Logout";
                console.log(username);
                console.log(password);
                localStorage.setItem('Username', username);
                localStorage.setItem('log', "SIGN OUT");
                var Username = localStorage.getItem('Username');
                window.location.reload();
            }
            else { this.statuslogin = "Fail, please check username or password again."; }
            });
        }
        else { this.log = "SIGN IN" }

    }
}

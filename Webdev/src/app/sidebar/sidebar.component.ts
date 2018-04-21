import { Component, OnInit } from '@angular/core';

declare var $:any;

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
     // { path: 'blockly', title: 'Blockly',  icon: 'ti-thought', class: '' },
   // { path: 'table', title: 'Editor',  icon: 'ti-clipboard', class: '' },
    //{ path: 'user', title: 'ZigBee Device(s)',  icon:'ti-harddrives', class: '' },
   // { path: 'dashboard', title: 'Monitor',  icon:'ti-image', class: '' },
  //  { path: 'typography', title: 'Setup Network',  icon:'ti-settings', class: '' },
   // { path: 'icons', title: 'Icons',  icon:'ti-pencil-alt2', class: '' },
   // { path: 'maps', title: 'Maps',  icon:'ti-map', class: '' },
    //{ path: 'notifications', title: 'Notifications',  icon:'ti-bell', class: '' },
    // { path: 'upgrade', title: 'Upgrade to PRO',  icon:'ti-export', class: 'active-pro' },
    { path: 'zigbee', title: 'Zigbee Network ',  icon:'ti-sharethis', class: '' },
    { path: 'gogo', title: 'GoGo ZigBee ',  icon:'ti-settings', class: '' }
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    isNotMobileMenu(){
        if($(window).width() > 991){
            return false;
        }
        return true;
    }

}

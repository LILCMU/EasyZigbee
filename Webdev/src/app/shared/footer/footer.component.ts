import { Component, HostBinding } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'footer-mome',
    templateUrl: 'footer.component.html'
})

export class FooterComponent{
    test : Date = new Date();
}

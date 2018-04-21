import { Routes } from '@angular/router';

import { BlocklyComponent } from './blockly/blockly.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { UserComponent }   from './user/user.component';
import { TableComponent }   from './table/table.component';
import { TypographyComponent }   from './typography/typography.component';
import { IconsComponent }   from './icons/icons.component';
import { MapsComponent }   from './maps/maps.component';
import { NotificationsComponent }   from './notifications/notifications.component';
import { UpgradeComponent }   from './upgrade/upgrade.component';
import { ZigbeeComponent }   from './zigbee/zigbee.component';
import { GogoComponent }   from './gogo/gogo.component';
export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'zigbee',
        pathMatch: 'full',
    },
    {
        path: 'blockly',
        component: BlocklyComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'table',
        component: TableComponent
    },
    {
        path: 'typography',
        component: TypographyComponent
    },
    {
        path: 'icons',
        component: IconsComponent
    },
    {
        path: 'maps',
        component: MapsComponent
    },
    {
        path: 'notifications',
        component: NotificationsComponent
    },
    {
        path: 'upgrade',
        component: UpgradeComponent
    },
    {
        path: 'zigbee',
        component: ZigbeeComponent
    }
    ,
    {
        path: 'gogo',
        component: GogoComponent
    }

]

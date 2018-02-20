import { TabsContainer } from "../../containers";
export declare class TabComponent {
    active: boolean;
    tabTitle: string;
    constructor(tabs: TabsContainer);
    getTabTitle(): string;
}

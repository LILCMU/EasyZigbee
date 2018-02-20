import { EventEmitter } from "@angular/core";
import { TabComponent } from "../../components";
export declare class TabsContainer {
    disabled: boolean;
    currentTabChange: EventEmitter<TabComponent>;
    ifTabSelected: boolean;
    tabs: TabComponent[];
    addTab(tab: TabComponent): void;
    selectTab(tab: TabComponent): void;
    isDisabled(): "block" | "none";
    ngAfterContentInit(): void;
}

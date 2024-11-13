import { HarnessAppOptions } from './imports/app';
import type { ClassInstance } from './imports/classRegistry';
import Router from './router';
export default class HarnessApp<CustomRouteProps = any> {
    options: HarnessAppOptions;
    name: string;
    el: HTMLElement;
    isStarted: boolean;
    isReady: Promise<this>;
    private resolveIsReady;
    router: Router;
    window: Window;
    private registry;
    private loadingState;
    constructor(options: HarnessAppOptions);
    start(): Promise<this>;
    navigate(urlFragment: string, openNewTab?: boolean): this;
    newInstance<C extends ClassInstance>(id: string, options?: C['options']): Promise<C>;
    toggleClass(className: string, add?: boolean): this;
    setLoadingState(show?: boolean): boolean;
}
//# sourceMappingURL=app.d.ts.map
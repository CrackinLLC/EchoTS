import type { ClassMapTypeCollection, ClassMapTypeCollectionView, ClassMapTypeModel, ClassMapTypeRouteView, ClassMapTypeView } from './_maps';
import type { ZeyonAppLike, ZeyonAppOptions } from './imports/app';
import type View from './view';
export default class ZeyonApp implements ZeyonAppLike {
    options: ZeyonAppOptions;
    name: string;
    el: HTMLElement;
    isStarted: boolean;
    isReady: Promise<this>;
    private resolveIsReady;
    window: Window;
    private router;
    private registry;
    private loadingState;
    private stylesLoaded;
    constructor(options: ZeyonAppOptions);
    start(): Promise<this>;
    navigate(urlFragment: string, openNewTab?: boolean): this;
    newView<K extends keyof ClassMapTypeView>(registrationId: K, options?: ClassMapTypeView[K]['options']): Promise<InstanceType<ClassMapTypeView[K]['classRef']>>;
    renderNewView<K extends keyof ClassMapTypeView>(registrationId: K, options?: ClassMapTypeView[K]['options']): Promise<this>;
    newRouteView<K extends keyof ClassMapTypeRouteView>(registrationId: K, options?: ClassMapTypeRouteView[K]['options']): Promise<InstanceType<ClassMapTypeRouteView[K]['classRef']>>;
    newModel<K extends keyof ClassMapTypeModel>(registrationId: K, options?: ClassMapTypeModel[K]['options']): Promise<InstanceType<ClassMapTypeModel[K]['classRef']>>;
    newCollection<K extends keyof ClassMapTypeCollection>(registrationId: K, options?: ClassMapTypeCollection[K]['options']): Promise<InstanceType<ClassMapTypeCollection[K]['classRef']>>;
    newCollectionView<K extends keyof ClassMapTypeCollectionView>(registrationId: K, options?: ClassMapTypeCollectionView[K]['options']): Promise<InstanceType<ClassMapTypeCollectionView[K]['classRef']>>;
    private newInstance;
    toggleClass(className: string, add?: boolean): this;
    setLoadingState(show?: boolean): boolean;
    loadViewStyles(view: View): this;
}
//# sourceMappingURL=app.d.ts.map
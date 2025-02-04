import type {
  ClassMapKey,
  ClassMapTypeCollection,
  ClassMapTypeCollectionView,
  ClassMapTypeModel,
  ClassMapTypeRouteView,
  ClassMapTypeView,
} from './_maps';
import ClassRegistry from './classRegistry';
import type Emitter from './emitter';
import type { ZeyonAppLike, ZeyonAppOptions } from './imports/app';
import Router from './router';
import { loaderTemplate } from './util/loader';
import type View from './view';

/**
 * The central hub of the application, managing interactions between components.
 */
export default class ZeyonApp implements ZeyonAppLike {
  /**
   * Custom identifying string for the current application.
   */
  public name = '';

  /**
   * Root element for the application
   */
  public el: HTMLElement;

  /**
   * Indicates whether the application has started. Prevents application from being initialized multiple times.
   */
  public isStarted = false;

  /**
   * Promise that resolves once the application has been started and is ready
   */
  public isReady: Promise<this>;
  private resolveIsReady!: (value: this) => void;

  /**
   * A global reference for our window object to prevent window duplication
   */
  public window: Window;

  /**
   * The application's router.
   */
  private router: Router;

  /**
   * A map of classRef keyed by registrationId, for dynamic instantiation.
   */
  private registry: ClassRegistry;

  /**
   * A stored loading state element for global loading state.
   */
  private loadingState: HTMLElement | null = null;

  private stylesLoaded = new Set<string>();

  /**
   * Initializes a new instance of the ZeyonApp.
   * @param options - The application options.
   */
  constructor(public options: ZeyonAppOptions) {
    const { name, el, urlPrefix, routes } = options;

    // Initialize readiness promises
    this.isReady = new Promise<this>((resolve) => {
      this.resolveIsReady = resolve;
    });

    this.name = name || '';
    this.el = el;
    this.window = window;

    this.router = new Router({ urlPrefix, routes }, this);
    this.registry = new ClassRegistry({}, this);
  }

  /**
   * Starts the router which loads the first route into the DOM
   * @returns The application instance.
   */
  public async start(): Promise<this> {
    if (!this.isStarted) {
      this.isStarted = true;

      this.router.start();
      this.resolveIsReady(this);
    }

    return this;
  }

  /**
   * Navigates to a specified URL fragment.
   * @param urlFragment - The URL fragment to navigate to.
   * @param openNewTab - Whether to open the URL in a new tab.
   */
  public navigate(urlFragment: string, openNewTab = false): this {
    const baseUrl = new URL(document.baseURI);
    const url = new URL(urlFragment, baseUrl);

    if (url.origin !== baseUrl.origin || openNewTab) {
      window.open(url.href, '_blank');
    } else {
      this.router.navigate({ path: urlFragment });
    }

    return this;
  }

  public async newView<K extends keyof ClassMapTypeView>(
    registrationId: K,
    options?: ClassMapTypeView[K]['options'],
  ): Promise<InstanceType<ClassMapTypeView[K]['classRef']>> {
    return this.newInstance<InstanceType<ClassMapTypeView[K]['classRef']>>(registrationId, options);
  }

  // Similar to newView, but returns the renders the view and returns the application, rather than the unrendered view instance
  public async renderNewView<K extends keyof ClassMapTypeView>(
    registrationId: K,
    options?: ClassMapTypeView[K]['options'],
  ): Promise<this> {
    await this.newView(registrationId, options).then((view) => view.render());
    return this;
  }

  public newRouteView<K extends keyof ClassMapTypeRouteView>(
    registrationId: K,
    options?: ClassMapTypeRouteView[K]['options'],
  ): Promise<InstanceType<ClassMapTypeRouteView[K]['classRef']>> {
    return this.newInstance<InstanceType<ClassMapTypeRouteView[K]['classRef']>>(registrationId, options);
  }

  public newModel<K extends keyof ClassMapTypeModel>(
    registrationId: K,
    options?: ClassMapTypeModel[K]['options'],
  ): Promise<InstanceType<ClassMapTypeModel[K]['classRef']>> {
    return this.newInstance<InstanceType<ClassMapTypeModel[K]['classRef']>>(registrationId, options);
  }

  public newCollection<K extends keyof ClassMapTypeCollection>(
    registrationId: K,
    options?: ClassMapTypeCollection[K]['options'],
  ): Promise<InstanceType<ClassMapTypeCollection[K]['classRef']>> {
    return this.newInstance<InstanceType<ClassMapTypeCollection[K]['classRef']>>(registrationId, options);
  }

  public newCollectionView<K extends keyof ClassMapTypeCollectionView>(
    registrationId: K,
    options?: ClassMapTypeCollectionView[K]['options'],
  ): Promise<InstanceType<ClassMapTypeCollectionView[K]['classRef']>> {
    return this.newInstance<InstanceType<ClassMapTypeCollectionView[K]['classRef']>>(registrationId, options);
  }

  private async newInstance<T extends Emitter>(registrationId: ClassMapKey, options?: unknown): Promise<T> {
    const def = await this.registry.getClass(registrationId);
    if (!def) throw new Error(`No class with id: ${registrationId}`);

    const instance = new def(options || {}, this) as T;
    if (instance.isReady instanceof Promise) {
      await instance.isReady;
    }

    return instance;
  }

  /**
   * Toggles a classname on the root element.
   * @param className - The class name to toggle.
   * @param add - Whether to force add / remove the class.
   * @returns The application instance.
   */
  public toggleClass(className: string, add?: boolean): this {
    this.el.classList.toggle(className, add);
    return this;
  }

  /**
   * Sets or toggles the loading state of the application.
   * @param show - Whether to show or hide the loading state.
   * @returns The current loading state.
   */
  public setLoadingState(show?: boolean): boolean {
    if (typeof show !== 'boolean') {
      show = !this.loadingState;
    }

    if (show && !this.loadingState) {
      this.loadingState = loaderTemplate({ wrapped: true });
      this.el.appendChild(this.loadingState);
    } else if (!show && this.loadingState) {
      this.loadingState.remove();
      this.loadingState = null;
    }

    return show;
  }

  public loadViewStyles(view: View): this {
    const id: string = view.getStaticMember('registrationId');
    const styles: string = view.getStaticMember('styles');

    // TODO: Incorporate automatic style scoping at this point?

    if (styles && id && !this.stylesLoaded.has(id)) {
      const styleEl = document.createElement('style');
      styleEl.dataset.id = id;
      styleEl.innerHTML = styles;
      document.head.appendChild(styleEl);
      this.stylesLoaded.add(id);
    }

    return this;
  }
}

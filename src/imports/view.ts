import type Model from '../model';
import type View from '../view';

export interface AttachReference {
  view: View;
  id: string;
}

export interface ViewOptions {
  id?: string;
  classNames?: string[];
  attributes?: Record<string, string | undefined>; // Inline DOM attributes, not to be confused with model attributes
  attachTo?: HTMLElement | NodeListOf<HTMLElement> | AttachReference | string;
  prepend?: boolean;
  customEvents?: string[];
  preventDefault?: boolean; // Capture click events on view el and prevent default behavior

  params?: Record<string, string>;
  query?: Record<string, string>;
  hash?: string;

  model?: Model | Partial<{}> | string;
  modelType?: string; // Will attempt to infer model type based on attributes, but for ambiguous cases should explicitly state type here
}

export interface RenderOptions {
  tagName?: string;
}

export interface ErrorStateOptions {
  preventHanding?: boolean; // Prevent the parent from handling the removal of the error state
  attachTo?: HTMLElement;
}

export const errorTemplate = (msg: string): HTMLElement => {
  const errorEl = document.createElement('div');
  errorEl.classList.add('error-message');
  errorEl.innerText = msg;
  return errorEl;
};

export const enum LoaderType {
  Slosh = 'slosh-loader',
}

export const loaderTemplate = ({
  type = LoaderType.Slosh,
  wrapped = false,
}: {
  type?: LoaderType;
  wrapped?: boolean;
} = {}): HTMLElement => {
  const LoaderMarkup = {
    'slosh-loader': '<div class="inner"></div>',
  };

  const loadingStateEl = document.createElement('div');
  loadingStateEl.classList.add('loading-state');
  loadingStateEl.innerHTML = `<span class="${['loader', type, wrapped ? 'loader-wrapped' : ''].join(
    ' ',
  )}" aria-hidden="true">${LoaderMarkup[type]}</span>`;

  return loadingStateEl;
};

import type Collection from '../collection';
import { EmitterOptions } from './emitter';

export interface ModelOptions<A extends Attributes> extends EmitterOptions {
  attributes?: Partial<A>;
  collection?: Collection;
}

export interface Attributes {
  [key: string]: unknown;
  id?: number;
}

export type AttributeType =
  | 'string'
  | 'stringArray'
  | 'number'
  | 'numberArray'
  | 'boolean'
  | 'booleanArray'
  | 'symbol'
  | 'symbolArray'
  | 'object'
  | 'objectArray'
  | 'date'
  | 'dateArray';

export interface AttributeDefinition {
  type: AttributeType;
  default?: unknown; // The default value of the attribute when a new instance is created.

  optional?: boolean; // Flags undefined or null as valid values (Defaults to false).
  allowed?: unknown[]; // An array of explicitly permitted values. Does not infringe on "optional" handling.
  validate?: (val: unknown) => boolean; // Custom validation function.

  minLength?: number; // Minimum length for strings and arrays.
  maxLength?: number; // Maximum length for strings and arrays.
}

export const modelEvents = [
  'add', // When the model is added to a collection.
  'remove', // When the model is removed from a collection.
  'change', // When any model attribute is changed.
  'reset', // When all model attributes are reset to their default or undefined values.
  'selected', // When the model is selected or deselected.
];
// Additional generated events include [attribute_name]:change, [attribute_name]:set, and [attribute_name]:unset

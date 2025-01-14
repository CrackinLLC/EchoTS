import type Collection from '../collection';
import { EmitterOptions } from './emitter';

export interface ModelOptions<A extends Attributes> extends EmitterOptions {
  attributes?: Partial<A>;
  collection?: Collection;
}

export const enum ModelType {
  Unknown = 'unknown',
}

/////////////////////////
// Attribute interfaces

export interface Attributes {
  [key: string]: unknown;
  id?: number;
}

export const enum AttributeType {
  String = 'String',
  StringArray = 'StringArray',
  Number = 'Number',
  NumberArray = 'NumberArray',
  Object = 'Object',
  ObjectArray = 'ObjectArray',
  Boolean = 'Boolean',
  Date = 'Date',
}

export interface AttributeDefinition {
  type: AttributeType;
  default?: unknown; // Default value of the attribute when a new model is instantiated
  optional?: boolean;
}

export const modelEvents = [
  'add', // When the model is added to a collection.
  'remove', // When the model is removed from a collection.
  'change', // When any model attribute is changed.
  'reset', // When all model attributes are reset to their default or undefined values.
  'selected', // When the model is selected or deselected.
];
// Additional generated events include [attribute]:change, [attribute]:set, and [attribute]:unset

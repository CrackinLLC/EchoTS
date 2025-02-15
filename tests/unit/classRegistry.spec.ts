import '../util/testClassMapType';

import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { ClassMapKey } from '../../src/_maps';
import ClassRegistry from '../../src/classRegistry';
import Emitter from '../../src/emitter';
import type { AnyDefinition, ClassRegistryOptions } from '../../src/imports/classRegistry';
import { TestZeyonApp } from '../util/testApp';

class DummyClassA extends Emitter {
  static registrationId = 'dummy-a';
}
class DummyClassB extends Emitter {
  static registrationId = 'dummy-b';
}
class DummyClassC extends Emitter {
  static registrationId = 'dummy-c';
}
class InvalidClass {}

describe('ClassRegistry', () => {
  let registry: ClassRegistry;

  beforeEach(() => {
    const mockOptions: ClassRegistryOptions = { events: [] };
    const mockApp = new TestZeyonApp();
    registry = new ClassRegistry(mockOptions, mockApp);
  });

  it('has the expected registrationId', () => {
    expect(ClassRegistry.registrationId).toBe('zeyon-registry');
  });

  it('starts empty', async () => {
    expect(registry.hasClass('dummy-a')).toBe(false);
    const def = await registry.getClass('dummy-a' as ClassMapKey);
    expect(def).toBeUndefined();
  });

  it('registerClass adds a definition and emits registered', async () => {
    const spyEmit = vi.spyOn(registry, 'emit');
    registry.registerClass(DummyClassA);
    expect(registry.hasClass('dummy-a')).toBe(true);
    expect(spyEmit).toHaveBeenCalledWith('registered', { id: 'dummy-a' });
    const fetched = await registry.getClass('dummy-a' as ClassMapKey);
    expect(fetched).toBe(DummyClassA);
  });

  it('overwrites existing definition and emits overwritten', () => {
    registry.registerClass(DummyClassA);
    expect(registry.hasClass('dummy-a')).toBe(true);
    const spyEmit = vi.spyOn(registry, 'emit');
    const OverwritingClass: AnyDefinition = class OverwritingClass extends Emitter {
      static registrationId = 'dummy-a';
    };
    registry.registerClass(OverwritingClass);
    expect(spyEmit).toHaveBeenCalledWith('overwritten', { id: 'dummy-a' });
  });

  it('registerClasses skips invalid entries', async () => {
    const spyRegisterClass = vi.spyOn(registry, 'registerClass');
    const definitionsArray = [DummyClassB, DummyClassC, InvalidClass, { random: 'object' }];

    definitionsArray.forEach((def) => registry.registerClass(def as AnyDefinition));
    expect(spyRegisterClass).toHaveBeenCalledTimes(2);
    expect(registry.hasClass('dummy-b')).toBe(true);
    expect(registry.hasClass('dummy-c')).toBe(true);
    expect(registry.hasClass('invalid-class')).toBe(false);
  });

  it('getClass returns undefined if not found', async () => {
    const entry = await registry.getClass('nonexistent' as ClassMapKey);
    expect(entry).toBeUndefined();
  });
});

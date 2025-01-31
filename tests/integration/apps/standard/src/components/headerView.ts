import Zeyon from 'zeyon';

const name = 'My component name';

@Zeyon.registerView('component-header', {
  template: `<div>Testing template literal with substitution: ${name} `,
  isComponent: true,
})
export class HeaderView extends Zeyon.View {
  protected async onRender() {
    console.log('HeaderView rendered!');
  }
}

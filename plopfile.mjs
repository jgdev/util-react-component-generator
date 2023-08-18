import handlebarHelpers from 'handlebars-helpers';
import path from 'path';
import fs from 'fs';

/**
 * @param {import('plop').NodePlopAPI} plop
 */
export default (plop) => {
  const helpers = handlebarHelpers();

  Object.keys(helpers).forEach(helper => {
    plop.setHelper(helper, helpers[helper])
  })

  const srcFolder = path.join(process.cwd(), './src');
  const srcFolderExists = fs.existsSync(srcFolder);

  plop.setGenerator('', {
    description: 'Create a component',
    prompts: [
      {
        type: 'input',
        default: 'MyComponent',
        name: 'componentName',
        message: 'Component name'
      },
      {
        type: 'input',
        default: `./${srcFolderExists ? 'src/' : ''}components`,
        name: "folder",
        message: "Component location",
      },
      {
        type: 'confirm',
        default: true,
        name: 'style',
        message: 'Create sass file?',
      },
      {
        type: 'confirm',
        default: true,
        name: 'storybook',
        message: 'Create storybook?',
      },
      {
        type: 'confirm',
        default: true,
        name: 'test',
        message: 'Create test?',
      }
    ],
    actions: data => {
      const actions = [];

      const folder = path.join(process.cwd(), data.folder);
      const componentFolder = path.join(folder, data.componentName);

      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
      }

      if (!fs.existsSync(componentFolder)) {
        fs.mkdirSync(componentFolder);
      }

      actions.push({
        type: 'add',
        path: `${componentFolder}/index.ts`,
        templateFile: './templates/index.hbs'
      })

      actions.push({
        type: 'add',
        path: `${componentFolder}/{{componentName}}.tsx`,
        templateFile: './templates/component.hbs'
      })

      if (data.style) {
        actions.push({
          type: 'add',
          path: `${componentFolder}/{{componentName}}.module.scss`,
          templateFile: './templates/styles.hbs'
        })
      }

      if (data.storybook) {
        actions.push({
          type: 'add',
          path: `${componentFolder}/{{componentName}}.stories.tsx`,
          templateFile: './templates/storybook.hbs'
        })
      }

      if (data.test) {
        actions .push({
          type: 'add',
          path: `${componentFolder}/{{componentName}}.test.tsx`,
          templateFile: './templates/test.hbs'
        })
      }

      return actions;
    },
  })
}

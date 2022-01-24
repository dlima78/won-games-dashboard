module.exports = function (plop) {
  // controller generator
  plop.setGenerator('component', {
    description: 'application component logic',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'component name please'
    }],
    actions: [
      {
        type: 'add',
        path: 'src/presentation/components/{{dashCase name}}/index.tsx',
        templateFile: 'templates/component.tsx.hbs'
      },
      {
        type: 'add',
        path: 'src/presentation/components/{{dashCase name}}/{{dashCase name}}.stories.tsx',
        templateFile: 'templates/stories.tsx.hbs'
      },
      {
        type: 'add',
        path: 'src/presentation/components/{{dashCase name}}/{{dashCase name}}.styled.tsx',
        templateFile: 'templates/styled.tsx.hbs'
      },
      {
        type: 'add',
        path: 'tests/presentation/components/{{dashCase name}}/{{dashCase name}}.spec.tsx',
        templateFile: 'templates/test.tsx.hbs'
      }
    ]
  })
}

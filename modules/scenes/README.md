# Scenes

This directory should contain js files exporting scenes with the following structure:

```javascript
module.exports = {
  name: string,
  steps: [
      (ctx) => {}
  ]
};
```

index.js collects all the scenes, stages them and exports a Stage instance.

It ignores any files containing `.test` and `index` substrings.

```javascript
module.exports = new Stage(...scenes);
```
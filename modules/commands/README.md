# Commands

This directory should contain js files exporting commands with the following structure:

```javascript
module.exports = {
  trigger: string | RegExp,
  callback: () => {},
};
```

index.js collects all the commands and exports them in an object with filenames as keys.

It ignores any files containing `.test` and `index` substrings.

```javascript
// If the files are start.js and help.js

module.exports = {
    start: {},
    help: {},
}
```
# split-image

This utility splits an image into fragments. The default settings split a large image into 7x8 inch fragments for use in some printing applications.

Install & Test

```
npm install
npm test
```

Build & Run

```
npm run build
node dist/split.js map.png

// or with your own file
node dist/split.js <file-name>
```

With custom fragment sizes
```
node dist/split.js <file-name> --height
```


- commander.js
- vitest
- typescript
- jimp
- sharp
- eslint

## Next Steps

- TBD

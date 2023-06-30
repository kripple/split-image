# split-image

This command line utility splits an image into smaller images. The default settings split a large image into 7x8 inch fragments for use in some printing applications.

## Quickstart

```
npm install
npm test
npm run lint
npm run build
node dist/split.js map.png

// or with your own file (copy your image file to the `input` folder)
node dist/split.js <file-name>
```

With custom fragment sizes and/or a custom pixel density

```
node dist/split.js <file-name> --height <fragment-height> --width <fragment-width> --pixels-per-inch <ppi>
```

## Tools & Technologies

- node.js
- commander.js
- typescript
- vitest
- jimp (browser only)
- sharp (node.js only)
- eslint

## Motivation / Inspiration

These existing tools can already split images. My goal was to create a tool that was easier to use than the existing options.

- https://rasterbator.net/
- http://posterizer.online/rasterbator/
- https://www.npmjs.com/package/chop-image
- https://www.npmjs.com/package/split-images

## Next Steps

- Add browser implementation
- ???

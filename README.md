# RAF Perfomance web client

First usable version of the client is finally out of the basement, check it out.

## Stack
### Major libararies

- [React 19](https://github.com/facebook/react)
- [Tanstack Router 1.1](https://tanstack.com/router/latest)
- [Tanstack Query 5.8](https://tanstack.com/query/latest)
- [Jotai 2.1](https://github.com/pmndrs/jotai)
- [Tailwindcss 4.1](https://github.com/tailwindlabs/tailwindcss)

### Minor libararies

- [i18next](https://github.com/i18next/react-i18next)
- [react-hook-form](https://github.com/react-hook-form/react-hook-form)
- [react-modal](https://github.com/reactjs/react-modal)
- [react-range](https://github.com/tajo/react-range)
- [react-select](https://github.com/JedWatson/react-select)

## Installation
1) Open the base directory (containing `package.json`)
2) Run `npm install`
3) Wait for installation
4) Run with `npm run dev`

## Important remarks
- All queries and mutations can be found and changed in `src/api/queries.ts` and `src/api/requests.ts`. Api path prefix can be configired in `src/config.ts`
- Every static string in the app is stored in `public/locales/` and is delivered via **react-i18next** library.
- Privacy policies are stored in the same directory with other static text content.

## To consider at integraion process
- App is currently very static in terms of image delivery as every image is tied to `src/assets` directory. This needs to change during integraion with api because images are mostly served in server static files. The way to untie the images is to remove `../../src/assets` prefix from all the images and deliver full image path from the server.
- Not a polished client version either, so minor errors/flaws are to be expected.

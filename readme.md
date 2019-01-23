## componentify

_Extract Reusable Components from existing React Project._

#### Getting Started

- Inside your root folder run this command

```sh
$ npx componentify-init components/ReusableComponent -p=@slayre/componentify
```
- Change the contents of `src/components/ReusableComponent/src/index.js` to import the component you want to extract and export it.

```javascript
export { default } from 'pathtocomponent';
```
- Build it. Make sure you are in ReusableComponent's dir.

```sh
yarn build
```

- Publish It.
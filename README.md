# Minimalist UI

A collection of Vue 2.0 components for use in projects

---
### Installation
``npm i @yale-spinup/minimalist-ui --save``

### Use
* Import the style.css file in your main javascript entrypoint file
```js
import '@yale-spinup/minimalist-ui/style.css'
```
* Import into components via the package and use normally
```vue
<template>
  <minimalist-card title="This is a title">
    This is a card
  </minimalist-card>
</template>

<script>
import { MinimalistCard } from '@yale-spinup/mimimalist-ui';

export default {
  components: {
    MinimalistCard
  }
  // ...
}
</script>
```

### Documentation

[TODO]
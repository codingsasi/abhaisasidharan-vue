<template>
  <img :src="source" :style="styles"/>
</template>

<script>
export default {
  name: 'imag',
  props: {
    source: String,
    styles: String
  }

}
</script>

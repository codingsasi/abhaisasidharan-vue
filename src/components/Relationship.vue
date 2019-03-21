<template>
  <Imag :source="source" :classes="classes" :styles="styles" />
</template>

<script>
import Imag from '@/components/Imag.vue';

export default {
  name: 'relationship',
  components: {
    Imag
  },

  data() {
    return {
      source: null
    }
  },

  props: {
    link: String,
    styles: String,
    classes: String,
    type: String,
    nid: null
  },

  mounted() {
    fetch(this.$props.link)
      .then(res => res.json())
      .then(
        (result) => {
          this.isLoaded = true;
          if (this.$props.type == 'image') {
            this.source = 'https://www.abhaisasidharan.xyz' + result.data.attributes.uri.url;
            this.classes = this.$props.classes;
            this.styles = this.$props.styles;
          }
        },
        (error) => {
          this.isLoaded = true;
          this.error = error;
        }
      )
  },

}
</script>

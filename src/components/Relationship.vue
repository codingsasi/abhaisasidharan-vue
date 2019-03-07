<template>
  <Image :src="'https://www.abhaisasidharna.xyz/' +  src" :class="classes"/>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Emit } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class Relationship extends Vue {
  data() {
    return {
      isLoaded: false,
      error: '',
      relationships: [],
      id: false,
    }
  }

  mounted() {
    fetch(`https://www.abhaisasidharan.xyz/api/file/file/${id}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.isLoaded = true;
          this.relationships: result.data;
        },
        (error) => {
          this.isLoaded: true;
          this.error = error;
        }
      )
  }

} 
</script>

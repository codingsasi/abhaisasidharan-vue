<template v-if="(id)">
  <section style="min-height:50em" class="col-md-8 mt-2">
    <div class="blog--full">
      <article v-for="(blog, index) in blogs" :key="index">
        <div class="blog-full--image row pt-5 pb-3">
          <img :src="blog.thumbnail" style="width:100%; height: 60%" class="rounded img-fluid">
        </div>
        <div class="blog-full--title row pb-3">
          <h4><a :href="/blog/ + blog.id">{{ blog.title }}</a></h4>
        </div>
        <div class="blog-full--created row pb-3">
          <div>
            <span><i class="fa fa-calendar"></i> {{ blog.created }} </span>
            <br>
          </div>
        </div>
        <div class="blog-full--body row py-3">
          <div v-html="blog.body" style="width: 100%;"></div>
        </div>
      </article>
    </div>
  </section>
</template>
<template v-else>
  <section style="min-height:50em" class="col-md-8">
    <div class="blog--timeline">
      <article v-for="(blog, index) in blogs" :key="index">
        <div class="blog-thumbnail--image row pt-5 pb-3 mt-2">
          <img :src="blog.thumbnail" style="width:100%; height: 60%" class="rounded img-fluid">
        </div>
        <div class="blog-thumbnail--title row">
          <h4><router-link :to="/blog/ + blog.id">{{ blog.title }}</router-link></h4>
          <p>{{ blog.summary }}</p>
        </div>
        <div class="blog-thumbnail--created row">
        <div>
          <span><i class="fa fa-calendar"></i> {{ blog.created }} </span><br>
        </div>
      </div>
      <hr>
      </article>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Emit } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class Blog extends Vue {
  data() {
    return {
      isLoaded: false,
      error: '',
      blogs: [],
      id: false,
    }
  }

  mounted() {
    fetch('https://www.abhaisasidharan.xyz/api/node/blog?sort=-created')
      .then(res => res.json())
      .then(
        (result) => {
          this.isLoaded = true;
          this.blogs = this.blogStructure(result.data);
        },
        (error) => {
          this.isLoaded = true;
          this.error = error;
        }
      )
  }

  private blogStructure(items) {
    var blogs = [];
    items.forEach(function(blog) {
      var data = {
        id: blog.id,
        nid: blog.attributes.drupal_internal__nid,
        title: blog.attributes.title,
        body:  blog.attributes.body.processed,
        summary: blog.attributes.body.summary,
        alias: blog.attributes.path.alias,
        created: blog.attributes.created,
        changed: blog.attributes.changed,
        thumbnail: blog.relationships.field_thumbnail.links.related.href,
        alt: blog.relationships.field_thumbnail.data.meta.alt,
      };
      blogs.push(data);
    });
    console.log(blogs);
    return blogs;
  }

}
</script>

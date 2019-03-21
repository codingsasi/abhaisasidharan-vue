<template>
  <section style="min-height:50em" class="col-md-8">
    <div class="blog--timeline">
      <article v-for="(blog, index) in blogs" :key="index">
        <div class="blog-thumbnail--image row pt-5 pb-3 mt-2">
          <Relationship :link="blog.thumbnail" styles="width:100%; height: 60%" classes="rounded img-fluid" type="image" />
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

<script>
import Relationship from '@/components/Relationship.vue';

export default {
  name: 'blogs',
  components: {
    Relationship
  },

  data() {
    return {
      isLoaded: false,
      error: '',
      blogs: [],
      id: null,
    }
  },

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
  },

  methods: {
    blogStructure(items) {
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
      return blogs;
    }
  }
}
</script>

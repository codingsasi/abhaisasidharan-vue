<template>
  <section style="min-height:50em" class="col-md-8 mt-2">
    <div class="blog--full">
      <article v-for="(blog, index) in blogs" :key="index">
        <div class="blog-full--image row pt-5 pb-3">
          <Relationship :link="blog.thumbnail" styles="width:100%; height: 60%" classes="rounded img-fluid" type="image" />
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

<script>
import Relationship from '@/components/Relationship.vue';

export default {
  name: 'blog',
  components: {
    Relationship
  },

  data() {
    return {
      isLoaded: false,
      error: '',
      blogs: [],
      nid: null,
    }
  },

  mounted() {
    this.nid = this.$route.params.id;
    fetch('https://www.abhaisasidharan.xyz/api/node/blog/' + this.nid)
      .then(res => res.json())
      .then(
        (result) => {
          this.isLoaded = true;
          this.blogs = this.blogStructure([result.data]);
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

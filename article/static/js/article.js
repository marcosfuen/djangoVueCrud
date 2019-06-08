function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return "";
  }
  var csrftoken = readCookie('csrftoken');
  // Vue.prototype.$http = axios;
  new Vue({
    el: "#starting",
    delimiters: ['${','}'],
    data: {
      articles: [],
      loading: false,
      currentArticle: {},
      message: null,
      newArticle: {
        'article_heading': null,
        'article_body': null
      },
      search_term: '',
      /*
      page: 1,
      perPage: 5,
      pages: [],
      */
      NUM_RESULTS: 6, // Numero de resultados por página
      pag: 1, // Página inicial
      selecionado: '',
      
  },
  
  mounted: function() {
    this.getArticles();
  },

  methods: {
      getArticles: function() {
          let api_url = '/api/article/';
          if(this.search_term !== '' || this.search_term !== null){
            api_url = '/api/article/?search='+this.search_term;
          }
          this.loading = true;
          this.$http.get(api_url)
              .then((response) => {
                this.articles = response.data;
                this.loading = false;
              })
              .catch((err) => {
               this.loading = false;
               console.log(err);
              })
      },
      getArticle: function(id) {
          this.loading = true;
          this.$http.get('/api/article/'+id+'/')
              .then((response) => {
                this.currentArticle = response.data;
                $("#editArticleModal").modal('show');
                this.loading = false;
              })
              .catch((err) => {
                this.loading = false;
                console.log(err);
              })
      },
      addArticle: function() {
          this.loading = true;
          this.$http.post('/api/article/', this.newArticle, {headers: {"X-CSRFToken":csrftoken }})
              .then((response) => {
                this.loading = false;
                this.getArticles();
                this.resetArticleForm();              
              })
              .catch((err) => {
                this.loading = false;
                console.log(err);
              })
      },
      updateArticle: function() {
          this.loading = true;
          var ide = this.currentArticle.article_id;
          this.$http.put('/api/article/'+ide+'/', this.currentArticle, {headers: {"X-CSRFToken":csrftoken }})
              .then((response) => {
                this.loading = false;
                this.currentArticle = response.data;
                this.getArticles();
              })
              .catch((err) => {
                this.loading = false;
                console.log(err);
              })
      },
      deleteArticle: function(id) {
          this.loading = true;
          this.$http.delete('/api/article/'+id+'/', {headers: {"X-CSRFToken":csrftoken }})
              .then((response) => {
                this.loading = false;
                this.getArticles();
              })
              .catch((err) => {
                this.loading = false;
                console.log(err);
              })
      },
      resetArticleForm() {
        var self = this; //you need this because *this* will refer to Object.keys below`
        //Iterate through each object field, key is name of the object field`
        Object.keys(this.newArticle).forEach(function(key,index) {
          self.newArticle[key] = '';
        });
      },
      restArticles(){
        this.search_term = '';
        this.getArticles();
      } 
 }
});
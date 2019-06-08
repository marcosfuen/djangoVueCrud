from rest_framework import viewsets, filters
from .models import Article
from .serializers import ArticleSerializer
from .pagination import ArticlePagination


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('article_id', 'article_heading', 'article_body')
    # pagination_class = ArticlePagination
    ordering_fields = ('article_id',)

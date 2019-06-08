from rest_framework import pagination

class ArticlePagination(pagination.PageNumberPagination):
    """
    Override del page_size
    """
    page_size = 5
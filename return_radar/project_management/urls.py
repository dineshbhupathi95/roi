from django.urls import path
from .views import *

urlpatterns = [
    path('metrics/', ProjectMetricsView.as_view(), name='project-metrics'),
    # Project URLs
    path('projects/', ProjectListCreateView.as_view(), name='project-list-create'),
    path('projects/<int:pk>/', ProjectDetailView.as_view(), name='project-detail'),
    # ProjectModule URLs
    path('project-modules/', ProjectModuleListCreateView.as_view(), name='project-module-list-create'),
    path('project-modules/<int:pk>/', ProjectModuleDetailView.as_view(), name='project-module-detail'),

]

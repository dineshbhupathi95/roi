from rest_framework import generics
from .models import Project, ProjectModule
from .serializers import ProjectSerializer, ProjectModuleSerializer
from rest_framework.views import APIView
from django.http import JsonResponse
from django.db.models import Sum, F, Count

class ProjectMetricsView(APIView):
    def get(self, request):
        projects_count = Project.objects.count()
        active_projects = Project.objects.filter(is_active=True).count()
        delivered_projects = Project.objects.filter(status='Delivered').count()
        hold_projects = Project.objects.filter(status='Hold').count()

        # Calculate the total generated revenue
        total_generated_revenue = Project.objects.aggregate(
            total_generated_revenue=Sum('generated_revenue')
        )['total_generated_revenue'] or 0

        # Calculate the total investment
        total_investment = Project.objects.aggregate(
            total_investment=Sum('estimated_investment')
        )['total_investment'] or 0

        # Calculate the net revenue after subtracting the investment
        net_revenue = total_generated_revenue - total_investment
        # Group by project_sector and count
        sector_wise_count = Project.objects.values('project_sector').annotate(count=Count('id')).order_by(
            'project_sector')

        data = {
            'projects_count': projects_count,
            'active_projects': active_projects,
            'delivered_projects': delivered_projects,
            'hold_projects': hold_projects,
            'total_investment': total_investment,
            'generated_revenue': net_revenue,
            "sector_wise_count":list(sector_wise_count)
        }
        return JsonResponse(data)
# Project views
class ProjectListCreateView(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class ProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

# ProjectModule views
class ProjectModuleListCreateView(generics.ListCreateAPIView):
    queryset = ProjectModule.objects.all()
    serializer_class = ProjectModuleSerializer

class ProjectModuleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProjectModule.objects.all()
    serializer_class = ProjectModuleSerializer

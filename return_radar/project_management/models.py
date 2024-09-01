from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Project(models.Model):
    name = models.CharField(max_length=255)
    project_sector = models.CharField(max_length=255, null=True,blank=True)
    manager = models.ForeignKey(User, on_delete=models.CASCADE, related_name='managed_projects')
    estimated_investment = models.DecimalField(max_digits=10, decimal_places=2)
    estimated_end_date = models.DateField()
    reason_for_end_date = models.TextField(blank=True, null=True)
    old_end_dates = models.TextField(blank=True, null=True)  # This could be a JSON field to keep track of multiple dates
    team_name = models.CharField(max_length=255)
    team_size = models.IntegerField()
    team_members = models.ManyToManyField(User, related_name='project_teams')
    generated_revenue = models.IntegerField(null=True,blank=True)
    status = models.CharField(max_length=50,null=True,blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class ProjectModule(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='modules')
    module_name = models.CharField(max_length=255)
    team_lead = models.ForeignKey(User, on_delete=models.CASCADE, related_name='led_modules')
    team_size = models.IntegerField()
    team_members = models.ManyToManyField(User, related_name='module_teams')

    def __str__(self):
        return f'{self.module_name} ({self.project.name})'

from rest_framework import serializers
from .models import Project, ProjectModule
from django.contrib.auth import get_user_model

User = get_user_model()

class ProjectSerializer(serializers.ModelSerializer):
    team_members = serializers.PrimaryKeyRelatedField(many=True, queryset=User.objects.all())
    manager_name = serializers.CharField(source='manager.username', read_only=True)

    class Meta:
        model = Project
        fields = '__all__'
        extra_fields = ['manager_name']

    def to_representation(self, instance):
        """ Override to include extra fields """
        ret = super().to_representation(instance)
        extra = {'manager_name': instance.manager.first_name}
        ret.update(extra)
        return ret
class ProjectModuleSerializer(serializers.ModelSerializer):
    team_members = serializers.PrimaryKeyRelatedField(many=True, queryset=User.objects.all())

    class Meta:
        model = ProjectModule
        fields = '__all__'

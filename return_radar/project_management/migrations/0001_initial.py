# Generated by Django 5.0.6 on 2024-07-02 11:22

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('estimated_investment', models.DecimalField(decimal_places=2, max_digits=10)),
                ('estimated_end_date', models.DateField()),
                ('reason_for_end_date', models.TextField(blank=True, null=True)),
                ('old_end_dates', models.TextField(blank=True, null=True)),
                ('team_name', models.CharField(max_length=255)),
                ('team_size', models.IntegerField()),
                ('manager', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='managed_projects', to=settings.AUTH_USER_MODEL)),
                ('team_members', models.ManyToManyField(related_name='project_teams', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ProjectModule',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('module_name', models.CharField(max_length=255)),
                ('team_size', models.IntegerField()),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='modules', to='project_management.project')),
                ('team_lead', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='led_modules', to=settings.AUTH_USER_MODEL)),
                ('team_members', models.ManyToManyField(related_name='module_teams', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]

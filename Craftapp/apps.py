from django.apps import AppConfig


class CraftappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Craftapp'

    def ready(self):
        import Craftapp.signals 
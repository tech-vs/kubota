# from rest_framework.permissions import BasePermission

# from account.models import Role


# class IsUser(BasePermission):
#     message = 'Allow only USER'

#     def has_permission(self, request, view):
#         if bool(request.user and request.user.is_authenticated):
#             if request.user.role in [Role.USER, Role.ADMIN]:
#                 return True
#         return False 


# class IsAdmin(BasePermission):
#     message = 'Allow only ADMIN'

#     def has_permission(self, request, view):
#         if bool(request.user and request.user.is_authenticated):
#             if request.user.role in [Role.ADMIN]:
#                 return True
#         return False
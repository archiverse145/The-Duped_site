# Django URL routing
from django.urls import path

# Import views from current app
from . import views

# JWT authentication views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [

    # =========================
    # Authentication APIs
    # =========================

    # Register new user
   path(
    'register/',
    views.register_view,
    name='register'
),

    # Login user and get access + refresh token
    path(
        'token/',
        TokenObtainPairView.as_view(),
        name='token_obtain_pair'
    ),

    # Refresh access token
    path(
        'token/refresh/',
        TokenRefreshView.as_view(),
        name='token_refresh'
    ),

    # =========================
    # Product APIs
    # =========================

    # Get all products
    path(
        "products/",
        views.get_products
    ),

    # Get single product details
    path(
        "products/<int:pk>/",
        views.get_product
    ),

    # =========================
    # Category APIs
    # =========================

    # Get all categories
    path(
        "categories/",
        views.get_categories
    ),

    # =========================
    # Cart APIs
    # =========================

    # Get cart
    path(
        "cart/",
        views.get_cart
    ),

    # Add item to cart
    path(
        "cart/add/",
        views.add_to_cart
    ),

    # Remove item from cart
    path(
        "cart/remove/",
        views.remove_from_cart
    ),

    # Update cart quantity
    path(
        "cart/update/",
        views.update_cart_quantity
    ),

    # =========================
    # Order APIs
    # =========================

    # Create order
    path(
        "orders/create/",
        views.create_order
    ),
]
package com.decisionhub.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

/**
 * CategoryController — REST endpoints for category management.
 * 
 * TODO: Implement the following endpoints:
 * - GET    /api/categories                — Get all categories
 * - GET    /api/categories/{id}           — Get category by ID
 * - POST   /api/categories               — Create a category (admin only)
 * - PUT    /api/categories/{id}           — Update a category (admin only)
 * - DELETE /api/categories/{id}           — Delete a category (admin only)
 */
@RestController
@RequestMapping("/api/categories")
@Tag(name = "Categories", description = "Endpoints for category management")
public class CategoryController {

    // TODO: Inject CategoryService and implement endpoints
}

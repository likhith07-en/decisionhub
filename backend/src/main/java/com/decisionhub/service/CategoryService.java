package com.decisionhub.service;

import com.decisionhub.repository.CategoryRepository;
import org.springframework.stereotype.Service;

/**
 * CategoryService — handles category lookup operations.
 * 
 * TODO: Implement the following features:
 * - Get all categories
 * - Get category by ID
 * - Create a category (admin only)
 * - Update a category (admin only)
 * - Delete a category (admin only)
 * - Seed default categories (Career, Education, Technology, Travel, Finance, Lifestyle)
 */
@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // TODO: Implement category CRUD operations
}

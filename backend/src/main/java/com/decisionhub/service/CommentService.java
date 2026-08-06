package com.decisionhub.service;

import com.decisionhub.repository.CommentRepository;
import org.springframework.stereotype.Service;

/**
 * CommentService — handles threaded comment operations on decisions.
 * 
 * TODO: Implement the following features:
 * - Create a comment on a decision
 * - Create a reply to an existing comment (threaded)
 * - Get all comments for a decision (top-level only)
 * - Get all replies for a comment
 * - Flag a comment for moderation
 * - Delete a comment (by author or moderator)
 */
@Service
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    // TODO: Implement comment CRUD operations
}

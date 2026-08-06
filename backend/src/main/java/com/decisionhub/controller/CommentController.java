package com.decisionhub.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

/**
 * CommentController — REST endpoints for threaded comments on decisions.
 * 
 * TODO: Implement the following endpoints:
 * - POST   /api/comments                  — Create a comment on a decision
 * - POST   /api/comments/{id}/reply       — Reply to a comment (threaded)
 * - GET    /api/comments/decision/{id}     — Get all comments for a decision
 * - GET    /api/comments/{id}/replies      — Get replies for a comment
 * - PUT    /api/comments/{id}/flag         — Flag a comment for moderation
 * - DELETE /api/comments/{id}              — Delete a comment
 */
@RestController
@RequestMapping("/api/comments")
@Tag(name = "Comments", description = "Endpoints for threaded comments on decisions")
public class CommentController {

    // TODO: Inject CommentService and implement endpoints
}

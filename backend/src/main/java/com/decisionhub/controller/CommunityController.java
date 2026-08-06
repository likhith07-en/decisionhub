package com.decisionhub.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

/**
 * CommunityController — REST endpoints for community management.
 * 
 * TODO: Implement the following endpoints:
 * - POST   /api/communities               — Create a community
 * - GET    /api/communities               — Get all communities
 * - GET    /api/communities/{id}          — Get community by ID
 * - PUT    /api/communities/{id}          — Update community details
 * - DELETE /api/communities/{id}          — Delete a community
 * - POST   /api/communities/{id}/join     — Join a community
 * - POST   /api/communities/{id}/leave    — Leave a community
 * - GET    /api/communities/{id}/members  — Get community members
 */
@RestController
@RequestMapping("/api/communities")
@Tag(name = "Communities", description = "Endpoints for community creation and membership")
public class CommunityController {

    // TODO: Inject CommunityService and implement endpoints
}

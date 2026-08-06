package com.decisionhub.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

/**
 * ModerationController — REST endpoints for content moderation.
 * 
 * TODO: Implement the following endpoints:
 * - POST   /api/moderation/flag           — Flag a comment or decision
 * - GET    /api/moderation/flags          — Get all pending flags (moderator/admin)
 * - GET    /api/moderation/flags/{id}     — Get flag details
 * - PUT    /api/moderation/flags/{id}/resolve — Resolve a flag
 * - GET    /api/moderation/flags/target/{type}/{id} — Get flags for a target
 */
@RestController
@RequestMapping("/api/moderation")
@Tag(name = "Moderation", description = "Endpoints for content moderation and flagging")
public class ModerationController {

    // TODO: Inject ModerationService and implement endpoints
}

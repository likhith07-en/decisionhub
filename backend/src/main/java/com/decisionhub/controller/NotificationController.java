package com.decisionhub.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

/**
 * NotificationController — REST endpoints for user notifications.
 * 
 * TODO: Implement the following endpoints:
 * - GET    /api/notifications             — Get all notifications for current user
 * - GET    /api/notifications/unread      — Get unread notifications
 * - GET    /api/notifications/count       — Get unread notification count
 * - PUT    /api/notifications/{id}/read   — Mark a notification as read
 * - PUT    /api/notifications/read-all    — Mark all notifications as read
 * - DELETE /api/notifications/{id}        — Delete a notification
 */
@RestController
@RequestMapping("/api/notifications")
@Tag(name = "Notifications", description = "Endpoints for user notification management")
public class NotificationController {

    // TODO: Inject NotificationService and implement endpoints
}

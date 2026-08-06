package com.decisionhub.service;

import com.decisionhub.repository.NotificationRepository;
import org.springframework.stereotype.Service;

/**
 * NotificationService — handles user notification management.
 * 
 * TODO: Implement the following features:
 * - Create a notification (triggered by events: new comment, new vote, etc.)
 * - Get all notifications for a user (ordered by creation date)
 * - Get unread notifications for a user
 * - Mark a notification as read
 * - Mark all notifications as read for a user
 * - Get unread notification count
 * - Delete a notification
 */
@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    // TODO: Implement notification CRUD operations
}

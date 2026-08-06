package com.decisionhub.repository;

import com.decisionhub.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

// TODO: Add custom query methods for notification management (mark as read, unread count, etc.)
@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserIdOrderByCreatedAtDesc(Long userId);
    List<Notification> findByUserIdAndIsReadFalse(Long userId);
    long countByUserIdAndIsReadFalse(Long userId);
}

package com.decisionhub.repository;

import com.decisionhub.entity.ModerationFlag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

// TODO: Add custom query methods for moderation workflow (by status, by target, etc.)
@Repository
public interface ModerationFlagRepository extends JpaRepository<ModerationFlag, Long> {
    List<ModerationFlag> findByStatus(String status);
    List<ModerationFlag> findByTargetTypeAndTargetId(String targetType, Long targetId);
    List<ModerationFlag> findByReportedById(Long reportedById);
}

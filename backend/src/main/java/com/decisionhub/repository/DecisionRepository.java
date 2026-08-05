package com.decisionhub.repository;

import com.decisionhub.entity.Decision;
import com.decisionhub.entity.DecisionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DecisionRepository extends JpaRepository<Decision, Long> {
    List<Decision> findByCreatedById(Long userId);
    List<Decision> findByStatus(DecisionStatus status);
}

package com.decisionhub.repository;

import com.decisionhub.entity.Decision;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DecisionRepository extends JpaRepository<Decision, Long> {
    List<Decision> findByOwnerId(Long ownerId);
    List<Decision> findByVisibility(String visibility);
    List<Decision> findByIsDeletedFalse();
    List<Decision> findByOwnerIdAndIsDeletedFalse(Long ownerId);
}

package com.decisionhub.repository;

import com.decisionhub.entity.ComparisonFactor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

// TODO: Add custom query methods for comparison factor management
@Repository
public interface ComparisonFactorRepository extends JpaRepository<ComparisonFactor, Long> {
    List<ComparisonFactor> findByDecisionId(Long decisionId);
}

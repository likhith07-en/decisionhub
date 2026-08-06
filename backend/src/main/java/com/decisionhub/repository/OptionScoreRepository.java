package com.decisionhub.repository;

import com.decisionhub.entity.OptionScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

// TODO: Add custom query methods for option score analytics
@Repository
public interface OptionScoreRepository extends JpaRepository<OptionScore, Long> {
    List<OptionScore> findByOptionId(Long optionId);
    List<OptionScore> findByFactorId(Long factorId);
}

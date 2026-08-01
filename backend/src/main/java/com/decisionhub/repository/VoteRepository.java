package com.decisionhub.repository;

import com.decisionhub.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {
    boolean existsByUserIdAndDecisionId(Long userId, Long decisionId);
    Optional<Vote> findByUserIdAndDecisionId(Long userId, Long decisionId);
    List<Vote> findByDecisionId(Long decisionId);
    long countByDecisionId(Long decisionId);
}

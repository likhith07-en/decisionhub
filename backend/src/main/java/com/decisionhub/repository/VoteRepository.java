package com.decisionhub.repository;

import com.decisionhub.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {
    boolean existsByPollIdAndVoterId(Long pollId, Long voterId);
    Optional<Vote> findByPollIdAndVoterId(Long pollId, Long voterId);
    List<Vote> findByPollId(Long pollId);
    long countByPollId(Long pollId);
}

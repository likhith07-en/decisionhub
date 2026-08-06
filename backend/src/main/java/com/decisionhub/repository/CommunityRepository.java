package com.decisionhub.repository;

import com.decisionhub.entity.Community;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

// TODO: Add custom query methods for community search, filtering by category, etc.
@Repository
public interface CommunityRepository extends JpaRepository<Community, Long> {
    Optional<Community> findByName(String name);
    boolean existsByName(String name);
}

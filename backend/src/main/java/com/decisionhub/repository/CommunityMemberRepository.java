package com.decisionhub.repository;

import com.decisionhub.entity.CommunityMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

// TODO: Add custom query methods for membership management
@Repository
public interface CommunityMemberRepository extends JpaRepository<CommunityMember, Long> {
    List<CommunityMember> findByCommunityId(Long communityId);
    List<CommunityMember> findByUserId(Long userId);
    boolean existsByCommunityIdAndUserId(Long communityId, Long userId);
}

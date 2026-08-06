package com.decisionhub.repository;

import com.decisionhub.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

// TODO: Add custom query methods for threaded comment retrieval, flagged comments, etc.
@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByDecisionId(Long decisionId);
    List<Comment> findByDecisionIdAndParentIsNull(Long decisionId);
    List<Comment> findByAuthorId(Long authorId);
}

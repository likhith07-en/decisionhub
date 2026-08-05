package com.decisionhub.dto;

import com.decisionhub.entity.DecisionStatus;
import java.time.LocalDateTime;

public class DecisionResponse {

    private Long id;
    private String title;
    private String description;
    private DecisionStatus status;
    private LocalDateTime createdAt;
    private UserResponse createdBy;
    private PollResponse poll;

    public DecisionResponse() {
    }

    public DecisionResponse(Long id, String title, String description, DecisionStatus status, LocalDateTime createdAt, UserResponse createdBy, PollResponse poll) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.createdAt = createdAt;
        this.createdBy = createdBy;
        this.poll = poll;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public DecisionStatus getStatus() {
        return status;
    }

    public void setStatus(DecisionStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public UserResponse getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(UserResponse createdBy) {
        this.createdBy = createdBy;
    }

    public PollResponse getPoll() {
        return poll;
    }

    public void setPoll(PollResponse poll) {
        this.poll = poll;
    }
}

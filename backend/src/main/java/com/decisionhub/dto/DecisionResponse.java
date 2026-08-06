package com.decisionhub.dto;

import java.time.LocalDateTime;
import java.util.List;

public class DecisionResponse {

    private Long id;
    private String title;
    private String description;
    private String visibility;
    private Boolean isDeleted;
    private LocalDateTime createdAt;
    private UserResponse owner;
    private Long categoryId;
    private String categoryName;
    private List<PollResponse> polls;

    public DecisionResponse() {
    }

    public DecisionResponse(Long id, String title, String description, String visibility, Boolean isDeleted,
                            LocalDateTime createdAt, UserResponse owner, Long categoryId, String categoryName,
                            List<PollResponse> polls) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.visibility = visibility;
        this.isDeleted = isDeleted;
        this.createdAt = createdAt;
        this.owner = owner;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.polls = polls;
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

    public String getVisibility() {
        return visibility;
    }

    public void setVisibility(String visibility) {
        this.visibility = visibility;
    }

    public Boolean getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(Boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public UserResponse getOwner() {
        return owner;
    }

    public void setOwner(UserResponse owner) {
        this.owner = owner;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public List<PollResponse> getPolls() {
        return polls;
    }

    public void setPolls(List<PollResponse> polls) {
        this.polls = polls;
    }
}

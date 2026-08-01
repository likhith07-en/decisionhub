package com.decisionhub.dto;

import java.time.LocalDateTime;

public class VoteResponse {

    private Long id;
    private Long userId;
    private Long decisionId;
    private Long optionId;
    private String optionText;
    private LocalDateTime createdAt;

    public VoteResponse() {
    }

    public VoteResponse(Long id, Long userId, Long decisionId, Long optionId, String optionText, LocalDateTime createdAt) {
        this.id = id;
        this.userId = userId;
        this.decisionId = decisionId;
        this.optionId = optionId;
        this.optionText = optionText;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getDecisionId() {
        return decisionId;
    }

    public void setDecisionId(Long decisionId) {
        this.decisionId = decisionId;
    }

    public Long getOptionId() {
        return optionId;
    }

    public void setOptionId(Long optionId) {
        this.optionId = optionId;
    }

    public String getOptionText() {
        return optionText;
    }

    public void setOptionText(String optionText) {
        this.optionText = optionText;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}

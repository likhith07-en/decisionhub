package com.decisionhub.dto;

import jakarta.validation.constraints.NotNull;

public class VoteRequest {

    @NotNull(message = "Decision ID is required")
    private Long decisionId;

    @NotNull(message = "Option ID is required")
    private Long optionId;

    public VoteRequest() {
    }

    public VoteRequest(Long decisionId, Long optionId) {
        this.decisionId = decisionId;
        this.optionId = optionId;
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
}

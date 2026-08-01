package com.decisionhub.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public class PollRequest {

    @NotNull(message = "Decision ID is required")
    private Long decisionId;

    @NotBlank(message = "Question is required")
    private String question;

    @NotEmpty(message = "At least two options are required")
    private List<String> options;

    public PollRequest() {
    }

    public PollRequest(Long decisionId, String question, List<String> options) {
        this.decisionId = decisionId;
        this.question = question;
        this.options = options;
    }

    public Long getDecisionId() {
        return decisionId;
    }

    public void setDecisionId(Long decisionId) {
        this.decisionId = decisionId;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public List<String> getOptions() {
        return options;
    }

    public void setOptions(List<String> options) {
        this.options = options;
    }
}

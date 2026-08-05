package com.decisionhub.dto;

import com.decisionhub.entity.DecisionStatus;
import jakarta.validation.constraints.NotBlank;
import java.util.List;

public class DecisionRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    private DecisionStatus status = DecisionStatus.OPEN;

    private String pollQuestion;

    private List<String> pollOptions;

    public DecisionRequest() {
    }

    public DecisionRequest(String title, String description, DecisionStatus status, String pollQuestion, List<String> pollOptions) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.pollQuestion = pollQuestion;
        this.pollOptions = pollOptions;
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

    public String getPollQuestion() {
        return pollQuestion;
    }

    public void setPollQuestion(String pollQuestion) {
        this.pollQuestion = pollQuestion;
    }

    public List<String> getPollOptions() {
        return pollOptions;
    }

    public void setPollOptions(List<String> pollOptions) {
        this.pollOptions = pollOptions;
    }
}

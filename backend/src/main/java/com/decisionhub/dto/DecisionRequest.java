package com.decisionhub.dto;

import jakarta.validation.constraints.NotBlank;
import java.util.List;

public class DecisionRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    private String visibility = "PUBLIC";

    private Long categoryId;

    // Embedded poll creation fields (optional)
    private String pollType;
    private Boolean isAnonymous;
    private List<String> optionLabels;

    public DecisionRequest() {
    }

    public DecisionRequest(String title, String description, String visibility, Long categoryId,
                           String pollType, Boolean isAnonymous, List<String> optionLabels) {
        this.title = title;
        this.description = description;
        this.visibility = visibility;
        this.categoryId = categoryId;
        this.pollType = pollType;
        this.isAnonymous = isAnonymous;
        this.optionLabels = optionLabels;
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

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getPollType() {
        return pollType;
    }

    public void setPollType(String pollType) {
        this.pollType = pollType;
    }

    public Boolean getIsAnonymous() {
        return isAnonymous;
    }

    public void setIsAnonymous(Boolean isAnonymous) {
        this.isAnonymous = isAnonymous;
    }

    public List<String> getOptionLabels() {
        return optionLabels;
    }

    public void setOptionLabels(List<String> optionLabels) {
        this.optionLabels = optionLabels;
    }
}

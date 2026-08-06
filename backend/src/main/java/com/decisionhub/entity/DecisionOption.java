package com.decisionhub.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "decision_options")
public class DecisionOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "decision_id", nullable = false)
    private Decision decision;

    @Column(nullable = false, length = 150)
    private String label;

    @Column(columnDefinition = "TEXT")
    private String description;

    public DecisionOption() {
    }

    public DecisionOption(Long id, String label, String description) {
        this.id = id;
        this.label = label;
        this.description = description;
    }

    // --- Getters and Setters ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Decision getDecision() {
        return decision;
    }

    public void setDecision(Decision decision) {
        this.decision = decision;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}

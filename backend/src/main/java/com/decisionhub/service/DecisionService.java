package com.decisionhub.service;

import com.decisionhub.entity.Decision;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DecisionService {
    public List<Decision> getSampleDecisions() {
        Decision decision = new Decision();
        decision.setId(1L);
        decision.setTitle("Choose a release platform");
        decision.setStatus("active");

        Decision draft = new Decision();
        draft.setId(2L);
        draft.setTitle("Pick a design system");
        draft.setStatus("draft");

        return List.of(decision, draft);
    }
}

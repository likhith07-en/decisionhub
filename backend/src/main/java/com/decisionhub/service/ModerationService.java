package com.decisionhub.service;

import com.decisionhub.repository.ModerationFlagRepository;
import org.springframework.stereotype.Service;

/**
 * ModerationService — handles content moderation and flagging.
 * 
 * TODO: Implement the following features:
 * - Flag a comment or decision for moderation
 * - Get all pending moderation flags
 * - Get flags by target type (COMMENT / DECISION)
 * - Resolve a moderation flag (PENDING -> RESOLVED)
 * - Get flags reported by a specific user
 * - Auto-flag content based on rules (optional)
 */
@Service
public class ModerationService {

    private final ModerationFlagRepository moderationFlagRepository;

    public ModerationService(ModerationFlagRepository moderationFlagRepository) {
        this.moderationFlagRepository = moderationFlagRepository;
    }

    // TODO: Implement moderation flag CRUD operations
}

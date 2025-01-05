package com.collaborative.taskmanager.backend.DTO;

import java.util.List;

public record CreateTeamDTO(
        String name,
        List<Long> memberIds
) {}

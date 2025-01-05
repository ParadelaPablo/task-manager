package com.collaborative.taskmanager.backend.DTO;

import java.time.LocalDate;

public record ProjectDTO(
        Long id,
        String name,
        Long teamId,
        String teamName,
        String description,
        LocalDate deadline
) {}

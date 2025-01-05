package com.collaborative.taskmanager.backend.DTO;

import java.util.List;

public record TeamDTO(Long id, String name, List<MemberDTO> members, int memberCount) {
}

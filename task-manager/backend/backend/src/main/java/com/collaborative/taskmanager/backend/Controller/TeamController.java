package com.collaborative.taskmanager.backend.Controller;

import com.collaborative.taskmanager.backend.DTO.CreateTeamDTO;
import com.collaborative.taskmanager.backend.DTO.MemberDTO;
import com.collaborative.taskmanager.backend.DTO.TeamDTO;
import com.collaborative.taskmanager.backend.EmployeeEntity;
import com.collaborative.taskmanager.backend.Repository.EmployeeRepository;
import com.collaborative.taskmanager.backend.Repository.TeamRepository;
import com.collaborative.taskmanager.backend.TeamEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;



@RestController
@RequestMapping("/api/teams")
public class TeamController {

    private final TeamRepository teamRepository;
    private final EmployeeRepository employeeRepository;

    public TeamController(TeamRepository teamRepository, EmployeeRepository employeeRepository) {
        this.teamRepository = teamRepository;
        this.employeeRepository = employeeRepository;
    }

    @PostMapping
    public TeamDTO createTeam(@RequestBody CreateTeamDTO createTeamDTO) {
        List<EmployeeEntity> members = employeeRepository.findAllById(createTeamDTO.memberIds());

        TeamEntity team = new TeamEntity();
        team.setName(createTeamDTO.name());
        team.setMembers(members);

        TeamEntity savedTeam = teamRepository.save(team);

        return convertToDTO(savedTeam);
    }


    @GetMapping
    public List<TeamDTO> getAllTeams() {
        return teamRepository.findAll().stream()
                .map(this::convertToDTO)
                .toList();
    }


    private TeamDTO convertToDTO(TeamEntity teamEntity) {
        List<MemberDTO> members = teamEntity.getMembers().stream()
                .map(member -> new MemberDTO(member.getId(), member.getName())) // Convertimos EmployeeEntity a MemberDTO
                .toList();

        return new TeamDTO(
                teamEntity.getId(),
                teamEntity.getName(),
                members,
                members.size()
        );
    }

    @DeleteMapping("/{teamId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTeam(@PathVariable Long teamId) {
        if (!teamRepository.existsById(teamId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Team with ID " + teamId + " not found");
        }
        teamRepository.deleteById(teamId);
    }

    @GetMapping("/count")
    public ResponseEntity<?> getTeamCount() {
        long count = teamRepository.count();
        return ResponseEntity.ok().body(Collections.singletonMap("teamCount", count));
    }


}

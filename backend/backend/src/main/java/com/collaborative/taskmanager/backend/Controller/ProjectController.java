package com.collaborative.taskmanager.backend.Controller;

import com.collaborative.taskmanager.backend.DTO.ProjectDTO;
import com.collaborative.taskmanager.backend.ProjectEntity;
import com.collaborative.taskmanager.backend.Repository.ProjectRepository;
import com.collaborative.taskmanager.backend.Repository.TeamRepository;
import com.collaborative.taskmanager.backend.TeamEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectRepository projectRepository;
    private final TeamRepository teamRepository;

    public ProjectController(ProjectRepository projectRepository, TeamRepository teamRepository) {
        this.projectRepository = projectRepository;
        this.teamRepository = teamRepository;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProjectDTO createProject(@RequestBody ProjectDTO projectDTO) {
        TeamEntity team = teamRepository.findById(projectDTO.teamId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Team not found"));

        ProjectEntity project = new ProjectEntity();
        project.setName(projectDTO.name());
        project.setAssignedTeam(team);
        project.setDescription(projectDTO.description());
        project.setDeadline(projectDTO.deadline());

        ProjectEntity savedProject = projectRepository.save(project);

        return convertToDTO(savedProject);
    }

    @GetMapping
    public List<ProjectDTO> getAllProjects() {
        return projectRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/upcoming")
    public List<ProjectDTO> getUpcomingProjects() {
        LocalDate now = LocalDate.now();
        LocalDate nextWeek = now.plusDays(7);

        return projectRepository.findByDeadlineBetween(now, nextWeek).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private ProjectDTO convertToDTO(ProjectEntity projectEntity) {
        return new ProjectDTO(
                projectEntity.getId(),
                projectEntity.getName(),
                projectEntity.getAssignedTeam().getId(),
                projectEntity.getAssignedTeam().getName(),
                projectEntity.getDescription(),
                projectEntity.getDeadline()
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        if (!projectRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found");
        }
        projectRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}

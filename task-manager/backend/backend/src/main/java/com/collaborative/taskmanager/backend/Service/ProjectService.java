package com.collaborative.taskmanager.backend.Service;

import com.collaborative.taskmanager.backend.Model.ProjectModel;
import com.collaborative.taskmanager.backend.ProjectEntity;
import com.collaborative.taskmanager.backend.Repository.ProjectRepository;
import com.collaborative.taskmanager.backend.Repository.TeamRepository;
import com.collaborative.taskmanager.backend.TeamEntity;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final TeamRepository teamRepository;

    public ProjectService(ProjectRepository projectRepository, TeamRepository teamRepository) {
        this.projectRepository = projectRepository;
        this.teamRepository = teamRepository;
    }

    public ProjectModel createProject(ProjectModel projectModel) {
        ProjectEntity entity = new ProjectEntity();
        entity.setName(projectModel.getName());
        entity.setDescription(projectModel.getDescription());
        TeamEntity team = teamRepository.findById(projectModel.getAssignedTeamId())
                .orElseThrow(() -> new RuntimeException("Team not found"));
        entity.setAssignedTeam(team);
        projectRepository.save(entity);

        return mapToModel(entity);
    }

    private ProjectModel mapToModel(ProjectEntity entity) {
        return new ProjectModel(
                entity.getId(),
                entity.getName(),
                entity.getDescription(),
                entity.getAssignedTeam() != null ? entity.getAssignedTeam().getId() : null
        );
    }
}

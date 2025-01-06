package com.collaborative.taskmanager.backend.Model;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectModel {

    private Long id;
    private String name;
    private String description;
    private Long assignedTeamId;

    public ProjectModel() {}

    public ProjectModel(Long id, String name, String description, Long assignedTeamId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.assignedTeamId = assignedTeamId;
    }

}

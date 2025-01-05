package com.collaborative.taskmanager.backend;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
@Entity
public class ProjectEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "deadline")
    private LocalDate deadline;

    private String name;

    @ManyToOne(optional = false, fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "team_id", nullable = false)
    private TeamEntity assignedTeam;

    private String description;

    public ProjectEntity() {}
}

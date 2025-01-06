package com.collaborative.taskmanager.backend.Repository;

import com.collaborative.taskmanager.backend.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<ProjectEntity, Long> {
    List<ProjectEntity> findByDeadlineBetween(LocalDate start, LocalDate end);
}

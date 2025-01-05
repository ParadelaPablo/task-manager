package com.collaborative.taskmanager.backend.Repository;

import com.collaborative.taskmanager.backend.EmployeeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<EmployeeEntity, Long> {
}

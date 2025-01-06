package com.collaborative.taskmanager.backend.Controller;

import com.collaborative.taskmanager.backend.DTO.EmployeeDTO;
import com.collaborative.taskmanager.backend.EmployeeEntity;
import com.collaborative.taskmanager.backend.Repository.EmployeeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeRepository employeeRepository;

    public EmployeeController(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @GetMapping
    public List<EmployeeDTO> getAllEmployees() {
        return employeeRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private EmployeeDTO convertToDTO(EmployeeEntity employeeEntity) {
        return new EmployeeDTO(
                employeeEntity.getId(),
                employeeEntity.getName(),
                employeeEntity.getEmail()
        );
    }

    @GetMapping("/count")
    public ResponseEntity<?> getEmployeeCount() {
        long count = employeeRepository.count();
        return ResponseEntity.ok().body(Collections.singletonMap("employeeCount", count));
    }
}

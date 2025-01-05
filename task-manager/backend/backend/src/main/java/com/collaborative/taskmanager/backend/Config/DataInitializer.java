package com.collaborative.taskmanager.backend.Config;

import com.collaborative.taskmanager.backend.EmployeeEntity;
import com.collaborative.taskmanager.backend.Repository.EmployeeRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer {

    private final EmployeeRepository employeeRepository;

    public DataInitializer(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @PostConstruct
    public void init() {
        System.out.println("Se está inicializando?????");

        if (employeeRepository.count() == 0) {
            System.out.println("Creating default employees...");

            EmployeeEntity emp1 = new EmployeeEntity();
            emp1.setName("Pablo Paradela");
            emp1.setEmail("pablo@example.com");

            EmployeeEntity emp2 = new EmployeeEntity();
            emp2.setName("Habib Hezarehee");
            emp2.setEmail("habib@example.com");

            EmployeeEntity emp3 = new EmployeeEntity();
            emp3.setName("Sebastian Osterberg");
            emp3.setEmail("sebastian@example.com");

            EmployeeEntity emp4 = new EmployeeEntity();
            emp4.setName("Svetlana Soboleva");
            emp4.setEmail("svetlana@example.com");

            EmployeeEntity emp5 = new EmployeeEntity();
            emp5.setName("Sabine Hernandes");
            emp5.setEmail("sabine@example.com");

            EmployeeEntity emp6 = new EmployeeEntity();
            emp6.setName("Erik Olin");
            emp6.setEmail("erik@example.com");

            EmployeeEntity emp7 = new EmployeeEntity();
            emp7.setName("Andreas Lundmark");
            emp7.setEmail("andreas@example.com");

            EmployeeEntity emp8 = new EmployeeEntity();
            emp8.setName("John Eliasson");
            emp8.setEmail("john@example.com");

            EmployeeEntity emp9 = new EmployeeEntity();
            emp9.setName("Alexander Gabor");
            emp9.setEmail("alexander@example.com");

            EmployeeEntity emp10 = new EmployeeEntity();
            emp10.setName("Tobias Johansson");
            emp10.setEmail("tobias@example.com");

            EmployeeEntity emp11 = new EmployeeEntity();
            emp11.setName("Lawe Zangena");
            emp11.setEmail("lawe@example.com");

            EmployeeEntity emp12 = new EmployeeEntity();
            emp12.setName("Katheryn Rojas");
            emp12.setEmail("katheryn@example.com");

            employeeRepository.saveAll(List.of(emp1, emp2, emp3, emp4, emp5, emp6, emp7, emp8, emp9, emp10, emp11, emp12));
        } else {
            System.out.println("Employees already initialized.");
        }

        System.out.println("Database initialization completed.");
    }
}

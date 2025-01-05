package com.collaborative.taskmanager.backend.Model;


import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
public class EmployeeModel {

    private final Long id;
    private String name;
    private String email;

    public EmployeeModel(Long id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }


}

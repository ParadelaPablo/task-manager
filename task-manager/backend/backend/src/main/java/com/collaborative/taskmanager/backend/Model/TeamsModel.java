package com.collaborative.taskmanager.backend.Model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;



@Setter
@Getter
public class TeamsModel {

    private Long id;
    private String name;
    private List<EmployeeModel> members;

    public TeamsModel(Long id, String name, List<EmployeeModel> members) {
        this.id = id;
        this.name = name;
        this.members = members;
    }



}

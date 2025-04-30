package com.enzigma.demo.service;

import java.util.List;
import java.util.Optional;

import com.enzigma.demo.Entity.TaskEntity;

public interface TaskService {

    List<TaskEntity> getAllTask();

    TaskEntity addTask(TaskEntity task);

    void deleteTask(Long id);

    Optional<TaskEntity> findTaskById(Long id);  // fixed method name

    TaskEntity updateTask(Long id, TaskEntity updatedTask);
}

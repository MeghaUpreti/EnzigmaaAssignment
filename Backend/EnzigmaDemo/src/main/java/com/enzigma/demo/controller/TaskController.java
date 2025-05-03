package com.enzigma.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.enzigma.demo.Entity.TaskEntity;
import com.enzigma.demo.service.TaskService;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    @Autowired
    private TaskService taskService;

    // Get task by ID
    @GetMapping("/{id}")
    public ResponseEntity<TaskEntity> getTaskById(@PathVariable Long id) {
        Optional<TaskEntity> task = taskService.findTaskById(id);
        return task.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get all tasks
    @GetMapping
    public List<TaskEntity> getAllTasks() {
        return taskService.getAllTask();
    }

    @PostMapping
    public TaskEntity addTask(@RequestBody TaskEntity task) {
       
        if (task.getCompleted() == null) {
            task.setCompleted(false);  
        }
        return taskService.addTask(task);
    }

    // Update task
    @PutMapping("/{id}")
    public ResponseEntity<TaskEntity> updateTaskById(@PathVariable Long id, @RequestBody TaskEntity updatedTask) {
        try {
            TaskEntity task = taskService.updateTask(id, updatedTask);
            return ResponseEntity.ok(task);
        } catch (RuntimeException exc) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete task
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        try {
            taskService.deleteTask(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException exc) {
            return ResponseEntity.notFound().build();
        }
    }
}

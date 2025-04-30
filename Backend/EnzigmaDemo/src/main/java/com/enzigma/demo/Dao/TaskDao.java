package com.enzigma.demo.Dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.enzigma.demo.Entity.TaskEntity;

public interface TaskDao extends JpaRepository<TaskEntity, Long>{

}

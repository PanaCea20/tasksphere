package com.example.tasksphere;

import org.springframework.boot.SpringApplication;

public class TestTasksphereApplication {

	public static void main(String[] args) {
		SpringApplication.from(TaskSphereApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}

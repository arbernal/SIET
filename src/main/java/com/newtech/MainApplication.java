package com.newtech;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import com.newtech.template.ReportTemplate;

@Configuration
@ComponentScan
@EnableAutoConfiguration
@SpringBootApplication
public class MainApplication implements CommandLineRunner {
	
	@Autowired 
	private ReportTemplate template;

	public static void main(String[] args)  {
		SpringApplication.run(MainApplication.class, args);
	}

	
	public void run(String... arg0) throws Exception {
		System.out.println(template.findAll());
		
	}
}

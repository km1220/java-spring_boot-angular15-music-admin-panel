package com.BTO_Tamil.spring.datajpa;

import javax.annotation.Resource;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.BTO_Tamil.spring.datajpa.service.FilesStorageService;

@SpringBootApplication
public class BTO_TamilApplication implements CommandLineRunner{
	@Resource
	FilesStorageService storageService;
	public static void main(String[] args) {
		SpringApplication.run(BTO_TamilApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		storageService.init();
	}
}

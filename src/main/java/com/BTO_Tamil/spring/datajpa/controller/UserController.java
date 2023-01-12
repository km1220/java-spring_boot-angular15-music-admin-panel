package com.BTO_Tamil.spring.datajpa.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.BTO_Tamil.spring.datajpa.model.User;
import com.BTO_Tamil.spring.datajpa.repository.UserRepository;

@CrossOrigin("*")

@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	UserRepository userRepository;

	/*************************************************************************************************
	 * Name : getAllUsers *
	 * Date : 1/7/2023 *
	 * Maker : Vladimir *
	 * Summary : Get All Users *
	 * parameter : N/A *
	 * Return : users (List) *
	 *************************************************************************************************/
	@GetMapping("/users")
	public ResponseEntity<List<User>> getAllUsers() {
		try {
			List<User> users = new ArrayList<User>();
			userRepository.findAll().forEach(users::add);

			if (users.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(users, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}

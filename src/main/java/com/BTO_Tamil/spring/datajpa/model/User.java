package com.BTO_Tamil.spring.datajpa.model;

import javax.persistence.*;

@Entity
@Table(name = "user_email")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "email")
	private String email;

	public User() {

	}

	public User(String email) {
		this.email = email;
	}

	public long getId() {
		return id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", email=" + email + "]";
	}

}

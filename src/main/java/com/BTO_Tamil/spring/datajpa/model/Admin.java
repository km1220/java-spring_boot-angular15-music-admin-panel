package com.BTO_Tamil.spring.datajpa.model;

import javax.persistence.*;

@Entity
@Table(name = "admin")
public class Admin {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "username")
	private String username;

	@Column(name = "password")
	private String password;

	public Admin() {

	}

	public Admin(String username, String password) {
		this.username = username;
		this.password = password;
	}

	public long getId() {
		return id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "Admin [id=" + id + ", username=" + username + ", password=" + password + "]";
	}

}

package com.BTO_Tamil.spring.datajpa.model;

import javax.persistence.*;

@Entity
@Table(name = "preminum_users")
public class PremiumUser {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "email")
	private String email;

	public PremiumUser() {

	}

	public PremiumUser(String email) {
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
		return "PreminumUser [id=" + id + ", email=" + email + "]";
	}

}

package com.BTO_Tamil.spring.datajpa.model;

import javax.persistence.*;

@Entity
@Table(name = "razorpay")
public class Razorpay {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "public_key")
	private String publicKey;

	@Column(name = "secret_key")
	private String secretKey;

	public Razorpay() {

	}

	public Razorpay(String publicKey, String secretKey) {
		this.publicKey = publicKey;
		this.secretKey = secretKey;
	}

	public long getId() {
		return id;
	}

	public String getPublicKey() {
		return publicKey;
	}

	public void setPublicKey(String publicKey) {
		this.publicKey = publicKey;
	}

	public String getSecretKey() {
		return secretKey;
	}

	public void setSecretKey(String secretKey) {
		this.secretKey = secretKey;
	}

	@Override
	public String toString() {
		return "Razorpay [id=" + id + ", public_key=" + publicKey + ", secret_key=" + secretKey + "]";
	}

}

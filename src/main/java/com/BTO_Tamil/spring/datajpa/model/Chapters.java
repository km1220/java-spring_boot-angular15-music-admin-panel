package com.BTO_Tamil.spring.datajpa.model;

import javax.persistence.*;

@Entity
@Table(name = "chapters")
public class Chapters {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "name")
	private String name;

	@Column(name = "paid")
	private int paid;

	@Column(name = "price")
	private float price;

	public Chapters() {

	}

	public Chapters(String name, int paid, float price) {
		this.name = name;
		this.paid = paid;
		this.price = price;
	}

	public long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String username) {
		this.name = username;
	}

	public int getPaid() {
		return paid;
	}

	public void setPaid(int paid) {
		this.paid = paid;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}
	@Override
	public String toString() {
		return "Chapters [id=" + id + ", name=" + name + ", paid=" + paid + ", price="+ price +"]";
	}

}

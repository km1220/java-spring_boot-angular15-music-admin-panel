package com.BTO_Tamil.spring.datajpa.model;

import javax.persistence.*;

@Entity
@Table(name = "app_update")
public class AppUpdate {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "app_version")
	private int version;

    @Column(name = "app_check")
    private int check;

	public AppUpdate() {	}

	public AppUpdate(int version, int check) {
		this.version = version;
		this.check = check;
	}

	public long getId() {
		return id;
	}

	public int getVersion() {
		return version;
	}

	public int getCheck() {
		return check;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	public void setCheck(int check) {
		this.check = check;
	}
	@Override
	public String toString() {
		return "AppUpdate [id=" + id + ", version=" + version + ", check=" + check + "]";
	}
}

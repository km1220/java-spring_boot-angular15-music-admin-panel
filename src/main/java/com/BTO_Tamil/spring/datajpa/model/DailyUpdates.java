package com.BTO_Tamil.spring.datajpa.model;

import javax.persistence.*;

@Entity
@Table(name = "daily_updates")
public class DailyUpdates {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "type")
	private String type;

	@Column(name = "title")
	private String title;

	@Column(name = "message")
	private String message;

    @Column(name = "active")
    private int active;

	public DailyUpdates() {	}

	public DailyUpdates(String type, String title, String message, int active) {
		this.type = type;
		this.title = title;
        this.message = message;
        this.active = active;
	}

	public long getId() {
		return id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getActive() {
        return active;
    }

    public void setActive(int active) {
        this.active = active;
    }

	@Override
	public String toString() {
		return "DailyUpdates [id=" + id + ", type=" + type + ", title=" + title + ", message="+ message +", active="+ active +"]";
	}
}

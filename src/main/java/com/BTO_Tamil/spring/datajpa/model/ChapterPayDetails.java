package com.BTO_Tamil.spring.datajpa.model;

import javax.persistence.*;

@Entity
@Table(name = "chapters")
public class ChapterPayDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "user_email")
	private String userEmail;

	@Column(name = "chapter_id")
	private int chapterId;

	public ChapterPayDetails() {

	}

	public ChapterPayDetails(int chapterId, String userEmail) {
        this.chapterId = chapterId;
        this.userEmail = userEmail;
	}

	public long getId() {
		return id;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public int getChatperId() {
		return chapterId;
	}

	public void setChapterId(int chapterId) {
		this.chapterId = chapterId;
	}
}

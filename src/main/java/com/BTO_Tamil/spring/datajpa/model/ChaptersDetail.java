package com.BTO_Tamil.spring.datajpa.model;

import javax.persistence.*;

@Entity
@Table(name = "chapter_details")
public class ChaptersDetail {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "part")
	private String part;

	@Column(name = "url")
	private String url;

	@Column(name = "parent_id")
	private int parentId;

	@Column(name = "paid")
	private int paid;

	@Column(name = "offline_download")
	private int offlineDownload;

	public ChaptersDetail() {

	}

	public ChaptersDetail(String part, String url, int parent_id, int paid, int offline_download) {
		this.part = part;
		this.url = url;
		this.parentId = parent_id;
		this.paid = paid;
		this.offlineDownload = offline_download;
	}

	public long getId() {
		return id;
	}

	public int getPaid() {
		return paid;
	}

	public void setPaid(int paid) {
		this.paid = paid;
	}

	public int getOfflineDownload() {
		return offlineDownload;
	}

	public void setOfflineDownload(int offline_download) {
		this.offlineDownload = offline_download;
	}

	public int getParentId() {
		return parentId;
	}

	public void setParentId(int parent_id) {
		this.parentId = parent_id;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getPart() {
		return part;
	}

	public void setPart(String part) {
		this.part = part;
	}
}

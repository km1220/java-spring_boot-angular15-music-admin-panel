package com.BTO_Tamil.spring.datajpa.model;

import javax.persistence.*;

@Entity
@Table(name = "songs")
public class Song {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "song_name")
	private String songName;

	@Column(name = "url")
	private String url;

	@Column(name = "paid")
	private int paid;

	@Column(name = "offline_download")
	private int offlineDownload;

	public Song() {}

	public Song(String song_name,String url, int paid, int offline_download) {
		this.songName = song_name;
		this.url = url;
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

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getSongName() {
		return songName;
	}

	public void setSongName(String songName) {
		this.songName = songName;
	}
}

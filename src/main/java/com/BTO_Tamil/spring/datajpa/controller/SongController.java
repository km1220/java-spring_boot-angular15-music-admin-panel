package com.BTO_Tamil.spring.datajpa.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.BTO_Tamil.spring.datajpa.model.Song;
import com.BTO_Tamil.spring.datajpa.repository.SongRepository;
import com.BTO_Tamil.spring.datajpa.service.FilesStorageService;

@CrossOrigin("*")

@RestController
@RequestMapping("/api")
public class SongController {

	@Autowired
	SongRepository songRepository;

	@Autowired
	public SongController(FilesStorageService storageService) {
	}

	/*************************************************************************************************
	 * Name : getAllSongs *
	 * Date : 1/6/2023 *
	 * Maker : Vladimir *
	 * Summary : Get all songs *
	 * parameter : N/A *
	 * Return : Songs(List) *
	 *************************************************************************************************/
	@GetMapping("/song_all")
	public ResponseEntity<List<Song>> getAllSongs() {
		try {
			List<Song> Songs = new ArrayList<Song>();
			songRepository.findAll().forEach(Songs::add);

			if (Songs.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(Songs, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/*************************************************************************************************
	 * Name : addSong *
	 * Date : 1/6/2023 *
	 * Maker : Vladimir *
	 * Summary : Add new song *
	 * parameter : song_name(String), paid(int), file(MultipartFile) *
	 * Return : new song(Song) *
	 *************************************************************************************************/
	@PostMapping("/add_song")
	public ResponseEntity<?> addSong(@RequestParam("song_name") String song_name, @RequestParam("paid") int paid,
			@RequestParam(value = "file", required = true) MultipartFile file) {
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		String filename = timestamp.getNanos() + file.getOriginalFilename();
		String path = "_frontend/src/assets/uploads/" + filename;
		try {
			File convertFile = new File(path);
			convertFile.createNewFile();
			FileOutputStream fout = new FileOutputStream(convertFile);
			fout.write(file.getBytes());
			fout.close();
			Song _song = new Song();
			_song.setSongName(song_name);
			_song.setPaid(paid);
			_song.setUrl(filename);
			_song.setOfflineDownload(0);
			Object result = songRepository.save(_song);
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (IOException e) {
			e.printStackTrace();
			return new ResponseEntity<>("failed", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/*************************************************************************************************
	 * Name : udpateSong *
	 * Date : 1/6/2023 *
	 * Maker : Vladimir *
	 * Summary : Update Song *
	 * parameter : req(Map) *
	 * Return : songRepository(Map) *
	 *************************************************************************************************/
	@PutMapping("/update_song")
	public ResponseEntity<?> udpateSong(@RequestBody Map<String, Object> req) {
		try {
			Song _song = songRepository.findById((long) ((Integer) req.get("id"))).get();
			_song.setSongName((String) req.get("song_name"));
			_song.setPaid((int) req.get("paid"));
			return new ResponseEntity<>(songRepository.save(_song), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/*************************************************************************************************
	 * Name : updateSongOfflineDownload *
	 * Date : 1/6/2023 *
	 * Maker : Vladimir *
	 * Summary : Update Song offline_download *
	 * parameter : req(Map) *
	 * Return : updated song (Song) *
	 *************************************************************************************************/
	@PutMapping("/update_song_offline_download")
	public ResponseEntity<?> updateSongOfflineDownload(@RequestBody Map<String, Object> req) {
		try {
			Song _song = songRepository.findById((long) ((Integer) req.get("id"))).get();
			_song.setOfflineDownload((int) req.get("offline_download"));
			return new ResponseEntity<>(songRepository.save(_song), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/*************************************************************************************************
	 * Name : removeSong *
	 * Date : 1/6/2023 *
	 * Maker : Vladimir *
	 * Summary : Remove Song *
	 * parameter : id(long) *
	 * Return : removed_id(Map) *
	 *************************************************************************************************/
	@DeleteMapping("/remove_song/{id}")
	public ResponseEntity<?> removeSong(@PathVariable("id") long id) {

		Map<String, Object> result = new HashMap<String, Object>();
		result.put("removed_id", id);

		try {
			songRepository.deleteById(id);
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}

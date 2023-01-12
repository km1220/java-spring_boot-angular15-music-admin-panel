package com.BTO_Tamil.spring.datajpa.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

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

import com.BTO_Tamil.spring.datajpa.model.SelfAffirmation;
import com.BTO_Tamil.spring.datajpa.repository.SelfAffirmationRepository;
import com.BTO_Tamil.spring.datajpa.service.FilesStorageService;

@CrossOrigin("*")

@RestController
@RequestMapping("/api")
public class SelfAffirmationController {

	@Autowired
	SelfAffirmationRepository selfAffirmationRepository;

	@Autowired
	public SelfAffirmationController(FilesStorageService storageService) {
	}

	/*************************************************************************************************
	 * Name : getAllSelfAffirmations *
	 * Date : 1/6/2023 *
	 * Maker : Vladimir *
	 * Summary : Get All SelfAffirmations *
	 * parameter : N/A *
	 * Return : selfAffirmations(List) *
	 *************************************************************************************************/
	@GetMapping("/self_affirmation_all")
	public ResponseEntity<List<SelfAffirmation>> getAllSelfAffirmations() {
		try {
			List<SelfAffirmation> selfAffirmations = new ArrayList<SelfAffirmation>();
			selfAffirmationRepository.findAll().forEach(selfAffirmations::add);

			if (selfAffirmations.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(selfAffirmations, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/*************************************************************************************************
	 * Name : addSelfAffirmation *
	 * Date : 1/6/2023 *
	 * Maker : Vladimir *
	 * Summary : Add SelfAffirmation *
	 * parameter : song_name(String), paid(int), file(MultipartFile) *
	 * Return : new selfAffirmation(SelfAffirmation) *
	 *************************************************************************************************/
	@PostMapping("/add_self_affirmation")
	public ResponseEntity<?> addSelfAffirmation(@RequestParam("song_name") String song_name,
			@RequestParam("paid") int paid, @RequestParam(value = "file", required = true) MultipartFile file) {
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		String filename = timestamp.getNanos() + file.getOriginalFilename();
		String path = "_frontend/src/assets/uploads/" + filename;
		try {
			File convertFile = new File(path);
			convertFile.createNewFile();
			FileOutputStream fout = new FileOutputStream(convertFile);
			fout.write(file.getBytes());
			fout.close();
			SelfAffirmation _selfAffirmation = new SelfAffirmation();
			_selfAffirmation.setSongName(song_name);
			_selfAffirmation.setPaid(paid);
			_selfAffirmation.setUrl(filename);
			_selfAffirmation.setOfflineDownload(0);
			return new ResponseEntity<>(selfAffirmationRepository.save(_selfAffirmation), HttpStatus.OK);
		} catch (IOException error) {
			error.printStackTrace();
			return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/*************************************************************************************************
	 * Name : udpateSelfAffirmation *
	 * Date : 1/6/2023 *
	 * Maker : Vladimir *
	 * Summary : Update SelfAffirmation *
	 * parameter : selfAffirmation(Map) *
	 * Return : updated SelfAffirmation(SelfAffirmation) *
	 *************************************************************************************************/
	@PutMapping("/update_self_affirmation")
	public ResponseEntity<?> udpateSelfAffirmation(@RequestBody Map<String, Object> selfAffirmation) {
		try {
			SelfAffirmation _selfAffirmation = selfAffirmationRepository
					.findById((long) ((Integer) selfAffirmation.get("id"))).get();
			_selfAffirmation.setSongName((String) selfAffirmation.get("song_name"));
			_selfAffirmation.setPaid((int) selfAffirmation.get("paid"));
			return new ResponseEntity<>(selfAffirmationRepository.save(_selfAffirmation), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/*************************************************************************************************
	 * Name : updateSelfAffirmationOfflineDownload *
	 * Date : 1/6/2023 *
	 * Maker : Vladimir *
	 * Summary : Update selfAffirmation offline_download *
	 * parameter : selfAffimation(Map) *
	 * Return : updated selfAffirmation(SelfAffirmation) *
	 *************************************************************************************************/
	@PutMapping("/update_self_affirmation_offline_download")
	public ResponseEntity<?> updateSelfAffirmationOfflineDownload(@RequestBody Map<String, Object> selfAffirmation) {
		try {
			SelfAffirmation _selfAffirmation = selfAffirmationRepository
					.findById((long) ((Integer) selfAffirmation.get("id"))).get();
			_selfAffirmation.setOfflineDownload((int) selfAffirmation.get("offline_download"));
			return new ResponseEntity<>(selfAffirmationRepository.save(_selfAffirmation), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/*************************************************************************************************
	 * Name : removeSelfAffirmation *
	 * Date : 1/6/2023 *
	 * Maker : Vladimir *
	 * Summary : Remove SelfAffirmation *
	 * parameter : id(long) *
	 * Return : result(Map) *
	 *************************************************************************************************/
	@DeleteMapping("/remove_self_affirmation/{id}")
	public ResponseEntity<?> removeSelfAffirmation(@PathVariable("id") long id) {

		Map<String, Object> result = new HashMap<String, Object>();
		result.put("removed_id", id);

		try {
			selfAffirmationRepository.deleteById(id);
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}

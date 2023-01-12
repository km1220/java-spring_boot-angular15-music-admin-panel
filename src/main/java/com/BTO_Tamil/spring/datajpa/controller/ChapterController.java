package com.BTO_Tamil.spring.datajpa.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;

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

import com.BTO_Tamil.spring.datajpa.model.Chapters;
import com.BTO_Tamil.spring.datajpa.model.ChaptersDetail;
import com.BTO_Tamil.spring.datajpa.repository.ChapterDetailRepository;
import com.BTO_Tamil.spring.datajpa.repository.ChapterRepository;

@CrossOrigin("*")

@RestController
@RequestMapping("/api")
public class ChapterController {

	@Autowired
	ChapterRepository chapterRepository;
	@Autowired
	ChapterDetailRepository chapterDetailRepository;

	/*************************************************************************************************
     * Name      : getAllChapters                                                                    *
     * Date      : 1/6/2023                                                                          *
     * Maker     : Vladimir                                                                          *
     * Summary   : Get all chapters                                                                  *
     * parameter : N/A                                                                               *
     * Return    : all chapters(Chapters)                                                            *
     *************************************************************************************************/
	@GetMapping("/get_all_chapters")
	public ResponseEntity<List<Chapters>> getAllChapters() {
		try {
			List<Chapters> chapters = new ArrayList<Chapters>();
			chapterRepository.findAll().forEach(chapters::add);

			if (chapters.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(chapters, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
 
	/*************************************************************************************************
     * Name      : createchapter                                                                     *
     * Date      : 1/6/2023                                                                          *
     * Maker     : Vladimir                                                                          *
     * Summary   : Create new chapter                                                                *
     * parameter : chapter name String                                                               *
     * Return    : created chapter  (Chapters)                                                                 *
     *************************************************************************************************/
	@PostMapping("/chapter")
	public ResponseEntity<?> createChapter(@RequestBody Map<String, String> req) {
		String name = req.get("name");
		try {
			Chapters _chapter = new Chapters();
			_chapter.setName(name);
			_chapter.setPaid(0);
			_chapter.setPrice(0);
			Object result = chapterRepository.save(_chapter);
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(e.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

    /*************************************************************************************************
     * Name      : updateChapter                                                                     *
     * Date      : 1/6/2023                                                                          *
     * Maker     : Vladimir                                                                          *
     * Summary   : update chapter                                                                    *
     * parameter : id, new chapter (Chapter)                                                         *
     * Return    : created chapter (Chapters)                                                        *
     *************************************************************************************************/
	@PutMapping("/chapter/{id}")
	public ResponseEntity<?> updateChapter(@PathVariable("id") long id, @RequestBody Chapters req) {
		Optional<Chapters> _findData = chapterRepository.findById(id);

		if (_findData.isPresent()) {
			Chapters _chapter = _findData.get();
			_chapter.setName(req.getName());
			_chapter.setPaid(req.getPaid());
			_chapter.setPrice(req.getPrice());
			Object result = chapterRepository.save(_chapter);

			return new ResponseEntity<>(result, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	/*************************************************************************************************
     * Name      : deleteChapter                                                                     * 
     * Date      : 1/6/2023                                                                          *
     * Maker     : Sakamoto                                                                          *
     * Summary   : Delete Chapter                                                                    *
     * parameter : chapter id (long)                                                                 *
     * Return    : chapter id (long)                                                                 *
     *************************************************************************************************/
	@DeleteMapping("/chapter/{id}")
	public ResponseEntity<?> deleteChapter(@PathVariable("id") long id) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("removed_id", id);

		try {
			List<ChaptersDetail> chaptersDetails = new ArrayList<ChaptersDetail>();
			chaptersDetails = chapterDetailRepository.findByParentId((int) id);

			for (int i = 0; i < chaptersDetails.size(); i++) {
				long chapter_detail_id = chaptersDetails.get(i).getId();
				chapterDetailRepository.deleteById(chapter_detail_id);
			}

			chapterRepository.deleteById(id);
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/*************************************************************************************************
     * Name      : getAllChapterDetails                                                              *
     * Date      : 1/6/2023                                                                          *
     * Maker     : Vladimir                                                                          *
     * Summary   : Get all chapter details                                                           *
     * parameter : chapter id (long)                                                                 *
     * Return    : chapterDetails list (List)                                                        *
     *************************************************************************************************/
	@GetMapping("/get_all_chapter_details/{id}")
	public ResponseEntity<List<ChaptersDetail>> getAllChapterDetails(@PathVariable("id") long id) {
		try {
			List<ChaptersDetail> chaptersDetails = new ArrayList<ChaptersDetail>();
			chaptersDetails = chapterDetailRepository.findByParentId((int) id);

			if (chaptersDetails.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(chaptersDetails, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/*************************************************************************************************
     * Name      : createChapterPart                                                                 *
     * Date      : 1/6/2023                                                                          *
     * Maker     : Vladimir                                                                          *
     * Summary   : Create Chapter Part                                                               *
     * parameter : part(String), parent_id(int) paid(int) file(MultipartFile)                        *
     * Return    : chapterDetail (ChaptersDetail)                                                    *
     *************************************************************************************************/
	@PostMapping("/add_chapter_part")
	public ResponseEntity<?> createChapterPart(@RequestParam("part") String part,
			@RequestParam("parent_id") int parent_id, @RequestParam("paid") int paid,
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
			ChaptersDetail _chapterDetail = new ChaptersDetail();
			_chapterDetail.setPart(part);
			_chapterDetail.setPaid(paid);
			_chapterDetail.setParentId(parent_id);
			_chapterDetail.setOfflineDownload(0);
			_chapterDetail.setUrl(filename);
			Object result = chapterDetailRepository.save(_chapterDetail);

			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (IOException e) {
			e.printStackTrace();
			return new ResponseEntity<>("failed", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/*************************************************************************************************
     * Name      : updateChapterDetailOfflineDownload                                                *
     * Date      : 1/6/2023                                                                          *
     * Maker     : Vladimir                                                                          *
     * Summary   : Update chapter detail offline download                                            *
     * parameter : chapterDetail(Map)                                                                *
     * Return    : updated chapter detail(ChapterDetail)                                                         *
     *************************************************************************************************/
	@PutMapping("/update_chapter_detail_offline_download")
	public ResponseEntity<?> updateChapterDetailOfflineDownload(@RequestBody Map<String, Object> chapterDetail) {
		try {
			ChaptersDetail _chapterDetail = chapterDetailRepository.findById((long) ((Integer) chapterDetail.get("id")))
					.get();
			_chapterDetail.setOfflineDownload((int) chapterDetail.get("offline_download"));
			return new ResponseEntity<>(chapterDetailRepository.save(_chapterDetail), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/*************************************************************************************************
     * Name      : deleteChapterDetail                                                               *
     * Date      : 1/6/2023                                                                          *
     * Maker     : Vladimir                                                                          *
     * Summary   : Delete chapter detail                                                             *
     * parameter : id(long)                                                                          *
     * Return    : deleted chapter detail id(Map)                                                    *
     *************************************************************************************************/
	@DeleteMapping("/chapter_detail/{id}")
	public ResponseEntity<?> deleteChapterDetail(@PathVariable("id") long id) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("removed_id", id);

		try {
			chapterDetailRepository.deleteById(id);
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}

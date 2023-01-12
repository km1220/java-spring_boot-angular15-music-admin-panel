package com.BTO_Tamil.spring.datajpa.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.BTO_Tamil.spring.datajpa.model.DailyUpdates;
import com.BTO_Tamil.spring.datajpa.repository.DailyUpdatesRepository;

@CrossOrigin("*")

@RestController
@RequestMapping("/api")

public class DailyUpdatesController {
    @Autowired
    DailyUpdatesRepository dailyUpdatesRepository;

    /*************************************************************************************************
     * Name : getDailyUpdates *
     * Date : 1/6/2023 *
     * Maker : Vladimir *
     * Summary : Get Daily Updates *
     * parameter : N/A *
     * Return : dailyUpdateslist(List) *
     *************************************************************************************************/
    @GetMapping("/daily_updates")
    public ResponseEntity<List<DailyUpdates>> getDailyUpdates() {
        try {
            List<DailyUpdates> dailyUpdatesList = dailyUpdatesRepository.findAll();
            if (dailyUpdatesList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(dailyUpdatesList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /*************************************************************************************************
     * Name : updateDailyUpdate *
     * Date : 1/6/2023 *
     * Maker : Vladimir *
     * Summary : update daily update *
     * parameter : dailyUpdates(DailyUpdates) *
     * Return : updated dailyUpdates (DailyUpdates) *
     *************************************************************************************************/
    @PostMapping("/daily_updates")
    public ResponseEntity<?> updateDailyUpdate(@RequestBody DailyUpdates dailyUpdates) {
        Optional<DailyUpdates> dailyUpdatesData = dailyUpdatesRepository.findByType(dailyUpdates.getType());

        if (dailyUpdatesData.isPresent()) {
            DailyUpdates _dailyUpdate = dailyUpdatesData.get();
            _dailyUpdate.setTitle(dailyUpdates.getTitle());
            _dailyUpdate.setMessage(dailyUpdates.getMessage());
            _dailyUpdate.setActive(dailyUpdates.getActive());
            return new ResponseEntity<>(dailyUpdatesRepository.save(_dailyUpdate), HttpStatus.OK);
        } else {
            try {
                DailyUpdates _dailyUpdate = dailyUpdatesRepository.save(new DailyUpdates(dailyUpdates.getType(),
                        dailyUpdates.getTitle(), dailyUpdates.getMessage(), dailyUpdates.getActive()));
                return new ResponseEntity<>(_dailyUpdate, HttpStatus.CREATED);
            } catch (Exception e) {
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
}

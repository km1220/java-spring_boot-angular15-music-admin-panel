package com.BTO_Tamil.spring.datajpa.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.BTO_Tamil.spring.datajpa.model.AppUpdate;
import com.BTO_Tamil.spring.datajpa.repository.AppUpdateRepository;

@CrossOrigin("*")

@RestController
@RequestMapping("/api")

public class AppUpdateController {
    @Autowired
    AppUpdateRepository appUpdatesRepository;

    /*************************************************************************************************
     * Name : getAppUpdate *
     * Date : 1/6/2023 *
     * Maker : Vladimir *
     * Summary : Get app information *
     * parameter : N/A *
     * Return : app data(AppUpdate) *
     *************************************************************************************************/
    @GetMapping("/app_update")
    public ResponseEntity<List<AppUpdate>> getAppUpdate() {
        try {
            List<AppUpdate> _findAll = appUpdatesRepository.findAll();
            if (_findAll.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(_findAll, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /*************************************************************************************************
     * Name : updateAppUpdate *
     * Date : 1/6/2023 *
     * Maker : Vlidimir *
     * Summary : Update app version and check *
     * parameter : AppUpdate req *
     * Return : Updated AppUpdate *
     *************************************************************************************************/
    @PutMapping("/app_update")
    public ResponseEntity<?> updateAppUpdate(@RequestBody AppUpdate req) {

        if (appUpdatesRepository.count() > 0) {
            AppUpdate _find = appUpdatesRepository.findAll().get(0);
            _find.setCheck(req.getCheck());
            _find.setVersion(req.getVersion());
            return new ResponseEntity<>(appUpdatesRepository.save(_find), HttpStatus.OK);
        } else {
            try {
                AppUpdate appUpdate = appUpdatesRepository.save(new AppUpdate(req.getVersion(), req.getCheck()));
                return new ResponseEntity<>(appUpdate, HttpStatus.CREATED);
            } catch (Exception e) {
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
}

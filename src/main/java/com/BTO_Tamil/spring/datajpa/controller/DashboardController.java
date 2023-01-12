package com.BTO_Tamil.spring.datajpa.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")

@RestController
@RequestMapping("/api")
public class DashboardController {

    @Autowired
    private JdbcTemplate JdbcTemplate;

    /*************************************************************************************************
     * Name : getAllDashboardData *
     * Date : 1/6/2023 *
     * Maker : Vladimir *
     * Summary : Get all info for dashboard page *
     * parameter : N/A *
     * Return : dashboardData (Object) *
     *************************************************************************************************/
    @GetMapping("/get_dashboard_data")
    public ResponseEntity<?> getAllDashboardData() {
        Object dashboardData = JdbcTemplate.queryForList(
                "select * from (SELECT COUNT(premium_users.id) as premium_users from premium_users) as premium_users, (SELECT COUNT(songs.id) as songs from songs) as songs,(SELECT COUNT(chapters.id) as chapters from chapters) as chapters, (SELECT COUNT(self_affirmation.id) as self_affirmation from self_affirmation) as self_affirmation");
        return new ResponseEntity<>(dashboardData, HttpStatus.OK);
    }
}

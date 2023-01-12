package com.BTO_Tamil.spring.datajpa.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.BTO_Tamil.spring.datajpa.model.DailyUpdates;

public interface DailyUpdatesRepository extends JpaRepository<DailyUpdates, Long>{
	Optional<DailyUpdates> findByType(String type);
}

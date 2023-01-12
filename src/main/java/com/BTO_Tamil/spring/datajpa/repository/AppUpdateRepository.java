package com.BTO_Tamil.spring.datajpa.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.BTO_Tamil.spring.datajpa.model.AppUpdate;

public interface AppUpdateRepository extends JpaRepository<AppUpdate, Long>{
	Optional<AppUpdate> findByVersion(int version);
}

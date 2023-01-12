package com.BTO_Tamil.spring.datajpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.BTO_Tamil.spring.datajpa.model.ChaptersDetail;

public interface ChapterDetailRepository extends JpaRepository<ChaptersDetail, Long> {
	List<ChaptersDetail> findByParentId(int parent_id);
}

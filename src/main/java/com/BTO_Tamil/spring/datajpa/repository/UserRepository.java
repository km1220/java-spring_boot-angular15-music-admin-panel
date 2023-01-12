package com.BTO_Tamil.spring.datajpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.BTO_Tamil.spring.datajpa.model.User;

public interface UserRepository extends JpaRepository<User, Long>{
   
}

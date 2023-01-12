package com.BTO_Tamil.spring.datajpa.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.BTO_Tamil.spring.datajpa.model.Razorpay;
import com.BTO_Tamil.spring.datajpa.repository.RazorpayRepository;

@CrossOrigin("*")

@RestController
@RequestMapping("/api")

public class RazorpayController {
	@Autowired
	RazorpayRepository razorpayRepository;

	/*************************************************************************************************
	 * Name : getRazorpay *
	 * Date : 1/6/2023 *
	 * Maker : Vladimir *
	 * Summary : Get Razorpay *
	 * parameter : N/A *
	 * Return : all razorpay list(List) *
	 *************************************************************************************************/
	@GetMapping("/razorpay")
	public ResponseEntity<List<Razorpay>> getRazorpay() {
		try {
			List<Razorpay> _findAll = razorpayRepository.findAll();
			if (_findAll.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(_findAll, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/*************************************************************************************************
	 * Name : updateRazorpay *
	 * Date : 1/6/2023 *
	 * Maker : Vladimir *
	 * Summary : Update Razorpay *
	 * parameter : id(long), req(Razorpay) *
	 * Return : updated Razorpay data (Razorpay) *
	 *************************************************************************************************/
	@PutMapping("/razorpay/{id}")
	public ResponseEntity<?> updateRazorpay(@PathVariable("id") long id, @RequestBody Razorpay req) {
		Optional<Razorpay> _findData = razorpayRepository.findById(id);

		if (_findData.isPresent()) {
			Razorpay _razorpay = _findData.get();
			_razorpay.setPublicKey(req.getPublicKey());
			_razorpay.setSecretKey(req.getSecretKey());
			return new ResponseEntity<>(razorpayRepository.save(_razorpay), HttpStatus.OK);
		} else {
			return new ResponseEntity<>("not found", HttpStatus.NOT_FOUND);
		}
	}
}

/*
 * SIMMS 2016 - All rights reserved
 */
package com.newtech.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.newtech.model.Patio;

/**
 * @author abernal
 * Repository interface for Patio
 */
@RepositoryRestResource(collectionResourceRel = "patio", path = "patio")
public interface PatioRepository extends CrudRepository<Patio, Integer> {
	
	@Query("SELECT p FROM Patio p WHERE p.estaPati = 1")
	List<Patio> findByActive();

}

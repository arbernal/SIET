/*
 * SIMMS 2016 - All rights reserved
 */
package com.newtech.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.newtech.model.Pozo;

/**
 * @author abernal
 * Repository interface for Pozo
 */
@RepositoryRestResource(collectionResourceRel = "pozo", path = "pozo")
public interface PozoRepository extends CrudRepository<Pozo, Integer> {
	
	@Query("SELECT p FROM Pozo p WHERE p.estaPozo = 1")
	List<Pozo> findByActive();


}

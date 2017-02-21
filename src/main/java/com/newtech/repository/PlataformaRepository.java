/*
 * SIMMS 2016 - All rights reserved
 */
package com.newtech.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.newtech.model.Plataforma;

/**
 * @author abernal
 * Repository interface for Plataforma
 */
@RepositoryRestResource(collectionResourceRel = "plataforma", path = "plataforma")
public interface PlataformaRepository extends CrudRepository<Plataforma, Integer> {
	
	@Query("SELECT p FROM Plataforma p WHERE p.estaPlat = 1")
	List<Plataforma> findByActive();

}

/*
 * SIMMS 2016 - All rights reserved
 */
package com.newtech.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.newtech.model.Estiba;

/**
 * @author abernal
 * Repository interface for Estiba
 *
 */
@RepositoryRestResource(collectionResourceRel = "estiba", path = "estiba")
public interface EstibaRepository extends CrudRepository<Estiba, Integer>{
	
	@Query("SELECT e FROM Estiba e WHERE e.estaEsti = 1")
	List<Estiba> findByActive();
	
}

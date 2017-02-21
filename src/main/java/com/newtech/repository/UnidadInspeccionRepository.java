/*
 * SIMMS 2016 - All rights reserved
 */
package com.newtech.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.newtech.model.UnidadInspeccion;

/**
 * @author abernal Repository interface for UnidadInspeccion
 */
@RepositoryRestResource(collectionResourceRel = "unidadinspeccion", path = "unidadinspeccion")
public interface UnidadInspeccionRepository extends
		CrudRepository<UnidadInspeccion, Integer> {
	
	@Query("SELECT u FROM UnidadInspeccion u WHERE u.estaInsp = 1")
	List<UnidadInspeccion> findByActive();

}

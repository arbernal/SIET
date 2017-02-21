package com.newtech.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.newtech.model.Taller;

@RepositoryRestResource(collectionResourceRel = "taller", path = "taller")
public interface TallerRepository extends CrudRepository<Taller, Integer>{
	
	@Query("SELECT t FROM Taller t WHERE t.estaTall = 1")
	List<Taller> findByActive();
	
}

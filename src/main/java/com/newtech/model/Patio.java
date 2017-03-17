/*
 * SIMMS 2016 - All rights reserved
 */
package com.newtech.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;


/**
 * @author abernal
 * The persistent class for the patio database table.
 * 
 */
@Data
@Entity
public class Patio implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="id_pati")
	@GeneratedValue(generator="increment")
    @GenericGenerator(name="increment", strategy = "increment")
	private Integer idPati;
	
	
	@Column(name="code_pati")
	private String codePati;
	
	
	@Column(name="desc_pati")
	private String descPati;
	
	
	@Column(name="esta_pati")
	@Type(type = "org.hibernate.type.NumericBooleanType")
	private boolean estaPati;
	  
}
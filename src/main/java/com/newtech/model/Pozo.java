/*
 * SIMMS 2016 - All rights reserved
 */
package com.newtech.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import org.hibernate.annotations.Type;

import lombok.Data;


/**
 * @author abernal
 * The persistent class for the pozo database table.
 * 
 */
@Data
@Entity
public class Pozo implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="id_pozo")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer idPozo;

	@Column(name="desc_pozo")
	private String descPozo;
	
	@OneToOne
	@JoinColumn(name="id_plat")
	private Plataforma plataforma;
	
	@Column(name="esta_pozo")
	@Type(type = "org.hibernate.type.NumericBooleanType")
	private boolean estaPozo;
	
	

}
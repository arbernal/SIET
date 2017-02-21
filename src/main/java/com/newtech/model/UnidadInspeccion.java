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
import javax.persistence.Table;

import org.hibernate.annotations.Type;

import lombok.Data;


/**
 * @author abernal
 * The persistent class for the unidad_inspeccion database table.
 * 
 */
@Data
@Entity
@Table(name="unidad_inspeccion")
public class UnidadInspeccion implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="id_insp")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer idInsp;

	@Column(name="desc_insp")
	private String descInsp;
	
	@OneToOne
	@JoinColumn(name="id_pati")
	private Patio patio;
	
	@Column(name="esta_insp")
	@Type(type = "org.hibernate.type.NumericBooleanType")
	private boolean estaInsp;


}
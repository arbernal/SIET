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

import lombok.Data;

import org.hibernate.annotations.Type;
/**
 * @author abernal
 * The persistent class for the estiba database table.
 * 
 */

@Data
@Entity
public class Estiba implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "id_esti")
	private Integer idEsti;

	@Column(name = "desc_esti")
	private String descEsti;
	
	@OneToOne
	@JoinColumn(name="id_pati")
	private Patio patio;
	
	@Column(name="esta_esti")
	@Type(type = "org.hibernate.type.NumericBooleanType")
	private boolean estaEsti;

}
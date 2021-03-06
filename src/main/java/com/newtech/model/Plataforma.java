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
 * The persistent class for the plataforma database table.
 * 
 */
@Data
@Entity
public class Plataforma implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="id_plat")
	@GeneratedValue(generator="increment")
    @GenericGenerator(name="increment", strategy = "increment")
	private Long idPlat;

	@Column(name="code_plat")
	private String codePlat;
	
	@Column(name="desc_plat")
	private String descPlat;
	
	@Column(name="esta_plat")
	@Type(type = "org.hibernate.type.NumericBooleanType")
	private boolean estaPlat;
}
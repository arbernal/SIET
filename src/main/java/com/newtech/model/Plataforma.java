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

import org.hibernate.annotations.Type;

import lombok.Data;


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
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int idPlat;

	@Column(name="code_plat")
	private String codePlat;
	
	@Column(name="desc_plat")
	private String descPlat;
	
	@Column(name="esta_plat")
	@Type(type = "org.hibernate.type.NumericBooleanType")
	private boolean estaPlat;
}
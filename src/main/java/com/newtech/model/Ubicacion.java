package com.newtech.model;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.Type;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author abernal
 * The persistent class for the ubicacion database table.
 * 
 */

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Ubicacion implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "id_ubic")
	private Integer idUbic;
	
	@Column(name = "nume_seri")
	private String numeSeri;
	
	@Column(name = "fech_regi")
	private Timestamp fechRegi;
	
	@Column(name = "dire_tubo")
	private String direTubo;
	
	@Column(name="esta_ubic")
	@Type(type = "org.hibernate.type.NumericBooleanType")
	private boolean estaUbic;
	
	
	
	
}

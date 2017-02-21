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
 * The persistent class for the taller database table.
 * 
 */
@Data
@Entity
public class Taller implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@Column(name="id_tall")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer idTall;
	
	@Column(name="desc_tall")
	private String descTall;
	
	@OneToOne
	@JoinColumn(name="id_pati")
	private Patio patio;
	
	@Column(name="esta_tall")
	@Type(type = "org.hibernate.type.NumericBooleanType")
	private boolean estaTall;
	

}

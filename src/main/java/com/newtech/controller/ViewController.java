package com.newtech.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

	@RequestMapping(path = { "/index", "/index/" })
	public String getIndex() {
		return "index";
	}

	@RequestMapping(path = { "/estiba", "/estiba/" })
	public String getEstiba() {
		return "estiba";
	}

	@RequestMapping(path = { "/patio", "/patio/" })
	public String getPatio() {
		return "patio";
	}
	
	@RequestMapping(path = { "/inspeccion", "/inspeccion/" })
	public String getInspeccion() {
		return "inspeccion";
	}
	
	@RequestMapping(path = { "/taller", "/taller/" })
	public String getTaller() {
		return "taller";
	}
	
	@RequestMapping(path = { "/pozo", "/pozo/" })
	public String getPozo() {
		return "pozo";
	}
	
	@RequestMapping(path = { "/plataforma", "/plataforma/" })
	public String getPlataforma() {
		return "plataforma";
	}
	
	@RequestMapping(path = { "/reporte", "/reporte/" })
	public String getReporte() {
		return "reporte";
	}

}

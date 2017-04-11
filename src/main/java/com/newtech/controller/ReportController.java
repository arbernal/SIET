package com.newtech.controller;

import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.jasperreports.JasperReportsPdfView;

import com.newtech.template.ReportTemplate;

@Controller
public class ReportController {

	@Autowired
	private ApplicationContext appContext;

	@Autowired
	private DataSource dataSource;

	@Autowired
	private ReportTemplate template;

	@RequestMapping(value = "/pdf", method = RequestMethod.POST)
	public ModelAndView getPdf(
			@RequestParam(value = "espacio") Boolean espacio,
			@RequestParam(value = "nombre_espacio") String nombreEspacio,
			@RequestParam(value = "lugar") String lugar,
			@RequestParam(value = "nombre_lugar") String nombreLugar) {

		String tipo = espacio ? "PATIO:":"PLATAFORMA:";
		
		JasperReportsPdfView view = new JasperReportsPdfView();
		view.setUrl("classpath:/static/reports/report.jrxml");
	    view.setReportDataKey("dataSource");
	    Map<String, Object> params = new HashMap<String, Object>();
		params.put("dataSource",dataSource);
		params.put("espacio", tipo);
		params.put("nombre_espacio", nombreEspacio);
		params.put("lugar", lugar.toString());
		params.put("nombre_lugar", nombreLugar);
		view.setApplicationContext(appContext);
		return new ModelAndView(view, params); 
	}

}

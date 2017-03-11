package com.newtech.controller;

import java.util.HashMap;
import java.util.Map;

import org.apache.tomcat.jdbc.pool.DataSource;
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

	private DataSource dataSource;

	@Autowired
	private ReportTemplate template;

	@RequestMapping(value = "/pdf", method = RequestMethod.POST)
	public ModelAndView getPdf(
			@RequestParam(value = "espacio", required = false) Boolean espacio,
			@RequestParam(value = "nombre_espacio", required = false) String nombreEspacio,
			@RequestParam(value = "lugar", required = false) String lugar,
			@RequestParam(value = "nombre_lugar", required = false) String nombreLugar) {
		/*
		 * System.out.println("1 variable : " + espacio);
		 * System.out.println("2 variable : " + nombreEspacio);
		 * System.out.println("3 variable : " + lugar);
		 * System.out.println("4 variable : " + nombreLugar); return new
		 * ModelAndView("index");
		 */

		JasperReportsPdfView view = new JasperReportsPdfView();
		view.setUrl("classpath:/static/reports/mireporte.jrxml");
		view.setReportDataKey("dataSource");
		
		 Map<String, Object> params = new HashMap<String, Object>();
		 params.put("dataSource",dataSource);
	
		view.setApplicationContext(appContext);
		return new ModelAndView(view, null);

	}

}

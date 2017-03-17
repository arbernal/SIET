package com.newtech.controller;

import java.util.HashMap;
import java.util.Map;

import net.sf.jasperreports.engine.JREmptyDataSource;

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
			@RequestParam(value = "espacio") Boolean espacio,
			@RequestParam(value = "nombre_espacio") StringBuilder nombreEspacio,
			@RequestParam(value = "lugar") StringBuilder lugar,
			@RequestParam(value = "nombre_lugar") StringBuilder nombreLugar) {

		String tipo = espacio ? "PATIO:":"PLATAFORMA:";
		
		JasperReportsPdfView view = new JasperReportsPdfView();
	    view.setUrl("classpath:/static/reports/report1.jrxml");
	    view.setReportDataKey("dataSource");
	    view.setJdbcDataSource(dataSource);
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("dataSource", new JREmptyDataSource());
		params.put("espacio", tipo);
		params.put("nombre_espacio", nombreEspacio.toString());
		params.put("lugar", lugar.toString());
		params.put("nombre_lugar", nombreLugar.toString());
		view.setApplicationContext(appContext);
		return new ModelAndView(view, params); 
		
	

	}

}

package com.newtech.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.jasperreports.JasperReportsPdfView;

import com.newtech.dto.Reporte1;
import com.newtech.template.ReportTemplate;

@Controller
public class ReportController {
	
	@Autowired 
	private ApplicationContext appContext;
	
	@Autowired 
	private ReportTemplate template;
	

	
	@RequestMapping(value = "/pdf", method = RequestMethod.GET)
	public ModelAndView getPdf() {
	    JasperReportsPdfView view = new JasperReportsPdfView();
	    view.setUrl("classpath:/static/reports/mireporte.jrxml");
	    view.setReportDataKey("dataSource");
	    Map<String, Object> params = new HashMap<>();
	    List<Reporte1> ubicaciones = template.findAll();
	    JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(ubicaciones);
	    params.put("dataSource", dataSource);
	    view.setApplicationContext(appContext);
	    return new ModelAndView(view, params);
	}
	


}

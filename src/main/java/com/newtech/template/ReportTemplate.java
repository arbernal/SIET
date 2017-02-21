package com.newtech.template;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.newtech.dto.Reporte1;

@Repository
public class ReportTemplate {
	
	@Autowired
    private JdbcTemplate jdbcTemplate;
	
	@Transactional
    public List<Reporte1> findAll() {
        return jdbcTemplate.query("select * from ubicacion",
        (resultSet, rowNum)->{
        	Reporte1 reporte = new Reporte1();
        	reporte.setNumeSeri(resultSet.getString("nume_seri"));
        	reporte.setFechRegi(resultSet.getTimestamp("fech_regi"));
        	reporte.setDireTubo(resultSet.getString("dire_tubo"));
        	return reporte;
        });
    }
	

	
}

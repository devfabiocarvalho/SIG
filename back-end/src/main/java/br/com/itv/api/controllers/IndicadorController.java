package br.com.itv.api.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.itv.api.entities.Indicador;
import br.com.itv.api.responses.Response;
import br.com.itv.api.services.IndicadorService;

@RestController
@RequestMapping("/api/indicador")
public class IndicadorController {
	
	@Autowired
	private IndicadorService indicadorService;
	
	@CrossOrigin
	@GetMapping()
	public ResponseEntity<Response<Indicador>> getIndicadores() {
		Response<Indicador> response = new Response<Indicador>();
		List<Indicador> indicadores = indicadorService.getAll();
		response.setData(indicadores);
		return ResponseEntity.ok(response);
	}
	
	@CrossOrigin
	@GetMapping(value = "/{tipo}")
	public ResponseEntity<Response<Indicador>> getIndicadoresPorTipo(@PathVariable("tipo") Integer tipo) {
		Response<Indicador> response = new Response<Indicador>();
		List<Indicador> indicadores = indicadorService.getIndicadorPorTipo(tipo);
		response.setData(indicadores);
		return ResponseEntity.ok(response);
	}

}

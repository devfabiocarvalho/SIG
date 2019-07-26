package br.com.itv.api.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.itv.api.entities.TipoIndicador;
import br.com.itv.api.responses.Response;
import br.com.itv.api.services.TipoIndicadorService;

@RestController
@RequestMapping("/api/tipoindicador")
public class TipoIndicadorController {
	
	@Autowired
	private TipoIndicadorService tipoIdicadorService;
	
	@CrossOrigin
	@GetMapping()
	public ResponseEntity<Response<TipoIndicador>> getTiposDeIndicadores() {
		Response<TipoIndicador> response = new Response<TipoIndicador>();
		List<TipoIndicador> indicadors = tipoIdicadorService.getAll();
		response.setData(indicadors);
		return ResponseEntity.ok(response);
	}	
}

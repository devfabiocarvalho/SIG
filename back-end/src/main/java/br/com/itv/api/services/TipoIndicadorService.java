package br.com.itv.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.itv.api.entities.TipoIndicador;
import br.com.itv.api.repositories.TipoIndicadorRepository;

@Service
public class TipoIndicadorService {
	
	@Autowired
	private TipoIndicadorRepository tipoIndicadorRepository;
	
	public List<TipoIndicador> getAll() {
		return tipoIndicadorRepository.findAll();
	}

}

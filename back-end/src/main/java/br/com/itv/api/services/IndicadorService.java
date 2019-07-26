package br.com.itv.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.itv.api.entities.Indicador;
import br.com.itv.api.entities.TipoIndicador;
import br.com.itv.api.repositories.IndicadorRepository;

@Service
public class IndicadorService {
	
	@Autowired
	private IndicadorRepository indicadorRepository;
	
	public List<Indicador> getAll() {
		return indicadorRepository.findAll();
	}

	public List<Indicador> getIndicadorPorTipo(Integer tipo) {
		return indicadorRepository.findByTipoIndicador(new TipoIndicador(tipo));
	}

}

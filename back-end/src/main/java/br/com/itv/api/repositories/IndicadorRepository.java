package br.com.itv.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.itv.api.entities.Indicador;
import br.com.itv.api.entities.TipoIndicador;

public interface IndicadorRepository extends JpaRepository<Indicador, Integer>{
	
	List<Indicador> findByTipoIndicador(TipoIndicador tipoIndicador);
	
}

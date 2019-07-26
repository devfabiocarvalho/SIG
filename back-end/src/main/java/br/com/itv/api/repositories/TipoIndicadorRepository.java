package br.com.itv.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.itv.api.entities.TipoIndicador;

public interface TipoIndicadorRepository extends JpaRepository<TipoIndicador, Integer> {

}

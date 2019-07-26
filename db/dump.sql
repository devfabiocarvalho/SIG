--
-- PostgreSQL database dump
--

-- Dumped from database version 10.9 (Ubuntu 10.9-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.9 (Ubuntu 10.9-0ubuntu0.18.04.1)

-- Started on 2019-07-25 23:36:29 -03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2939 (class 0 OID 0)
-- Dependencies: 2938
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- TOC entry 1 (class 3079 OID 13043)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2941 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 199 (class 1259 OID 16403)
-- Name: indicador; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.indicador (
    id integer NOT NULL,
    valor double precision NOT NULL,
    municipio_id integer NOT NULL,
    tipo_indicador_id integer NOT NULL
);


ALTER TABLE public.indicador OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 16389)
-- Name: municipio; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.municipio (
    id integer NOT NULL,
    geocodigo integer NOT NULL,
    nome character(80) NOT NULL,
    uf_id integer NOT NULL
);


ALTER TABLE public.municipio OWNER TO postgres;

--
-- TOC entry 198 (class 1259 OID 16398)
-- Name: tipo_indicador; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipo_indicador (
    id integer NOT NULL,
    nome character(50) NOT NULL
);


ALTER TABLE public.tipo_indicador OWNER TO postgres;

--
-- TOC entry 196 (class 1259 OID 16384)
-- Name: uf; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.uf (
    id integer NOT NULL,
    nome character(2) NOT NULL
);


ALTER TABLE public.uf OWNER TO postgres;

--
-- TOC entry 2808 (class 2606 OID 16407)
-- Name: indicador indicador_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.indicador
    ADD CONSTRAINT indicador_pkey PRIMARY KEY (id);


--
-- TOC entry 2802 (class 2606 OID 16393)
-- Name: municipio municipio_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.municipio
    ADD CONSTRAINT municipio_pkey PRIMARY KEY (id);


--
-- TOC entry 2804 (class 2606 OID 16402)
-- Name: tipo_indicador tipo_indicador_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_indicador
    ADD CONSTRAINT tipo_indicador_pkey PRIMARY KEY (id);


--
-- TOC entry 2799 (class 2606 OID 16388)
-- Name: uf uf_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uf
    ADD CONSTRAINT uf_pkey PRIMARY KEY (id);


--
-- TOC entry 2805 (class 1259 OID 16419)
-- Name: fki_municipio_fkey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_municipio_fkey ON public.indicador USING btree (municipio_id);


--
-- TOC entry 2806 (class 1259 OID 16425)
-- Name: fki_tipo_indicador_fkey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_tipo_indicador_fkey ON public.indicador USING btree (tipo_indicador_id);


--
-- TOC entry 2800 (class 1259 OID 16413)
-- Name: fki_uf; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_uf ON public.municipio USING btree (uf_id);


--
-- TOC entry 2810 (class 2606 OID 16414)
-- Name: indicador municipio_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.indicador
    ADD CONSTRAINT municipio_fkey FOREIGN KEY (municipio_id) REFERENCES public.municipio(id);


--
-- TOC entry 2811 (class 2606 OID 16420)
-- Name: indicador tipo_indicador_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.indicador
    ADD CONSTRAINT tipo_indicador_fkey FOREIGN KEY (tipo_indicador_id) REFERENCES public.tipo_indicador(id);


--
-- TOC entry 2809 (class 2606 OID 16408)
-- Name: municipio uf_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.municipio
    ADD CONSTRAINT uf_fkey FOREIGN KEY (uf_id) REFERENCES public.uf(id);


-- Completed on 2019-07-25 23:36:29 -03

--
-- PostgreSQL database dump complete
--
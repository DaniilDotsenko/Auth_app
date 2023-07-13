--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8 (Homebrew)
-- Dumped by pg_dump version 14.8 (Homebrew)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

CREATE DATABASE auth_test_db;

\connect auth_test_db;

--
-- Name: Passwords; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Passwords" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    hash character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Passwords" OWNER TO postgres;

--
-- Name: Passwords_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Passwords_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Passwords_id_seq" OWNER TO postgres;

--
-- Name: Passwords_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Passwords_id_seq" OWNED BY public."Passwords".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_id_seq" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: Passwords id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Passwords" ALTER COLUMN id SET DEFAULT nextval('public."Passwords_id_seq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Data for Name: Passwords; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Passwords" (id, "userId", hash, "createdAt", "updatedAt") FROM stdin;
3	11	$2b$10$mCq1FOa4mezzBa3SFBo7sOSNCVnD9hNg0KZIl4OaGUoZL04Y3hjOC	2023-07-11 12:16:57.375+03	2023-07-11 12:16:57.375+03
4	12	$2b$10$3rhEMudBBxID8BJf43KYAeBZLkUzcjaBDnzwA5EhJyIP81n6sxM7W	2023-07-11 12:26:30.825+03	2023-07-11 12:26:30.825+03
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" (id, email, "createdAt", "updatedAt") FROM stdin;
11	test@test.com	2023-07-11 12:16:57.36+03	2023-07-11 12:16:57.36+03
12	test1@test.com	2023-07-11 12:26:30.795+03	2023-07-11 12:26:30.795+03
\.


--
-- Name: Passwords_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Passwords_id_seq"', 8, true);


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_id_seq"', 16, true);


--
-- Name: Passwords Passwords_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Passwords"
    ADD CONSTRAINT "Passwords_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: Passwords Passwords_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Passwords"
    ADD CONSTRAINT "Passwords_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE;


--
-- PostgreSQL database dump complete
--
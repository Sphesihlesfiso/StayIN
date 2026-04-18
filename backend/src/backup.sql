--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

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
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: GenderRestriction; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."GenderRestriction" AS ENUM (
    'MALE_ONLY',
    'FEMALE_ONLY',
    'MIXED'
);


ALTER TYPE public."GenderRestriction" OWNER TO postgres;

--
-- Name: PropertyType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."PropertyType" AS ENUM (
    'SINGLE',
    'SHARING'
);


ALTER TYPE public."PropertyType" OWNER TO postgres;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Role" AS ENUM (
    'LANDLORD',
    'TENANT'
);


ALTER TYPE public."Role" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Amenity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Amenity" (
    id integer NOT NULL,
    name text NOT NULL,
    "propertyId" integer NOT NULL
);


ALTER TABLE public."Amenity" OWNER TO postgres;

--
-- Name: Amenity_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Amenity_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Amenity_id_seq" OWNER TO postgres;

--
-- Name: Amenity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Amenity_id_seq" OWNED BY public."Amenity".id;


--
-- Name: Comment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Comment" (
    id integer NOT NULL,
    content text NOT NULL,
    rating double precision NOT NULL,
    "propertyId" integer NOT NULL,
    "timestamp" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "commenterId" integer NOT NULL
);


ALTER TABLE public."Comment" OWNER TO postgres;

--
-- Name: Comment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Comment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Comment_id_seq" OWNER TO postgres;

--
-- Name: Comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Comment_id_seq" OWNED BY public."Comment".id;


--
-- Name: NearbyPlace; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."NearbyPlace" (
    id integer NOT NULL,
    name text NOT NULL,
    type text NOT NULL,
    distance double precision NOT NULL,
    "nearByPlaceId" integer NOT NULL
);


ALTER TABLE public."NearbyPlace" OWNER TO postgres;

--
-- Name: NearbyPlace_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."NearbyPlace_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."NearbyPlace_id_seq" OWNER TO postgres;

--
-- Name: NearbyPlace_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."NearbyPlace_id_seq" OWNED BY public."NearbyPlace".id;


--
-- Name: Property; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Property" (
    id integer NOT NULL,
    name text NOT NULL,
    address text NOT NULL,
    rent numeric(10,2) NOT NULL,
    deposit numeric(10,2),
    "nsfasAccredited" boolean DEFAULT false NOT NULL,
    gas integer,
    water integer,
    electricity integer,
    about text NOT NULL,
    rules text NOT NULL,
    "landlordId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "genderRestriction" public."GenderRestriction" NOT NULL,
    "propertyType" public."PropertyType" NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    surburb text NOT NULL,
    town text NOT NULL
);


ALTER TABLE public."Property" OWNER TO postgres;

--
-- Name: Property_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Property_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Property_id_seq" OWNER TO postgres;

--
-- Name: Property_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Property_id_seq" OWNED BY public."Property".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role public."Role" DEFAULT 'TENANT'::public."Role" NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."User_id_seq" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: Amenity id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Amenity" ALTER COLUMN id SET DEFAULT nextval('public."Amenity_id_seq"'::regclass);


--
-- Name: Comment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comment" ALTER COLUMN id SET DEFAULT nextval('public."Comment_id_seq"'::regclass);


--
-- Name: NearbyPlace id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NearbyPlace" ALTER COLUMN id SET DEFAULT nextval('public."NearbyPlace_id_seq"'::regclass);


--
-- Name: Property id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Property" ALTER COLUMN id SET DEFAULT nextval('public."Property_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Data for Name: Amenity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Amenity" (id, name, "propertyId") FROM stdin;
\.


--
-- Data for Name: Comment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Comment" (id, content, rating, "propertyId", "timestamp", "commenterId") FROM stdin;
3	Anginjoyanga!	0	3	2026-04-01 20:16:27.72	1
4	Great property, really enjoyed my stay!	4.5	1	2026-04-01 20:13:01.876	1
\.


--
-- Data for Name: NearbyPlace; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."NearbyPlace" (id, name, type, distance, "nearByPlaceId") FROM stdin;
\.


--
-- Data for Name: Property; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Property" (id, name, address, rent, deposit, "nsfasAccredited", gas, water, electricity, about, rules, "landlordId", "createdAt", "genderRestriction", "propertyType", "updatedAt", surburb, town) FROM stdin;
3	Backroom Idas Vallei	12 Main Road	3500.00	3500.00	f	200	300	400	Clean student accommodation close to campus.	No loud music after 10pm. No smoking indoors.	1	2026-04-01 05:46:41.343	MIXED	SINGLE	2026-04-01 05:46:41.343	Idas Valley	Stellenbosch
4	Backroom Idas Vallei	12 Main Road	1500.00	3500.00	f	200	300	400	Clean student accommodation close to campus.	No loud music after 10pm. No smoking indoors.	1	2026-04-01 05:54:35.727	MIXED	SINGLE	2026-04-01 05:54:35.727	Idas Valley	Stellenbosch
5	Backroom Idas Vallei	12 Main Road	1500.00	3500.00	f	200	300	400	Clean student accommodation close to campus.	No loud music after 10pm. No smoking indoors.	1	2026-04-01 06:01:40.87	MIXED	SINGLE	2026-04-01 06:01:40.87	Idas Valley	Stellenbosch
6	Backroom Idas Vallei	12 Main Road	1500.00	3500.00	t	200	300	400	Clean student accommodation close to campus.	No loud music after 10pm. No smoking indoors.	1	2026-04-01 06:02:00.341	MIXED	SINGLE	2026-04-01 06:02:00.341	Idas Valley	Stellenbosch
1	Campus	12 Main Road	3500.00	3500.00	f	200	300	400	Clean student accommodation close to campus.	No loud music after 10pm. No smoking indoors.	1	2026-04-01 05:45:17.772	MIXED	SINGLE	2026-04-01 21:13:23.38	Idas Valley	Stellenbosch
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, username, email, password, role) FROM stdin;
1	john_doe	john@example.com	hashed_password_here	LANDLORD
3	sphesihle	sphe@gmail.com	1234	TENANT
5	phesihle	s@gmail.com	1234	TENANT
8	werthesihle	wer@gmail.com	1234	TENANT
11	qssihle	sdpd@gmail.com	$2b$10$R042Mpl.pjHReudA4c9W0OVAVjf/jJZl3hKYyUg9PnJqA016iIDzK	TENANT
12	ssihle	dpd@gmail.com	$2b$10$zVvp/xGa8/vLpQ9.Gu2woujbHXN21j/y6c6/Og8DI.kRwaqaWSXVq	TENANT
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
9222c89d-bbcf-4f1d-8c63-0ffe35f2cd86	392e8db1b1f54ef9106dadcd4bba5ed430c0c69c6ec058b05a158de311ff4e09	2026-03-31 12:50:56.91765+02	20260330192325_stay_in_v1	\N	\N	2026-03-31 12:50:56.857049+02	1
b822d4f1-875c-4558-a3a5-fb4061bea8f6	a31f15fe58a116d539ed4b4119efc4c26d81097d867bc469a3d0cff63a34e18f	2026-03-31 12:50:56.93515+02	20260331104041_used_enums_on_property	\N	\N	2026-03-31 12:50:56.918602+02	1
2f55eaba-c206-4713-8bc1-9d5bdaf146ef	3b923a93d8d80ccb38574e7a2a504ab226cbd32d58320c75880ba349cd81f38f	2026-03-31 12:51:35.842541+02	20260331105135_added_town_and_subrurb_in_proprty	\N	\N	2026-03-31 12:51:35.828684+02	1
\.


--
-- Name: Amenity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Amenity_id_seq"', 1, false);


--
-- Name: Comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Comment_id_seq"', 4, true);


--
-- Name: NearbyPlace_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."NearbyPlace_id_seq"', 1, false);


--
-- Name: Property_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Property_id_seq"', 6, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 12, true);


--
-- Name: Amenity Amenity_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Amenity"
    ADD CONSTRAINT "Amenity_pkey" PRIMARY KEY (id);


--
-- Name: Comment Comment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_pkey" PRIMARY KEY (id);


--
-- Name: NearbyPlace NearbyPlace_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NearbyPlace"
    ADD CONSTRAINT "NearbyPlace_pkey" PRIMARY KEY (id);


--
-- Name: Property Property_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Property"
    ADD CONSTRAINT "Property_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Property_propertyType_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Property_propertyType_idx" ON public."Property" USING btree ("propertyType");


--
-- Name: Property_rent_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Property_rent_idx" ON public."Property" USING btree (rent);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_username_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_username_key" ON public."User" USING btree (username);


--
-- Name: Amenity Amenity_propertyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Amenity"
    ADD CONSTRAINT "Amenity_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES public."Property"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Comment Comment_commenterId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_commenterId_fkey" FOREIGN KEY ("commenterId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Comment Comment_propertyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES public."Property"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: NearbyPlace NearbyPlace_nearByPlaceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NearbyPlace"
    ADD CONSTRAINT "NearbyPlace_nearByPlaceId_fkey" FOREIGN KEY ("nearByPlaceId") REFERENCES public."Property"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Property Property_landlordId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Property"
    ADD CONSTRAINT "Property_landlordId_fkey" FOREIGN KEY ("landlordId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--


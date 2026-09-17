(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={auto_f4:{id:`auto_f4`,tier:4,name:`Formula 4 Regional Championship`,realSeriesName:`FIA Formula 4 Regional Championship`,minAge:16,calendar:[`misano`,`imola`,`red_bull_ring`,`mugello`,`barcelona`,`jerez`,`monza`],weekendFormat:{practiceLaps:5,qualiLaps:3,raceLapsMultiplier:.35,pitStops:!1},licensePointsAwarded:12,prizeBudgetPerRace:1e4,teams:[{id:`f4_cram`,fictionalName:`Cram Scuderia Giovani`,realName:`Cram Motorsport`,carPace:72,reliability:80,color:`#c40000`,country:`ITA`},{id:`f4_jenzer`,fictionalName:`Jenzer Helvetia Racing`,realName:`Jenzer Motorsport`,carPace:74,reliability:85,color:`#0055a5`,country:`CHE`},{id:`f4_iron_lynx`,fictionalName:`Lince Rossa Junior Team`,realName:`Iron Lynx Academy`,carPace:76,reliability:88,color:`#e10600`,country:`ITA`},{id:`f4_bhaechler`,fictionalName:`Bavaria Young Talents`,realName:`Bhaechler Junior Racing`,carPace:71,reliability:82,color:`#333333`,country:`DEU`}],roster:[{id:`drv_f4_1`,fictionalName:`Marco Fulmine`,realName:`Matteo De Palo`,teamId:`f4_iron_lynx`,ovr:72,nationality:`ITA`},{id:`drv_f4_2`,fictionalName:`Lukas Schnell`,realName:`Luka Sammalisto`,teamId:`f4_jenzer`,ovr:71,nationality:`FIN`},{id:`drv_f4_3`,fictionalName:`Enzo Pignone`,realName:`Enzo Deligny`,teamId:`f4_cram`,ovr:70,nationality:`FRA`},{id:`drv_f4_4`,fictionalName:`Hans Von Berg`,realName:`Maxim Rehm`,teamId:`f4_bhaechler`,ovr:69,nationality:`DEU`}]},auto_f3:{id:`auto_f3`,tier:3,name:`Formula 3 International`,realSeriesName:`FIA Formula 3 Championship 2026`,minAge:17,calendar:[`melbourne`,`bahrain`,`imola`,`monaco`,`barcelona`,`red_bull_ring`,`silverstone`,`spa`,`hungaroring`,`monza`],weekendFormat:{practiceLaps:6,qualiLaps:4,raceLapsMultiplier:.45,pitStops:!1},licensePointsAwarded:25,prizeBudgetPerRace:28e3,teams:[{id:`f3_trident`,fictionalName:`Tridente Corse`,realName:`Trident Motorsport`,carPace:81,reliability:86,color:`#0047ba`,country:`ITA`},{id:`f3_campos`,fictionalName:`Campos Iberia GP`,realName:`Campos Racing`,carPace:80,reliability:84,color:`#f2a900`,country:`ESP`},{id:`f3_van_amersfoort`,fictionalName:`Van Tulip Racing`,realName:`Van Amersfoort Racing`,carPace:78,reliability:82,color:`#ff7900`,country:`NLD`},{id:`f3_dams`,fictionalName:`DAMS Bleu Racing`,realName:`DAMS Lucas Oil`,carPace:79,reliability:85,color:`#002f6c`,country:`FRA`}],roster:[{id:`drv_f3_1`,fictionalName:`Mariano El Torero`,realName:`Mari Boya`,teamId:`f3_campos`,ovr:78,nationality:`ESP`},{id:`drv_f3_2`,fictionalName:`Noel Storm`,realName:`Noel León`,teamId:`f3_van_amersfoort`,ovr:77,nationality:`MEX`},{id:`drv_f3_3`,fictionalName:`Dino Cavallini`,realName:`Dino Beganovic`,teamId:`f3_dams`,ovr:79,nationality:`SWE`},{id:`drv_f3_4`,fictionalName:`Sami Meguetounif`,realName:`Sami Meguetounif`,teamId:`f3_trident`,ovr:78,nationality:`FRA`}]},auto_f2:{id:`auto_f2`,tier:2,name:`Formula 2 World Series`,realSeriesName:`FIA Formula 2 Championship 2026`,minAge:19,calendar:[`melbourne`,`bahrain`,`jeddah`,`imola`,`monaco`,`barcelona`,`red_bull_ring`,`silverstone`,`spa`,`hungaroring`,`monza`,`baku`,`lusail`,`yas_marina`],weekendFormat:{practiceLaps:8,qualiLaps:5,raceLapsMultiplier:.6,pitStops:!0},licensePointsAwarded:40,prizeBudgetPerRace:8e4,teams:[{id:`f2_prema`,fictionalName:`Prima Squadra Corse`,realName:`PREMA Racing`,carPace:87,reliability:88,color:`#e60000`,country:`ITA`},{id:`f2_invicta`,fictionalName:`Invicta Golden Arrows`,realName:`Invicta Racing`,carPace:87,reliability:86,color:`#ffd700`,country:`GBR`},{id:`f2_art`,fictionalName:`ART Grand Prix Paris`,realName:`ART Grand Prix`,carPace:86,reliability:87,color:`#ffffff`,country:`FRA`},{id:`f2_mp`,fictionalName:`Orange MP Speed`,realName:`MP Motorsport`,carPace:85,reliability:86,color:`#ff6600`,country:`NLD`},{id:`f2_rodin`,fictionalName:`Rodin Down Under`,realName:`Rodin Motorsport`,carPace:84,reliability:84,color:`#002050`,country:`NZL`},{id:`f2_hitech`,fictionalName:`Hitech Pulse Engineering`,realName:`Hitech Pulse-Eight`,carPace:83,reliability:83,color:`#b0b0b0`,country:`GBR`}],roster:[{id:`drv_mini`,fictionalName:`Gabriele Veloce`,realName:`Gabriele Minì`,teamId:`f2_prema`,ovr:83,nationality:`ITA`},{id:`drv_fornaroli`,fictionalName:`Leo Campione`,realName:`Leonardo Fornaroli`,teamId:`f2_invicta`,ovr:83,nationality:`ITA`},{id:`drv_martins`,fictionalName:`Victor Parigino`,realName:`Victor Martins`,teamId:`f2_art`,ovr:82,nationality:`FRA`},{id:`drv_aron`,fictionalName:`Paul D'Argent`,realName:`Paul Aron`,teamId:`f2_hitech`,ovr:83,nationality:`EST`}]},auto_f1:{id:`auto_f1`,tier:1,name:`Formula Apex World Championship 2026`,realSeriesName:`Formula 1 World Championship 2026 (11 Teams)`,minAge:20,calendar:[`melbourne`,`shanghai`,`suzuka`,`bahrain`,`jeddah`,`miami`,`imola`,`monaco`,`montreal`,`barcelona`,`red_bull_ring`,`silverstone`,`spa`,`hungaroring`,`zandvoort`,`monza`,`madrid`,`baku`,`singapore`,`cota`,`mexico`,`interlagos`,`las_vegas`,`lusail`,`yas_marina`],weekendFormat:{practiceLaps:10,qualiLaps:6,raceLapsMultiplier:1,pitStops:!0},licensePointsAwarded:50,prizeBudgetPerRace:48e4,teams:[{id:`f1_mclaren`,fictionalName:`Papaya Rocket F1 (Norris #1/Piastri)`,realName:`McLaren F1 Team`,carPace:97,reliability:95,aero:97,power:96,chassis:97,color:`#ff8000`,country:`GBR`},{id:`f1_ferrari`,fictionalName:`Scuderia Cavallino HP (Hamilton/Leclerc)`,realName:`Scuderia Ferrari HP`,carPace:96,reliability:93,aero:95,power:97,chassis:95,color:`#e10600`,country:`ITA`},{id:`f1_redbull`,fictionalName:`Red Bullish Ford (Verstappen/Hadjar)`,realName:`Oracle Red Bull Racing`,carPace:96,reliability:92,aero:96,power:95,chassis:95,color:`#1e41ff`,country:`AUT`},{id:`f1_mercedes`,fictionalName:`Silver Star NextGen (Russell/Antonelli)`,realName:`Mercedes-AMG PETRONAS`,carPace:94,reliability:95,aero:94,power:96,chassis:94,color:`#00d2be`,country:`DEU`},{id:`f1_aston`,fictionalName:`British Green Newey Honda (Alonso/Stroll)`,realName:`Aston Martin Aramco F1 Team`,carPace:93,reliability:92,aero:95,power:94,chassis:92,color:`#00665e`,country:`GBR`},{id:`f1_williams`,fictionalName:`Williams Smooth Revival (Sainz/Albon)`,realName:`Williams Racing`,carPace:90,reliability:91,aero:89,power:94,chassis:89,color:`#00a0dd`,country:`GBR`},{id:`f1_cadillac`,fictionalName:`General Motors American Dream (Pérez/Bottas)`,realName:`Cadillac Formula 1 Team`,carPace:88,reliability:89,aero:87,power:93,chassis:87,color:`#c4a000`,country:`USA`},{id:`f1_audi`,fictionalName:`Audi German Ring Factory (Hülk/Bortoleto)`,realName:`Audi Revolut F1 Team`,carPace:88,reliability:89,aero:87,power:89,chassis:88,color:`#e00000`,country:`DEU`},{id:`f1_haas`,fictionalName:`Haas Stars & Stripes Toyota (Ocon/Bearman)`,realName:`MoneyGram Haas F1 Team Toyota`,carPace:87,reliability:88,aero:86,power:94,chassis:86,color:`#b6babd`,country:`USA`},{id:`f1_rb`,fictionalName:`Racing Bulls Faenza (Lawson/Lindblad)`,realName:`Visa Cash App Racing Bulls F1`,carPace:87,reliability:89,aero:87,power:93,chassis:86,color:`#1634ca`,country:`ITA`},{id:`f1_alpine`,fictionalName:`Bleu Alpine Mercedes (Gasly/Colapinto)`,realName:`BWT Alpine F1 Team`,carPace:86,reliability:87,aero:85,power:94,chassis:86,color:`#0090ff`,country:`FRA`}],roster:[{id:`drv_norris`,fictionalName:`Lando Porris Il Campione`,realName:`Lando Norris`,teamId:`f1_mclaren`,ovr:95,number:1,nationality:`GBR`,pace:96,racecraft:94,tyreMgmt:95,consistency:94,wetSkill:95},{id:`drv_piastri`,fictionalName:`Oscar Glaciale`,realName:`Oscar Piastri`,teamId:`f1_mclaren`,ovr:92,number:81,nationality:`AUS`,pace:93,racecraft:92,tyreMgmt:91,consistency:94,wetSkill:91},{id:`drv_hamilton`,fictionalName:`Sir Lewis Spamilton in Rosso`,realName:`Lewis Hamilton`,teamId:`f1_ferrari`,ovr:95,number:44,nationality:`GBR`,pace:95,racecraft:97,tyreMgmt:97,consistency:95,wetSkill:98},{id:`drv_leclerc`,fictionalName:`Charles Predestinato`,realName:`Charles Leclerc`,teamId:`f1_ferrari`,ovr:94,number:16,nationality:`MCO`,pace:98,racecraft:93,tyreMgmt:92,consistency:91,wetSkill:93},{id:`drv_verstappen`,fictionalName:`Max Versteppin Lo Sterminatore`,realName:`Max Verstappen`,teamId:`f1_redbull`,ovr:97,number:33,nationality:`NLD`,pace:98,racecraft:98,tyreMgmt:95,consistency:98,wetSkill:99},{id:`drv_hadjar`,fictionalName:`Isack Rapace`,realName:`Isack Hadjar`,teamId:`f1_redbull`,ovr:83,number:6,nationality:`FRA`,pace:85,racecraft:84,tyreMgmt:82,consistency:82,wetSkill:84},{id:`drv_russell`,fictionalName:`George Righello`,realName:`George Russell`,teamId:`f1_mercedes`,ovr:91,number:63,nationality:`GBR`,pace:93,racecraft:91,tyreMgmt:91,consistency:92,wetSkill:92},{id:`drv_antonelli`,fictionalName:`Kimi Prodigio Nazionale`,realName:`Andrea Kimi Antonelli`,teamId:`f1_mercedes`,ovr:87,number:12,nationality:`ITA`,pace:91,racecraft:87,tyreMgmt:85,consistency:85,wetSkill:89},{id:`drv_alonso`,fictionalName:`Fernando Alonslow Il Samurai`,realName:`Fernando Alonso`,teamId:`f1_aston`,ovr:91,number:14,nationality:`ESP`,pace:90,racecraft:97,tyreMgmt:94,consistency:95,wetSkill:94},{id:`drv_stroll`,fictionalName:`Lance Milliardo`,realName:`Lance Stroll`,teamId:`f1_aston`,ovr:81,number:18,nationality:`CAN`,pace:80,racecraft:81,tyreMgmt:82,consistency:79,wetSkill:86},{id:`drv_sainz`,fictionalName:`Carlos Operatore Liscio`,realName:`Carlos Sainz Jr.`,teamId:`f1_williams`,ovr:91,number:55,nationality:`ESP`,pace:91,racecraft:93,tyreMgmt:93,consistency:93,wetSkill:90},{id:`drv_albon`,fictionalName:`Alex Redivivo`,realName:`Alexander Albon`,teamId:`f1_williams`,ovr:86,number:23,nationality:`THA`,pace:87,racecraft:88,tyreMgmt:87,consistency:86,wetSkill:86},{id:`drv_perez`,fictionalName:`Checo Ministro Americano`,realName:`Sergio Pérez`,teamId:`f1_cadillac`,ovr:86,number:11,nationality:`MEX`,pace:86,racecraft:87,tyreMgmt:91,consistency:85,wetSkill:86},{id:`drv_bottas`,fictionalName:`Valtteri Baffo Bottas`,realName:`Valtteri Bottas`,teamId:`f1_cadillac`,ovr:85,number:77,nationality:`FIN`,pace:86,racecraft:85,tyreMgmt:86,consistency:88,wetSkill:87},{id:`drv_hulkenberg`,fictionalName:`Nico Il Pompiere Audi`,realName:`Nico Hülkenberg`,teamId:`f1_audi`,ovr:85,number:27,nationality:`DEU`,pace:87,racecraft:85,tyreMgmt:84,consistency:89,wetSkill:87},{id:`drv_bortoleto`,fictionalName:`Gabriel Carioca Sauber-Audi`,realName:`Gabriel Bortoleto`,teamId:`f1_audi`,ovr:84,number:5,nationality:`BRA`,pace:86,racecraft:84,tyreMgmt:83,consistency:84,wetSkill:85},{id:`drv_ocon`,fictionalName:`Esteban Barricata`,realName:`Esteban Ocon`,teamId:`f1_haas`,ovr:85,number:31,nationality:`FRA`,pace:85,racecraft:88,tyreMgmt:85,consistency:85,wetSkill:87},{id:`drv_bearman`,fictionalName:`Ollie Orsetto`,realName:`Oliver Bearman`,teamId:`f1_haas`,ovr:84,number:87,nationality:`GBR`,pace:86,racecraft:85,tyreMgmt:82,consistency:83,wetSkill:84},{id:`drv_lawson`,fictionalName:`Liam Kiwiboy`,realName:`Liam Lawson`,teamId:`f1_rb`,ovr:85,number:30,nationality:`NZL`,pace:86,racecraft:86,tyreMgmt:84,consistency:85,wetSkill:86},{id:`drv_lindblad`,fictionalName:`Arvid Il Giovane Vichingo`,realName:`Arvid Lindblad`,teamId:`f1_rb`,ovr:81,number:8,nationality:`GBR`,pace:83,racecraft:82,tyreMgmt:80,consistency:81,wetSkill:82},{id:`drv_gasly`,fictionalName:`Pierre Riscatto`,realName:`Pierre Gasly`,teamId:`f1_alpine`,ovr:85,number:10,nationality:`FRA`,pace:85,racecraft:86,tyreMgmt:85,consistency:85,wetSkill:87},{id:`drv_colapinto`,fictionalName:`Franco Pampa Express`,realName:`Franco Colapinto`,teamId:`f1_alpine`,ovr:84,number:43,nationality:`ARG`,pace:86,racecraft:86,tyreMgmt:83,consistency:84,wetSkill:85}]},auto_wec:{id:`auto_wec`,tier:1,name:`Hypercar World Endurance`,realSeriesName:`FIA World Endurance Championship (Hypercar) 2026`,minAge:21,calendar:[`lusail`,`imola`,`spa`,`le_mans`,`interlagos`,`cota`,`suzuka`,`bahrain`],weekendFormat:{practiceLaps:12,qualiLaps:6,raceLapsMultiplier:1.2,pitStops:!0},licensePointsAwarded:40,prizeBudgetPerRace:34e4,teams:[{id:`wec_ferrari_af`,fictionalName:`Cavallino Sarthe Hypercar (499P)`,realName:`Ferrari AF Corse Hypercar`,carPace:95,reliability:94,color:`#e10600`,country:`ITA`},{id:`wec_toyota`,fictionalName:`Sol Levante Hybrid 24 (GR010)`,realName:`Toyota Gazoo Racing`,carPace:94,reliability:95,color:`#ffffff`,country:`JPN`},{id:`wec_porsche`,fictionalName:`Stuttgart Penske Prototype (963)`,realName:`Porsche Penske Motorsport`,carPace:95,reliability:94,color:`#000000`,country:`DEU`},{id:`wec_cadillac`,fictionalName:`Detroit Thunder JOTA (V-Series.R)`,realName:`Cadillac Hertz Team JOTA`,carPace:92,reliability:91,color:`#d4af37`,country:`USA`}],roster:[{id:`drv_fuoco`,fictionalName:`Antonio Fiamma`,realName:`Antonio Fuoco`,teamId:`wec_ferrari_af`,ovr:91,nationality:`ITA`},{id:`drv_giovinazzi`,fictionalName:`Antonio Redentore`,realName:`Antonio Giovinazzi`,teamId:`wec_ferrari_af`,ovr:89,nationality:`ITA`},{id:`drv_estre`,fictionalName:`Kévin Sorpassatutto`,realName:`Kévin Estre`,teamId:`wec_porsche`,ovr:91,nationality:`FRA`},{id:`drv_kobayashi`,fictionalName:`Kamui Kamikaze`,realName:`Kamui Kobayashi`,teamId:`wec_toyota`,ovr:89,nationality:`JPN`}]},auto_indy:{id:`auto_indy`,tier:1,name:`American Open Wheel Series`,realSeriesName:`NTT IndyCar Series 2026`,minAge:20,calendar:[`miami`,`cota`,`indianapolis`,`silverstone`,`red_bull_ring`,`interlagos`,`las_vegas`],weekendFormat:{practiceLaps:10,qualiLaps:4,raceLapsMultiplier:.9,pitStops:!0},licensePointsAwarded:40,prizeBudgetPerRace:29e4,teams:[{id:`indy_ganassi`,fictionalName:`Ganassi Victory Factory`,realName:`Chip Ganassi Racing`,carPace:95,reliability:95,color:`#003da5`,country:`USA`},{id:`indy_penske`,fictionalName:`The Captain Penske Team`,realName:`Team Penske`,carPace:94,reliability:94,color:`#e31837`,country:`USA`},{id:`indy_arrow_mclaren`,fictionalName:`Arrow Papaya America`,realName:`Arrow McLaren IndyCar Team`,carPace:93,reliability:91,color:`#ff8000`,country:`USA`},{id:`indy_andretti`,fictionalName:`Andretti Global Dynasty`,realName:`Andretti Global`,carPace:92,reliability:90,color:`#002b49`,country:`USA`}],roster:[{id:`drv_palou`,fictionalName:`Alex Matematico`,realName:`Alex Palou`,teamId:`indy_ganassi`,ovr:93,nationality:`ESP`},{id:`drv_newgarden`,fictionalName:`Joe Newgarden`,realName:`Josef Newgarden`,teamId:`indy_penske`,ovr:90,nationality:`USA`},{id:`drv_oward`,fictionalName:`Pato Pato`,realName:`Pato O'Ward`,teamId:`indy_arrow_mclaren`,ovr:90,nationality:`MEX`},{id:`drv_dixon`,fictionalName:`Scott L'Immortale`,realName:`Scott Dixon`,teamId:`indy_ganassi`,ovr:90,nationality:`NZL`}]}},t={moto_3:{id:`moto_3`,tier:4,name:`Moto3 Junior World GP`,realSeriesName:`FIM Moto3 World Championship 2026`,minAge:16,calendar:[`buriram`,`cota`,`jerez`,`le_mans`,`barcelona`,`mugello`,`brno`,`assen`,`sachsenring`,`silverstone`,`red_bull_ring`,`misano`,`phillip_island`,`valencia`],weekendFormat:{practiceLaps:6,qualiLaps:4,raceLapsMultiplier:.5,hasSprint:!1},licensePointsAwarded:15,prizeBudgetPerRace:14e3,teams:[{id:`m3_aspar`,fictionalName:`Aspar Cyan CFMOTO`,realName:`CFMOTO Gaviota Aspar Team`,bikePace:77,reliability:88,color:`#00acc1`,country:`ESP`},{id:`m3_redbull_ajo`,fictionalName:`Ajo Orange Rookies KTM`,realName:`Red Bull KTM Ajo Moto3`,bikePace:78,reliability:89,color:`#ff6600`,country:`FIN`},{id:`m3_leopard`,fictionalName:`Ghepardo Celesta Honda`,realName:`Leopard Racing`,bikePace:76,reliability:86,color:`#00e5ff`,country:`LUX`},{id:`m3_sic58`,fictionalName:`Squadra Corse 58 Marco`,realName:`SIC58 Squadra Corse`,bikePace:75,reliability:85,color:`#d50000`,country:`ITA`},{id:`m3_tech3`,fictionalName:`Tech3 Red Bull Junior`,realName:`Red Bull KTM Tech3 Moto3`,bikePace:76,reliability:87,color:`#ff3300`,country:`FRA`}],roster:[{id:`rid_m3_1`,fictionalName:`Ivan Freccia`,realName:`Iván Ortolá`,teamId:`m3_redbull_ajo`,ovr:83,nationality:`ESP`},{id:`rid_m3_2`,fictionalName:`Luca Lunetta`,realName:`Luca Lunetta`,teamId:`m3_sic58`,ovr:81,nationality:`ITA`},{id:`rid_m3_3`,fictionalName:`Collin Olandese`,realName:`Collin Veijer`,teamId:`m3_leopard`,ovr:84,nationality:`NLD`},{id:`rid_m3_4`,fictionalName:`Maximo Quiles`,realName:`Máximo Quiles`,teamId:`m3_aspar`,ovr:80,nationality:`ESP`}]},moto_2:{id:`moto_2`,tier:3,name:`Moto2 Intermediate GP`,realSeriesName:`FIM Moto2 World Championship 2026`,minAge:18,calendar:[`buriram`,`cota`,`jerez`,`le_mans`,`barcelona`,`mugello`,`brno`,`assen`,`sachsenring`,`silverstone`,`red_bull_ring`,`aragon`,`misano`,`phillip_island`,`sepang`,`valencia`],weekendFormat:{practiceLaps:8,qualiLaps:4,raceLapsMultiplier:.65,hasSprint:!1},licensePointsAwarded:30,prizeBudgetPerRace:48e3,teams:[{id:`m2_aspar`,fictionalName:`Aspar Moto2 Team`,realName:`CFMOTO Gaviota Aspar Team`,bikePace:86,reliability:88,color:`#00acc1`,country:`ESP`},{id:`m2_mt`,fictionalName:`MT Helmets MSi Speed`,realName:`MT Helmets - MSi Moto2`,bikePace:85,reliability:88,color:`#00bcd4`,country:`ESP`},{id:`m2_marc_vds`,fictionalName:`Elf Marc VDS Birra Rossa`,realName:`Elf Marc VDS Racing Team`,bikePace:84,reliability:86,color:`#b71c1c`,country:`BEL`},{id:`m2_redbull_ajo`,fictionalName:`Ajo Red Bull Moto2`,realName:`Red Bull KTM Ajo Moto2`,bikePace:84,reliability:87,color:`#ff6600`,country:`FIN`},{id:`m2_fantic`,fictionalName:`Fantic Cavalleria Tricolore`,realName:`Fantic Racing Moto2`,bikePace:83,reliability:85,color:`#e53935`,country:`ITA`}],roster:[{id:`rid_alonso_d`,fictionalName:`David Colombo Il Fenomeno`,realName:`David Alonso`,teamId:`m2_aspar`,ovr:86,nationality:`COL`},{id:`rid_holgado`,fictionalName:`Dani Furia Holgado`,realName:`Daniel Holgado`,teamId:`m2_mt`,ovr:84,nationality:`ESP`},{id:`rid_arbolino`,fictionalName:`Tony Erba Arbolino`,realName:`Tony Arbolino`,teamId:`m2_marc_vds`,ovr:84,nationality:`ITA`},{id:`rid_vietti`,fictionalName:`Cele Vietti 13`,realName:`Celestino Vietti`,teamId:`m2_redbull_ajo`,ovr:83,nationality:`ITA`}]},moto_gp:{id:`moto_gp`,tier:1,name:`MotoGP World Championship 2026`,realSeriesName:`FIM MotoGP World Championship 2026 (Final 1000cc Era)`,minAge:20,calendar:[`buriram`,`cota`,`jerez`,`le_mans`,`barcelona`,`mugello`,`brno`,`assen`,`sachsenring`,`silverstone`,`red_bull_ring`,`aragon`,`misano`,`phillip_island`,`sepang`,`lusail`,`valencia`],weekendFormat:{practiceLaps:10,qualiLaps:5,raceLapsMultiplier:1,hasSprint:!0},licensePointsAwarded:50,prizeBudgetPerRace:42e4,teams:[{id:`mgp_ducati`,fictionalName:`Bologna Desmo Dream Team (Márquez/Bagnaia)`,realName:`Ducati Lenovo Team`,bikePace:98,reliability:95,engine:99,aero:98,braking:98,color:`#cc0000`,country:`ITA`},{id:`mgp_pramac`,fictionalName:`Pramac Yamaha Factory (Toprak/Miller)`,realName:`Prima Pramac Yamaha MotoGP`,bikePace:92,reliability:93,engine:92,aero:93,braking:93,color:`#002060`,country:`ITA`},{id:`mgp_aprilia`,fictionalName:`Noale V4 Factory (Martín/Bezzecchi)`,realName:`Aprilia Racing Factory`,bikePace:95,reliability:92,engine:95,aero:96,braking:95,color:`#000000`,country:`ITA`},{id:`mgp_ktm`,fictionalName:`Orange Bull Factory (Acosta/Binder)`,realName:`Red Bull KTM Factory Racing`,bikePace:95,reliability:93,engine:97,aero:94,braking:96,color:`#ff6600`,country:`AUT`},{id:`mgp_tech3`,fictionalName:`Tech3 Red Bull Factory (Viñales/Bastianini)`,realName:`Red Bull KTM Tech3`,bikePace:94,reliability:92,engine:96,aero:93,braking:94,color:`#ff3300`,country:`FRA`},{id:`mgp_vr46`,fictionalName:`Tavullia 46 Desmo Factory (Diggia/Morbidelli)`,realName:`Pertamina Enduro VR46 Racing`,bikePace:94,reliability:93,engine:96,aero:94,braking:94,color:`#ffff00`,country:`ITA`},{id:`mgp_gresini`,fictionalName:`Gresini Famiglia Azzurra (A. Márquez/Aldeguer)`,realName:`Gresini Racing MotoGP`,bikePace:93,reliability:93,engine:95,aero:93,braking:93,color:`#81d4fa`,country:`ITA`},{id:`mgp_yamaha`,fictionalName:`Iwata Monster V4 (Quartararo/Rins)`,realName:`Monster Energy Yamaha MotoGP`,bikePace:92,reliability:94,engine:92,aero:93,braking:93,color:`#001a4e`,country:`JPN`},{id:`mgp_trackhouse`,fictionalName:`Trackhouse USA Wings (Fernández/Ogura)`,realName:`Trackhouse MotoGP Team`,bikePace:90,reliability:90,engine:93,aero:92,braking:90,color:`#0033a0`,country:`USA`},{id:`mgp_honda`,fictionalName:`Tokyo Repsol HRC (Mir/Marini)`,realName:`Honda HRC Castrol Factory`,bikePace:89,reliability:91,engine:93,aero:88,braking:90,color:`#ff5500`,country:`JPN`},{id:`mgp_lcr`,fictionalName:`LCR Lucio Corse (Zarco/Moreira)`,realName:`LCR Honda Idemitsu / Castrol`,bikePace:88,reliability:90,engine:92,aero:87,braking:89,color:`#008855`,country:`MCO`}],roster:[{id:`rid_marquez_m`,fictionalName:`Marc La Formica Atomica`,realName:`Marc Márquez`,teamId:`mgp_ducati`,ovr:97,number:93,nationality:`ESP`,pace:99,racecraft:99,tyreMgmt:94,consistency:93,wetSkill:99},{id:`rid_bagnaia`,fictionalName:`Pecco Lasagna Nuvola Rossa`,realName:`Francesco Bagnaia`,teamId:`mgp_ducati`,ovr:96,number:63,nationality:`ITA`,pace:98,racecraft:95,tyreMgmt:96,consistency:94,wetSkill:92},{id:`rid_toprak`,fictionalName:`Toprak Stoppie King Lo Spettacolo`,realName:`Toprak Razgatlıoğlu`,teamId:`mgp_pramac`,ovr:95,number:54,nationality:`TUR`,pace:96,racecraft:97,tyreMgmt:92,consistency:93,wetSkill:94},{id:`rid_miller`,fictionalName:`Jack Thriller Il Selvaggio`,realName:`Jack Miller`,teamId:`mgp_pramac`,ovr:86,number:43,nationality:`AUS`,pace:88,racecraft:89,tyreMgmt:82,consistency:83,wetSkill:94},{id:`rid_martin`,fictionalName:`Jorge Martinator Lo Spagnolo`,realName:`Jorge Martín`,teamId:`mgp_aprilia`,ovr:95,number:89,nationality:`ESP`,pace:98,racecraft:94,tyreMgmt:92,consistency:93,wetSkill:90},{id:`rid_bezzecchi`,fictionalName:`Bez Il Riccio Romagnolo`,realName:`Marco Bezzecchi`,teamId:`mgp_aprilia`,ovr:90,number:72,nationality:`ITA`,pace:92,racecraft:91,tyreMgmt:89,consistency:89,wetSkill:92},{id:`rid_acosta`,fictionalName:`Pedro Lo Squalo Di Mazarron`,realName:`Pedro Acosta`,teamId:`mgp_ktm`,ovr:94,number:31,nationality:`ESP`,pace:96,racecraft:96,tyreMgmt:91,consistency:90,wetSkill:94},{id:`rid_binder`,fictionalName:`Brad Il Gladiatore Africano`,realName:`Brad Binder`,teamId:`mgp_ktm`,ovr:89,number:33,nationality:`ZAF`,pace:89,racecraft:94,tyreMgmt:88,consistency:88,wetSkill:94},{id:`rid_vinales`,fictionalName:`Maverick Top Gun Batmav`,realName:`Maverick Viñales`,teamId:`mgp_tech3`,ovr:90,number:12,nationality:`ESP`,pace:93,racecraft:88,tyreMgmt:87,consistency:86,wetSkill:87},{id:`rid_bastianini`,fictionalName:`Enea La Bestia Riminese`,realName:`Enea Bastianini`,teamId:`mgp_tech3`,ovr:92,number:23,nationality:`ITA`,pace:93,racecraft:96,tyreMgmt:98,consistency:90,wetSkill:89},{id:`rid_digiannantonio`,fictionalName:`Diggia Gladiatore Capitolino`,realName:`Fabio Di Giannantonio`,teamId:`mgp_vr46`,ovr:90,number:49,nationality:`ITA`,pace:91,racecraft:90,tyreMgmt:91,consistency:89,wetSkill:88},{id:`rid_morbidelli`,fictionalName:`Franco Il Poeta Del Gas`,realName:`Franco Morbidelli`,teamId:`mgp_vr46`,ovr:88,number:21,nationality:`ITA`,pace:89,racecraft:88,tyreMgmt:88,consistency:87,wetSkill:87},{id:`rid_marquez_a`,fictionalName:`Alex Pistola Fratellino`,realName:`Alex Márquez`,teamId:`mgp_gresini`,ovr:88,number:73,nationality:`ESP`,pace:88,racecraft:88,tyreMgmt:87,consistency:87,wetSkill:89},{id:`rid_aldeguer`,fictionalName:`Fermín Il Missile Murciano`,realName:`Fermín Aldeguer`,teamId:`mgp_gresini`,ovr:86,number:54,nationality:`ESP`,pace:89,racecraft:85,tyreMgmt:84,consistency:83,wetSkill:84},{id:`rid_quartararo`,fictionalName:`Fabio El Diablo Di Nizza`,realName:`Fabio Quartararo`,teamId:`mgp_yamaha`,ovr:92,number:20,nationality:`FRA`,pace:95,racecraft:93,tyreMgmt:93,consistency:94,wetSkill:87},{id:`rid_rins`,fictionalName:`Alex Lo Specialista Di Curve`,realName:`Alex Rins`,teamId:`mgp_yamaha`,ovr:86,number:42,nationality:`ESP`,pace:87,racecraft:87,tyreMgmt:87,consistency:85,wetSkill:88},{id:`rid_raulfernandez`,fictionalName:`Raúl Lo Spagnolo`,realName:`Raúl Fernández`,teamId:`mgp_trackhouse`,ovr:85,number:25,nationality:`ESP`,pace:87,racecraft:85,tyreMgmt:84,consistency:85,wetSkill:84},{id:`rid_ogura`,fictionalName:`Ai Samurai Silenzioso`,realName:`Ai Ogura`,teamId:`mgp_trackhouse`,ovr:85,number:79,nationality:`JPN`,pace:87,racecraft:86,tyreMgmt:85,consistency:86,wetSkill:84},{id:`rid_mir`,fictionalName:`Joan Il Miracoloso`,realName:`Joan Mir`,teamId:`mgp_honda`,ovr:85,number:36,nationality:`ESP`,pace:86,racecraft:87,tyreMgmt:85,consistency:83,wetSkill:87},{id:`rid_marini`,fictionalName:`Luca Il Professore Di Paddock`,realName:`Luca Marini`,teamId:`mgp_honda`,ovr:85,number:10,nationality:`ITA`,pace:86,racecraft:85,tyreMgmt:86,consistency:89,wetSkill:84},{id:`rid_zarco`,fictionalName:`Johann Salto Mortale`,realName:`Johann Zarco`,teamId:`mgp_lcr`,ovr:86,number:5,nationality:`FRA`,pace:86,racecraft:87,tyreMgmt:87,consistency:85,wetSkill:93},{id:`rid_moreira`,fictionalName:`Diogo Il Brasiliano`,realName:`Diogo Moreira`,teamId:`mgp_lcr`,ovr:82,number:10,nationality:`BRA`,pace:83,racecraft:83,tyreMgmt:82,consistency:81,wetSkill:82}]},moto_sbk:{id:`moto_sbk`,tier:1,name:`World Superbike SBK 2026`,realSeriesName:`FIM Superbike World Championship 2026`,minAge:20,calendar:[`phillip_island`,`portimao`,`assen`,`most`,`aragon`,`misano`,`donington`,`le_mans`,`cremona`,`jerez`],weekendFormat:{practiceLaps:8,qualiLaps:4,raceLapsMultiplier:.8,hasSprint:!0},licensePointsAwarded:40,prizeBudgetPerRace:22e4,teams:[{id:`sbk_ducati`,fictionalName:`Aruba Rossa Superbike (Bulega/Lecuona)`,realName:`Aruba.it Racing - Ducati SBK`,bikePace:96,reliability:95,color:`#cc0000`,country:`ITA`},{id:`sbk_bmw`,fictionalName:`Bavaria Motorrad SBK (Petrucci/Oliveira)`,realName:`ROKiT BMW Motorrad WorldSBK`,bikePace:95,reliability:94,color:`#0d47a1`,country:`DEU`},{id:`sbk_barni`,fictionalName:`Barni Spark Rossa (Bautista)`,realName:`Barni Spark Racing Team Ducati`,bikePace:94,reliability:94,color:`#e53935`,country:`ITA`},{id:`sbk_yamaha`,fictionalName:`Pata Maxus Yamaha SBK (Locatelli/Vierge)`,realName:`Pata Maxus Yamaha SBK`,bikePace:92,reliability:93,color:`#002060`,country:`JPN`},{id:`sbk_bimota`,fictionalName:`Bimota Kawasaki Factory (Bassani/Lowes)`,realName:`bimota by Kawasaki Racing Team`,bikePace:92,reliability:92,color:`#d50000`,country:`ITA`},{id:`sbk_goeleven`,fictionalName:`Team GoEleven Giallo (Iannone)`,realName:`Team GoEleven Ducati`,bikePace:91,reliability:92,color:`#ffd700`,country:`ITA`}],roster:[{id:`rid_bulega`,fictionalName:`Niccolò Bulegas Il Capitano`,realName:`Nicolò Bulega`,teamId:`sbk_ducati`,ovr:95,number:11,nationality:`ITA`},{id:`rid_lecuona`,fictionalName:`Iker Lo Spagnolo`,realName:`Iker Lecuona`,teamId:`sbk_ducati`,ovr:90,number:7,nationality:`ESP`},{id:`rid_petrucci`,fictionalName:`Danilo Petrux Il Gladiatore`,realName:`Danilo Petrucci`,teamId:`sbk_bmw`,ovr:93,number:9,nationality:`ITA`},{id:`rid_bautista`,fictionalName:`Alvaro Bau Bau Il Campione`,realName:`Álvaro Bautista`,teamId:`sbk_barni`,ovr:93,number:19,nationality:`ESP`},{id:`rid_locatelli`,fictionalName:`Loka Andrea Bergamo`,realName:`Andrea Locatelli`,teamId:`sbk_yamaha`,ovr:91,number:55,nationality:`ITA`},{id:`rid_iannone`,fictionalName:`The Maniac Andrea Show`,realName:`Andrea Iannone`,teamId:`sbk_goeleven`,ovr:90,number:29,nationality:`ITA`},{id:`rid_bassani`,fictionalName:`Axel Il Selvaggio Veneto`,realName:`Axel Bassani`,teamId:`sbk_bimota`,ovr:89,number:47,nationality:`ITA`}]}},n={melbourne:{id:`melbourne`,fictionalName:`Albert Park Parco dei Canguri`,realName:`Albert Park Circuit Melbourne`,country:`AUS`,flag:`🇦🇺`,lengthKm:5.278,lapsF1:58,lapsMoto:0,downforceLevel:`medium`,tyreWear:3,overtakeEase:4,rainChance:.15,baseLapTimeSecAuto:77.8,baseLapTimeSecMoto:999,description:`Il round inaugurale di Melbourne attorno al lago. Veloce e tecnico tra alberi e muretti.`},shanghai:{id:`shanghai`,fictionalName:`Circuito della Pagoda Dorata`,realName:`Shanghai International Circuit`,country:`CHN`,flag:`🇨🇳`,lengthKm:5.451,lapsF1:56,lapsMoto:0,downforceLevel:`high`,tyreWear:4,overtakeEase:5,rainChance:.25,baseLapTimeSecAuto:94.2,baseLapTimeSecMoto:999,description:`Caratterizzato dalla chiocciola di Curva 1-2 e dal rettilineo infinito da oltre 330 km/h.`},suzuka:{id:`suzuka`,fictionalName:`Figure-8 Rising Sun Ring`,realName:`Suzuka International Racing Course`,country:`JPN`,flag:`🇯🇵`,lengthKm:5.807,lapsF1:53,lapsMoto:22,downforceLevel:`high`,tyreWear:5,overtakeEase:3,rainChance:.3,baseLapTimeSecAuto:89.2,baseLapTimeSecMoto:124,description:`Il tracciato perfetto. La sequenza delle S e la curva 130R mettono alla prova il coraggio.`},bahrain:{id:`bahrain`,fictionalName:`Oasi Notturna del Deserto`,realName:`Bahrain International Circuit (Sakhir)`,country:`BHR`,flag:`🇧🇭`,lengthKm:5.412,lapsF1:57,lapsMoto:22,downforceLevel:`medium`,tyreWear:5,overtakeEase:5,rainChance:.02,baseLapTimeSecAuto:89.5,baseLapTimeSecMoto:114.2,description:`Gara sotto i riflettori nel deserto. Staccate furiose e degrado gomma posteriore severo.`},jeddah:{id:`jeddah`,fictionalName:`Circuito Corniche del Mar Rosso`,realName:`Jeddah Corniche Circuit`,country:`SAU`,flag:`🇸🇦`,lengthKm:6.174,lapsF1:50,lapsMoto:0,downforceLevel:`low`,tyreWear:3,overtakeEase:4,rainChance:.01,baseLapTimeSecAuto:88.1,baseLapTimeSecMoto:999,description:`Il circuito cittadino più veloce del mondo. Curve cieche a 250 km/h a sfiorare i muri.`},miami:{id:`miami`,fictionalName:`Autodromo delle Palme & Hard Rock`,realName:`Miami International Autodrome`,country:`USA`,flag:`🇺🇸`,lengthKm:5.412,lapsF1:57,lapsMoto:0,downforceLevel:`medium`,tyreWear:3,overtakeEase:4,rainChance:.2,baseLapTimeSecAuto:88.5,baseLapTimeSecMoto:999,description:`Attorno all'Hard Rock Stadium. Asfalto caldo, chicane lenta e lunghi rettilinei DRS.`},imola:{id:`imola`,fictionalName:`Autodromo della Passione sul Santerno`,realName:`Autodromo Internazionale Enzo e Dino Ferrari (Imola)`,country:`ITA`,flag:`🇮🇹`,lengthKm:4.909,lapsF1:63,lapsMoto:23,downforceLevel:`high`,tyreWear:4,overtakeEase:2,rainChance:.25,baseLapTimeSecAuto:74.9,baseLapTimeSecMoto:98.4,description:`Tamburello, Piratella, Acque Minerali e Rivazza. Pista vecchia scuola da cuore in gola.`},monaco:{id:`monaco`,fictionalName:`Monte Carlo Glamour Ring`,realName:`Circuit de Monaco`,country:`MCO`,flag:`🇲🇨`,lengthKm:3.337,lapsF1:78,lapsMoto:0,downforceLevel:`high`,tyreWear:1,overtakeEase:1,rainChance:.15,baseLapTimeSecAuto:71.5,baseLapTimeSecMoto:999,description:`Muri a sfioro, precisione chirurgica. La qualifica determina il 90% del risultato.`},montreal:{id:`montreal`,fictionalName:`Isola di Notre-Dame & Muro dei Campioni`,realName:`Circuit Gilles Villeneuve (Montréal)`,country:`CAN`,flag:`🇨🇦`,lengthKm:4.361,lapsF1:70,lapsMoto:0,downforceLevel:`low`,tyreWear:3,overtakeEase:4,rainChance:.3,baseLapTimeSecAuto:71.8,baseLapTimeSecMoto:999,description:`Frenata-accelerazione sui cordoli e il celeberrimo Muro dei Campioni all'ultima curva.`},barcelona:{id:`barcelona`,fictionalName:`Circuito di Montmeló della Catalogna`,realName:`Circuit de Barcelona-Catalunya`,country:`ESP`,flag:`🇪🇸`,lengthKm:4.657,lapsF1:66,lapsMoto:24,downforceLevel:`high`,tyreWear:5,overtakeEase:3,rainChance:.15,baseLapTimeSecAuto:73.5,baseLapTimeSecMoto:98.8,description:`Curvone Renault e settore finale veloce. Il banco di prova per il carico aerodinamico.`},red_bull_ring:{id:`red_bull_ring`,fictionalName:`Circuito Alpino di Stiria`,realName:`Red Bull Ring Spielberg`,country:`AUT`,flag:`🇦🇹`,lengthKm:4.318,lapsF1:71,lapsMoto:28,downforceLevel:`low`,tyreWear:3,overtakeEase:4,rainChance:.25,baseLapTimeSecAuto:65.2,baseLapTimeSecMoto:88.8,description:`Salite ripide, frenate violente in pendenza e distacchi ridotti al millesimo.`},silverstone:{id:`silverstone`,fictionalName:`British Airfield Circuit`,realName:`Silverstone Circuit`,country:`GBR`,flag:`🇬🇧`,lengthKm:5.891,lapsF1:52,lapsMoto:20,downforceLevel:`high`,tyreWear:5,overtakeEase:3,rainChance:.35,baseLapTimeSecAuto:87.8,baseLapTimeSecMoto:118.2,description:`Culla del motorsport. Carichi laterali estremi e sequenze di curve leggendarie (Maggotts/Becketts).`},spa:{id:`spa`,fictionalName:`Circuito delle Ardenne`,realName:`Circuit de Spa-Francorchamps`,country:`BEL`,flag:`🇧🇪`,lengthKm:7.004,lapsF1:44,lapsMoto:20,downforceLevel:`medium`,tyreWear:5,overtakeEase:4,rainChance:.45,baseLapTimeSecAuto:104.2,baseLapTimeSecMoto:138.5,description:`La montagna russa delle foreste belghe. Eau Rouge-Raidillon e Blanchimont in pieno.`},hungaroring:{id:`hungaroring`,fictionalName:`Tornanti Danubiani di Mogyoród`,realName:`Hungaroring Budapest`,country:`HUN`,flag:`🇭🇺`,lengthKm:4.381,lapsF1:70,lapsMoto:0,downforceLevel:`high`,tyreWear:4,overtakeEase:2,rainChance:.15,baseLapTimeSecAuto:76.5,baseLapTimeSecMoto:999,description:`Monaco senza muri. Caldo torrido, sequenze continue di curve lente e pochissimi rettilinei.`},zandvoort:{id:`zandvoort`,fictionalName:`Dune Olandesi sul Mare del Nord`,realName:`Circuit Zandvoort`,country:`NLD`,flag:`🇳🇱`,lengthKm:4.259,lapsF1:72,lapsMoto:0,downforceLevel:`high`,tyreWear:4,overtakeEase:2,rainChance:.3,baseLapTimeSecAuto:69.8,baseLapTimeSecMoto:999,description:`I leggendari banking parabolici di Hugenholtz e Luyendyk immersi nella marea arancione.`},monza:{id:`monza`,fictionalName:`Autodromo Reale della Velocità`,realName:`Autodromo Nazionale Monza`,country:`ITA`,flag:`🇮🇹`,lengthKm:5.793,lapsF1:53,lapsMoto:24,downforceLevel:`low`,tyreWear:3,overtakeEase:4,rainChance:.2,baseLapTimeSecAuto:80.5,baseLapTimeSecMoto:106.8,description:`Il tempio della velocità. Lunghi rettilinei, violente staccate e la leggendaria Parabolica.`},madrid:{id:`madrid`,fictionalName:`Circuito Urbano di Nuova Castiglia`,realName:`Circuito de Madring (IFEMA Madrid)`,country:`ESP`,flag:`🇪🇸`,lengthKm:5.414,lapsF1:56,lapsMoto:0,downforceLevel:`high`,tyreWear:4,overtakeEase:3,rainChance:.12,baseLapTimeSecAuto:78.9,baseLapTimeSecMoto:999,description:`Il nuovo spettacolare tracciato ibrido cittadino di Madrid inaugurato a settembre 2026.`},baku:{id:`baku`,fictionalName:`Circuito della Città Fortificata sul Caspio`,realName:`Baku City Circuit`,country:`AZE`,flag:`🇦🇿`,lengthKm:6.003,lapsF1:51,lapsMoto:0,downforceLevel:`low`,tyreWear:3,overtakeEase:5,rainChance:.05,baseLapTimeSecAuto:101.5,baseLapTimeSecMoto:999,description:`Il settore stretto del Castello medievale unito al rettilineo infinito da 350 km/h.`},singapore:{id:`singapore`,fictionalName:`Circuito delle Luci di Marina Bay`,realName:`Marina Bay Street Circuit`,country:`SGP`,flag:`🇸🇬`,lengthKm:4.94,lapsF1:62,lapsMoto:0,downforceLevel:`high`,tyreWear:4,overtakeEase:2,rainChance:.35,baseLapTimeSecAuto:90.2,baseLapTimeSecMoto:999,description:`Gara notturna estrema con oltre 30°C e 80% di umidità. Una prova massacrante.`},cota:{id:`cota`,fictionalName:`Circuito delle Americhe del Texas`,realName:`Circuit of the Americas (COTA Austin)`,country:`USA`,flag:`🇺🇸`,lengthKm:5.513,lapsF1:56,lapsMoto:20,downforceLevel:`high`,tyreWear:4,overtakeEase:4,rainChance:.2,baseLapTimeSecAuto:94.8,baseLapTimeSecMoto:122.5,description:`La salita cieca verso Curva 1 e gli snake veloci ispirati a Silverstone e Hockenheim.`},mexico:{id:`mexico`,fictionalName:`Autodromo dei Fratelli Rodriguez & Stadio`,realName:`Autódromo Hermanos Rodríguez`,country:`MEX`,flag:`🇲🇽`,lengthKm:4.304,lapsF1:71,lapsMoto:0,downforceLevel:`high`,tyreWear:3,overtakeEase:4,rainChance:.25,baseLapTimeSecAuto:77.2,baseLapTimeSecMoto:999,description:`A 2.200 metri d'altitudine. Aria rarefatta e l'ingresso trionfale nello stadio Foro Sol.`},interlagos:{id:`interlagos`,fictionalName:`Anfiteatro Paulistano`,realName:`Autódromo José Carlos Pace (Interlagos)`,country:`BRA`,flag:`🇧🇷`,lengthKm:4.309,lapsF1:71,lapsMoto:25,downforceLevel:`medium`,tyreWear:4,overtakeEase:4,rainChance:.4,baseLapTimeSecAuto:70.8,baseLapTimeSecMoto:95.4,description:`Senna 'S', Curva do Sol e la risalita verso il traguardo tra i tifosi brasiliani in festa.`},las_vegas:{id:`las_vegas`,fictionalName:`Circuito della Strip dei Casinò`,realName:`Las Vegas Strip Circuit`,country:`USA`,flag:`🇺🇸`,lengthKm:6.201,lapsF1:50,lapsMoto:0,downforceLevel:`low`,tyreWear:2,overtakeEase:5,rainChance:.01,baseLapTimeSecAuto:92.5,baseLapTimeSecMoto:999,description:`Sfrecciando tra Bellagio e Caesars Palace a mezzanotte con temperature gelide.`},lusail:{id:`lusail`,fictionalName:`Circuito Internazionale delle Oasi del Golfo`,realName:`Lusail International Circuit Qatar`,country:`QAT`,flag:`🇶🇦`,lengthKm:5.419,lapsF1:57,lapsMoto:22,downforceLevel:`high`,tyreWear:5,overtakeEase:3,rainChance:.01,baseLapTimeSecAuto:83.5,baseLapTimeSecMoto:112.8,description:`Curvoni d'appoggio veloci in successione continua che mettono a dura prova gomme e collo.`},yas_marina:{id:`yas_marina`,fictionalName:`Circuito del Crepuscolo di Abu Dhabi`,realName:`Yas Marina Circuit Abu Dhabi`,country:`ARE`,flag:`🇦🇪`,lengthKm:5.281,lapsF1:58,lapsMoto:0,downforceLevel:`medium`,tyreWear:3,overtakeEase:4,rainChance:.01,baseLapTimeSecAuto:83.2,baseLapTimeSecMoto:999,description:`La tradizionale passerella finale dal giorno alla notte per l'assegnazione dei titoli mondiali.`},buriram:{id:`buriram`,fictionalName:`Circuito Elefante di Chang`,realName:`Chang International Circuit (Buriram)`,country:`THA`,flag:`🇹🇭`,lengthKm:4.554,lapsF1:0,lapsMoto:26,downforceLevel:`medium`,tyreWear:4,overtakeEase:5,rainChance:.3,baseLapTimeSecAuto:999,baseLapTimeSecMoto:89.8,description:`Il round di apertura del Motomondiale. Staccate furibonde e calore asfissiante.`},jerez:{id:`jerez`,fictionalName:`Arena Andalusa`,realName:`Circuito de Jerez - Ángel Nieto`,country:`ESP`,flag:`🇪🇸`,lengthKm:4.423,lapsF1:66,lapsMoto:25,downforceLevel:`high`,tyreWear:4,overtakeEase:3,rainChance:.1,baseLapTimeSecAuto:78.4,baseLapTimeSecMoto:96.5,description:`La grande festa del motociclismo mondiale. Curva Peluqui e staccata finale decisiva.`},le_mans:{id:`le_mans`,fictionalName:`Circuito Bugatti & Sarthe`,realName:`Circuit de la Sarthe / Bugatti Le Mans`,country:`FRA`,flag:`🇫🇷`,lengthKm:4.185,lapsF1:32,lapsMoto:27,downforceLevel:`medium`,tyreWear:4,overtakeEase:4,rainChance:.35,baseLapTimeSecAuto:198.5,baseLapTimeSecMoto:90.8,description:`Chicane Dunlop e violente ripartenze in prima marcia davanti al pubblico francese.`},mugello:{id:`mugello`,fictionalName:`Circuito delle Colline Toscane`,realName:`Autodromo Internazionale del Mugello`,country:`ITA`,flag:`🇮🇹`,lengthKm:5.245,lapsF1:59,lapsMoto:23,downforceLevel:`medium`,tyreWear:4,overtakeEase:4,rainChance:.15,baseLapTimeSecAuto:75.8,baseLapTimeSecMoto:105.1,description:`San Donato a 360 km/h, Arrabbiata 1 e 2. Il tracciato più amato da tutti i piloti.`},assen:{id:`assen`,fictionalName:`Cattedrale delle Onde Olandesi`,realName:`TT Circuit Assen`,country:`NLD`,flag:`🇳🇱`,lengthKm:4.542,lapsF1:65,lapsMoto:26,downforceLevel:`high`,tyreWear:4,overtakeEase:4,rainChance:.3,baseLapTimeSecAuto:79.2,baseLapTimeSecMoto:91.8,description:`L'università della moto. Cambio di direzione fulmineo e staccata finale alla chicane Geert Timmer.`},sachsenring:{id:`sachsenring`,fictionalName:`Cascata Sassone di Chemnitz`,realName:`Sachsenring`,country:`DEU`,flag:`🇩🇪`,lengthKm:3.671,lapsF1:0,lapsMoto:30,downforceLevel:`high`,tyreWear:5,overtakeEase:3,rainChance:.25,baseLapTimeSecAuto:999,baseLapTimeSecMoto:79.9,description:`Dieci curve a sinistra quasi consecutive e il celebre curvone in discesa The Waterfall.`},brno:{id:`brno`,fictionalName:`Boschi Boemi di Moravia`,realName:`Automotodrom Brno`,country:`CZE`,flag:`🇨🇿`,lengthKm:5.403,lapsF1:0,lapsMoto:22,downforceLevel:`high`,tyreWear:4,overtakeEase:4,rainChance:.2,baseLapTimeSecAuto:999,baseLapTimeSecMoto:115.2,description:`Lo storico ritorno di Brno nel 2026! Discese e salite naturali con staccate da brivido.`},aragon:{id:`aragon`,fictionalName:`Mura di Pietra d'Aragona`,realName:`MotorLand Aragón`,country:`ESP`,flag:`🇪🇸`,lengthKm:5.077,lapsF1:0,lapsMoto:23,downforceLevel:`medium`,tyreWear:4,overtakeEase:4,rainChance:.1,baseLapTimeSecAuto:999,baseLapTimeSecMoto:106.5,description:`Il muro di pietra e il curvone a sinistra in discesa verso il traguardo.`},misano:{id:`misano`,fictionalName:`Arena Adriatica Marco Simoncelli`,realName:`Misano World Circuit Marco Simoncelli`,country:`ITA`,flag:`🇮🇹`,lengthKm:4.226,lapsF1:68,lapsMoto:27,downforceLevel:`high`,tyreWear:3,overtakeEase:3,rainChance:.15,baseLapTimeSecAuto:76.5,baseLapTimeSecMoto:91.2,description:`Il curvone del Curvone in pieno a 300 km/h e la staccata del Tramonto nella culla dei motori.`},phillip_island:{id:`phillip_island`,fictionalName:`Circuito della Scogliera Oceanica`,realName:`Phillip Island Grand Prix Circuit`,country:`AUS`,flag:`🇦🇺`,lengthKm:4.448,lapsF1:64,lapsMoto:27,downforceLevel:`high`,tyreWear:5,overtakeEase:5,rainChance:.25,baseLapTimeSecAuto:77.5,baseLapTimeSecMoto:87.7,description:`Gabbiani, vento dell'Oceano e derapate a 220 km/h al Curvone Stoner.`},sepang:{id:`sepang`,fictionalName:`Fornace Tropicale di Kuala Lumpur`,realName:`Sepang International Circuit`,country:`MYS`,flag:`🇲🇾`,lengthKm:5.543,lapsF1:56,lapsMoto:20,downforceLevel:`medium`,tyreWear:5,overtakeEase:5,rainChance:.45,baseLapTimeSecAuto:92.5,baseLapTimeSecMoto:117.5,description:`Due rettilinei immensi uniti dal tornantino finale e temporali tropicali improvvisi.`},valencia:{id:`valencia`,fictionalName:`Stadio Ricardo Tormo di Cheste`,realName:`Circuit Ricardo Tormo Valencia`,country:`ESP`,flag:`🇪🇸`,lengthKm:4.005,lapsF1:0,lapsMoto:27,downforceLevel:`high`,tyreWear:4,overtakeEase:3,rainChance:.15,baseLapTimeSecAuto:999,baseLapTimeSecMoto:89.9,description:`Il gran finale del Motomondiale. Uno stadio naturale dove il pubblico vede il 100% della pista.`},fuji:{id:`fuji`,fictionalName:`Monte Fuji Speedway del Vulcano`,realName:`Fuji Speedway (6h Fuji)`,country:`JPN`,flag:`🇯🇵`,lengthKm:4.563,lapsF1:67,lapsMoto:25,downforceLevel:`low`,tyreWear:3,overtakeEase:5,rainChance:.35,baseLapTimeSecAuto:89,baseLapTimeSecMoto:104.2,description:`Rettilineo di 1.5 km all'ombra del Monte Fuji. Scia e staccata violenta in discesa a Curva 1.`},portimao:{id:`portimao`,fictionalName:`Ottovolante dell'Algarve Portoghese`,realName:`Autódromo Internacional do Algarve (Portimão)`,country:`PRT`,flag:`🇵🇹`,lengthKm:4.592,lapsF1:66,lapsMoto:25,downforceLevel:`medium`,tyreWear:4,overtakeEase:4,rainChance:.15,baseLapTimeSecAuto:77.2,baseLapTimeSecMoto:99.4,description:`Discese a picco e curve cieche in salita. Una vera montagna russa sul mare.`},donington:{id:`donington`,fictionalName:`Parco dei Campioni delle Midlands`,realName:`Donington Park Circuit`,country:`GBR`,flag:`🇬🇧`,lengthKm:4.02,lapsF1:68,lapsMoto:25,downforceLevel:`high`,tyreWear:4,overtakeEase:3,rainChance:.35,baseLapTimeSecAuto:76.8,baseLapTimeSecMoto:87.5,description:`Le celebri Craner Curves in discesa da brivido nel cuore dell'Inghilterra.`},most:{id:`most`,fictionalName:`Chicane Boema di Most`,realName:`Autodrom Most (WorldSBK)`,country:`CZE`,flag:`🇨🇿`,lengthKm:4.212,lapsF1:0,lapsMoto:24,downforceLevel:`high`,tyreWear:3,overtakeEase:3,rainChance:.2,baseLapTimeSecAuto:999,baseLapTimeSecMoto:91.5,description:`La chicane di partenza strettissima e il settore veloce nella Boemia settentrionale.`},cremona:{id:`cremona`,fictionalName:`Circuito della Pianura Padana`,realName:`Cremona Circuit (San Martino del Lago)`,country:`ITA`,flag:`🇮🇹`,lengthKm:3.768,lapsF1:0,lapsMoto:26,downforceLevel:`medium`,tyreWear:3,overtakeEase:4,rainChance:.15,baseLapTimeSecAuto:999,baseLapTimeSecMoto:89.2,description:`Rettilineo infinito da oltre 310 km/h e curve tecniche guidate nel cuore d'Italia.`},vallelunga:{id:`vallelunga`,fictionalName:`Autodromo Piero Taruffi della Capitale`,realName:`Autodromo Vallelunga Piero Taruffi`,country:`ITA`,flag:`🇮🇹`,lengthKm:4.085,lapsF1:68,lapsMoto:25,downforceLevel:`high`,tyreWear:4,overtakeEase:3,rainChance:.15,baseLapTimeSecAuto:77.5,baseLapTimeSecMoto:94.2,description:`Curvone, Esse e tornante Roma. Tracciato formativo ideale per le categorie promozionali F4.`},indianapolis:{id:`indianapolis`,fictionalName:`Il Catino dei Centomila (Brickyard)`,realName:`Indianapolis Motor Speedway (Indy 500)`,country:`USA`,flag:`🇺🇸`,lengthKm:4.023,lapsF1:73,lapsMoto:28,downforceLevel:`low`,tyreWear:5,overtakeEase:4,rainChance:.2,baseLapTimeSecAuto:69.1,baseLapTimeSecMoto:92.4,description:`La 500 Miglia di Indianapolis. La gara più celebre del motorsport americano parte della Triple Crown.`},long_beach:{id:`long_beach`,fictionalName:`Circuito delle Palme della California`,realName:`Streets of Long Beach`,country:`USA`,flag:`🇺🇸`,lengthKm:3.167,lapsF1:80,lapsMoto:0,downforceLevel:`high`,tyreWear:3,overtakeEase:3,rainChance:.05,baseLapTimeSecAuto:66.8,baseLapTimeSecMoto:999,description:`Il round cittadino più antico d'America. Shoreline Drive e il tornante della Fontana.`},laguna_seca:{id:`laguna_seca`,fictionalName:`Cavatappi di Monterey`,realName:`WeatherTech Raceway Laguna Seca`,country:`USA`,flag:`🇺🇸`,lengthKm:3.602,lapsF1:75,lapsMoto:28,downforceLevel:`high`,tyreWear:4,overtakeEase:3,rainChance:.1,baseLapTimeSecAuto:70.5,baseLapTimeSecMoto:82.2,description:`Il famosissimo Corkscrew (Cavatappi), una discesa cieca mozzafiato a cinque piani d'altezza.`},road_america:{id:`road_america`,fictionalName:`Parco Veloce del Wisconsin`,realName:`Road America (Elkhart Lake)`,country:`USA`,flag:`🇺🇸`,lengthKm:6.515,lapsF1:45,lapsMoto:20,downforceLevel:`low`,tyreWear:4,overtakeEase:5,rainChance:.2,baseLapTimeSecAuto:101.2,baseLapTimeSecMoto:125,description:`Uno dei tracciati più lunghi e veloci d'America. The Kink e il rettilineo Canada Corner.`}},r=new class{constructor(){let e=typeof localStorage<`u`?localStorage.getItem(`il_nuovo_goat_real_names`):null;this.isRealNames=e===`true`,this.customOverrides={};try{let e=typeof localStorage<`u`?localStorage.getItem(`il_nuovo_goat_custom_names_db`):null;e&&(this.customOverrides=JSON.parse(e))}catch(e){console.warn(`Impossibile caricare database personalizzato:`,e)}this.listeners=[]}onModeChange(e){this.listeners.push(e)}notifyChange(){typeof localStorage<`u`&&localStorage.setItem(`il_nuovo_goat_real_names`,this.isRealNames?`true`:`false`),this.listeners.forEach(e=>{try{e(this.isRealNames)}catch(e){console.error(e)}})}toggleRealNames(){return this.isRealNames=!this.isRealNames,this.notifyChange(),this.isRealNames}setRealNames(e){this.isRealNames=!!e,this.notifyChange()}importCustomJson(e){try{let t=typeof e==`string`?JSON.parse(e):e;if(!t||typeof t!=`object`)throw Error(`File JSON non valido.`);return this.customOverrides=t,localStorage.setItem(`il_nuovo_goat_custom_names_db`,JSON.stringify(t)),this.isRealNames=!0,this.notifyChange(),{success:!0,message:`Database nomi reali importato con successo!`}}catch(e){return{success:!1,message:`Errore durante l'importazione: `+e.message}}}resetToDefault(){this.customOverrides={},localStorage.removeItem(`il_nuovo_goat_custom_names_db`),this.notifyChange()}getSeriesName(n,r=`auto`){let i=(r===`auto`?e:t)[n];return i?this.isRealNames&&i.realSeriesName||i.name:n}getTeamName(n,r=`auto`,i=null){if(!n)return`Scuderia`;let a=this.customOverrides[r]?.teams?.[n];if(a&&this.isRealNames)return a.name||a.displayName||n||`Scuderia`;let o=r===`auto`?e:t;for(let e in o){let t=o[e].teams.find(e=>e.id===n);if(t)return(this.isRealNames?t.realName:t.fictionalName)||t.name||t.realName||t.fictionalName||n||`Scuderia`}return n||`Scuderia`}getTeam(n,r=`auto`){if(!n)return{id:`default_team`,displayName:`Scuderia`,color:`#e10600`,carPace:75,bikePace:75,reliability:75};let i=this.customOverrides[r]?.teams?.[n];if(i&&this.isRealNames)return{...i,displayName:i.name||i.displayName||n||`Scuderia`,color:i.color||`#e10600`};let a=r===`auto`?e:t;for(let e in a){let t=a[e].teams.find(e=>e.id===n);if(t){let i=this.getTeamName(n,r,e);return{...t,displayName:i||t.realName||t.fictionalName||t.name||n||`Scuderia`,color:t.color||`#e10600`}}}return{id:n,displayName:n||`Scuderia`,color:`#888888`,carPace:80,bikePace:80,reliability:80}}getDriverName(n,r=`auto`){let i=this.customOverrides[r]?.drivers?.[n];if(i&&this.isRealNames)return i.name;let a=r===`auto`?e:t;for(let e in a){let t=a[e].roster?.find(e=>e.id===n);if(t)return this.isRealNames?t.realName:t.fictionalName}return n}getDriver(n,r=`auto`){let i=r===`auto`?e:t;for(let e in i){let t=i[e].roster?.find(e=>e.id===n);if(t)return{...t,displayName:this.getDriverName(n,r)}}return{id:n,displayName:n,ovr:75,pace:75}}getCircuitName(e){let t=n[e];return t?this.isRealNames?t.realName:t.fictionalName:e}getCircuit(e){let t=n[e];return t?{...t,displayName:this.getCircuitName(e)}:null}exportDatabaseJson(){return JSON.stringify({version:`1.0.0`,isRealNames:this.isRealNames,exportedAt:new Date().toISOString(),customOverrides:this.customOverrides},null,2)}},i=class{static calculateScore(e,t){let n=0,r=t.worldTitles||0;n+=r*250;let i=t.wins||0;n+=i*12;let a=t.poles||0;n+=a*6;let o=t.podiums||0;n+=o*4;let s=t.fastestLaps||0;n+=s*3;let c=t.specialWins||{};e.discipline===`auto`?(c.monaco&&(n+=45),c.le_mans&&(n+=65),c.indianapolis&&(n+=55),c.monaco&&c.le_mans&&c.indianapolis&&(n+=150)):(c.mugello&&(n+=40),c.assen&&(n+=40),c.phillip_island&&(n+=40),c.mugello&&c.assen&&c.phillip_island&&(n+=120));let l=t.teammateBeatenCount||0;n+=l*15;let u=t.peakOvr||e.ovr||75;u>=95?n+=100:u>=90?n+=60:u>=85&&(n+=30);let d=t.racesStarted||0;return n+=Math.min(100,Math.floor(d*.4)),Math.round(n)}static getTitleAndTier(e){return e>=980?{title:`IL GOAT ASSOLUTO DEI MOTORI 👑`,badge:`LEGGENDA IMMORTALE`,desc:`Hai scolpito per sempre il tuo nome nell'Olimpo. Nessuno potrà mai eguagliare la tua grandezza.`}:e>=900?{title:`MONSTRO SACRO DELLA VELOCITÀ 🏆`,badge:`HALL OF FAME`,desc:`Riconosciuto all'unanimità tra i migliori piloti mai esistiti sul pianeta Terra.`}:e>=700?{title:`CAMPIONE MONDIALE LEGGENDARIO ⭐⭐⭐`,badge:`PLURICAMPIONE`,desc:`Hai dominato un'era intera del motorsport, lasciando record indelebili.`}:e>=450?{title:`RE DEI GRAN PREMI ⭐⭐`,badge:`VINCITORE SERIALE`,desc:`Hai vinto gare memorabili, duellato con i migliori e scritto pagine storiche.`}:e>=200?{title:`PILOTA DI CULTO ⭐`,badge:`EROE DEL PADDOCK`,desc:`Una carriera solida, podi prestigiosi e l'affetto sconfinato dei tifosi.`}:{title:`GREGARIO D'ONORE 🏁`,badge:`VETERANO`,desc:`Hai vissuto il sogno delle corse ai massimi livelli mondiali fino all'ultima curva.`}}static getHallOfFameRanking(e,t,n){let i=[{realName:`Giacomo Agostini`,fictionalName:`Giacomo Ago Nazionale`,discipline:`moto`,titles:15,wins:122,poles:9,goatScore:998,era:`1963-1977`},{realName:`Lewis Hamilton`,fictionalName:`Sir Lewis Spamilton`,discipline:`auto`,titles:7,wins:105,poles:104,goatScore:995,era:`2007-Attivo`},{realName:`Valentino Rossi`,fictionalName:`Valentin Il Dottore 46`,discipline:`moto`,titles:9,wins:115,poles:65,goatScore:994,era:`1996-2021`},{realName:`Michael Schumacher`,fictionalName:`Michele Il Barone Rosso`,discipline:`auto`,titles:7,wins:91,poles:68,goatScore:992,era:`1991-2012`},{realName:`Marc Márquez`,fictionalName:`Marc La Formica Atomica`,discipline:`moto`,titles:8,wins:88,poles:94,goatScore:985,era:`2008-Attivo`},{realName:`Max Verstappen`,fictionalName:`Max Versteppin Lo Sterminatore`,discipline:`auto`,titles:4,wins:63,poles:40,goatScore:978,era:`2015-Attivo`},{realName:`Juan Manuel Fangio`,fictionalName:`Juan Il Maestro Delle Pampas`,discipline:`auto`,titles:5,wins:24,poles:29,goatScore:970,era:`1950-1958`},{realName:`Ayrton Senna`,fictionalName:`Ayrton Il Mago Di San Paolo`,discipline:`auto`,titles:3,wins:41,poles:65,goatScore:965,era:`1984-1994`},{realName:`Alain Prost`,fictionalName:`Alain Il Professore Di Francia`,discipline:`auto`,titles:4,wins:51,poles:33,goatScore:960,era:`1980-1993`},{realName:`Mick Doohan`,fictionalName:`Mick Mano Di Ferro`,discipline:`moto`,titles:5,wins:54,poles:58,goatScore:955,era:`1989-1999`},{realName:`Jorge Lorenzo`,fictionalName:`Giorgio Martillo Y Mantequilla`,discipline:`moto`,titles:5,wins:68,poles:69,goatScore:950,era:`2002-2019`},{realName:`Casey Stoner`,fictionalName:`Casey Il Canguro Mannaro`,discipline:`moto`,titles:2,wins:45,poles:43,goatScore:940,era:`2002-2012`},{realName:`John Surtees`,fictionalName:`John Il Dominatore Di Due Mondi`,discipline:`both`,titles:8,wins:44,poles:16,goatScore:935,era:`1952-1972`}].map(e=>({...e,name:r.isRealNames?e.realName:e.fictionalName})),a={name:`${t.firstName} ${t.lastName} "${t.nickname}"`,discipline:t.discipline,titles:n.worldTitles||0,wins:n.wins||0,poles:n.poles||0,goatScore:e,era:`${n.startYear}-${n.currentYear}`,isPlayer:!0},o=[...i,a];return o.sort((e,t)=>t.goatScore-e.goatScore),{ranking:o,playerRank:o.findIndex(e=>e.isPlayer)+1,totalDrivers:o.length}}},a={prodigy:{id:`prodigy`,name:`Talento Puro`,icon:`⚡`,badge:`⚡ TALENTO PURO`,desc:`Cresciuto nei kartodromi senza budget ma con riflessi fuori dal comune e istinto puro. Grande velocità sul giro secco e abilità nel bagnato, ma devi affinare la gestione gomme e la sensibilità tecnica.`,startMoney:15e3,startingPointsPool:8,baseAttributes:{pace:65,racecraft:63,tyreMgmt:57,consistency:59,wetSkill:64,technicalFeedback:55,fitness:64,marketability:48},pros:`Velocità pura e riflessi sul bagnato`,cons:`Gestione pneumatici e telemetria da sviluppare`},dynasty:{id:`dynasty`,name:`Figlio d'Arte`,icon:`👑`,badge:`👑 FIGLIO D'ARTE`,desc:`Il tuo cognome è già nella storia dei motori. Sei cresciuto nei box con ingegneri e telemetristi di livello mondiale. Spiccata maturità tecnica, costanza e sponsor, ma aspettative altissime.`,startMoney:45e3,startingPointsPool:8,baseAttributes:{pace:61,racecraft:60,tyreMgmt:63,consistency:62,wetSkill:58,technicalFeedback:65,fitness:61,marketability:68},pros:`Sensibilità tecnica, costanza e gestione gomme`,cons:`Velocità pura sul giro secco leggermente inferiore`},paydriver:{id:`paydriver`,name:`Pilota con la Valigia`,icon:`💼`,badge:`💼 PILOTA CON LA VALIGIA`,desc:`Ingenti capitali e sponsor per assicurarsi subito i migliori materiali. Altissima notorietà e budget iniziale, ma dovrai zittire gli scettici costruendo la tua velocità in pista curva dopo curva.`,startMoney:18e4,startingPointsPool:8,baseAttributes:{pace:58,racecraft:57,tyreMgmt:60,consistency:60,wetSkill:55,technicalFeedback:58,fitness:59,marketability:82},pros:`Budget iniziale ricchissimo per HQ e R&D`,cons:`Statistiche di guida grezze, richiede duro allenamento`}},o=new class{constructor(){this.player=null,this.career=null,this.loadFromStorage()}hasActiveCareer(){return!!this.player&&!!this.career&&!this.career.isRetired}startNewCareer(n){let r=n.discipline||`auto`,i=r===`auto`?`auto_f4`:`moto_3`,o=a[n.origin||`prodigy`]||a.prodigy,s={...o.baseAttributes,...n.attributes||{}};for(let e in o.baseAttributes)s[e]<o.baseAttributes[e]&&(s[e]=o.baseAttributes[e]);let c=o.startMoney,l=(r===`auto`?e:t)[i].teams[0];return this.player={id:`player_custom`,firstName:n.firstName||`Alessandro`,lastName:n.lastName||`Veloci`,nickname:n.nickname||`Il Predatore`,nationality:n.nationality||`ITA`,number:n.number||77,age:16,discipline:r,origin:n.origin||`prodigy`,celebration:n.celebration||`burnout`,attributes:s,ovr:this.calculateOvr(s),helmet:n.helmet||{primaryColor:`#e10600`,secondaryColor:`#ffd000`,visorColor:`#00d2be`,pattern:`stripes`,decal:`star`},unspentSkillPoints:n.unspentSkillPoints||0},this.career={currentYear:2026,seasonNumber:1,currentCategory:i,currentTeamId:l.id,contract:{salaryPerRace:n.origin===`paydriver`?0:5e3,durationYears:1,yearsLeft:1,role:`1st Driver`,winBonus:1e4,buyoutClause:0},money:c,licensePoints:0,currentRaceIndex:0,standings:{drivers:[],teams:[]},stats:{racesStarted:0,wins:0,podiums:0,poles:0,fastestLaps:0,worldTitles:0,careerEarnings:c,peakOvr:this.player.ovr,startYear:2026,currentYear:2026,specialWins:{},teammateBeatenCount:0},carUpgrades:{aero:0,engine:0,chassis:0,reliability:0},hqUpgrades:{simulatorLevel:0,gymLevel:0,prAgencyLevel:0,telemetryCoachLevel:0},lifestyleItems:[],history:[],isRetired:!1},this.initSeasonStandings(),this.saveToStorage(),!0}calculateOvr(e){let t=e.pace*.28+e.racecraft*.22+e.tyreMgmt*.16+e.consistency*.14+e.wetSkill*.1+e.technicalFeedback*.1;return Math.round(t)}initSeasonStandings(){let n=(this.player.discipline===`auto`?e:t)[this.career.currentCategory];if(!n)return;let r=[{driverId:`player`,points:0,wins:0,podiums:0,poles:0,isPlayer:!0}];n.roster.forEach(e=>{r.push({driverId:e.id,points:0,wins:0,podiums:0,poles:0,isPlayer:!1})});let i=n.teams.map(e=>({teamId:e.id,points:0}));this.career.standings={drivers:r,teams:i},this.career.currentRaceIndex=0}getCurrentCategoryData(){return(this.player.discipline===`auto`?e:t)[this.career.currentCategory]}getNextCircuit(){let e=this.getCurrentCategoryData();if(!e||!e.calendar)return null;let t=e.calendar[this.career.currentRaceIndex];return r.getCircuit(t)}getPlayerTeam(){let e=this.getCurrentCategoryData();if(!e||!e.teams)return{id:`default_team`,displayName:`Scuderia`,color:`#e10600`,carPace:75,bikePace:75,reliability:75};let t=e.teams.find(e=>e.id===this.career?.currentTeamId)||e.teams[0],n=this.career?.carUpgrades||{aero:0,engine:0,chassis:0,reliability:0},i=n.aero*1.5+n.engine*1.5+n.chassis*1.2,a=n.reliability*2.5,o=r.getTeamName(t.id,this.player?.discipline);return{...t,carPace:Math.min(99,Math.round((t.carPace||t.bikePace||75)+i)),bikePace:Math.min(99,Math.round((t.bikePace||t.carPace||75)+i)),reliability:Math.min(99,Math.round(t.reliability+a)),displayName:o||t.realName||t.fictionalName||t.name||`Scuderia`,color:t.color||`#e10600`}}getCurrentTeammate(){let e=this.getCurrentCategoryData().roster.find(e=>e.teamId===this.career.currentTeamId);return e?{...e,name:r.getDriverName(e.id,this.player.discipline)}:{name:`Rookie Collaudatore`,ovr:74,id:`test_driver`}}recordGrandPrixResults(e,t,n=null){let r=this.career.stats,i=this.getNextCircuit();e&&e[0]?.isPlayer&&r.poles++;let a=t.drivers.find(e=>e.isPlayer);if(a){r.racesStarted++;let e=a.currentPos;e===1&&(r.wins++,i&&(r.specialWins[i.id]=(r.specialWins[i.id]||0)+1)),e<=3&&r.podiums++;let n=t.isSprint?0:this.getPointsForPosition(e);this.addDriverPoints(`player`,n,e===1,e<=3),this.addTeamPoints(this.career.currentTeamId,n);let o=this.career.contract.salaryPerRace||5e3;e===1?o+=this.career.contract.winBonus||1e4:e<=3&&(o+=Math.round((this.career.contract.winBonus||1e4)*.4)),this.career.money+=o,r.careerEarnings+=o}t.drivers.forEach(e=>{if(!e.isPlayer){let t=this.getPointsForPosition(e.currentPos);this.addDriverPoints(e.driverId,t,e.currentPos===1,e.currentPos<=3),this.addTeamPoints(e.teamId,t)}}),n&&n.drivers.forEach(e=>{let t=this.getSprintPointsForPosition(e.currentPos);this.addDriverPoints(e.isPlayer?`player`:e.driverId,t,!1,!1),this.addTeamPoints(e.teamId,t)}),this.career.standings.drivers.sort((e,t)=>t.points-e.points||t.wins-e.wins),this.career.standings.teams.sort((e,t)=>t.points-e.points),this.progressPlayerAttributes(a?a.currentPos:10);let o=1;if(a){let t=a.currentPos;t<=10&&(o+=1),t<=3&&(o+=1),e&&e[0]?.isPlayer&&(o+=1)}this.player.unspentSkillPoints=(this.player.unspentSkillPoints||0)+o,this.career.lastWeekendRecap={earnedSkillPoints:o,finishPos:a?a.currentPos:10,isPole:!!(e&&e[0]?.isPlayer)},this.career.currentRaceIndex++;let s=this.getCurrentCategoryData(),c=this.career.currentRaceIndex>=s.calendar.length;return this.saveToStorage(),{isSeasonEnd:c,nextRaceIndex:this.career.currentRaceIndex,earnedSkillPoints:o}}getPointsForPosition(e){return[25,18,15,12,10,8,6,4,2,1][e-1]||0}getSprintPointsForPosition(e){return[8,7,6,5,4,3,2,1][e-1]||0}addDriverPoints(e,t,n,r){let i=this.career.standings.drivers.find(t=>t.driverId===e);i||(i={driverId:e,points:0,wins:0,podiums:0,poles:0,isPlayer:e===`player`},this.career.standings.drivers.push(i)),i.points+=t,n&&i.wins++,r&&i.podiums++}addTeamPoints(e,t){let n=this.career.standings.teams.find(t=>t.teamId===e);n&&(n.points+=t)}progressPlayerAttributes(e){let t=this.player.attributes,n=this.career.hqUpgrades||{},r=this.player.age,i=1;i=r<=22?1.4-(r-16)*.05:r<=28?1-(r-23)*.06:r<=33?.5-(r-29)*.06:Math.max(.05,.2-(r-34)*.03);let a=(n.simulatorLevel||0)*.03,o=(n.gymLevel||0)*.03,s=.1*i+a;if(t.pace=Math.min(99,Number((t.pace+s).toFixed(2))),r<=30){let e=.08*i+o;t.fitness=Math.min(99,Number((t.fitness+e).toFixed(2)))}let c=.05*i;e<=3?(c+=.14,t.marketability=Math.min(99,Number((t.marketability+.3).toFixed(2)))):e<=8&&(c+=.07,t.marketability=Math.min(99,Number((t.marketability+.1).toFixed(2)))),t.racecraft=Math.min(99,Number((t.racecraft+c).toFixed(2)));let l=.07*Math.min(1.2,.6+(r-16)*.04);t.tyreMgmt=Math.min(99,Number((t.tyreMgmt+l).toFixed(2)));let u=.06*Math.min(1.2,.6+(r-16)*.04);t.consistency=Math.min(99,Number((t.consistency+u).toFixed(2))),this.player.ovr=this.calculateOvr(t),this.player.ovr>this.career.stats.peakOvr&&(this.career.stats.peakOvr=this.player.ovr)}previewOvrWithAllocations(e={}){if(!this.player||!this.player.attributes)return this.player?.ovr||60;let t={...this.player.attributes};for(let[n,r]of Object.entries(e)){let e=Number(r)||0;e>0&&t[n]!==void 0&&(t[n]=Math.min(99,t[n]+e))}return this.calculateOvr(t)}assignBatchSkillPoints(e){if(!this.player)return{success:!1,reason:`Nessun pilota attivo`};let t=Object.values(e).reduce((e,t)=>e+(Number(t)||0),0),n=this.player.unspentSkillPoints||0;if(t<=0)return{success:!1,reason:`Nessun punto selezionato`};if(t>n)return{success:!1,reason:`Punti insufficienti`};let r=this.player.ovr;for(let[t,n]of Object.entries(e)){let e=Number(n)||0;e>0&&this.player.attributes[t]!==void 0&&(this.player.attributes[t]=Math.min(99,this.player.attributes[t]+e))}return this.player.unspentSkillPoints-=t,this.player.ovr=this.calculateOvr(this.player.attributes),this.player.ovr>this.career.stats.peakOvr&&(this.career.stats.peakOvr=this.player.ovr),this.saveToStorage(),{success:!0,oldOvr:r,newOvr:this.player.ovr,pointsSpent:t,remainingPoints:this.player.unspentSkillPoints}}applyAnnualCareerEvolution(e,t){let n=this.player.attributes,r=this.career.hqUpgrades||{},i={},a=``,o=``;if(t<=23)a=`Apprendistato & Sviluppo Rapido`,n.technicalFeedback=Math.min(99,Number((n.technicalFeedback+1).toFixed(1))),n.consistency=Math.min(99,Number((n.consistency+1).toFixed(1))),i.technicalFeedback=1,i.consistency=1,o=`L'esperienza accumulata nella stagione junior affina la sensibilità tecnica (+1) e la costanza (+1).`;else if(t<=29)a=`Prime Atletico & Apice Tecnico`,n.racecraft=Math.min(99,Number((n.racecraft+.5).toFixed(1))),n.tyreMgmt=Math.min(99,Number((n.tyreMgmt+.5).toFixed(1))),i.racecraft=.5,i.tyreMgmt=.5,o=`Sei nel pieno del tuo Prime: massima freddezza nei duelli e gestione gara al vertice.`;else if(t<=33)a=`Maturità & Maestria`,o=`Pilota veterano e punto di riferimento. L'astuzia tattica compensa i primissimi segni dell'età.`;else if(t<=36){a=`Declino Fisico Iniziale`;let e=Math.min(.65,(r.gymLevel||0)*.15),t=Math.min(.65,(r.simulatorLevel||0)*.15),s=Number((.8*(1-e)).toFixed(1)),c=Number((.6*(1-t)).toFixed(1));n.fitness=Math.max(50,Number((n.fitness-s).toFixed(1))),n.pace=Math.max(50,Number((n.pace-c).toFixed(1))),i.fitness=-s,i.pace=-c,o=`I riflessi e la tenuta atletica mostrano la prima flessione anagrafica (Passo -${c}, Forma -${s}).`}else{a=`Veterano Storico & Declino Avanzato`;let e=Math.min(.55,(r.gymLevel||0)*.12),s=Math.min(.55,(r.simulatorLevel||0)*.12),c=Number(((1.2+(t-37)*.2)*(1-e)).toFixed(1)),l=Number(((1+(t-37)*.15)*(1-s)).toFixed(1));n.fitness=Math.max(45,Number((n.fitness-c).toFixed(1))),n.pace=Math.max(45,Number((n.pace-l).toFixed(1))),n.wetSkill=Math.max(45,Number((n.wetSkill-.4).toFixed(1))),n.technicalFeedback=Math.min(99,Number((n.technicalFeedback+.4).toFixed(1))),i.fitness=-c,i.pace=-l,i.wetSkill=-.4,i.technicalFeedback=.4,o=`Età avanzata (${t} anni): la velocità pura cala (-${l}), ma la saggezza tecnica resta infinita. Valuta il momento ideale per il ritiro.`}return this.player.ovr=this.calculateOvr(n),{prevAge:e,newAge:t,phase:a,deltas:i,summary:o,ovr:this.player.ovr}}concludeSeason(){let e=this.getCurrentCategoryData(),t=this.career.standings.drivers[0],n=t&&t.isPlayer;n&&(this.career.stats.worldTitles++,this.career.licensePoints+=e.licensePointsAwarded||30);let i=this.getCurrentTeammate(),a=this.career.standings.drivers.find(e=>e.isPlayer),o=this.career.standings.drivers.find(e=>e.driverId===i.id);a&&o&&a.points>o.points&&this.career.stats.teammateBeatenCount++,this.career.history.push({year:this.career.currentYear,season:this.career.seasonNumber,category:this.career.currentCategory,categoryName:r.getSeriesName(this.career.currentCategory,this.player.discipline),team:r.getTeamName(this.career.currentTeamId,this.player.discipline),playerPos:this.career.standings.drivers.findIndex(e=>e.isPlayer)+1,playerPoints:a?a.points:0,wins:a?a.wins:0,championName:n?`${this.player.firstName} ${this.player.lastName}`:r.getDriverName(t?.driverId,this.player.discipline)});let s=this.player.age;this.player.age++;let c=this.player.age;this.career.currentYear++,this.career.seasonNumber++,this.career.stats.currentYear=this.career.currentYear;let l=this.applyAnnualCareerEvolution(s,c),u=this.career.contract||{yearsLeft:1,durationYears:1,buyoutClause:0},d=u.yearsLeft===void 0?1:u.yearsLeft;u.yearsLeft=Math.max(0,d-1);let f=u.yearsLeft>0;this.career.carUpgrades={aero:0,engine:0,chassis:0,reliability:0};let p=this.generateContractOffers();return this.saveToStorage(),{isPlayerChampion:n,championName:n?`${this.player.firstName} ${this.player.lastName}`:r.getDriverName(t?.driverId,this.player.discipline),offers:p,devReport:l,isUnderContract:f,yearsLeft:u.yearsLeft,buyoutClause:u.buyoutClause||0}}generateContractOffers(){let n=this.player.discipline,i=n===`auto`?e:t,a=this.career.currentCategory,o=i[a],s=this.career.currentTeamId,c=this.player.ovr||75,l=[],u=e=>({auto_f4:{baseSalary:4500,salaryMult:65,winBonus:8e3,buyout:25e3},auto_f3:{baseSalary:11e3,salaryMult:140,winBonus:2e4,buyout:55e3},auto_f2:{baseSalary:28e3,salaryMult:350,winBonus:5e4,buyout:13e4},auto_f1:{baseSalary:9e4,salaryMult:1500,winBonus:18e4,buyout:5e5},auto_wec:{baseSalary:55e3,salaryMult:850,winBonus:12e4,buyout:28e4},auto_indy:{baseSalary:48e3,salaryMult:750,winBonus:1e5,buyout:24e4},moto_3:{baseSalary:4e3,salaryMult:60,winBonus:7500,buyout:22e3},moto_2:{baseSalary:13e3,salaryMult:170,winBonus:26e3,buyout:6e4},moto_gp:{baseSalary:85e3,salaryMult:1400,winBonus:17e4,buyout:48e4},moto_sbk:{baseSalary:32e3,salaryMult:460,winBonus:65e3,buyout:14e4}})[e]||{baseSalary:6e3,salaryMult:100,winBonus:12e3,buyout:35e3},d=u(a),f=r.getTeam(s,n),p=Math.max(3e3,Math.round(d.baseSalary+(c-60)*d.salaryMult)),m=Math.round(p*1.15),h=Math.round(d.winBonus+(c-60)*(d.salaryMult*1.5));l.push({id:`offer_renewal`,teamId:s,teamName:f.displayName,category:a,categoryName:r.getSeriesName(a,n),salaryPerRace:p,salaryPerRace1yr:p,salaryPerRace2yr:m,winBonus:h,role:c>=85?`1st Driver (Caposquadra)`:`Equal Status (Pari Trattamento)`,isPromotion:!1,isRenewal:!0,color:f.color||`#e10600`,buyoutClause2yr:d.buyout,carPace:f.carPace||f.bikePace||75}),o&&o.teams&&o.teams.filter(e=>e.id!==s).slice(0,3).forEach(e=>{let t=e.carPace||e.bikePace||75,i=t-75,o=Math.max(2500,Math.round(p*(1+i*.015))),s=Math.round(o*1.15),u=Math.round(h*(1+i*.01));l.push({id:`offer_same_${e.id}`,teamId:e.id,teamName:r.getTeamName(e.id,n,a),category:a,categoryName:r.getSeriesName(a,n),salaryPerRace:o,salaryPerRace1yr:o,salaryPerRace2yr:s,winBonus:u,role:c>=88?`1st Driver`:c>=80?`Equal Status`:`Challenger`,isPromotion:!1,isRenewal:!1,color:e.color||`#888888`,buyoutClause2yr:Math.round(d.buyout*(1+i*.01)),carPace:t})});let g=[];return n===`auto`?a===`auto_f4`?g.push(`auto_f3`):a===`auto_f3`?g.push(`auto_f2`):a===`auto_f2`?g.push(`auto_f1`,`auto_wec`,`auto_indy`):a===`auto_f1`?g.push(`auto_wec`,`auto_indy`):a===`auto_wec`?g.push(`auto_f1`,`auto_indy`):a===`auto_indy`&&g.push(`auto_f1`,`auto_wec`):a===`moto_3`?g.push(`moto_2`):a===`moto_2`?g.push(`moto_gp`,`moto_sbk`):a===`moto_gp`?g.push(`moto_sbk`):a===`moto_sbk`&&g.push(`moto_gp`),g.forEach(e=>{let t=i[e];if(!t)return;let o=this.player.age>=(t.minAge||16),s=this.career.history?.some(e=>e.category===a&&e.playerPos===1),d=u(e);if(o&&(c>=70||s||this.career.licensePoints>=15)){let i=s?0:Math.min(1,t.teams.length-1),a=t.teams[i]||t.teams[0],o=a.carPace||a.bikePace||80,u=Math.round(d.baseSalary+(c-65)*d.salaryMult),f=Math.round(u*1.15),p=Math.round(d.winBonus+(c-65)*(d.salaryMult*1.5));l.push({id:`offer_promo_${e}_${a.id}`,teamId:a.id,teamName:r.getTeamName(a.id,n,e),category:e,categoryName:r.getSeriesName(e,n),salaryPerRace:u,salaryPerRace1yr:u,salaryPerRace2yr:f,winBonus:p,role:c>=90?`1st Driver`:`Challenger / 2nd Driver`,isPromotion:!0,isRenewal:!1,color:a.color||`#00d2be`,buyoutClause2yr:d.buyout,carPace:o})}}),this.career.contractOffers=l,l}acceptContract(e,t=1){let n=this.career.contract||{},r=n.yearsLeft||0,i=e.teamId!==this.career.currentTeamId,a=0;if(i&&r>0&&n.buyoutClause>0){let e=n.buyoutClause;if(this.career.money<e)return{success:!1,reason:`Fondi insufficienti! La rescissione anticipata del contratto con il tuo team richiede una penale di €${e.toLocaleString()}. Disponi di €${this.career.money.toLocaleString()}.`};this.career.money-=e,a=e}let o=t===2?e.salaryPerRace2yr||Math.round((e.salaryPerRace||5e3)*1.15):e.salaryPerRace1yr||e.salaryPerRace||5e3,s=t===2?e.buyoutClause2yr||5e4:0,c=this.career.currentCategory;return this.career.currentTeamId=e.teamId,this.career.currentCategory=e.category,this.career.contract={salaryPerRace:o,winBonus:e.winBonus||1e4,role:e.role||`1st Driver`,durationYears:t,yearsLeft:t,buyoutClause:s},c!==e.category&&(this.career.currentRaceIndex=0,this.initSeasonStandings()),this.saveToStorage(),{success:!0,paidBuyout:a,newContract:this.career.contract}}buyCarUpgrade(e){let t=25e3*((this.career.carUpgrades[e]||0)+1);return this.career.money<t?{success:!1,message:`Fondi insufficienti per questo pacchetto R&D.`}:(this.career.carUpgrades[e]||0)>=5?{success:!1,message:`Reparto già al massimo sviluppo consentito per questa stagione.`}:(this.career.money-=t,this.career.carUpgrades[e]=(this.career.carUpgrades[e]||0)+1,this.saveToStorage(),{success:!0,message:`Aggiornamento R&D ${e.toUpperCase()} installato con successo!`})}buyHqUpgrade(e){let t={simulatorLevel:4e4,gymLevel:3e4,prAgencyLevel:5e4,telemetryCoachLevel:45e3}[e]||35e3;return this.career.money<t?{success:!1,message:`Budget insufficiente per espandere l'HQ.`}:(this.career.money-=t,this.career.hqUpgrades[e]=(this.career.hqUpgrades[e]||0)+1,this.saveToStorage(),{success:!0,message:`Struttura HQ potenziata con successo!`})}buyLifestyleItem(e){return this.career.money<e.price?{success:!1,message:`Non hai abbastanza milioni per questo sfizio da celebrità.`}:(this.career.money-=e.price,this.career.lifestyleItems.push(e),this.player.attributes.marketability=Math.min(99,this.player.attributes.marketability+e.fameBonus),this.saveToStorage(),{success:!0,message:`Hai acquistato: ${e.name} (+${e.fameBonus} Notorietà Globale)`})}retire(){this.career.isRetired=!0;let e=i.calculateScore(this.player,this.career.stats),t=i.getHallOfFameRanking(e,this.player,this.career.stats),n=i.getTitleAndTier(e);return this.saveToStorage(),{goatScore:e,hallOfFame:t,verdict:n}}saveToStorage(){try{if(typeof localStorage>`u`)return;let e={player:this.player,career:this.career};localStorage.setItem(`il_nuovo_goat_motorsport_save`,JSON.stringify(e))}catch(e){console.error(`Errore nel salvataggio della carriera:`,e)}}loadFromStorage(){try{if(typeof localStorage>`u`)return;let e=localStorage.getItem(`il_nuovo_goat_motorsport_save`);if(e){let t=JSON.parse(e);this.player=t.player,this.career=t.career,this.player&&this.player.unspentSkillPoints===void 0&&(this.player.unspentSkillPoints=0),this.career&&this.career.contract&&(this.career.contract.durationYears===void 0&&(this.career.contract.durationYears=this.career.contract.yearsLeft||1),this.career.contract.buyoutClause===void 0&&(this.career.contract.buyoutClause=0))}}catch(e){console.warn(`Nessun salvataggio valido trovato o errore di lettura:`,e)}}resetCareer(){typeof localStorage<`u`&&localStorage.removeItem(`il_nuovo_goat_motorsport_save`),this.player=null,this.career=null}},s=new class{constructor(){this.ctx=null,this.muted=localStorage.getItem(`il_nuovo_goat_muted`)===`true`}init(){if(!this.ctx){let e=window.AudioContext||window.webkitAudioContext;e&&(this.ctx=new e)}this.ctx&&this.ctx.state===`suspended`&&this.ctx.resume()}toggleMute(){return this.muted=!this.muted,localStorage.setItem(`il_nuovo_goat_muted`,this.muted?`true`:`false`),this.muted}playClick(){if(!this.muted&&(this.init(),this.ctx))try{let e=this.ctx.createOscillator(),t=this.ctx.createGain();e.type=`sine`,e.frequency.setValueAtTime(600,this.ctx.currentTime),e.frequency.exponentialRampToValueAtTime(300,this.ctx.currentTime+.05),t.gain.setValueAtTime(.12,this.ctx.currentTime),t.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.05),e.connect(t),t.connect(this.ctx.destination),e.start(),e.stop(this.ctx.currentTime+.05)}catch{}}playRadioBeep(){if(!this.muted&&(this.init(),this.ctx))try{let e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type=`triangle`,t.frequency.setValueAtTime(1400,e),t.frequency.setValueAtTime(1800,e+.07),n.gain.setValueAtTime(.15,e),n.gain.setValueAtTime(.15,e+.12),n.gain.exponentialRampToValueAtTime(.001,e+.16),t.connect(n),n.connect(this.ctx.destination),t.start(e),t.stop(e+.16)}catch{}}playEngineRev(){if(!this.muted&&(this.init(),this.ctx))try{let e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type=`sawtooth`,t.frequency.setValueAtTime(110,e),t.frequency.exponentialRampToValueAtTime(380,e+.35),t.frequency.setValueAtTime(220,e+.36),t.frequency.exponentialRampToValueAtTime(460,e+.7),n.gain.setValueAtTime(.1,e),n.gain.exponentialRampToValueAtTime(.01,e+.75),t.connect(n),n.connect(this.ctx.destination),t.start(e),t.stop(e+.75)}catch{}}playChequeredFlag(){if(!this.muted&&(this.init(),this.ctx))try{[523.25,659.25,783.99,1046.5].forEach((e,t)=>{let n=this.ctx.createOscillator(),r=this.ctx.createGain(),i=this.ctx.currentTime+t*.12;n.type=`triangle`,n.frequency.setValueAtTime(e,i),r.gain.setValueAtTime(.15,i),r.gain.exponentialRampToValueAtTime(.001,i+.35),n.connect(r),r.connect(this.ctx.destination),n.start(i),n.stop(i+.35)})}catch{}}},c=class{static generateHelmetSvg(e={},t=120){let n=e.primaryColor||`#e10600`,r=e.secondaryColor||`#ffd000`,i=e.visorColor||`#00d2be`,a=e.pattern||`stripes`,o=e.number||77,s=e.nationality||`ITA`,c=i;return i===`#00d2be`?c=`url(#chromeBlueGrad)`:i===`#ffd700`||i===`#ffd000`?c=`url(#goldGrad)`:i===`#222222`&&(c=`#1a1a1a`),`
      <svg width="${t}" height="${t}" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="pilot-helmet-svg">
        <defs>
          <!-- Gradiente calotta 3D -->
          <radialGradient id="shellShine" cx="40%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.35"/>
            <stop offset="60%" stop-color="${n}"/>
            <stop offset="100%" stop-color="#050505"/>
          </radialGradient>

          <!-- Riflesso oro visiera -->
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fff2a3"/>
            <stop offset="50%" stop-color="#ffd700"/>
            <stop offset="100%" stop-color="#b8860b"/>
          </linearGradient>

          <!-- Riflesso cromo blu visiera -->
          <linearGradient id="chromeBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#a8f5ff"/>
            <stop offset="40%" stop-color="#00d2be"/>
            <stop offset="100%" stop-color="#0052a3"/>
          </linearGradient>

          <!-- Ombra alettone posteriore -->
          <linearGradient id="spoilerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#111111"/>
            <stop offset="100%" stop-color="${r}"/>
          </linearGradient>
        </defs>

        <!-- Sagoma Calotta Esterna Casco da Gara -->
        <path d="M 50 135 
                 C 25 125, 20 80, 50 45 
                 C 80 15, 135 15, 165 48 
                 C 185 70, 185 115, 160 145 
                 C 145 160, 115 168, 80 165 
                 C 60 162, 50 145, 50 135 Z" 
              fill="url(#shellShine)" stroke="#111111" stroke-width="3"/>

        <!-- Grafica e Livrea Secondaria -->
        ${a===`stripes`?`
          <!-- Strisce Racing Frontali e Laterali -->
          <path d="M 55 52 C 90 28, 130 28, 160 52 L 152 64 C 125 42, 90 42, 63 64 Z" fill="${r}" />
          <path d="M 45 95 C 40 120, 70 148, 100 155 L 98 145 C 72 138, 48 115, 52 95 Z" fill="${r}" />
        `:``}

        ${a===`lightning`?`
          <!-- Grafica a Saetta Tagliente -->
          <polygon points="45,65 95,50 80,75 130,55 90,110 110,85 65,135" fill="${r}" opacity="0.9" />
        `:``}

        ${a===`bicolor`?`
          <!-- Livrea Bicolore Divido a Metà -->
          <path d="M 100 20 C 135 20, 165 48, 165 90 C 165 135, 140 162, 100 165 Z" fill="${r}" opacity="0.8" />
        `:``}

        <!-- Presa d'Aria Superiore (Aero Scoop) -->
        <path d="M 85 22 Q 100 18 115 22 L 110 32 Q 100 29 90 32 Z" fill="#222222" stroke="#444444" stroke-width="1"/>

        <!-- Alettone Posteriore / Spoiler Aerodinamico -->
        <path d="M 160 85 Q 185 92 178 120 Q 165 110 160 85 Z" fill="url(#spoilerGrad)" stroke="#222222"/>

        <!-- Apertura Visiera (Cornice Nera in Gomma) -->
        <path d="M 55 75 
                 Q 105 58 152 75 
                 Q 156 108 142 118 
                 Q 100 112 55 102 
                 Z" 
              fill="#080808" stroke="#000000" stroke-width="2"/>

        <!-- Vetro Visiera Iridato / Riflettente -->
        <path d="M 58 78 
                 Q 105 62 149 78 
                 Q 152 105 139 114 
                 Q 100 108 58 99 
                 Z" 
              fill="${c}" opacity="0.95"/>

        <!-- Bagliore Aerodinamico Curvo sulla Visiera -->
        <path d="M 64 82 Q 105 69 140 82" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" opacity="0.65"/>

        <!-- Meccanismo Snodo Visiera Laterale (Pivot) -->
        <circle cx="150" cy="95" r="7" fill="#1f1f1f" stroke="#555" stroke-width="1.5"/>
        <circle cx="150" cy="95" r="2.5" fill="${r}"/>

        <!-- Mentoniera con Prese d'Aria Nere -->
        <path d="M 68 125 L 85 125 L 80 135 L 65 135 Z" fill="#1a1a1a"/>
        <path d="M 92 125 L 110 125 L 105 135 L 90 135 Z" fill="#1a1a1a"/>

        <!-- Numero di Gara Stilizzato sul Lato / Mentoniera -->
        <text x="75" y="152" font-family="'Orbitron', sans-serif" font-weight="900" font-size="14" fill="#ffffff" text-anchor="middle" stroke="#000000" stroke-width="1">#${o}</text>

        <!-- Bandierina Nazionale sul retro -->
        <rect x="145" y="132" width="14" height="9" rx="1.5" fill="#222222" stroke="#444" stroke-width="0.5"/>
        <text x="152" y="139" font-size="6" font-family="sans-serif" font-weight="bold" fill="#ffffff" text-anchor="middle">${s}</text>
      </svg>
    `}},l=class{static container=null;static modalContainer=null;static init(){if(!this.container){let e=document.getElementById(`toast-notification-container`);e||(e=document.createElement(`div`),e.id=`toast-notification-container`,e.className=`toast-container`,document.body.appendChild(e)),this.container=e}if(!this.modalContainer){let e=document.getElementById(`app-modal-root`);e||(e=document.createElement(`div`),e.id=`app-modal-root`,document.body.appendChild(e)),this.modalContainer=e}}static show(e,t=`info`,n=3500){this.init();let r=document.createElement(`div`);r.className=`in-game-toast toast-${t}`;let i=`ℹ️`;t===`success`&&(i=`✅`),t===`warning`&&(i=`⚠️`),t===`danger`&&(i=`🛑`),r.innerHTML=`
      <div class="toast-icon">${i}</div>
      <div class="toast-content">
        <div class="toast-msg">${e}</div>
      </div>
      <button class="toast-close-btn">&times;</button>
    `,t===`danger`||t===`warning`?s.playClick():t===`success`?s.playRadioBeep():s.playClick(),this.container.appendChild(r),requestAnimationFrame(()=>{r.classList.add(`toast-visible`)});let a=()=>{r.classList.remove(`toast-visible`),r.classList.add(`toast-hiding`),setTimeout(()=>{r.parentElement&&r.parentElement.removeChild(r)},300)};r.querySelector(`.toast-close-btn`).onclick=a,setTimeout(a,n)}static confirm({title:e=`Conferma Azione`,message:t=`Sei sicuro di voler procedere?`,confirmText:n=`Conferma`,cancelText:r=`Annulla`,danger:i=!1,onConfirm:a=()=>{},onCancel:o=()=>{}}){this.init();let c=document.createElement(`div`);c.className=`in-game-modal-overlay`,c.innerHTML=`
      <div class="in-game-modal-card">
        <div class="modal-card-header ${i?`danger-header`:``}">
          <span class="modal-badge">${i?`⚠️ ATTENZIONE`:`💬 COMUNICAZIONE`}</span>
          <h3 class="modal-title">${e}</h3>
        </div>
        <div class="modal-card-body">
          <p class="modal-message">${t}</p>
        </div>
        <div class="modal-card-footer">
          <button class="modal-btn btn-secondary" id="modal-cancel-btn">${r}</button>
          <button class="modal-btn ${i?`btn-danger`:`btn-primary`}" id="modal-confirm-btn">${n}</button>
        </div>
      </div>
    `,this.modalContainer.appendChild(c),s.playRadioBeep(),requestAnimationFrame(()=>{c.classList.add(`modal-visible`)});let l=e=>{c.classList.remove(`modal-visible`),setTimeout(()=>{c.parentElement&&c.parentElement.removeChild(c),e&&e()},250)};c.querySelector(`#modal-cancel-btn`).onclick=()=>{s.playClick(),l(o)},c.querySelector(`#modal-confirm-btn`).onclick=()=>{s.playClick(),l(a)}}static celebrate({title:e=`FESTEGGIAMENTI DI FINE STAGIONE`,subtitle:t=`CAMPIONATO MONDIALE`,message:n=``,isChampion:r=!1,onClose:i=()=>{}}){this.init();let a=document.createElement(`div`);a.className=`in-game-modal-overlay celebrate-overlay`,a.innerHTML=`
      <div class="in-game-modal-card celebrate-card ${r?`gold-celebration`:``}">
        <div class="celebrate-banner">
          <span class="trophy-emoji">${r?`🏆`:`🏁`}</span>
          <span class="celebrate-sub">${t}</span>
          <h2 class="celebrate-main-title">${e}</h2>
        </div>
        <div class="modal-card-body">
          <p class="modal-message large-text">${n}</p>
        </div>
        <div class="modal-card-footer center">
          <button class="modal-btn btn-gold" id="celebrate-close-btn">
            ${r?`VAI AL PODIO & APRI IL MERCATO 🍾`:`PROCEDI AL MERCATO PILOTI ➔`}
          </button>
        </div>
      </div>
    `,this.modalContainer.appendChild(a),r?s.playChequeredFlag():s.playRadioBeep(),requestAnimationFrame(()=>{a.classList.add(`modal-visible`)});let o=()=>{a.classList.remove(`modal-visible`),setTimeout(()=>{a.parentElement&&a.parentElement.removeChild(a),i()},250)};a.querySelector(`#celebrate-close-btn`).onclick=()=>{s.playClick(),o()}}},u=class{static open(e={}){let t=e.onClose||(()=>{}),n=e.onConfirm||(()=>{}),r=!!e.isPostWeekend,i=o.player;if(!i)return;let a=document.getElementById(`driver-skills-modal`);a&&a.remove();let c={pace:0,racecraft:0,tyreMgmt:0,consistency:0,wetSkill:0,technicalFeedback:0,fitness:0},u=i.unspentSkillPoints||0,d=i.ovr,f=document.createElement(`div`);f.className=`in-game-modal-overlay modal-visible`,f.id=`driver-skills-modal`;let p=[{key:`pace`,name:`Giro Secco & Qualifica`,icon:`⚡`,weight:`28%`,desc:`Velocità pura sul giro singolo, staccata al limite e caccia alla Pole Position.`},{key:`racecraft`,name:`Staccata & Sorpasso`,icon:`⚔️`,weight:`22%`,desc:`Efficacia nei duelli corpo a corpo, difesa della traiettoria e attacco in curva.`},{key:`tyreMgmt`,name:`Gestione Gomme`,icon:`🛞`,weight:`16%`,desc:`Capacità di preservare la mescola evitando surriscaldamenti e blistering sui long run.`},{key:`consistency`,name:`Costanza di Passo`,icon:`⏱️`,weight:`14%`,desc:`Ripetitività dei tempi su ogni giro e riduzione del rischio di errori o sbavature.`},{key:`wetSkill`,name:`Abilità sul Bagnato`,icon:`🌧️`,weight:`10%`,desc:`Sensibilità sull'asfalto allagato, galleggiamento e controllo dell'aquaplaning.`},{key:`technicalFeedback`,name:`Feedback Telemetrico`,icon:`📡`,weight:`10%`,desc:`Qualità dei dati telemetrici trasmessi agli ingegneri per il bilanciamento dell'assetto.`},{key:`fitness`,name:`Forma Fisica & Riflessi`,icon:`🏃`,weight:`Atletica`,desc:`Resistenza al carico gravitazionale G e mantenimento della lucidità sotto sforzo.`}],m=()=>{let e=Object.values(c).reduce((e,t)=>e+t,0),a=u-e,h=o.previewOvrWithAllocations(c),g=h-d;f.innerHTML=`
        <div class="in-game-modal-card skills-modal-card">
          <!-- HEADER MODAL -->
          <div class="modal-card-header skills-modal-header">
            <div class="header-titles">
              <span class="modal-badge gold">
                ${r?`🏁 WEEKEND COMPLETATO • SVILUPPO PILOTA`:`⚡ SCHEDA OVR & ABILITÀ PILOTA`}
              </span>
              <h2 class="skills-modal-title">
                ${i.firstName} ${i.lastName} (${i.age} Anni)
              </h2>
              <small class="skills-modal-subtitle">
                Distribuisci i Punti Abilità per far crescere il tuo pilota curva dopo curva.
              </small>
            </div>
            <button id="btn-close-skills-modal" class="modal-close-icon" title="Chiudi finestra">✕</button>
          </div>

          <!-- CORPO MODAL -->
          <div class="modal-card-body skills-modal-body">
            <!-- HERO OVR & PUNTI DISPONIBILI -->
            <div class="skills-hero-banner">
              <div class="ovr-rating-display">
                <span class="ovr-lbl">VALUTAZIONE COMPLESSIVA</span>
                <div class="ovr-values-row">
                  <span class="current-ovr-number">${d}</span>
                  ${g>0?`<span class="ovr-upgrade-arrow">➔</span><span class="new-ovr-number">+${g} (${h} OVR)</span>`:``}
                </div>
                <small class="ovr-peak-tag">Picco Massimo Raggiunto: <strong>${o.career?.stats?.peakOvr||d} OVR</strong></small>
              </div>

              <div class="skill-points-counter-box ${a>0?`pulse-border`:``}">
                <span class="pts-lbl">PUNTI ABILITÀ DISPONIBILI</span>
                <strong class="pts-val">${a} ⭐</strong>
                <small class="pts-hint">
                  ${a>0?`Clicca [+] sugli attributi per assegnarli`:`Guadagna nuovi punti completando i GP`}
                </small>
              </div>
            </div>

            <!-- RIEPILOGO PONDERAZIONE OVR -->
            <div class="ovr-weights-summary-pill">
              <span class="formula-tag">FORMULA OVR:</span>
              <span>28% Passo • 22% Duelli • 16% Gomme • 14% Costanza • 10% Bagnato • 10% Telemetria</span>
            </div>

            <!-- GRIGLIA INTERATTIVA ATTRIBUTI -->
            <div class="skills-attributes-grid">
              ${p.map(e=>{let t=Math.round(i.attributes[e.key]||50),n=c[e.key]||0,r=t+n,o=a>0&&r<99,s=n>0;return`
                  <div class="skill-row-item ${n>0?`upgraded`:``}">
                    <div class="skill-info-col">
                      <div class="skill-name-row">
                        <span class="skill-icon">${e.icon}</span>
                        <strong class="skill-title">${e.name}</strong>
                        <span class="skill-weight-tag">${e.weight}</span>
                      </div>
                      <p class="skill-desc">${e.desc}</p>
                    </div>

                    <div class="skill-progress-col">
                      <div class="skill-bar-wrapper">
                        <div class="skill-bar-bg">
                          <div class="skill-bar-base" style="width:${t}%"></div>
                          ${n>0?`<div class="skill-bar-added" style="left:${t}%; width:${n}%"></div>`:``}
                        </div>
                      </div>
                      <div class="skill-numbers">
                        <span class="base-num">${t}</span>
                        ${n>0?`<strong class="bonus-num">+${n} (${r})</strong>`:``}
                      </div>
                    </div>

                    <div class="skill-controls-col">
                      <button class="btn-step-attr btn-minus" data-key="${e.key}" ${s?``:`disabled`}>-</button>
                      <span class="draft-added-badge ${n>0?`has-points`:``}">+${n}</span>
                      <button class="btn-step-attr btn-plus" data-key="${e.key}" ${o?``:`disabled`}>+</button>
                    </div>
                  </div>
                `}).join(``)}
            </div>
          </div>

          <!-- FOOTER AZIONI -->
          <div class="modal-card-footer skills-modal-footer">
            <button id="btn-cancel-skills" class="modal-btn btn-secondary">
              ${e>0?`Annulla Modifiche`:`Chiudi / Conserva per Dopo`}
            </button>
            <button id="btn-confirm-skills" class="modal-btn btn-primary pulse-glow" ${e===0?`disabled`:``}>
              <span>CONFERMA E SALVA SVILUPPO (+${e} Pts) 💾</span>
            </button>
          </div>
        </div>
      `,f.querySelectorAll(`.btn-plus`).forEach(e=>{e.onclick=()=>{let t=e.dataset.key;a>0&&i.attributes[t]+c[t]<99&&(s.playClick(),c[t]++,m())}}),f.querySelectorAll(`.btn-minus`).forEach(e=>{e.onclick=()=>{let t=e.dataset.key;c[t]>0&&(s.playClick(),c[t]--,m())}});let _=f.querySelector(`#btn-confirm-skills`);_&&(_.onclick=()=>{if(e<=0)return;s.playRadioBeep();let t=o.assignBatchSkillPoints(c);t.success&&(l.show(`🎉 Abilità potenziate! Valutazione pilota aggiornata a ${t.newOvr} OVR.`,`success`),f.remove(),window.dispatchEvent(new CustomEvent(`career-data-updated`)),n(t))});let v=f.querySelector(`#btn-close-skills-modal`),y=f.querySelector(`#btn-cancel-skills`),b=()=>{s.playClick(),f.remove(),t()};v&&(v.onclick=b),y&&(y.onclick=b)};m(),document.body.appendChild(f)}},d=class{static render(e,t,n,i){let a=o.hasActiveCareer(),l=a?o.player:null,u=a?o.career:null;if(!a||t===`landing`){e.innerHTML=`
        <header class="top-nav-bar landing-nav">
          <div class="logo-area clickable-home-logo" id="logo-click-home" title="Clicca per tornare alla Home / Landing Page">
            <span class="goat-badge">GOAT</span>
            <span class="logo-title">MOTORSPORT EDITION</span>
          </div>

          <div class="nav-controls">
            ${a?`
              <button id="btn-return-career" class="nav-pill-btn career-return-btn pulse-glow">
                ▶ TORNA ALLA CARRIERA (${l.firstName} ${l.lastName})
              </button>
            `:``}

            <button id="btn-mod-manager" class="nav-icon-btn" title="Impostazioni & Database Nomi">⚙️</button>
            <button id="btn-toggle-sound" class="nav-icon-btn" title="Audio On/Off">
              ${s.muted?`🔇`:`🔊`}
            </button>
          </div>
        </header>
      `,this.bindLandingHeaderEvents(e,n,i);return}let d=o.getPlayerTeam()||r.getTeam(u.currentTeamId,l.discipline),f=r.getSeriesName(u.currentCategory,l.discipline);e.innerHTML=`
      <header class="top-nav-bar career-header">
        <!-- RIGA SUPERIORE: LOGO BRAND, IDENTITÀ PILOTA, STATS & CONTROLLI -->
        <div class="career-header-top">
          <!-- Logo Brand (Non cliccabile: la navigazione alla Home/Menu è gestita dal tasto dedicato sottostante) -->
          <div class="logo-area static-brand-logo" id="header-brand-logo">
            <span class="goat-badge">GOAT</span>
            <span class="logo-title">MOTORSPORT EDITION</span>
          </div>

          <!-- Identità Pilota -->
          <div class="driver-summary-left">
            <div class="mini-helmet-container" title="Casco Ufficiale">
              ${c.generateHelmetSvg({...l.helmet,number:l.number,nationality:l.nationality},42)}
            </div>
            <div class="driver-info-meta">
              <div class="driver-name-row">
                <span class="country-flag">${this.getFlagEmoji(l.nationality)}</span>
                <strong class="pilot-full-name">${l.firstName} ${l.lastName}</strong>
                <span class="pilot-number-tag">#${l.number}</span>
                <span class="discipline-tag ${l.discipline}">${l.discipline===`auto`?`🏎️ AUTO`:`🏍️ MOTO`}</span>
              </div>
              <div class="driver-team-row">
                <span class="team-bullet" style="background:${d.color||`#e10600`}"></span>
                <strong class="team-label">${d.displayName}</strong>
                <span class="separator">•</span>
                <span class="cat-label">${f}</span>
                <span class="separator">•</span>
                <span class="age-label">${l.age} Anni (Stagione ${u.seasonNumber})</span>
              </div>
            </div>
          </div>

          <!-- Metriche Pilota & Scuderia -->
          <div class="driver-stats-center">
            <div class="stat-bubble clickable-ovr-bubble ${l.unspentSkillPoints>0?`has-points-pulse`:``}" id="btn-header-ovr-modal" title="Clicca per aprire la Scheda OVR e Assegnare i Punti Abilità">
              <span class="stat-label">OVR ${l.unspentSkillPoints>0?`<span class="unspent-star-badge">+${l.unspentSkillPoints}⭐</span>`:``}</span>
              <span class="stat-val rating">${l.ovr}</span>
            </div>
            <div class="stat-bubble" title="Fondi Disponibili">
              <span class="stat-label">FONDI</span>
              <span class="stat-val money">€${u.money.toLocaleString()}</span>
            </div>
            <div class="stat-bubble" title="Vittorie in Carriera">
              <span class="stat-label">VITTORIE</span>
              <span class="stat-val wins">${u.stats.wins}</span>
            </div>
            <div class="stat-bubble" title="Campionati Mondiali Vinti">
              <span class="stat-label">MONDIALI</span>
              <span class="stat-val titles">🏆 ${u.stats.worldTitles}</span>
            </div>
          </div>

          <!-- Pulsanti di controllo globali (Solo Impostazioni, Audio e Reset) -->
          <div class="nav-controls">
            <button id="btn-mod-manager" class="nav-icon-btn" title="Impostazioni di Gioco & Database Nomi">⚙️</button>
            <button id="btn-toggle-sound" class="nav-icon-btn" title="Disattiva/Attiva Suoni">
              ${s.muted?`🔇`:`🔊`}
            </button>
            <button id="btn-reset-career" class="nav-icon-btn danger" title="Nuova Carriera / Reset">🔄</button>
          </div>
        </div>

        <!-- RIGA INFERIORE: BARRA DI NAVIGAZIONE A TAB PER SPEZZETTARE LE PAGINE -->
        <nav class="career-subnav-bar">
          <button class="subnav-tab ${t===`landing`?`active`:``}" data-route="landing" title="Torna alla Landing Page del portale">
            <span class="tab-icon">🌐</span>
            <span class="tab-title">Home / Menu</span>
          </button>
          
          <button class="subnav-tab ${t===`dashboard`?`active`:``}" data-route="dashboard">
            <span class="tab-icon">🏠</span>
            <span class="tab-title">Paddock Hub</span>
          </button>

          <button class="subnav-tab ${t===`calendar`?`active`:``}" data-route="calendar">
            <span class="tab-icon">📅</span>
            <span class="tab-title">Calendario 2026</span>
          </button>

          <button class="subnav-tab ${t===`standings`?`active`:``}" data-route="standings">
            <span class="tab-icon">📊</span>
            <span class="tab-title">Classifiche</span>
          </button>

          <button class="subnav-tab ${t===`rd`?`active`:``}" data-route="rd">
            <span class="tab-icon">⚙️</span>
            <span class="tab-title">Reparto Corse R&D</span>
          </button>

          <button class="subnav-tab ${t===`market`?`active`:``}" data-route="market">
            <span class="tab-icon">💼</span>
            <span class="tab-title">Mercato & Contratti</span>
          </button>

          <button class="subnav-tab ${t===`lifestyle`?`active`:``}" data-route="lifestyle">
            <span class="tab-icon">🏛️</span>
            <span class="tab-title">Lifestyle & Sponsor</span>
          </button>

          <button class="subnav-tab ${t===`goat`?`active`:``}" data-route="goat">
            <span class="tab-icon">👑</span>
            <span class="tab-title">GOAT Index</span>
          </button>
        </nav>
      </header>
    `,this.bindCareerHeaderEvents(e,n,i)}static bindLandingHeaderEvents(e,t,n){let r=e.querySelector(`#logo-click-home`);r&&(r.onclick=()=>{s.playClick(),t(`landing`)});let i=e.querySelector(`#btn-return-career`);i&&(i.onclick=()=>{s.playClick(),t(`dashboard`)});let a=e.querySelector(`#btn-mod-manager`);a&&(a.onclick=()=>{s.playClick(),n()});let o=e.querySelector(`#btn-toggle-sound`);o&&(o.onclick=()=>{s.toggleMute(),o.textContent=s.muted?`🔇`:`🔊`})}static bindCareerHeaderEvents(e,t,n){let r=e.querySelector(`#btn-header-ovr-modal`);r&&(r.onclick=()=>{s.playClick(),u.open()}),e.querySelectorAll(`.subnav-tab`).forEach(e=>{e.onclick=()=>{let n=e.dataset.route;s.playClick(),t(n)}});let i=e.querySelector(`.subnav-tab.active`);i&&requestAnimationFrame(()=>{i.scrollIntoView({behavior:`smooth`,block:`nearest`,inline:`center`})});let a=e.querySelector(`#btn-mod-manager`);a&&(a.onclick=()=>{s.playClick(),n()});let c=e.querySelector(`#btn-toggle-sound`);c&&(c.onclick=()=>{s.toggleMute(),c.textContent=s.muted?`🔇`:`🔊`});let d=e.querySelector(`#btn-reset-career`);d&&(d.onclick=()=>{l.confirm({title:`Azzerare la Carriera?`,message:`Vuoi davvero iniziare una nuova carriera da zero? La carriera attuale verrà cancellata in modo definitivo.`,confirmText:`Cancella e Ricomincia`,cancelText:`Continua Carriera`,danger:!0,onConfirm:()=>{o.resetCareer(),l.show(`Carriera cancellata con successo.`,`info`),t(`creation`)}})})}static getFlagEmoji(e){return{ITA:`🇮🇹`,GBR:`🇬🇧`,NLD:`🇳🇱`,ESP:`🇪🇸`,MCO:`🇲🇨`,DEU:`🇩🇪`,FRA:`🇫🇷`,USA:`🇺🇸`,AUS:`🇦🇺`,JPN:`🇯🇵`,BRA:`🇧🇷`,FIN:`🇫🇮`,CHE:`🇨🇭`,BEL:`🇧🇪`,AUT:`🇦🇹`,MEX:`🇲🇽`,CAN:`🇨🇦`,THA:`🇹🇭`,ARG:`🇦🇷`,TUR:`🇹🇷`,COL:`🇨🇴`,PRT:`🇵🇹`,ZAF:`🇿🇦`,NZL:`🇳🇿`}[e]||`🏁`}},f=class{static render(e,t,n){let i=o.hasActiveCareer(),a=i?o.player:null,s=i?o.career:null,c=i&&a&&s?r.getTeam(s.currentTeamId,a.discipline):null,l=r.isRealNames,u=l?`STAGIONE MOTORSPORT UFFICIALE 2026 • AUTOMOBILISMO & MOTOCICLISMO`:`STAGIONE MOTORSPORT 2026 • APEX & PROTOTIPI RACING`,d=l?`Dalle categorie propedeutiche minori al trionfo nel Campionato Mondiale. Vivi l'esperienza manageriale e di guida più completa: <strong>11 scuderie F1 2026</strong> con <strong>Cadillac</strong> e <strong>Audi</strong>, la <strong>MotoGP</strong> dei giganti, telemetria in tempo reale, sviluppo Reparto Corse e la caccia all'indice GOAT contro le leggende della storia.`:`Dalle categorie propedeutiche minori al trionfo nel Campionato Mondiale. Vivi l'esperienza manageriale e di guida più completa: <strong>11 scuderie Formula Apex 2026</strong> con <strong>American Dream</strong> e <strong>German Ring</strong>, la <strong>Moto Apex</strong> dei giganti, telemetria in tempo reale, sviluppo Reparto Corse e la caccia all'indice GOAT contro le leggende della storia.`,f=l?`Scuderie F1 2026 (+Cadillac TWG)`:`Scuderie Formula Apex 2026 (+American Team)`,p=l?`GP F1 & Round MotoGP Calendari Ufficiali`:`GP Apex & Round Moto Apex Calendari`,m=l?`Dalle dure battaglie a ruote scoperte della Formula 4 e Formula Regional, fino al vertice assoluto della Formula 1 con il nuovo team Cadillac TWG e Audi Revolut, oltre alle sfide del WEC Hypercar e IndyCar.`:`Dalle dure battaglie a ruote scoperte della Formula 4 Regional, fino al vertice assoluto della Formula Apex con i nuovi team American Dream e German Ring, oltre alle sfide dell'Hypercar Endurance e American Open Wheel.`,h=[{num:`1`,title:l?`Formula 4`:`Formula 4 Regional`,desc:l?`Iniziazione`:`Iniziazione Giovani`},{num:`2`,title:l?`Formula 3`:`Formula 3 International`,desc:`Competizione Internazionale`},{num:`3`,title:l?`Formula 2`:`Formula 2 World Series`,desc:l?`Anticamera F1`:`Anticamera Formula Apex`},{num:`★`,premier:!0,title:l?`Formula 1 2026`:`Formula Apex 2026`,desc:`11 Scuderie Mondiali`},{num:`WEC`,cls:`wec`,title:l?`WEC Hypercar`:`Hypercar Endurance`,desc:l?`Ferrari 499P, Porsche & 24h Le Mans`:`Cavallino Sarthe, Stuttgart & 24h Le Mans`},{num:`INDY`,cls:`indy`,title:l?`IndyCar Series`:`American Open Wheel`,desc:l?`Penske, Ganassi & Open Wheel USA`:`Victory Factory & Speedway USA`}],g=l?`Pieghe al limite, staccate furiose e pieghe gomito a terra. Dalle staccate di gruppo della Moto3 al controllo di potenza della Moto2, fino ai mostri da 1000cc della MotoGP e alla WorldSBK.`:`Pieghe al limite, staccate furiose e pieghe gomito a terra. Dalle staccate di gruppo della Moto 3 Junior al controllo di potenza della Moto 2 Intermediate, fino ai mostri da 1000cc della Moto Apex e della Superbike Series.`,_=[{num:`1`,title:l?`Moto3`:`Moto 3 Junior GP`,desc:`250cc Leggere e Aggressive`},{num:`2`,title:l?`Moto2`:`Moto 2 Intermediate`,desc:`Motori 765cc e Telaio Rigido`},{num:`★`,premier:!0,moto:!0,title:l?`MotoGP 2026`:`Moto Apex World GP 2026`,desc:l?`1000cc Ufficiali Ducati, Aprilia, Yamaha`:`1000cc Bologna Desmo, Noale, Iwata`},{num:`SBK`,cls:`sbk`,title:l?`WorldSBK`:`Superbike SBK Series`,desc:l?`Superbike Derivate di Serie`:`Derivate di Serie 1000cc`}],v=l?`Calendari Ufficiali 2026`:`Calendari Mondiali 2026`,y=l?`Le 24 tappe di F1, 17 di MotoGP, WEC Hypercar e IndyCar. Esplora lunghezza, curve, usura pneumatici, difficoltà di sorpasso e lo storico dei vincitori.`:`Le 24 tappe di Formula Apex, 17 di Moto Apex, Hypercar Endurance e Speedway USA. Esplora lunghezza, curve, usura pneumatici, difficoltà di sorpasso e lo storico dei vincitori.`,b=l?`Un punteggio oggettivo misura la tua eredità contro mostri sacri come Michael Schumacher, Valentino Rossi, Lewis Hamilton, Ayrton Senna e Marc Márquez.`:`Un punteggio oggettivo misura la tua eredità contro leggende eterne come Il Barone Rosso, Il Dottore, Sir Lewis, Il Mago di San Paolo e La Formica Atomica.`,x=l?`Cadillac Formula 1 Team (TWG)`:`General Motors American Dream (TWG)`,S=l?`L'undicesima scuderia debutta in Formula 1 con motorizzazione Ferrari e la coppia esperta formata da <strong>Sergio Pérez</strong> e <strong>Valtteri Bottas</strong>.`:`L'undicesima scuderia debutta nel mondiale con motorizzazione Cavallino e la coppia formata da <strong>Checo Ministro Americano</strong> e <strong>Valtteri Baffo Bottas</strong>.`,C=l?`Audi Revolut F1 Team`:`Audi German Ring Factory`,w=l?`Completata l'acquisizione di Sauber, la casa dei quattro cerchi entra ufficialmente in griglia con <strong>Nico Hülkenberg</strong> e la giovane stella <strong>Gabriel Bortoleto</strong>.`:`Completata la transizione con Sauber, la prestigiosa casa tedesca scende in pista con <strong>Nico Il Pompiere</strong> e la giovane promessa <strong>Gabriel Carioca</strong>.`,T=l?`Hamilton in Rosso Ferrari`:`Sir Lewis in Rosso Cavallino`,E=l?`Lewis Hamilton affronta la stagione in tuta Scuderia Ferrari al fianco di Charles Leclerc, mentre Lando Norris difende l'iride col #1 in McLaren.`:`Sir Lewis Spamilton affronta la stagione in tuta Scuderia Cavallino al fianco di Charles Predestinato, mentre Lando Porris difende il titolo con Papaya Rocket.`,D=l?`Marc Márquez in Ducati Factory & Toprak`:`La Formica Atomica in Bologna Desmo & Toprak`,O=l?`Marc Márquez veste il rosso Ducati Lenovo insieme a Pecco Bagnaia, mentre il re del WorldSBK Toprak Razgatlıoğlu debutta in MotoGP con Prima Pramac Yamaha.`:`Marc La Formica Atomica veste il rosso Bologna Desmo insieme a Pecco Nuvola Rossa, mentre il funambolo Toprak debutta nella classe regina con Pramac Factory.`;e.innerHTML=`
      <div class="landing-page-root">
        <!-- HERO SECTION CINEMATOGRAFICA -->
        <section class="landing-hero">
          <div class="landing-hero-backdrop"></div>
          
          <div class="landing-hero-container">
            <div class="hero-top-badge">
              <span class="pulse-dot"></span>
              <span>${u}</span>
            </div>

            <h1 class="landing-main-title">
              <span class="title-sub">IL NUOVO</span>
              <span class="title-gold">GOAT</span>
              <span class="title-discipline">MOTORSPORT CAREER</span>
            </h1>

            <p class="landing-lead-text">
              ${d}
            </p>

            <!-- CALL TO ACTION RAPIDE -->
            <div class="landing-cta-group">
              ${i?`
                <button id="landing-btn-continue" class="landing-cta-btn primary pulse-glow">
                  <span class="cta-icon">▶</span>
                  <div class="cta-text-box">
                    <strong>CONTINUA CARRIERA</strong>
                    <small>${a.firstName} ${a.lastName} (${a.ovr} OVR) • ${c?c.displayName:`Scuderia`}</small>
                  </div>
                </button>
                <button id="landing-btn-new-career" class="landing-cta-btn secondary">
                  <span class="cta-icon">⚡</span>
                  <div class="cta-text-box">
                    <strong>NUOVA CARRIERA</strong>
                    <small>Crea un nuovo pilota da zero</small>
                  </div>
                </button>
              `:`
                <button id="landing-btn-start" class="landing-cta-btn primary pulse-glow">
                  <span class="cta-icon">🚀</span>
                  <div class="cta-text-box">
                    <strong>INIZIA LA TUA CARRIERA</strong>
                    <small>Crea il tuo pilota, casco e scegli Auto o Moto</small>
                  </div>
                </button>
              `}
            </div>

            <!-- STATISTICHE CHIAVE IN EVIDENZA -->
            <div class="landing-key-stats">
              <div class="key-stat-box">
                <span class="stat-number">11</span>
                <span class="stat-label">${f}</span>
              </div>
              <div class="key-stat-box">
                <span class="stat-number">24+17</span>
                <span class="stat-label">${p}</span>
              </div>
              <div class="key-stat-box">
                <span class="stat-number">2</span>
                <span class="stat-label">Discipline a Scelta: Auto o Moto</span>
              </div>
              <div class="key-stat-box">
                <span class="stat-number">100%</span>
                <span class="stat-label">Simulazione Telemetria & Strategia Box</span>
              </div>
            </div>
          </div>
        </section>

        <!-- SEZIONE DUE DISCIPLINE -->
        <section class="landing-section disciplines-section">
          <div class="section-header-box">
            <span class="section-tag">DUE MONDI, UN'UNICA GLORIA</span>
            <h2 class="section-heading">SCEGLI LA TUA STRADA NEL MOTORSPORT</h2>
            <p class="section-desc">Due percorsi di carriera completamente indipendenti, con fisiche dedicate, categorie propedeutiche e calendari realistici.</p>
          </div>

          <div class="disciplines-grid">
            <!-- SCHEDA AUTO -->
            <div class="discipline-card auto-card">
              <div class="card-accent-strip red"></div>
              <div class="discipline-card-header">
                <span class="disc-icon">🏎️</span>
                <div>
                  <h3 class="disc-title">AUTOMOBILISMO</h3>
                  <span class="disc-subtitle">Monoposto & Prototipi</span>
                </div>
              </div>
              <p class="disc-body">${m}</p>
              
              <div class="ladder-steps">
                ${h.map(e=>`
                  <div class="ladder-step ${e.premier?`premier`:``} ${e.cls||``}">
                    <span class="step-num">${e.num}</span> 
                    <strong>${e.title}</strong> 
                    <small>${e.desc}</small>
                  </div>
                `).join(``)}
              </div>
            </div>

            <!-- SCHEDA MOTO -->
            <div class="discipline-card moto-card">
              <div class="card-accent-strip blue"></div>
              <div class="discipline-card-header">
                <span class="disc-icon">🏍️</span>
                <div>
                  <h3 class="disc-title">MOTOCICLISMO</h3>
                  <span class="disc-subtitle">Prototipi da Gran Premio</span>
                </div>
              </div>
              <p class="disc-body">${g}</p>

              <div class="ladder-steps">
                ${_.map(e=>`
                  <div class="ladder-step ${e.premier?`premier moto`:``} ${e.cls||``}">
                    <span class="step-num">${e.num}</span> 
                    <strong>${e.title}</strong> 
                    <small>${e.desc}</small>
                  </div>
                `).join(``)}
              </div>
            </div>
          </div>
        </section>

        <!-- SEZIONE SPEZZETTAMENTO DELLE AREE DI GIOCO -->
        <section class="landing-section features-overview-section">
          <div class="section-header-box">
            <span class="section-tag">ESPERIENZA PROFESSIONALE</span>
            <h2 class="section-heading">TUTTI GLI ASPETTI DELLA CARRIERA AL TUO COMANDO</h2>
            <p class="section-desc">Niente schermate caotiche e confuse. Ogni elemento della tua carriera è organizzato in sezioni dedicate ad altissima fedeltà.</p>
          </div>

          <div class="features-grid">
            <div class="feature-card">
              <div class="feat-icon">🏠</div>
              <h4 class="feat-title">Paddock Hub & Race Control</h4>
              <p class="feat-desc">Il centro nevralgico tra una gara e l'altra. Meteo, telemetria tracciato, radio box e la sfida all'ultimo decimo con il tuo compagno di scuderia.</p>
            </div>

            <div class="feature-card">
              <div class="feat-icon">📅</div>
              <h4 class="feat-title">${v}</h4>
              <p class="feat-desc">${y}</p>
            </div>

            <div class="feature-card">
              <div class="feat-icon">📊</div>
              <h4 class="feat-title">Classifiche & Campionato</h4>
              <p class="feat-desc">Graduatorie mondiali Piloti e Costruttori dettagliate con grafici di punti, vittorie, podi e gap dal leader sempre aggiornati.</p>
            </div>

            <div class="feature-card">
              <div class="feat-icon">⚙️</div>
              <h4 class="feat-title">Reparto Corse & Garage R&D</h4>
              <p class="feat-desc">Sviluppa la tua monoposto o moto: Galleria del Vento, Banco Motore Power Unit, Telaio & Sospensioni e Affidabilità Meccanica.</p>
            </div>

            <div class="feature-card">
              <div class="feat-icon">⏱️</div>
              <h4 class="feat-title">Weekend di Gara Realistico</h4>
              <p class="feat-desc">Prove Libere con bilanciamento setup, Qualifiche a eliminazione Q1-Q3 al centesimo di secondo e Gara con strategie gomme, meteo dinamico e Safety Car.</p>
            </div>

            <div class="feature-card">
              <div class="feat-icon">💼</div>
              <h4 class="feat-title">Mercato Piloti & Contratti</h4>
              <p class="feat-desc">Tratta stipendi, bonus vittoria e clausole di prima guida. Scala le gerarchie e ricevi offerte dai top team mondiali.</p>
            </div>

            <div class="feature-card">
              <div class="feat-icon">🏛️</div>
              <h4 class="feat-title">Lifestyle & Sponsor Personali</h4>
              <p class="feat-desc">Gestisci i tuoi guadagni tra simulatori di guida, palestre d'élite, contratti pubblicitari e proprietà di lusso a Monte Carlo.</p>
            </div>

            <div class="feature-card">
              <div class="feat-icon">👑</div>
              <h4 class="feat-title">Algoritmo GOAT Hall of Fame</h4>
              <p class="feat-desc">${b}</p>
            </div>
          </div>
        </section>

        <!-- SEZIONE FOCUS GRIGLIA 2026 -->
        <section class="landing-section season2026-spotlight">
          <div class="section-header-box">
            <span class="section-tag">AGGIORNAMENTO SETTEMBRE 2026</span>
            <h2 class="section-heading">LE GRANDI NOVITÀ DEL MONDIALE 2026</h2>
            <p class="section-desc">Roster, cambi di casacca e nuovi team ufficiali integrati al 100%.</p>
          </div>

          <div class="spotlight-grid">
            <div class="spotlight-card">
              <div class="spotlight-header">
                <span class="spot-flag">🇺🇸</span>
                <strong>${x}</strong>
              </div>
              <p>${S}</p>
            </div>

            <div class="spotlight-card">
              <div class="spotlight-header">
                <span class="spot-flag">🇩🇪</span>
                <strong>${C}</strong>
              </div>
              <p>${w}</p>
            </div>

            <div class="spotlight-card">
              <div class="spotlight-header">
                <span class="spot-flag">🇮🇹</span>
                <strong>${T}</strong>
              </div>
              <p>${E}</p>
            </div>

            <div class="spotlight-card">
              <div class="spotlight-header">
                <span class="spot-flag">🏍️</span>
                <strong>${D}</strong>
              </div>
              <p>${O}</p>
            </div>
          </div>
        </section>

        <!-- FOOTER LANDING -->
        <footer class="landing-footer">
          <div class="footer-content">
            <div class="footer-logo clickable-home-logo" id="footer-logo-home" title="Torna all'inizio">
              <span class="goat-badge">GOAT</span>
              <span class="logo-title">MOTORSPORT EDITION 2026</span>
            </div>
            <p class="footer-text">Ispirato a ilnuovogoat.it — Simulatore di carriera completo per appassionati di corse.</p>
            <div class="footer-actions">
              <button id="footer-btn-start" class="btn-footer-cta">
                ${i?`Continua la tua Carriera ➔`:`Avvia Nuova Carriera ➔`}
              </button>
            </div>
          </div>
        </footer>
      </div>
    `,this.bindEvents(e,t,n)}static bindEvents(e,t,n){let r=e.querySelector(`#footer-logo-home`);r&&(r.onclick=()=>{s.playClick(),window.scrollTo({top:0,behavior:`smooth`})});let i=e.querySelector(`#landing-btn-continue`);i&&(i.onclick=()=>{s.playEngineRev(),t(`dashboard`)});let a=e.querySelector(`#landing-btn-start`);a&&(a.onclick=()=>{s.playEngineRev(),t(`creation`)});let c=e.querySelector(`#landing-btn-new-career`);c&&(c.onclick=()=>{l.confirm({title:`Iniziare una Nuova Carriera?`,message:`La carriera corrente verrà sovrascritta. Vuoi procedere con la creazione di un nuovo pilota?`,confirmText:`Crea Nuovo Pilota`,cancelText:`Annulla`,danger:!0,onConfirm:()=>{o.resetCareer(),l.show(`Carriera azzerata. Benvenuto nella schermata di creazione!`,`info`),t(`creation`)}})});let u=e.querySelector(`#footer-btn-start`);u&&(u.onclick=()=>{s.playClick(),o.hasActiveCareer()?t(`dashboard`):t(`creation`)})}},p=class{static render(e,t){let n=r.isRealNames,i=`prodigy`,s=a[i],l={discipline:`auto`,firstName:`Alessandro`,lastName:`Veloci`,nickname:`Il Martello`,nationality:`ITA`,number:77,origin:i,celebration:`burnout`,helmet:{primaryColor:`#e10600`,secondaryColor:`#ffd000`,visorColor:`#00d2be`,pattern:`stripes`,decal:`star`},pointsPool:s.startingPointsPool,baseAttributes:{...s.baseAttributes},attributes:{...s.baseAttributes}},u=()=>{let t=e.querySelector(`#helmet-live-preview`);t&&(t.innerHTML=c.generateHelmetSvg({...l.helmet,number:l.number,nationality:l.nationality},160));let n=o.calculateOvr(l.attributes),r=e.querySelector(`#live-ovr-tag`);r&&(r.textContent=n);let i=e.querySelector(`#points-pool-left`);i&&(i.textContent=l.pointsPool),e.querySelectorAll(`.attr-stepper-row`).forEach(e=>{let t=e.dataset.attr,n=e.querySelector(`.attr-display-val`),r=e.querySelector(`.attr-base-tag`),i=e.querySelector(`.attr-btn.minus`),a=e.querySelector(`.attr-btn.plus`);n&&(n.textContent=l.attributes[t]),r&&(r.textContent=`Base: ${l.baseAttributes[t]}`),i&&(i.disabled=l.attributes[t]<=l.baseAttributes[t]),a&&(a.disabled=l.pointsPool<=0||l.attributes[t]>=85)})};e.innerHTML=`
      <div class="creation-screen-wrapper">
        <div class="creation-header-banner">
          <span class="goat-subtitle">IL NUOVO GOAT • MOTORSPORT EDITION</span>
          <h1 class="creation-main-title">CREA IL TUO PILOTA E DIVENTA UNA LEGGENDA</h1>
          <p class="creation-desc">${n?`Dalle categorie promozionali all'Olimpo della Formula 1 e della MotoGP.`:`Dalle categorie promozionali all'Olimpo della Formula Apex e della Moto Apex.`} Personalizza ogni dettaglio prima di accendere i motori.</p>
        </div>

        <div class="creation-grid-layout">
          <!-- Colonna Sinistra: Scelta Disciplina & Dati Personali -->
          <div class="creation-card discipline-and-bio">
            <h3 class="card-section-title">1. Scegli la tua Disciplina</h3>
            <div class="discipline-selector-group">
              <label class="discipline-card ${l.discipline===`auto`?`active`:``}" data-discipline="auto">
                <input type="radio" name="discipline" value="auto" checked style="display:none;">
                <div class="disc-icon">🏎️</div>
                <div class="disc-content">
                  <strong>AUTOMOBILISMO</strong>
                  <span>${n?`Formula 4 ➔ F3 ➔ F2 ➔ Formula 1 / WEC Hypercar / IndyCar`:`Formula 4 ➔ F3 ➔ F2 ➔ Formula Apex / Hypercar / Open Wheel`}</span>
                </div>
              </label>

              <label class="discipline-card ${l.discipline===`moto`?`active`:``}" data-discipline="moto">
                <input type="radio" name="discipline" value="moto" style="display:none;">
                <div class="disc-icon">🏍️</div>
                <div class="disc-content">
                  <strong>MOTOCICLISMO</strong>
                  <span>${n?`Moto3 ➔ Moto2 ➔ MotoGP (Sprint + GP) / WorldSBK`:`Moto 3 ➔ Moto 2 ➔ Moto Apex (Sprint + GP) / Superbike`}</span>
                </div>
              </label>
            </div>

            <h3 class="card-section-title" style="margin-top:24px;">2. Identità & Dati Personali</h3>
            <div class="bio-fields-grid">
              <div class="input-field-group">
                <label>Nome</label>
                <input type="text" id="input-first-name" value="${l.firstName}" class="dark-input" maxlength="20">
              </div>

              <div class="input-field-group">
                <label>Cognome</label>
                <input type="text" id="input-last-name" value="${l.lastName}" class="dark-input" maxlength="20">
              </div>

              <div class="input-field-group">
                <label>Soprannome Stampa</label>
                <div class="input-with-action">
                  <input type="text" id="input-nickname" value="${l.nickname}" class="dark-input" maxlength="25">
                  <button id="btn-random-nickname" class="secondary-mini-btn" title="Genera Casuale">🎲</button>
                </div>
              </div>

              <div class="input-field-group">
                <label>Nazionalità</label>
                <select id="select-nationality" class="dark-select">
                  <option value="ITA" selected>🇮🇹 Italia</option>
                  <option value="GBR">🇬🇧 Regno Unito</option>
                  <option value="NLD">🇳🇱 Paesi Bassi</option>
                  <option value="ESP">🇪🇸 Spagna</option>
                  <option value="FRA">🇫🇷 Francia</option>
                  <option value="DEU">🇩🇪 Germania</option>
                  <option value="MCO">🇲🇨 Monaco</option>
                  <option value="USA">🇺🇸 Stati Uniti</option>
                  <option value="AUS">🇦🇺 Australia</option>
                  <option value="JPN">🇯🇵 Giappone</option>
                  <option value="BRA">🇧🇷 Brasile</option>
                  <option value="FIN">🇫🇮 Finlandia</option>
                  <option value="CHE">🇨🇭 Svizzera</option>
                  <option value="ARG">🇦🇷 Argentina</option>
                  <option value="COL">🇨🇴 Colombia</option>
                </select>
              </div>

              <div class="input-field-group">
                <label>Numero di Gara (#2 - #99)</label>
                <input type="number" id="input-number" min="2" max="99" value="${l.number}" class="dark-input highlight-number">
              </div>

              <div class="input-field-group">
                <label>Stile Celebrazione</label>
                <select id="select-celebration" class="dark-select">
                  <option value="burnout">🍩 Burnout & Ciambelle</option>
                  <option value="wheelie">🏍️ Impennata a Candela</option>
                  <option value="jump">🏆 Salto dal Cupolino / Tetto</option>
                  <option value="mechanics">🫂 Tuffo tra i Meccanici</option>
                </select>
              </div>
            </div>

            <h3 class="card-section-title" style="margin-top:24px;">3. Background & Origine</h3>
            <div class="origins-list">
              ${Object.values(a).map(e=>{let t=o.calculateOvr(e.baseAttributes),n=l.origin===e.id;return`
                  <label class="origin-option ${n?`active`:``}" data-origin="${e.id}">
                    <input type="radio" name="origin" value="${e.id}" ${n?`checked`:``} style="display:none;">
                    <div class="origin-header">
                      <div class="origin-badge">${e.badge}</div>
                      <div class="origin-pills">
                        <span class="origin-pill pill-money">💰 €${e.startMoney.toLocaleString()}</span>
                        <span class="origin-pill pill-ovr">OVR Base ~${t}</span>
                      </div>
                    </div>
                    <div class="origin-desc">${e.desc}</div>
                    <div class="origin-traits">
                      <span class="trait-pro">✅ ${e.pros}</span>
                      <span class="trait-con">⚠️ ${e.cons}</span>
                    </div>
                  </label>
                `}).join(``)}
            </div>
          </div>

          <!-- Colonna Centro: Editor Visivo Casco & Livrea -->
          <div class="creation-card helmet-customizer-card">
            <h3 class="card-section-title">4. Personalizza Casco & Livrea</h3>
            <div class="preview-stage-box">
              <div id="helmet-live-preview"></div>
              <div class="preview-floating-labels">
                <span class="preview-driver-tag">${l.firstName} ${l.lastName}</span>
                <span class="preview-number-badge">#${l.number}</span>
              </div>
            </div>

            <div class="customizer-controls">
              <div class="control-row">
                <label>Colore Calotta Primario</label>
                <div class="color-picker-palette" data-target="primaryColor">
                  <button class="color-swatch active" style="background:#e10600;" data-color="#e10600"></button>
                  <button class="color-swatch" style="background:#ffd000;" data-color="#ffd000"></button>
                  <button class="color-swatch" style="background:#1e41ff;" data-color="#1e41ff"></button>
                  <button class="color-swatch" style="background:#00d2be;" data-color="#00d2be"></button>
                  <button class="color-swatch" style="background:#ff8000;" data-color="#ff8000"></button>
                  <button class="color-swatch" style="background:#111111;" data-color="#111111"></button>
                  <button class="color-swatch" style="background:#ffffff;" data-color="#ffffff"></button>
                  <button class="color-swatch" style="background:#9c27b0;" data-color="#9c27b0"></button>
                </div>
              </div>

              <div class="control-row">
                <label>Colore Grafica & Dettagli</label>
                <div class="color-picker-palette" data-target="secondaryColor">
                  <button class="color-swatch" style="background:#ffffff;" data-color="#ffffff"></button>
                  <button class="color-swatch active" style="background:#ffd000;" data-color="#ffd000"></button>
                  <button class="color-swatch" style="background:#e10600;" data-color="#e10600"></button>
                  <button class="color-swatch" style="background:#00f0ff;" data-color="#00f0ff"></button>
                  <button class="color-swatch" style="background:#39b54a;" data-color="#39b54a"></button>
                  <button class="color-swatch" style="background:#111111;" data-color="#111111"></button>
                </div>
              </div>

              <div class="control-row">
                <label>Finitura Visiera</label>
                <div class="visor-presets-grid">
                  <button class="visor-btn ${l.helmet.visorColor===`#00d2be`?`active`:``}" data-visor="#00d2be">💎 Cromo Blu</button>
                  <button class="visor-btn ${l.helmet.visorColor===`#ffd000`?`active`:``}" data-visor="#ffd000">✨ Iridata Oro</button>
                  <button class="visor-btn ${l.helmet.visorColor===`#222222`?`active`:``}" data-visor="#222222">🕶️ Fumé Scura</button>
                  <button class="visor-btn ${l.helmet.visorColor===`#ffffff`?`active`:``}" data-visor="#ffffff">🏁 Trasparente</button>
                </div>
              </div>

              <div class="control-row">
                <label>Motivo Grafico Calotta</label>
                <div class="pattern-presets-grid">
                  <button class="pattern-btn ${l.helmet.pattern===`stripes`?`active`:``}" data-pattern="stripes">🏎️ Strisce Racing</button>
                  <button class="pattern-btn ${l.helmet.pattern===`lightning`?`active`:``}" data-pattern="lightning">⚡ Saetta Tagliente</button>
                  <button class="pattern-btn ${l.helmet.pattern===`bicolor`?`active`:``}" data-pattern="bicolor">🎨 Bicolore Bipartito</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Colonna Destra: Attributi & Conferma -->
          <div class="creation-card attributes-card">
            <div class="attr-header-flex">
              <div>
                <h3 class="card-section-title">5. Distribuzione Abilità</h3>
                <span class="pool-hint">Punti da assegnare: <strong id="points-pool-left" class="glow-val">${l.pointsPool}</strong></span>
              </div>
              <div class="live-ovr-box">
                <span class="ovr-text">OVR INIZIALE</span>
                <span id="live-ovr-tag" class="ovr-number">${o.calculateOvr(l.attributes)}</span>
              </div>
            </div>
            <p class="attr-rules-hint">ℹ️ Le abilità partono dai valori base del background scelto. Puoi solo <strong>aggiungere</strong> i punti disponibili (${l.pointsPool} punti rookie) per plasmare il tuo stile. Non è consentito togliere punti sotto la base.</p>

            <div class="attributes-list-stepper">
              ${this.renderAttributeRow(`pace`,`Giro Secco & Qualifica`,`Velocità pura e intertempi`,l.attributes.pace,l.baseAttributes.pace)}
              ${this.renderAttributeRow(`racecraft`,`Staccata & Sorpassi`,`Duelli corpo a corpo e bagarre`,l.attributes.racecraft,l.baseAttributes.racecraft)}
              ${this.renderAttributeRow(`tyreMgmt`,`Gestione Gomme`,`Conservazione battistrada e ritmo costante`,l.attributes.tyreMgmt,l.baseAttributes.tyreMgmt)}
              ${this.renderAttributeRow(`consistency`,`Costanza di Rendimento`,`Minimizza errori, testacoda e cadute`,l.attributes.consistency,l.baseAttributes.consistency)}
              ${this.renderAttributeRow(`wetSkill`,`Mago del Bagnato`,`Controllo assoluto sotto la pioggia torrenziale`,l.attributes.wetSkill,l.baseAttributes.wetSkill)}
              ${this.renderAttributeRow(`technicalFeedback`,`Sensibilità Tecnica`,`Ottimizzazione assetto e sviluppo R&D`,l.attributes.technicalFeedback,l.baseAttributes.technicalFeedback)}
            </div>

            <div class="start-career-action-box">
              <button id="btn-start-career-submit" class="start-race-button">
                <span>SCENDI IN PISTA • INIZIA LA CARRIERA</span>
                <span class="btn-arrow">🏁</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `,this.bindEvents(e,l,u,t),u()}static renderAttributeRow(e,t,n,r,i){return`
      <div class="attr-stepper-row" data-attr="${e}">
        <div class="attr-info">
          <div class="attr-title-row">
            <strong>${t}</strong>
            <span class="attr-base-tag">Base: ${i}</span>
          </div>
          <small>${n}</small>
        </div>
        <div class="attr-controls">
          <button class="attr-btn minus" data-key="${e}" title="Annulla punto" ${r<=i?`disabled`:``}>-</button>
          <span class="attr-display-val" id="val-${e}">${r}</span>
          <button class="attr-btn plus" data-key="${e}" title="Aggiungi punto">+</button>
        </div>
      </div>
    `}static bindEvents(e,t,n,r){e.querySelectorAll(`.discipline-card`).forEach(n=>{n.onclick=()=>{s.playClick(),e.querySelectorAll(`.discipline-card`).forEach(e=>e.classList.remove(`active`)),n.classList.add(`active`),t.discipline=n.dataset.discipline}});let i=e.querySelector(`#input-first-name`);i.oninput=e=>{t.firstName=e.target.value.trim()||`Pilota`,n()};let c=e.querySelector(`#input-last-name`);c.oninput=e=>{t.lastName=e.target.value.trim()||`Pro`,n()};let l=e.querySelector(`#input-nickname`);l.oninput=e=>{t.nickname=e.target.value.trim()||`Il Razzo`};let u=e.querySelector(`#input-number`);u.oninput=e=>{let r=parseInt(e.target.value,10);(isNaN(r)||r<2)&&(r=2),r>99&&(r=99),t.number=r,n()};let d=e.querySelector(`#select-nationality`);d.onchange=e=>{t.nationality=e.target.value,n()};let f=e.querySelector(`#select-celebration`);f.onchange=e=>{t.celebration=e.target.value};let p=e.querySelector(`#btn-random-nickname`);p.onclick=()=>{s.playClick();let e=[`Il Martello`,`The Predator`,`Mister Sabato`,`Il Professore`,`La Furia`,`Il Cecchino`,`The Bullet`,`L'Ingegnere Volante`,`L'Extraterrestre`,`Il Dottorino`,`Speed Demon`,`Il Mago della Pioggia`];t.nickname=e[Math.floor(Math.random()*e.length)],l.value=t.nickname},e.querySelectorAll(`.origin-option`).forEach(r=>{r.onclick=()=>{s.playClick(),e.querySelectorAll(`.origin-option`).forEach(e=>e.classList.remove(`active`)),r.classList.add(`active`);let i=r.dataset.origin||r.querySelector(`input`).value;t.origin=i;let o=a[i];o&&(t.baseAttributes={...o.baseAttributes},t.attributes={...o.baseAttributes},t.pointsPool=o.startingPointsPool),n()}}),e.querySelectorAll(`.color-picker-palette`).forEach(e=>{let r=e.dataset.target;e.querySelectorAll(`.color-swatch`).forEach(i=>{i.onclick=()=>{s.playClick(),e.querySelectorAll(`.color-swatch`).forEach(e=>e.classList.remove(`active`)),i.classList.add(`active`),t.helmet[r]=i.dataset.color,n()}})}),e.querySelectorAll(`.visor-btn`).forEach(r=>{r.onclick=()=>{s.playClick(),e.querySelectorAll(`.visor-btn`).forEach(e=>e.classList.remove(`active`)),r.classList.add(`active`),t.helmet.visorColor=r.dataset.visor,n()}}),e.querySelectorAll(`.pattern-btn`).forEach(r=>{r.onclick=()=>{s.playClick(),e.querySelectorAll(`.pattern-btn`).forEach(e=>e.classList.remove(`active`)),r.classList.add(`active`),t.helmet.pattern=r.dataset.pattern,n()}}),e.querySelectorAll(`.attr-btn`).forEach(e=>{e.onclick=()=>{let r=e.dataset.key;e.classList.contains(`plus`)?t.pointsPool>0&&t.attributes[r]<85&&(s.playClick(),t.pointsPool--,t.attributes[r]++):t.attributes[r]>t.baseAttributes[r]&&(s.playClick(),t.pointsPool++,t.attributes[r]--),n()}});let m=e.querySelector(`#btn-start-career-submit`);m.onclick=()=>{s.playEngineRev(),o.startNewCareer(t),r()}}},m=class{static open(e,t){let n=document.getElementById(`season-end-modal`);n&&n.remove();let i=o.player,a=o.career,c=o.getPlayerTeam(),u=c?.displayName||c?.realName||c?.fictionalName||`Scuderia`,d=c?.color||`#e10600`,f=r.getSeriesName(a.currentCategory,i.discipline),p=!!e.isUnderContract,m=e.yearsLeft||0,h=e.buyoutClause||0,g=e.offers||o.generateContractOffers(),_=e.devReport,v=document.createElement(`div`);v.className=`in-game-modal-overlay modal-visible`,v.id=`season-end-modal`;let y=`stay`,b={};g.forEach((e,t)=>{b[t]=1});let x=()=>{let n=g.find(e=>e.isRenewal)||g[0],r=g.filter(e=>!e.isRenewal&&!e.isPromotion),i=g.filter(e=>e.isPromotion),c=``;if(_){let e=Object.entries(_.deltas||{}),t=e.length>0?e.map(([e,t])=>{let n={pace:`Giro Secco`,racecraft:`Staccata`,tyreMgmt:`Gomme`,consistency:`Costanza`,wetSkill:`Bagnato`,technicalFeedback:`Telemetria`,fitness:`Forma Fisica`}[e]||e,r=t>0?`+${t}`:`${t}`;return`<span class="dev-delta-tag" style="color:${t>0?`#00f0ff`:`#ff4d4d`}">${n}: ${r}</span>`}).join(` `):`<span style="color:#aaa;">Statistiche stabili</span>`;c=`
          <div class="season-end-dev-card">
            <div class="dev-card-header">
              <span class="dev-title">🧬 SVILUPPO ANNUALE: ${_.newAge} ANNI (${_.phase})</span>
              <span class="dev-ovr-tag">OVR: ${_.ovr}</span>
            </div>
            <p class="dev-summary-text">${_.summary}</p>
            <div class="dev-deltas-row">${t}</div>
          </div>
        `}v.innerHTML=`
        <div class="in-game-modal-card season-end-modal-card">
          <!-- HEADER MODAL -->
          <div class="modal-card-header season-end-header">
            <div class="header-titles">
              <span class="modal-badge gold">
                ${e.isPlayerChampion?`🏆 CAMPIONATO VINTO • CELEBRAZIONE`:`🏁 STAGIONE CONCLUSA • BILANCIO`}
              </span>
              <h2 class="season-modal-title">
                ${e.isPlayerChampion?`Sei Campione del Mondo!`:`Stagione ${a.seasonNumber-1} Conclusa`}
              </h2>
              <small class="season-modal-sub">
                Campione del Mondo: <strong>${e.championName}</strong> • È tempo di decidere il tuo futuro contrattuale!
              </small>
            </div>
          </div>

          <!-- CORPO MODAL -->
          <div class="modal-card-body season-end-body">
            <!-- SCHEDA EVOLUZIONE PILOTA -->
            ${c}

            <!-- STATUS CONTRATTUALE ATTUALE -->
            <div class="season-contract-status-card ${p?`locked`:`free`}">
              <div class="status-top-line">
                <span class="status-badge ${p?`under-contract`:`free-agent`}">
                  ${p?`🔒 SOTTO CONTRATTO (${m} ANNO/I RIMANENTI)`:`✨ SVINCOLATO (FREE AGENT)`}
                </span>
                <span class="team-lbl" style="border-left: 3px solid ${d}; padding-left: 8px;">
                  Scuderia Attuale: <strong>${u}</strong> (${f})
                </span>
              </div>
              <p class="status-desc">
                ${p?`
                  Il tuo contratto biennale è ancora valido per un'altra stagione. Puoi rispettare l'accordo senza alcun costo, oppure rompere il contratto versando la <strong>clausola di rescissione di €${h.toLocaleString()}</strong> per accasarti altrove.
                `:`
                  Il tuo accordo è terminato! Sei libero di rinnovare con ${u} o di firmare con qualsiasi altra scuderia senza pagare alcuna penale.
                `}
              </p>
            </div>

            <!-- TABS SCELTA FUTURO -->
            <div class="season-decision-tabs">
              <button class="season-tab-btn ${y===`stay`?`active`:``}" data-tab="stay">
                <span>🛡️ Scuderia Attuale (${u})</span>
              </button>
              <button class="season-tab-btn ${y===`rivals`?`active`:``}" data-tab="rivals">
                <span>⚔️ Team Rivali (${r.length})</span>
              </button>
              ${i.length>0?`
                <button class="season-tab-btn ${y===`promotions`?`active`:``}" data-tab="promotions">
                  <span>🚀 Salto di Categoria (${i.length})</span>
                </button>
              `:``}
            </div>

            <!-- CONTENUTO DELLE SCELTE -->
            <div class="season-tab-content-wrapper">
              ${y===`stay`?`
                <div class="stay-choice-container">
                  ${p?`
                    <div class="stay-card under-contract-stay">
                      <div class="stay-info">
                        <span class="stay-badge gold">ACCORDO IN VIGORE</span>
                        <h4>Rispetta il 2° Anno di Contratto</h4>
                        <p>Continua a difendere i colori di <strong>${u}</strong> per la Stagione ${a.seasonNumber}. Nessun costo di rescissione.</p>
                        <div class="stay-financials">
                          <div><span>Stipendio per Gara:</span> <strong>€${(a.contract.salaryPerRace||5e3).toLocaleString()}</strong></div>
                          <div><span>Bonus Vittoria:</span> <strong>€${(a.contract.winBonus||1e4).toLocaleString()}</strong></div>
                          <div><span>Ruolo:</span> <strong class="role">${a.contract.role||`1st Driver`}</strong></div>
                        </div>
                      </div>
                      <button id="btn-stay-respect-contract" class="modal-btn btn-primary pulse-glow">
                        <span>CONFERMA E RISPETTA IL CONTRATTO (€0) ➔</span>
                      </button>
                    </div>
                  `:`
                    <div class="stay-card renewal-stay">
                      <div class="stay-info">
                        <span class="stay-badge green">PROPOSTA DI RINNOVO</span>
                        <h4>Rinnova con ${u}</h4>
                        <p>La squadra è entusiasta dei tuoi risultati e ti propone un rinnovo contrattuale ufficiale.</p>
                        
                        <div class="duration-selector-row">
                          <span>DURATA ACCORDO:</span>
                          <div class="duration-btn-group">
                            <button class="duration-pill ${b.renewal===2?``:`active`}" data-key="renewal" data-dur="1">1 Anno</button>
                            <button class="duration-pill ${b.renewal===2?`active`:``}" data-key="renewal" data-dur="2">2 Anni (+15% Stipendio ⭐)</button>
                          </div>
                        </div>

                        <div class="stay-financials">
                          <div><span>Stipendio:</span> <strong>€${(b.renewal===2?n.salaryPerRace2yr:n.salaryPerRace1yr).toLocaleString()} / gara</strong></div>
                          <div><span>Bonus Vittoria:</span> <strong>€${n.winBonus.toLocaleString()}</strong></div>
                          <div><span>Clausola Rescissione:</span> <strong>${b.renewal===2?`€${n.buyoutClause2yr.toLocaleString()}`:`Nessuna`}</strong></div>
                        </div>
                      </div>
                      <button id="btn-renew-current-team" class="modal-btn btn-primary pulse-glow">
                        <span>FIRMA RINNOVO CONTRATTO ✍️</span>
                      </button>
                    </div>
                  `}
                </div>
              `:``}

              ${y===`rivals`?`
                <div class="offers-grid-cards">
                  ${r.length===0?`<p class="no-offers-msg">Nessuna offerta rivale disponibile per questa stagione.</p>`:``}
                  ${r.map((e,t)=>{let n=b[`rival_${t}`]||1,r=n===2?e.salaryPerRace2yr:e.salaryPerRace1yr,i=p&&h>0,o=a.money>=h;return`
                      <div class="mini-offer-card">
                        <div class="card-head">
                          <span class="team-dot" style="background:${e.color}"></span>
                          <div>
                            <strong>${e.teamName}</strong>
                            <small>${e.categoryName}</small>
                          </div>
                        </div>

                        <div class="duration-selector-row mini">
                          <div class="duration-btn-group">
                            <button class="duration-pill ${n===1?`active`:``}" data-key="rival_${t}" data-dur="1">1 Anno</button>
                            <button class="duration-pill ${n===2?`active`:``}" data-key="rival_${t}" data-dur="2">2 Anni (+15%)</button>
                          </div>
                        </div>

                        <div class="offer-nums">
                          <div><span>Stipendio:</span> <strong>€${r.toLocaleString()}</strong></div>
                          <div><span>Bonus Vittoria:</span> <strong>€${e.winBonus.toLocaleString()}</strong></div>
                          <div><span>Clausola Rescissione:</span> <strong>${n===2?`€${e.buyoutClause2yr.toLocaleString()}`:`€0`}</strong></div>
                        </div>

                        ${i?`
                          <div class="buyout-pill-warning ${o?``:`danger`}">
                            <span>Penale Rescissione: €${h.toLocaleString()}</span>
                            ${o?``:`<small>Fondi insufficienti</small>`}
                          </div>
                        `:``}

                        <button class="btn-sign-decision-offer ${i&&!o?`disabled`:``}" data-offer-id="${e.id}" data-dur="${n}" ${i&&!o?`disabled`:``}>
                          <span>${i?`PAGA PENALE (€${h.toLocaleString()}) E FIRMA ✍️`:`FIRMA CONTRATTO ✍️`}</span>
                        </button>
                      </div>
                    `}).join(``)}
                </div>
              `:``}

              ${y===`promotions`?`
                <div class="offers-grid-cards">
                  ${i.map((e,t)=>{let n=b[`promo_${t}`]||1,r=n===2?e.salaryPerRace2yr:e.salaryPerRace1yr,i=p&&h>0,o=a.money>=h;return`
                      <div class="mini-offer-card promo-highlight">
                        <div class="card-head">
                          <span class="team-dot" style="background:${e.color}"></span>
                          <div>
                            <span class="promo-mini-badge">PROMOZIONE 🚀</span>
                            <strong>${e.teamName}</strong>
                            <small class="cat-target">${e.categoryName}</small>
                          </div>
                        </div>

                        <div class="duration-selector-row mini">
                          <div class="duration-btn-group">
                            <button class="duration-pill ${n===1?`active`:``}" data-key="promo_${t}" data-dur="1">1 Anno</button>
                            <button class="duration-pill ${n===2?`active`:``}" data-key="promo_${t}" data-dur="2">2 Anni (+15%)</button>
                          </div>
                        </div>

                        <div class="offer-nums">
                          <div><span>Stipendio:</span> <strong>€${r.toLocaleString()}</strong></div>
                          <div><span>Bonus Vittoria:</span> <strong>€${e.winBonus.toLocaleString()}</strong></div>
                          <div><span>Clausola Rescissione:</span> <strong>${n===2?`€${e.buyoutClause2yr.toLocaleString()}`:`€0`}</strong></div>
                        </div>

                        ${i?`
                          <div class="buyout-pill-warning ${o?``:`danger`}">
                            <span>Penale Rescissione: €${h.toLocaleString()}</span>
                            ${o?``:`<small>Fondi insufficienti</small>`}
                          </div>
                        `:``}

                        <button class="btn-sign-decision-offer ${i&&!o?`disabled`:``}" data-offer-id="${e.id}" data-dur="${n}" ${i&&!o?`disabled`:``}>
                          <span>${i?`PAGA PENALE (€${h.toLocaleString()}) E SALI DI CATEGORIA 🚀`:`ACCETTA PROMOZIONE 🚀`}</span>
                        </button>
                      </div>
                    `}).join(``)}
                </div>
              `:``}
            </div>
          </div>
        </div>
      `,v.querySelectorAll(`.season-tab-btn`).forEach(e=>{e.onclick=()=>{s.playClick(),y=e.dataset.tab,x()}}),v.querySelectorAll(`.duration-pill`).forEach(e=>{e.onclick=()=>{s.playClick();let t=e.dataset.key,n=parseInt(e.dataset.dur,10);b[t]=n,x()}});let S=v.querySelector(`#btn-stay-respect-contract`);S&&(S.onclick=()=>{s.playEngineRev(),l.show(`🤝 Continuerai a correre con ${u} per il 2° anno!`,`success`),v.remove(),o.initSeasonStandings(),o.saveToStorage(),window.dispatchEvent(new CustomEvent(`career-data-updated`)),t()});let C=v.querySelector(`#btn-renew-current-team`);C&&(C.onclick=()=>{let e=b.renewal||1;o.acceptContract(n,e).success&&(s.playChequeredFlag(),l.show(`🤝 Rinnovo confermato per ${e} anno/i con ${u}!`,`success`),v.remove(),window.dispatchEvent(new CustomEvent(`career-data-updated`)),t())}),v.querySelectorAll(`.btn-sign-decision-offer`).forEach(e=>{e.onclick=()=>{let n=e.dataset.offerId,r=parseInt(e.dataset.dur,10),i=g.find(e=>e.id===n);if(!i)return;let a=p&&h>0,c=`Confermi l'accordo di ${r} anno/i con ${i.teamName} (${i.categoryName})?`;a&&(c+=`\n\n⚠️ RESCISSIONE ANTICIPATA: Verrà addebitata la penale di rescissione di €${h.toLocaleString()} per liberarti dal vecchio contratto.`),l.confirm({title:a?`Rescissione e Firma Accordo`:`Firma Nuovo Contratto`,message:c,confirmText:a?`Paga €${h.toLocaleString()} e Firma ✍️`:`Firma Contratto ✍️`,cancelText:`Valuta Ancora`,danger:a,onConfirm:()=>{let e=o.acceptContract(i,r);e.success?(s.playChequeredFlag(),l.show(`🚀 Ufficiale! Benvenuto in ${i.teamName}! ${e.paidBuyout>0?`Pagata penale di rescissione di €${e.paidBuyout.toLocaleString()}.`:``}`,`success`),v.remove(),window.dispatchEvent(new CustomEvent(`career-data-updated`)),t()):l.show(e.reason||`Errore nella firma del contratto.`,`danger`)}})}})};x(),document.body.appendChild(v)}},h=class{static render(e,t){let n=o.player,i=o.career,a=o.getNextCircuit(),s=o.getPlayerTeam(),c=o.getCurrentTeammate(),l=o.getCurrentCategoryData(),u=i.currentRaceIndex>=l.calendar.length,d=r.getSeriesName(i.currentCategory,n.discipline),f=i.standings.drivers||[],p=f.findIndex(e=>e.isPlayer),m=p>=0?p+1:1,h=p>=0?f[p].points:0,g=f[0]?.points||0;e.innerHTML=`
      <div class="dashboard-wrapper paddock-hub">
        <!-- BANNER EROE PROSSIMA GARA / WEEKEND RACE CONTROL -->
        <div class="next-race-hero-card">
          <div class="hero-left-info">
            <div class="gp-round-pill">
              <span class="pulse-dot"></span>
              ROUND ${i.currentRaceIndex+1} DI ${l.calendar.length} • STAGIONE ${i.seasonNumber} (${d})
            </div>
            
            <h2 class="gp-circuit-title">
              ${a?`${a.flag} ${a.displayName}`:`🏁 STAGIONE MONDIALE COMPLETATA`}
            </h2>
            
            <p class="gp-circuit-desc">
              ${a?a.description:`Tutti i Gran Premi previsti dal calendario sono stati disputati. Procedi alle celebrazioni finali e alla sessione di mercato estiva.`}
            </p>
            
            ${a?`
              <div class="gp-telemetry-badges">
                <span class="telemetry-badge">📏 <strong>${a.lengthKm} km</strong></span>
                <span class="telemetry-badge">🔄 <strong>${Math.round((n.discipline===`auto`?a.lapsF1:a.lapsMoto)*(l.weekendFormat.raceLapsMultiplier||1))} Giri Previsti</strong></span>
                <span class="telemetry-badge">🛞 Usura Gomme: <strong>${`★`.repeat(a.tyreStress||3)}${`☆`.repeat(5-(a.tyreStress||3))}</strong></span>
                <span class="telemetry-badge">🌧️ Meteo: <strong>${a.rainChance>.25?`Rischio Pioggia (30%+)`:`Asciutto / Sereno`}</strong></span>
                <span class="telemetry-badge">🌬️ Carico: <strong class="upper">${a.downforceLevel||`Medio`}</strong></span>
              </div>
            `:``}
          </div>

          <div class="hero-right-action">
            ${u?`
              <button id="btn-conclude-season" class="hero-action-btn gold-glow">
                <span class="btn-main-label">CONCLUDI LA STAGIONE 🏆</span>
                <span class="btn-sub-label">Festeggia i Titoli e Apri la Sessione di Mercato</span>
              </button>
            `:`
              <button id="btn-enter-weekend" class="hero-action-btn pulse-glow">
                <span class="btn-main-label">PARTECIPA AL GRAN PREMIO ➔</span>
                <span class="btn-sub-label">Prove Libere • Qualifiche • Gara Ufficiale</span>
              </button>
            `}
          </div>
        </div>

        <!-- GRIGLIA MODULARE PADDOCK: Notizie, Sfida Compagno, Riepilogo Punti & Navigazione -->
        <div class="paddock-main-grid">
          <!-- Colonna Sinistra: Briefing Tecnico & Sfida Interna -->
          <div class="paddock-left-column">
            <!-- Scheda Sfida Interna Compagno di Squadra -->
            <div class="dash-card teammate-card">
              <div class="card-title-row">
                <h3 class="card-title">⚔️ Sfida Interna: Tu vs Compagno di Scuderia</h3>
                <div class="team-identity-badge">
                  <span class="team-badge-bullet" style="background:${s.color||`#e10600`}; box-shadow: 0 0 8px ${s.color||`#e10600`}"></span>
                  <span class="team-badge-name">${s.displayName||s.realName||s.fictionalName||s.name||`Scuderia`}</span>
                </div>
              </div>

              <div class="h2h-comparison-box">
                <div class="h2h-driver-side you">
                  <span class="h2h-label">IL TUO PILOTA</span>
                  <strong class="h2h-name">${n.firstName} ${n.lastName}</strong>
                  <span class="h2h-ovr">${n.ovr} OVR</span>
                  <span class="h2h-role">Ruolo: ${i.contract?.role||`1° Pilota`}</span>
                </div>

                <div class="h2h-vs-badge">VS</div>

                <div class="h2h-driver-side opponent">
                  <span class="h2h-label">COMPAGNO DI SQUADRA</span>
                  <strong class="h2h-name">${c.name}</strong>
                  <span class="h2h-ovr">${c.ovr} OVR</span>
                  <span class="h2h-role">Stessa ${n.discipline===`auto`?`Vettura`:`Moto`}</span>
                </div>
              </div>
              <p class="h2h-desc">Nel motorsport la prima regola è battere chi guida il tuo stesso mezzo. Mantieni il vantaggio per conservare la priorità tecnica negli sviluppi!</p>
            </div>

            <!-- Scheda Notizie dal Paddock & Radiocronaca -->
            <div class="dash-card paddock-news-card">
              <h3 class="card-title">🎙️ Rassegna Stampa & Voci dal Paddock</h3>
              <div class="news-items-list">
                <div class="news-item">
                  <span class="news-tag">UFFICIALE</span>
                  <div class="news-text">
                    <strong>Tutto pronto per il Round ${i.currentRaceIndex+1}:</strong>
                    Gli ingegneri di ${s.displayName||s.realName||s.fictionalName||s.name||`Scuderia`} stanno ultimando i controlli telemetrici in vista della prima sessione di prove libere.
                  </div>
                </div>
                <div class="news-item">
                  <span class="news-tag highlight">MERCATO</span>
                  <div class="news-text">
                    <strong>Voci dal muretto:</strong>
                    I team manager osservano con estrema attenzione le tue prestazioni. Un podio nel prossimo GP potrebbe sbloccare offerte per il 2027.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Colonna Destra: Mini Stato Campionato & Scorciatoie Dedicate -->
          <div class="paddock-right-column">
            <!-- Scheda Stato nel Mondiale -->
            <div class="dash-card standings-mini-card">
              <div class="card-title-row">
                <h3 class="card-title">🏆 Posizione nel Mondiale</h3>
                <button id="btn-view-full-standings" class="link-btn">Vedi Classifica Completa ➔</button>
              </div>

              <div class="mini-standings-overview">
                <div class="standing-stat-box">
                  <span class="standing-rank-num">#${m}</span>
                  <span class="standing-rank-lbl">Posizione Iride</span>
                </div>
                <div class="standing-stat-details">
                  <div class="stat-line">
                    <span>Punti Totali:</span>
                    <strong>${h} pts</strong>
                  </div>
                  <div class="stat-line">
                    <span>Distacco dal Leader:</span>
                    <strong class="${m===1?`gold-text`:``}">${m===1?`LEADER DEL MONDIALE`:`-${g-h} pts`}</strong>
                  </div>
                  <div class="stat-line">
                    <span>Vittorie Stagionali:</span>
                    <strong>${i.standings.drivers.find(e=>e.isPlayer)?.wins||0}</strong>
                  </div>
                </div>
              </div>
            </div>

            <!-- Scheda Stato Tecnico Mezzo & Sviluppo -->
            <div class="dash-card tech-mini-card">
              <div class="card-title-row">
                <h3 class="card-title">⚙️ Stato Tecnico ${n.discipline===`auto`?`Monoposto`:`Prototipo`}</h3>
                <button id="btn-view-full-rd" class="link-btn">Apri Reparto Corse ➔</button>
              </div>

              <div class="tech-mini-content">
                <div class="tech-metric-row">
                  <span>Passo Competitivo:</span>
                  <strong class="metric-val">${s.carPace||s.bikePace}/99 OVR</strong>
                </div>
                <div class="tech-metric-row">
                  <span>Livello Upgrade R&D:</span>
                  <strong class="metric-val">${Object.values(i.carUpgrades||{}).reduce((e,t)=>e+t,0)} / 20 Livelli</strong>
                </div>
                <div class="tech-metric-row">
                  <span>Budget di Squadra:</span>
                  <strong class="metric-val money">€${i.money.toLocaleString()}</strong>
                </div>
              </div>
            </div>

            <!-- Scheda Abilità Pilota & Obiettivi Sponsor del Weekend -->
            <div class="dash-card driver-skills-card">
              <div class="card-title-row">
                <div class="card-title-flex">
                  <h3 class="card-title">👤 Abilità Pilota & OVR (${n.age} Anni)</h3>
                  <span class="driver-peak-badge">Picco: ${i.stats.peakOvr||n.ovr} OVR</span>
                </div>
                <button id="btn-open-skills-card-modal" class="btn-skills-action-pill ${n.unspentSkillPoints>0?`pulse-glow has-points`:``}" title="Clicca per aprire la Scheda OVR e assegnare i Punti Abilità">
                  ${n.unspentSkillPoints>0?`⭐ ${n.unspentSkillPoints} Punti da Assegnare!`:`📊 Scheda OVR & Sviluppo ➔`}
                </button>
              </div>

              <div class="driver-attributes-mini-grid">
                <div class="driver-attr-item">
                  <div class="attr-lbl-row">
                    <span>Giro Secco</span>
                    <strong class="attr-val">${Math.round(n.attributes.pace)}</strong>
                  </div>
                  <div class="attr-bar-track"><div class="attr-bar-fill pace" style="width:${n.attributes.pace}%"></div></div>
                </div>
                <div class="driver-attr-item">
                  <div class="attr-lbl-row">
                    <span>Staccata</span>
                    <strong class="attr-val">${Math.round(n.attributes.racecraft)}</strong>
                  </div>
                  <div class="attr-bar-track"><div class="attr-bar-fill racecraft" style="width:${n.attributes.racecraft}%"></div></div>
                </div>
                <div class="driver-attr-item">
                  <div class="attr-lbl-row">
                    <span>Gestione Gomme</span>
                    <strong class="attr-val">${Math.round(n.attributes.tyreMgmt)}</strong>
                  </div>
                  <div class="attr-bar-track"><div class="attr-bar-fill tyre" style="width:${n.attributes.tyreMgmt}%"></div></div>
                </div>
                <div class="driver-attr-item">
                  <div class="attr-lbl-row">
                    <span>Costanza</span>
                    <strong class="attr-val">${Math.round(n.attributes.consistency)}</strong>
                  </div>
                  <div class="attr-bar-track"><div class="attr-bar-fill consistency" style="width:${n.attributes.consistency}%"></div></div>
                </div>
                <div class="driver-attr-item">
                  <div class="attr-lbl-row">
                    <span>Bagnato</span>
                    <strong class="attr-val">${Math.round(n.attributes.wetSkill)}</strong>
                  </div>
                  <div class="attr-bar-track"><div class="attr-bar-fill wet" style="width:${n.attributes.wetSkill}%"></div></div>
                </div>
                <div class="driver-attr-item">
                  <div class="attr-lbl-row">
                    <span>Telemetria</span>
                    <strong class="attr-val">${Math.round(n.attributes.technicalFeedback)}</strong>
                  </div>
                  <div class="attr-bar-track"><div class="attr-bar-fill tech" style="width:${n.attributes.technicalFeedback}%"></div></div>
                </div>
              </div>

              <!-- Obiettivi Sponsor Weekend -->
              <div class="weekend-sponsor-targets-box">
                <div class="sponsor-header">
                  <span class="sponsor-tag">🎯 OBIETTIVI SPONSOR WEEKEND</span>
                  <span class="sponsor-prize-total">+€25.000 in palio</span>
                </div>
                <div class="sponsor-target-item">
                  <span class="target-icon">🏁</span>
                  <div class="target-info">
                    <strong>Batti il compagno (${c.name.split(` `).slice(-1)[0]})</strong>
                    <small>Miglior piazzamento tra Qualifica e Gara</small>
                  </div>
                  <span class="target-reward">+€10.000</span>
                </div>
                <div class="sponsor-target-item">
                  <span class="target-icon">🎖️</span>
                  <div class="target-info">
                    <strong>Traguardo in Zona Punti (Top 10)</strong>
                    <small>Porta punti iride alla scuderia nel Gran Premio</small>
                  </div>
                  <span class="target-reward">+€15.000 • +2 Pts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,this.bindEvents(e,t)}static bindEvents(e,t){let n=e.querySelector(`#btn-enter-weekend`);n&&(n.onclick=()=>{s.playEngineRev(),t(`weekend`)});let r=e.querySelector(`#btn-conclude-season`);r&&(r.onclick=()=>{s.playRadioBeep();let e=o.concludeSeason();m.open(e,()=>{t(`dashboard`)})});let i=e.querySelector(`#btn-view-full-standings`);i&&(i.onclick=()=>{s.playClick(),t(`standings`)});let a=e.querySelector(`#btn-view-full-rd`);a&&(a.onclick=()=>{s.playClick(),t(`rd`)});let c=e.querySelector(`#btn-open-skills-card-modal`);c&&(c.onclick=()=>{s.playClick(),u.open()})}},g=class{static render(e,t){let n=o.player,i=o.career,a=o.getCurrentCategoryData(),s=a.calendar||[],c=i.currentRaceIndex,l=r.getSeriesName(i.currentCategory,n.discipline);e.innerHTML=`
      <div class="page-container calendar-page">
        <!-- HEADER DELLA PAGINA CALENDARIO -->
        <div class="page-title-banner">
          <div class="banner-text">
            <span class="page-subtag">STAGIONE ${i.seasonNumber} • ANNO ${i.currentYear}</span>
            <h2 class="page-main-title">📅 CALENDARIO UFFICIALE MONDIALE</h2>
            <p class="page-desc">Tutte le tappe del campionato ${l}. Esamina le caratteristiche tecniche dei tracciati, l'usura degli pneumatici e prepara l'assetto ideale.</p>
          </div>
          <div class="calendar-summary-pill">
            <span><strong>${s.length}</strong> Gran Premi in Calendario</span>
            <span>•</span>
            <span>Round Corrente: <strong>${c<s.length?c+1:`Concluso`} / ${s.length}</strong></span>
          </div>
        </div>

        <!-- GRIGLIA SCHEDE CIRCUITI -->
        <div class="calendar-grid">
          ${s.map((e,t)=>{let i=r.getCircuit(e),o=t<c,s=t===c,l=t+1,u=Math.round((n.discipline===`auto`?i.lapsF1:i.lapsMoto)*(a.weekendFormat.raceLapsMultiplier||1)),d=`<span class="round-status future">In Programma</span>`;return o&&(d=`<span class="round-status completed">✓ Disputato</span>`),s&&(d=`<span class="round-status current pulse-glow">🏁 PROSSIMA GARA</span>`),`
              <div class="calendar-race-card ${s?`current-race-highlight`:``} ${o?`past-race`:``}">
                <div class="card-round-badge">ROUND ${l}</div>
                
                <div class="card-circuit-head">
                  <div class="flag-box">${i.flag}</div>
                  <div class="circuit-names">
                    <h3 class="circuit-name">${i.displayName}</h3>
                    <span class="circuit-country">${i.country}</span>
                  </div>
                  <div class="round-status-box">${d}</div>
                </div>

                <p class="circuit-short-desc">${i.description}</p>

                <!-- TELEMETRIA E CARATTERISTICHE TRACCIATO -->
                <div class="circuit-specs-grid">
                  <div class="spec-item">
                    <span class="spec-lbl">📏 Lunghezza</span>
                    <strong class="spec-val">${i.lengthKm} km</strong>
                  </div>
                  <div class="spec-item">
                    <span class="spec-lbl">🔄 Giri Gara</span>
                    <strong class="spec-val">${u} giri</strong>
                  </div>
                  <div class="spec-item">
                    <span class="spec-lbl">🛞 Usura Gomme</span>
                    <strong class="spec-val">${`★`.repeat(i.tyreStress||3)}${`☆`.repeat(5-(i.tyreStress||3))}</strong>
                  </div>
                  <div class="spec-item">
                    <span class="spec-lbl">🌬️ Carico Aero</span>
                    <strong class="spec-val upper">${i.downforceLevel||`Medio`}</strong>
                  </div>
                  <div class="spec-item">
                    <span class="spec-lbl">⚡ Sorpassi</span>
                    <strong class="spec-val">${i.overtakeEase||3}/5</strong>
                  </div>
                  <div class="spec-item">
                    <span class="spec-lbl">🌧️ Rischio Pioggia</span>
                    <strong class="spec-val">${Math.round((i.rainChance||.15)*100)}%</strong>
                  </div>
                </div>

                ${s?`
                  <div class="card-action-box">
                    <button class="btn-enter-gp-card" id="btn-enter-current-gp">
                      <span>PARTECIPA AL GP ➔</span>
                      <small>Prove Libere • Qualifiche • Gara</small>
                    </button>
                  </div>
                `:``}
              </div>
            `}).join(``)}
        </div>
      </div>
    `,this.bindEvents(e,t)}static bindEvents(e,t){let n=e.querySelector(`#btn-enter-current-gp`);n&&(n.onclick=()=>{s.playEngineRev(),t(`weekend`)})}},_=class{static currentTab=`drivers`;static render(e,t){let n=o.player,i=o.career,a=o.getCurrentCategoryData(),s=r.getSeriesName(i.currentCategory,n.discipline),c=i.standings.drivers||[],l=i.standings.teams||[],u=c[0]?.points||0;e.innerHTML=`
      <div class="page-container standings-page">
        <!-- HEADER DELLA PAGINA CLASSIFICHE -->
        <div class="page-title-banner">
          <div class="banner-text">
            <span class="page-subtag">CAMPIONATO MONDIALE • STAGIONE ${i.seasonNumber} (${i.currentYear})</span>
            <h2 class="page-main-title">📊 CLASSIFICHE UFFICIALI: ${s.toUpperCase()}</h2>
            <p class="page-desc">Graduatorie mondiali aggiornate in tempo reale dopo ogni round del calendario. Punti, vittorie, podi e distacchi ufficiali.</p>
          </div>

          <!-- TAB SWITCHER CLASSIFICHE -->
          <div class="standings-tab-switcher">
            <button id="tab-btn-drivers" class="sub-tab-btn ${this.currentTab===`drivers`?`active`:``}">
              👤 Classifica Piloti
            </button>
            <button id="tab-btn-teams" class="sub-tab-btn ${this.currentTab===`teams`?`active`:``}">
              🏎️ Classifica Costruttori
            </button>
          </div>
        </div>

        <!-- CONTENUTO TAB ATTIVA -->
        ${this.currentTab===`drivers`?this.renderDriversTable(c,n,i,a,u):this.renderTeamsTable(l,n,i,a)}
      </div>
    `,this.bindEvents(e,t)}static renderDriversTable(e,t,n,i,a){return`
      <div class="standings-card-full">
        <div class="table-responsive">
          <table class="motorsport-table full-table">
            <thead>
              <tr>
                <th class="text-center" style="width: 60px;">POS</th>
                <th>PILOTA</th>
                <th>SCUDERIA</th>
                <th class="text-center">VITTORIE</th>
                <th class="text-center">PODI</th>
                <th class="text-center">POLE</th>
                <th class="text-right">DISTACCO</th>
                <th class="text-right">PUNTI TOTALI</th>
              </tr>
            </thead>
            <tbody>
              ${e.map((e,o)=>{let s=e.isPlayer,c=s?`${t.firstName} ${t.lastName} "${t.nickname}"`:r.getDriverName(e.driverId,t.discipline),l=s?n.currentTeamId:i.roster.find(t=>t.id===e.driverId)?.teamId||`f1_generic`,u=r.getTeam(l,t.discipline),d=o===0?`LEADER`:`-${a-(e.points||0)} pts`,f=o+1;return`
                  <tr class="${s?`player-standings-row highlight`:``}">
                    <td class="pos-cell text-center">
                      <span class="pos-badge pos-${f}">${f}</span>
                    </td>
                    <td class="driver-cell">
                      <div class="driver-cell-flex">
                        <span class="team-color-strip" style="background:${u.color||`#888`}"></span>
                        <div class="driver-names-box">
                          <strong class="pilot-name">${c}</strong>
                          ${s?`<span class="you-badge">IL TUO PILOTA</span>`:``}
                        </div>
                      </div>
                    </td>
                    <td class="team-cell">
                      <span class="team-bullet-small" style="background:${u.color||`#888`}"></span>
                      ${u?.displayName||u?.realName||u?.fictionalName||u?.name||`Scuderia`}
                    </td>
                    <td class="stat-cell text-center"><strong>${e.wins||0}</strong></td>
                    <td class="stat-cell text-center">${e.podiums||0}</td>
                    <td class="stat-cell text-center">${e.poles||0}</td>
                    <td class="gap-cell text-right"><small>${d}</small></td>
                    <td class="points-cell text-right">
                      <span class="points-value">${e.points||0}</span>
                    </td>
                  </tr>
                `}).join(``)}
            </tbody>
          </table>
        </div>
      </div>
    `}static renderTeamsTable(e,t,n,i){let a=[...e].sort((e,t)=>(t.points||0)-(e.points||0)),o=a[0]?.points||0;return`
      <div class="standings-card-full">
        <div class="table-responsive">
          <table class="motorsport-table full-table">
            <thead>
              <tr>
                <th class="text-center" style="width: 60px;">POS</th>
                <th>COSTRUTTORE / SCUDERIA</th>
                <th>LINEUP PILOTI 2026</th>
                <th class="text-center">PASSO MEZZO</th>
                <th class="text-right">DISTACCO</th>
                <th class="text-right">PUNTI TOTALI</th>
              </tr>
            </thead>
            <tbody>
              ${a.map((e,a)=>{let s=r.getTeam(e.teamId,t.discipline),c=e.teamId===n.currentTeamId,l=a+1,u=a===0?`LEADER`:`-${o-(e.points||0)} pts`,d=i.roster.filter(t=>t.teamId===e.teamId).map(e=>r.getDriverName(e.id,t.discipline));return c&&d.unshift(`${t.firstName} ${t.lastName} (TU)`),`
                  <tr class="${c?`player-standings-row highlight`:``}">
                    <td class="pos-cell text-center">
                      <span class="pos-badge pos-${l}">${l}</span>
                    </td>
                    <td class="team-cell">
                      <div class="team-cell-flex">
                        <span class="team-color-strip" style="background:${s.color||`#888`}"></span>
                        <div>
                          <strong class="team-title">${s?.displayName||s?.realName||s?.fictionalName||s?.name||`Scuderia`}</strong>
                          ${c?`<span class="you-badge">LA TUA SCUDERIA</span>`:``}
                        </div>
                      </div>
                    </td>
                    <td class="lineup-cell">
                      <small>${d.slice(0,2).join(` • `)}</small>
                    </td>
                    <td class="stat-cell text-center">
                      <span class="car-pace-tag">${t.discipline===`auto`?s.carPace:s.bikePace}/99</span>
                    </td>
                    <td class="gap-cell text-right"><small>${u}</small></td>
                    <td class="points-cell text-right">
                      <span class="points-value">${e.points||0}</span>
                    </td>
                  </tr>
                `}).join(``)}
            </tbody>
          </table>
        </div>
      </div>
    `}static bindEvents(e,t){let n=e.querySelector(`#tab-btn-drivers`);n&&(n.onclick=()=>{s.playClick(),this.currentTab=`drivers`,this.render(e,t)});let r=e.querySelector(`#tab-btn-teams`);r&&(r.onclick=()=>{s.playClick(),this.currentTab=`teams`,this.render(e,t)})}},v=class{static render(e,t){let n=o.player,r=o.career,i=o.getPlayerTeam(),a=o.getCurrentCategoryData(),s=r.carUpgrades||{aero:0,engine:0,chassis:0,reliability:0},c=n.discipline===`auto`?`Monoposto`:`Prototipo`,l=a.teams.map(e=>{let t=e.id===r.currentTeamId,a=t?n.discipline===`auto`?i.carPace:i.bikePace:n.discipline===`auto`?e.carPace:e.bikePace;return{...e,pace:a,isPlayerTeam:t}}).sort((e,t)=>t.pace-e.pace),u=l.findIndex(e=>e.isPlayerTeam)+1,d=n.discipline===`auto`?i.carPace:i.bikePace;e.innerHTML=`
      <div class="page-container rd-facility-page">
        <!-- HEADER REPARTO CORSE -->
        <div class="page-title-banner">
          <div class="banner-text">
            <span class="page-subtag">CENTRO INGEGNERIA & SVILUPPO • ${(i?.displayName||i?.realName||i?.fictionalName||i?.name||`SCUDERIA`).toUpperCase()}</span>
            <h2 class="page-main-title">⚙️ REPARTO CORSE & SVILUPPO R&D</h2>
            <p class="page-desc">Investi il budget nei quattro dipartimenti tecnici chiave. Ogni sviluppo incrementa il passo sul giro ed elimina le lacune della ${c.toLowerCase()}.</p>
          </div>

          <div class="rd-quick-stats">
            <div class="rd-stat-pill">
              <span class="pill-lbl">Passo Mezzo</span>
              <strong class="pill-val">${d} <small>/99</small></strong>
            </div>
            <div class="rd-stat-pill">
              <span class="pill-lbl">Gerarchia Griglia</span>
              <strong class="pill-val">${u}° <small>su ${l.length}</small></strong>
            </div>
            <div class="rd-stat-pill">
              <span class="pill-lbl">Fondi Disponibili</span>
              <strong class="pill-val money">€${r.money.toLocaleString()}</strong>
            </div>
          </div>
        </div>

        <!-- GRIGLIA DIPARTIMENTI R&D -->
        <div class="rd-grid-container">
          <div class="rd-departments-grid-large">
            ${this.renderDepartmentCard({key:`aero`,title:n.discipline===`auto`?`Aerodinamica & Galleria del Vento`:`Aerodinamica & Appendici Alari`,desc:`Migliora la deportanza, l'aderenza nelle curve ad alta velocità e l'efficienza nei rettilinei.`,level:s.aero||0,icon:`🌬️`,statGain:`+1.5 Passo / Livello`,budget:r.money})}

            ${this.renderDepartmentCard({key:`engine`,title:n.discipline===`auto`?`Motore & Power Unit`:`Motore & Gestione Elettronica`,desc:`Aumenta i cavalli vapore, la velocità di punta e l'erogazione della coppia in uscita dalle curve lente.`,level:s.engine||0,icon:`🔥`,statGain:`+1.5 Passo / Livello`,budget:r.money})}

            ${this.renderDepartmentCard({key:`chassis`,title:`Telaio & Geometria Sospensioni`,desc:`Massimizza la stabilità in inserimento, la trazione sui cordoli e riduce il consumo battistrada degli pneumatici.`,level:s.chassis||0,icon:`⚙️`,statGain:`+1.2 Passo / Livello`,budget:r.money})}

            ${this.renderDepartmentCard({key:`reliability`,title:`Affidabilità Meccanica & Controllo Qualità`,desc:`Minimizza drasticamente il rischio di surriscaldamenti, noie elettroniche, forature e guasti con ritiro (DNF).`,level:s.reliability||0,icon:`🛡️`,statGain:`+2.5% Affidabilità / Livello`,budget:r.money})}
          </div>

          <!-- COMPARAZIONE VELOCE GRIGLIA MEZZI -->
          <div class="grid-hierarchy-card">
            <h3 class="hierarchy-title">Gerarchia Tecnica del Campionato</h3>
            <p class="hierarchy-desc">Confronto dei valori di passo vettura/moto tra tutte le scuderie della griglia 2026:</p>
            
            <div class="hierarchy-list">
              ${l.map((e,t)=>`
                <div class="hierarchy-item ${e.isPlayerTeam?`active-team`:``}">
                  <span class="hier-pos">${t+1}</span>
                  <span class="team-bullet-small" style="background:${e.color||`#888`}"></span>
                  <strong class="hier-name">${e.displayName||e.realName||e.fictionalName||e.name||`Scuderia`}</strong>
                  ${e.isPlayerTeam?`<span class="you-badge">TU</span>`:``}
                  <span class="hier-pace">${e.pace}/99</span>
                </div>
              `).join(``)}
            </div>
          </div>
        </div>
      </div>
    `,this.bindEvents(e,t)}static renderDepartmentCard({key:e,title:t,desc:n,level:r,icon:i,statGain:a,budget:o}){let s=25e3*(r+1),c=r>=5,l=o>=s;return`
      <div class="rd-card-large" data-dept="${e}">
        <div class="rd-card-header">
          <div class="rd-icon-large">${i}</div>
          <div class="rd-title-group">
            <h3 class="rd-title">${t}</h3>
            <span class="rd-gain-tag">${a}</span>
          </div>
          <span class="rd-level-pill ${c?`maxed`:``}">
            ${c?`LIVELLO MAX`:`Lvl ${r} / 5`}
          </span>
        </div>

        <p class="rd-desc">${n}</p>

        <!-- PROGRESS BAR -->
        <div class="rd-progress-track">
          <div class="rd-progress-fill" style="width: ${r/5*100}%"></div>
        </div>

        <div class="rd-card-action-bar">
          <div class="rd-cost-info">
            ${c?`
              <span class="cost-lbl">Sviluppo Completato</span>
              <strong class="cost-amount">Potenziale al 100%</strong>
            `:`
              <span class="cost-lbl">Costo Prossimo Livello:</span>
              <strong class="cost-amount ${l?`affordable`:`unaffordable`}">€${s.toLocaleString()}</strong>
            `}
          </div>

          ${c?`
            <button class="btn-upgrade-dept max-reached" disabled>
              <span>✓ Massimo Livello</span>
            </button>
          `:`
            <button class="btn-upgrade-dept ${l?``:`btn-disabled`}" data-dept="${e}">
              <span>Installa Upgrade ➔</span>
            </button>
          `}
        </div>
      </div>
    `}static bindEvents(e,t){e.querySelectorAll(`.btn-upgrade-dept:not(.max-reached)`).forEach(n=>{n.onclick=()=>{let r=n.dataset.dept,i=o.buyCarUpgrade(r);i.success?(s.playRadioBeep(),l.show(`⚙️ Upgrade installato con successo! ${i.message||``}`,`success`),this.render(e,t)):l.show(`⚠️ ${i.message}`,`warning`)}})}},y=class{static getDriverCode(e,t=!1){if(t){let t=e.split(` `);return(t[t.length-1]||`PIL`).substring(0,3).toUpperCase()}let n=e.split(` `);return(n[n.length-1]||n[0]).substring(0,3).toUpperCase()}static formatLapTime(e){return isNaN(e)||e===null||e<=0?`--:--.---`:`${Math.floor(e/60)}:${(e%60).toFixed(3).padStart(6,`0`)}`}static calculateSetupFeedback(e,t,n){let r=50;n.downforceLevel===`low`&&(r=25),n.downforceLevel===`high`&&(r=85);let i=Math.abs(t.aeroLevel-r),a=Math.abs(t.suspensionStiffness-(n.tyreStress>3?40:65)),o=(e.attributes.technicalFeedback||75)/100,s=Math.max(50,100-(i*.4+a*.4)*(1.2-o*.4));return{setupMastery:Math.min(100,Math.round(s)),lapTimeBonusSec:(s-50)/50*.5,advice:i>20?t.aeroLevel<r?`L'auto scivola nei curvoni veloci, serve più carico alare!`:`Siamo lenti in rettilineo, scarica l'ala!`:a>20?`Le sospensioni non assorbono bene i cordoli, ammorbidisci l'assetto.`:`Assetto equilibrato! Ottimo compromesso tra stabilità e trazione.`}}static calculateSetupTyreWearFactor(e,t){if(!e)return{wearMultiplier:1,feedback:`Assetto Standard`,wearDeltaPct:0};let n=50;t.downforceLevel===`low`&&(n=25),t.downforceLevel===`high`&&(n=85);let r=t.tyreStress||3,i=r>=4?40:r<=2?65:52,a=50+(r-3)*4,o=e.aeroLevel-n,s=o<0?Math.abs(o)*.0045:o*.0022,c=e.suspensionStiffness-i,l=r>=4?Math.max(0,c/50)*.16:c<-15?.07:c>20?.05:0,u=e.tyrePressure-a,d=u>0?u/40*.15:Math.abs(u/40)*.11,f=s+l+d,p=Math.max(.85,Math.min(1.45,1+f-.06)),m=Math.round((p-1)*100),h=`Assetto Bilanciato`;return m<=-5?h=`🟢 Assetto Ottimale (Gomme Protette)`:m>=16?h=`⚠️ Assetto Squilibrato (Degrado Elevato)`:m>=6&&(h=`🟡 Assetto Rigido/Scarico (Degrado Medio)`),{wearMultiplier:p,wearDeltaPct:m,feedback:h,aeroDelta:o,suspDelta:c,pressDelta:u}}static initPracticeState(e,t,n,i,a,o=`auto`,s=`FP1`){let c=Math.random()<(e.rainChance||.15),l=[];return l.push({driverId:`player`,isPlayer:!0,name:`${i.firstName} ${i.lastName}`,code:this.getDriverCode(i.lastName||i.firstName,!0),teamId:a.id,teamName:r.getTeamName(a.id,o),color:a.color||`#e10600`,lapTimeSec:null,formattedTime:`--:--.---`,gap:`-`,s1:`-`,s2:`-`,s3:`-`,compound:c?`WET`:`MEDIUM`,lapsRun:0,status:`IN PIT`,position:1}),n.forEach(e=>{let t=r.getTeam(e.teamId,o),n=r.getDriverName(e.id,o);l.push({driverId:e.id,isPlayer:!1,name:n,code:this.getDriverCode(n),teamId:e.teamId,teamName:r.getTeamName(e.teamId,o),color:t.color||`#888888`,lapTimeSec:null,formattedTime:`--:--.---`,gap:`-`,s1:`-`,s2:`-`,s3:`-`,compound:c?`WET`:Math.random()>.5?`HARD`:`MEDIUM`,lapsRun:0,status:`IN PIT`,position:l.length+1})}),{sessionName:s,totalMinutes:60,timeRemainingMinutes:60,elapsedMinutes:0,isFinished:!1,isWet:c,weatherText:c?`🌧️ Asfalto Bagnato`:`☀️ Pista Asciutta`,feedback:{setupMastery:50,lapTimeBonusSec:0,advice:`La monoposto è ai box a ruote ferme. Effettua uno stint di giri per raccogliere i primi dati telemetrici.`},timingBoard:l,log:[`🟢 BANDIERA VERDE: Semaforo verde in corsia box, la sessione ha inizio!`]}}static stepPracticeTime(e,t,n,i,a,o,s,c=`auto`){if(e.isFinished)return e;let l=c===`auto`?o.baseLapTimeSecAuto:o.baseLapTimeSecMoto;if(e.elapsedMinutes=Math.min(e.totalMinutes,e.elapsedMinutes+t),e.timeRemainingMinutes=Math.max(0,e.totalMinutes-e.elapsedMinutes),e.timingBoard.forEach(t=>{if(!t.isPlayer){if(Math.random()<.65||e.timeRemainingMinutes<=10){t.lapsRun+=Math.floor(Math.random()*3)+2,t.status=`IN PISTA`;let n=r.getDriver(t.driverId,c)||{},i=r.getTeam(t.teamId,c)||{},a=n.pace||n.ovr||78,o=i.carPace||i.bikePace||78,s=a*.55+o*.45,u=(Math.random()-.5)*.4,d=0;e.isWet&&t.compound!==`WET`&&t.compound!==`INTER`&&(d=8.5);let f=l+.8+(95-s)*.08+u+d;(t.lapTimeSec===null||f<t.lapTimeSec)&&(t.lapTimeSec=f,t.s1=Number((f*.31+(Math.random()-.5)*.06).toFixed(3)),t.s2=Number((f*.41+(Math.random()-.5)*.06).toFixed(3)),t.s3=Number((f*.28+(Math.random()-.5)*.06).toFixed(3)),t.formattedTime=this.formatLapTime(f))}else t.status=`IN PIT`}}),n){let t=e.timingBoard.find(e=>e.isPlayer);if(t){t.lapsRun+=4,t.status=`IN PISTA`;let n=this.calculateSetupFeedback(i,s,o);e.feedback=n;let r=i.attributes.pace||75,c=a.carPace||a.bikePace||75,u=r*.55+c*.45,d=(Math.random()-.5)*.3,f=0;e.isWet&&t.compound!==`WET`&&t.compound!==`INTER`&&(f=9,e.log.unshift(`⚠️ TELEMETRIA: Giri su gomma d'asciutto con pista bagnata! Perdita enorme di aderenza e rischio aquaplaning!`));let p=l+.8+(95-u)*.08-n.lapTimeBonusSec+d+f;(t.lapTimeSec===null||p<t.lapTimeSec)&&(t.lapTimeSec=p,t.s1=Number((p*.31+(Math.random()-.5)*.05).toFixed(3)),t.s2=Number((p*.41+(Math.random()-.5)*.05).toFixed(3)),t.s3=Number((p*.28+(Math.random()-.5)*.05).toFixed(3)),t.formattedTime=this.formatLapTime(p),e.log.unshift(`⏱️ GIRO VELOCE: Hai migliorato il tuo tempo sul giro: ${t.formattedTime}!`))}}let u=e.timingBoard.filter(e=>e.lapTimeSec!==null),d=e.timingBoard.filter(e=>e.lapTimeSec===null);u.sort((e,t)=>e.lapTimeSec-t.lapTimeSec);let f=u[0]?.lapTimeSec;return u.forEach((e,t)=>{e.position=t+1,e.gap=t===0?`LEADER`:`+${(e.lapTimeSec-f).toFixed(3)}s`}),d.forEach((e,t)=>{e.position=u.length+t+1,e.gap=`-`,e.formattedTime=`--:--.---`}),e.timingBoard=[...u,...d],e.timeRemainingMinutes<=0&&(e.isFinished=!0,e.log.unshift(`🏁 BANDIERA A SCACCHI: Sessione di Prove Libere conclusa!`)),e}static fastForwardPracticeToEnd(e,t,n,r,i,a=`auto`){for(;!e.isFinished;)this.stepPracticeTime(e,15,!0,t,n,r,i,a);return e}static simulatePractice(e,t,n,r,i,a=`auto`,o=`FP1`){let s=this.initPracticeState(r,{id:`generic`},n,e,t,a,o);return this.fastForwardPracticeToEnd(s,e,t,r,i,a),s}static initQualifyingState(e,t,n,i,a,o=0,s=`auto`){let c=t.id===`auto_f1`||t.id===`moto_gp`,l=Math.random()<(e.rainChance||.15),u=c?1080:900,d=[];return d.push({driverId:`player`,isPlayer:!0,name:`${i.firstName} ${i.lastName}`,code:this.getDriverCode(i.lastName||i.firstName,!0),teamId:a.id,teamName:r.getTeamName(a.id,s),color:a.color||`#e10600`,lapTimeSec:null,formattedTime:`--:--.---`,gap:`-`,q1Time:`-`,q2Time:`-`,q3Time:`-`,compound:l?`WET`:`SOFT`,lapsRun:0,status:`IN PIT`,eliminated:!1,stageReached:`Q1`,position:1}),n.forEach(e=>{let t=r.getTeam(e.teamId,s),n=r.getDriverName(e.id,s);d.push({driverId:e.id,isPlayer:!1,name:n,code:this.getDriverCode(n),teamId:e.teamId,teamName:r.getTeamName(e.teamId,s),color:t.color||`#888888`,lapTimeSec:null,formattedTime:`--:--.---`,gap:`-`,q1Time:`-`,q2Time:`-`,q3Time:`-`,compound:l?`WET`:`SOFT`,lapsRun:0,status:`IN PIT`,eliminated:!1,stageReached:`Q1`,position:d.length+1})}),{isMultiStage:c,currentPhase:c?`Q1`:`QUALY`,phaseIndex:1,phaseTimeTotalSec:u,phaseTimeRemainingSec:u,isFinished:!1,isWet:l,weatherText:l?`🌧️ Asfalto Bagnato`:`☀️ Pista Asciutta`,setupBonusSec:o,grid:d,log:[`🟢 SEMAFORO VERDE QUALIFICHE: Inizia la caccia alla Pole Position!`]}}static stepQualifyingTime(e,t,n,i,a,o,s=`auto`){if(e.isFinished)return e;let c=s===`auto`?o.baseLapTimeSecAuto:o.baseLapTimeSecMoto;if(e.phaseTimeRemainingSec=Math.max(0,e.phaseTimeRemainingSec-t),e.grid.forEach(t=>{if(!(t.isPlayer||t.eliminated)){if(Math.random()<.35||e.phaseTimeRemainingSec<=120){t.lapsRun+=2,t.status=`IN PISTA`;let n=r.getDriver(t.driverId,s)||{},i=r.getTeam(t.teamId,s)||{},a=(n.pace||n.ovr||78)*.55+(i.carPace||i.bikePace||78)*.45,o=(Math.random()-.5)*.45,l=0;e.isWet&&t.compound!==`WET`&&t.compound!==`INTER`&&(l=9);let u=c+(95-a)*.08+o+l;(t.lapTimeSec===null||u<t.lapTimeSec)&&(t.lapTimeSec=u,t.formattedTime=this.formatLapTime(u),e.currentPhase===`Q1`?t.q1Time=t.formattedTime:e.currentPhase===`Q2`?t.q2Time=t.formattedTime:e.currentPhase===`Q3`&&(t.q3Time=t.formattedTime))}else t.status=`IN PIT`}}),n){let t=e.grid.find(e=>e.isPlayer);if(t&&!t.eliminated){t.lapsRun+=2,t.status=`IN PISTA`;let n=(i.attributes.pace||75)*.55+(a.carPace||a.bikePace||75)*.45,r=(Math.random()-.5)*.3,o=0;e.isWet&&t.compound!==`WET`&&t.compound!==`INTER`&&(o=9,e.log.unshift(`⚠️ ATTENZIONE: Gomme slick su pista bagnata! Tempo sul giro compromesso dall'aquaplaning!`));let s=c+(95-n)*.08-e.setupBonusSec+r+o;(t.lapTimeSec===null||s<t.lapTimeSec)&&(t.lapTimeSec=s,t.formattedTime=this.formatLapTime(s),e.currentPhase===`Q1`?t.q1Time=t.formattedTime:e.currentPhase===`Q2`?t.q2Time=t.formattedTime:e.currentPhase===`Q3`&&(t.q3Time=t.formattedTime),e.log.unshift(`🔥 GIRO LANCIATO: ${t.name} registra ${t.formattedTime}!`))}}let l=e.grid.filter(e=>!e.eliminated&&e.lapTimeSec!==null),u=e.grid.filter(e=>!e.eliminated&&e.lapTimeSec===null),d=e.grid.filter(e=>e.eliminated);l.sort((e,t)=>e.lapTimeSec-t.lapTimeSec);let f=l[0]?.lapTimeSec;if(l.forEach((e,t)=>{e.position=t+1,e.gap=t===0?`POLE`:`+${(e.lapTimeSec-f).toFixed(3)}s`}),u.forEach((e,t)=>{e.position=l.length+t+1,e.gap=`-`,e.formattedTime=`--:--.---`}),e.grid=[...l,...u,...d],e.phaseTimeRemainingSec<=0){if(e.isMultiStage&&e.phaseIndex===1){e.log.unshift(`🏁 BANDIERA A SCACCHI Q1: Verdetto della prima sessione!`);let t=Math.min(16,e.grid.length-4);e.grid.slice(t).forEach(e=>{e.eliminated=!0,e.stageReached=`Q1`}),e.phaseIndex=2,e.currentPhase=`Q2`,e.phaseTimeTotalSec=900,e.phaseTimeRemainingSec=900,e.grid.filter(e=>!e.eliminated).forEach(e=>{e.lapTimeSec=null,e.status=`IN PIT`})}else e.isMultiStage&&e.phaseIndex===2?(e.log.unshift(`🏁 BANDIERA A SCACCHI Q2: Determinata la Top 10 per la Pole!`),e.grid.slice(10).forEach(e=>{e.eliminated=!0,e.stageReached=`Q2`}),e.phaseIndex=3,e.currentPhase=`Q3`,e.phaseTimeTotalSec=720,e.phaseTimeRemainingSec=720,e.grid.filter(e=>!e.eliminated).forEach(e=>{e.lapTimeSec=null,e.status=`IN PIT`})):(e.isFinished=!0,e.log.unshift(`👑 QUALIFICHE CONCLUSE: Griglia di Partenza Ufficiale stabilita!`),e.grid.forEach((e,t)=>{e.position=t+1}))}return e}static fastForwardQualifyingToEnd(e,t,n,r,i=`auto`){for(;!e.isFinished;)this.stepQualifyingTime(e,300,!0,t,n,r,i);return e}static simulateQualifying(e,t,n,r,i=0,a=`auto`){let o=this.initQualifyingState(r,{id:`auto_f1`},n,e,t,i,a);return this.fastForwardQualifyingToEnd(o,e,t,r,a),o.grid}static initRaceState(e,t,n,i=!1,a=`auto`,o=null,s=null){let c=Math.max(10,Math.round((a===`auto`?t.lapsF1:t.lapsMoto)*(n.weekendFormat?.raceLapsMultiplier||1)*(i?.35:1))),l=Math.random()<(t.rainChance||.15),u=l?`HEAVY_RAIN`:`DRY`,d=a===`auto`&&n.id===`auto_f1`,f=a===`moto`&&n.id===`moto_gp`,p=(n.weekendFormat?.pitStops===!0||[`auto_f1`,`auto_f2`,`auto_wec`,`auto_indy`].includes(n.id))&&!i,m=d&&!l,h=t.tyreStress||3,g=Math.max(6,Math.round(c*(.42+(3-h)*.035))),_=Math.max(3.8,80/g),v=this.calculateSetupTyreWearFactor(o,t),y={},b=e.map((e,t)=>{let o=l?`WET`:`MEDIUM`;l||(o=i?e.position<=8?`SOFT`:`MEDIUM`:e.isPlayer?`MEDIUM`:e.position<=4?t%2==0?`MEDIUM`:`SOFT`:e.position>=15?t%2==0?`HARD`:`MEDIUM`:t%3==0?`SOFT`:t%3==1?`HARD`:`MEDIUM`);let u=75,d=75,f=75,m=1;if(e.isPlayer)u=s?.attributes?.tyreMgmt||75,d=s?.attributes?.consistency||75,f=s?.attributes?.pace||75,m=v.wearMultiplier;else{let t=r.getDriver(e.driverId,a)||{};u=t.tyreMgmt||t.ovr||75,d=t.consistency||t.ovr||75,f=t.pace||t.ovr||75;let n=r.getTeam(e.teamId,a),i=n.carPace||n.bikePace||75;m=Math.max(.88,Math.min(1.2,1-(i-75)/250))}let h=Math.max(.75,Math.min(1.35,1-(u-75)/100))*Math.max(.92,Math.min(1.08,1-(d-75)/300)),g=[];if(!e.isPlayer&&!i){let r=n.id===`auto_wec`||c>=28?2:p||c>=14?1:0;if(r===1){let n=Math.round(c*.46);o===`SOFT`&&(n=Math.round(c*.32)),o===`HARD`&&(n=Math.round(c*.62));let r=Math.max(2,Math.min(c-2,n+(t%3-1)));y[e.teamId]&&Math.abs(y[e.teamId]-r)<=1&&(r+=2),y[e.teamId]=r,g.push(r)}else if(r===2){let e=Math.max(3,Math.round(c*.33)+(t%3-1)),n=Math.min(c-2,Math.round(c*.67)+(t%3-1));g.push(e,n)}}return{...e,startPos:e.position,currentPos:e.position,lastPos:e.position,currentLap:0,tyreCompound:o,tyreLife:100,baseWearRate:_,setupWearMultiplier:m,driverStatsMultiplier:h,tyreSkill:u,consistency:d,paceSkill:f,plannedPitLaps:g,pitStops:0,compoundsUsed:[o],gapToLeaderSec:0,intervalAheadSec:0,status:`GRID`,dnfReason:null,bestLapSec:null,paceMode:`BALANCED`,powerMode:`STANDARD`,hasDrs:!1,flagToFlagSwapped:!1,stopGoPenaltySec:0}});return{totalLaps:c,currentLap:0,gridPhase:!0,isSprint:i,discipline:a,categoryId:n.id,mandatoryPit:p,mandatoryTwoDryCompounds:m,isMotoGP:f,setupWearInfo:v,weather:{condition:u,rainChance:t.rainChance||.15,lapsUntilChange:Math.floor(Math.random()*20)+12},safetyCar:!1,safetyCarLapsLeft:0,weatherText:l?`🌧️ Pioggia Battente (Bagnato)`:`☀️ Pista Asciutta`,airTemp:l?`20°C`:`28°C`,trackTemp:l?`23°C`:`42°C`,drivers:b,log:[`🔴 SEMAFORI ACCESI: Vetture schierate sulla griglia di partenza. Pronti al via!`],finished:!1,fastestLapHolder:null,fastestLapSec:null}}static stepRaceLap(e,t,n=`auto`){if(e.finished)return e;if(e.gridPhase)return e.gridPhase=!1,e.currentLap=1,e.drivers.forEach(e=>{e.status=`RUNNING`,e.currentLap=1}),e.log.unshift(`🟢 VIA AL GRAN PREMIO! Semafori spenti, scatto bruciante verso curva 1!`),e;let r=e.currentLap,i=[];e.weather.lapsUntilChange--,e.weather.lapsUntilChange<=0&&Math.random()<.45&&(e.weather.condition===`DRY`?(e.weather.condition=`HEAVY_RAIN`,e.weatherText=`🌧️ ALLERTA METEO: Pioggia Torrenziale in Pista!`,i.push(`🌧️ DILUVIO IN PISTA! L'asfalto è allagato: le gomme slick perdono aderenza!`),e.isMotoGP&&i.push(`🏳️ BANDIERA BIANCA: Flag-to-Flag attivo! Rientro ai box per cambio moto autorizzato!`)):(e.weather.condition=`DRY`,e.weatherText=`☀️ METEO: La pioggia è cessata, pista in rapida asciugatura!`,i.push(`☀️ LA PIOGGIA È CESSATA: Si forma la traiettoria asciutta, gomme da bagnato a rischio surriscaldamento!`)),e.weather.lapsUntilChange=Math.floor(Math.random()*25)+15),e.safetyCar?(e.safetyCarLapsLeft--,e.safetyCarLapsLeft<=0&&(e.safetyCar=!1,i.push(`🟢 SAFETY CAR RIENTRA: Bandiera verde, riparte la bagarre!`))):Math.random()<.03&&r>2&&r<e.totalLaps-2&&(e.safetyCar=!0,e.safetyCarLapsLeft=Math.floor(Math.random()*2)+2,i.push(n===`auto`?`🟡 SAFETY CAR IN PISTA: Detriti sul tracciato! Gruppo ricompattato.`:`🟡 BANDIERA GIALLA: Caduta a centro gruppo! Distacchi congelati.`));let a=e.weather.condition===`HEAVY_RAIN`||e.weather.condition===`LIGHT_RAIN`;e.drivers.forEach(o=>{if(o.status!==`RUNNING`&&o.status!==`PITTING`)return;if(o.status===`PITTING`&&(o.status=`RUNNING`,i.push(`🟢 PIT EXIT: ${o.name} rientra in pista su gomme ${o.tyreCompound} nuove!`)),o.isPlayer&&t&&(o.paceMode=t.paceMode||o.paceMode,o.powerMode=t.powerMode||o.powerMode,t.boxThisLap)){o.status=`PITTING`,o.pitStops++,o.tyreLife=100,o.tyreCompound=t.newCompound||(a?`WET`:`HARD`),o.compoundsUsed.push(o.tyreCompound),t.boxThisLap=!1;let r=e.safetyCar?12:n===`auto`?22:28;o.gapToLeaderSec+=r,i.push(`🛠️ SOSTA AI BOX per ${o.name}: Montate gomme nuove ${o.tyreCompound}! (${r}s fermo)`);return}let s=1;o.tyreCompound===`SOFT`&&(s=1.6),o.tyreCompound===`MEDIUM`&&(s=1.05),o.tyreCompound===`HARD`&&(s=.7),!a&&(o.tyreCompound===`WET`||o.tyreCompound===`INTER`)&&(s=3.5),a&&[`SOFT`,`MEDIUM`,`HARD`].includes(o.tyreCompound)&&(s=1.8);let c=o.paceMode===`PUSH`?1.45:o.paceMode===`SAVE`?.7:1;e.safetyCar&&(c=.2);let l=o.baseWearRate*s*o.setupWearMultiplier*o.driverStatsMultiplier*c;if(o.tyreLife=Math.max(0,o.tyreLife-l),!o.isPlayer&&!e.isSprint){let t=!1,s=`HARD`;if(a&&![`WET`,`INTER`].includes(o.tyreCompound)?(t=!0,s=`WET`):!a&&[`WET`,`INTER`].includes(o.tyreCompound)?(t=!0,s=`HARD`):(o.tyreLife<20&&r<e.totalLaps-1||o.plannedPitLaps.includes(r)||e.safetyCar&&o.plannedPitLaps.some(e=>Math.abs(e-r)<=3))&&(t=!0),t){if(a)s=`WET`;else{let t=e.totalLaps-r;s=e.mandatoryTwoDryCompounds?[`SOFT`,`MEDIUM`,`HARD`].filter(e=>!o.compoundsUsed.includes(e))[0]||(t<=6?`SOFT`:`HARD`):t<=6?`SOFT`:t<=12?`MEDIUM`:`HARD`}o.status=`PITTING`,o.pitStops++,o.tyreLife=100,o.tyreCompound=s,o.compoundsUsed.push(s),o.plannedPitLaps=o.plannedPitLaps.filter(e=>e!==r);let t=e.safetyCar?12:n===`auto`?22:28;o.gapToLeaderSec+=t,i.push(`🛠️ PIT STOP AI: ${o.name} rientra ai box al giro ${r} e monta gomme ${s}! (${t}s fermo)`);return}}let u=(Math.random()-.5)*.35;o.paceMode===`PUSH`&&(u-=.3),o.paceMode===`SAVE`&&(u+=.35),o.powerMode===`ATTACK`&&(u-=.25),o.tyreCompound===`SOFT`&&(u-=.25),o.tyreCompound===`HARD`&&(u+=.2);let d=.003;if(a&&[`SOFT`,`MEDIUM`,`HARD`].includes(o.tyreCompound)?(u+=9.5,d=.2,o.isPlayer&&i.push(`⚠️ AQUAPLANING GRAVE: Le gomme slick galleggiano sull'acqua! Sosta necessaria.`)):!a&&[`WET`,`INTER`].includes(o.tyreCompound)&&(u+=4.5),o.tyreLife<25&&(u+=(25-o.tyreLife)*.18),o.tyreLife<10&&(u+=(10-o.tyreLife)*.35),Math.random()<d&&!e.safetyCar){o.status=`DNF`,o.dnfReason=a?`Aquaplaning & Uscita di Pista`:n===`auto`?`Contatto / Guasto Tecnico`:`Caduta / Scivolata`,i.push(`💥 RITIRO: ${o.name} fuori gara! (${o.dnfReason})`);return}e.safetyCar||(o.gapToLeaderSec=Math.max(0,o.gapToLeaderSec+u))});let o=e.drivers.filter(e=>e.status===`RUNNING`||e.status===`PITTING`);if(o.sort((e,t)=>e.gapToLeaderSec-t.gapToLeaderSec),o.length>0){let t=o[0].gapToLeaderSec;o.forEach((n,r)=>{n.gapToLeaderSec-=t,n.lastPos=n.currentPos,n.currentPos=r+1;let i=r===0?0:n.gapToLeaderSec-o[r-1].gapToLeaderSec;n.intervalAheadSec=Math.max(0,i),n.hasDrs=r>0&&n.intervalAheadSec<1&&!a&&!e.safetyCar&&n.status===`RUNNING`}),e.fastestLapHolder=o[0].name}let s=o.length+1;e.drivers.filter(e=>e.status===`DNF`).forEach(e=>{e.currentPos=s++,e.hasDrs=!1});let c=e.drivers.find(e=>e.isPlayer);return c&&(c.status===`RUNNING`||c.status===`PITTING`)&&(c.currentPos<c.lastPos?i.push(`🏎️ SORPASSO! Hai conquistato la P${c.currentPos}!`):c.currentPos>c.lastPos&&i.push(`⚠️ ATTENZIONE: Sei scivolato in P${c.currentPos}.`)),e.currentLap++,e.currentLap>e.totalLaps&&(e.finished=!0,i.push(`🏁 BANDIERA A SCACCHI: Il Gran Premio è giunto al termine!`),e.mandatoryTwoDryCompounds&&!a&&(e.drivers.forEach(e=>{let t=e.compoundsUsed.filter(e=>[`SOFT`,`MEDIUM`,`HARD`].includes(e));new Set(t).size<2&&(e.stopGoPenaltySec=25,e.gapToLeaderSec+=25,i.push(`🛑 PENALITÀ 25s per ${e.name}: Regolamento F1 violato (mancato uso di 2 mescole asciutte diverse)!`))}),o.sort((e,t)=>e.gapToLeaderSec-t.gapToLeaderSec),o.forEach((e,t)=>{e.currentPos=t+1}))),e.log.unshift(...i),e.log.length>30&&(e.log.length=30),e}static fastForwardToEnd(e,t,n=`auto`){for(;!e.finished;)this.stepRaceLap(e,t,n);return e}static calculatePoints(e,t=!1){return t?[8,7,6,5,4,3,2,1][e-1]||0:[25,18,15,12,10,8,6,4,2,1][e-1]||0}},b=class{static render(e,t){let n=o.player,r=o.career,i=o.getNextCircuit(),a=o.getCurrentCategoryData(),s=o.getPlayerTeam();if(!i){e.innerHTML=`<div class="page-container text-center"><p>Nessun Gran Premio disponibile.</p><button id="btn-back-hub" class="modal-btn btn-primary">Torna alla Dashboard</button></div>`,e.querySelector(`#btn-back-hub`).onclick=t;return}let c={sessionsList:this.getSessionsList(r.currentCategory,n.discipline),currentSessionIndex:0,setupSettings:{aeroLevel:50,suspensionStiffness:50,tyrePressure:50},practiceSelectedTyre:`MEDIUM`,qualySelectedTyre:`SOFT`,practiceStates:{},qualifyingState:null,raceState:null,playerTactics:{paceMode:`BALANCED`,powerMode:`STANDARD`,boxThisLap:!1,newCompound:`HARD`},startingCompound:`MEDIUM`,timingTowerMode:`interval`,simulationSpeed:1,isAutoPlaying:!1,autoPlayTimer:null},l=()=>{c.autoPlayTimer&&(clearInterval(c.autoPlayTimer),c.autoPlayTimer=null,c.isAutoPlaying=!1);let r=c.sessionsList[c.currentSessionIndex];r.type===`practice`?this.renderPracticeSession(e,c,r,i,s,a,n,l):r.type===`qualifying`?this.renderQualifyingSession(e,c,r,i,s,a,n,l):r.type===`sprint`||r.type===`race`?this.renderRaceSession(e,c,r,i,s,a,n,l):r.type===`podium`&&this.renderPodiumSession(e,c,i,n,t)};l()}static getSessionsList(e,t){return t===`auto`?e===`auto_f1`?[{id:`fp1`,name:`Prove Libere 1 (FP1)`,type:`practice`,sub:`Venerdì • Installazione & Assetto Base`},{id:`fp2`,name:`Prove Libere 2 (FP2)`,type:`practice`,sub:`Venerdì • Simulazione Passo Gara & Degrado Gomme`},{id:`fp3`,name:`Prove Libere 3 (FP3)`,type:`practice`,sub:`Sabato Mattina • Simulazione Qualifica al Limite`},{id:`quali`,name:`Qualifiche Ufficiali (Q1-Q2-Q3)`,type:`qualifying`,sub:`Sabato Pomeriggio • Shootout per la Pole Position`},{id:`race`,name:`Gran Premio della Domenica`,type:`race`,sub:`Domenica • 100% Gara Mondiale`},{id:`podium`,name:`Cerimonia del Podio`,type:`podium`,sub:`Premiazioni & Classifica Campionato`}]:[{id:`fp1`,name:`Prove Libere (Practice)`,type:`practice`,sub:`Sessione Unica di Messa a Punto`},{id:`quali`,name:`Qualifiche Ufficiali`,type:`qualifying`,sub:`Griglia di Partenza`},{id:`race`,name:`Gran Premio Ufficiale`,type:`race`,sub:`Gara di Campionato`},{id:`podium`,name:`Cerimonia del Podio`,type:`podium`,sub:`Premiazioni`}]:e===`moto_gp`?[{id:`fp1`,name:`Free Practice 1 (FP1)`,type:`practice`,sub:`Venerdì Mattina • Studio Traiettorie`},{id:`practice`,name:`Practice (Pre-Qualifiche Q2)`,type:`practice`,sub:`Venerdì Pomeriggio • Top 10 Diretta in Q2`},{id:`quali`,name:`Qualifiche Ufficiali (Q1 & Q2)`,type:`qualifying`,sub:`Sabato • Caccia alla Pole`},{id:`sprint`,name:`Gara Sprint (Sabato)`,type:`sprint`,sub:`Sabato Pomeriggio • Distanza 50% con Punti Mondiali`},{id:`race`,name:`Gran Premio della Domenica`,type:`race`,sub:`Domenica • GP Ufficiale 1000cc`},{id:`podium`,name:`Cerimonia del Podio`,type:`podium`,sub:`Premiazioni & Inni Nazionali`}]:[{id:`fp1`,name:`Prove Libere (FP)`,type:`practice`,sub:`Assetto e Feeling`},{id:`quali`,name:`Qualifiche (Q1/Q2)`,type:`qualifying`,sub:`Griglia di Partenza`},{id:`race`,name:`Gran Premio Ufficiale`,type:`race`,sub:`Gara Mondiale`},{id:`podium`,name:`Cerimonia del Podio`,type:`podium`,sub:`Podio`}]}static renderSessionStepper(e,t){return`
      <div class="weekend-stepper-bar">
        ${e.map((e,n)=>{let r=n<t;return`
            <div class="stepper-step ${n===t?`current`:``} ${r?`done`:``}">
              <span class="step-badge">${r?`✓`:n+1}</span>
              <span class="step-title">${e.name.split(` `)[0]}</span>
            </div>
          `}).join(`<div class="stepper-line"></div>`)}
      </div>
    `}static renderPracticeSession(e,t,n,r,i,a,o,c){t.practiceStates[n.id]||(t.practiceStates[n.id]=y.initPracticeState(r,a,a.roster,o,i,o.discipline,n.name));let u=t.practiceStates[n.id],d=u.isFinished;e.innerHTML=`
      <div class="weekend-stage-wrapper">
        ${this.renderSessionStepper(t.sessionsList,t.currentSessionIndex)}

        <!-- HEADER SESSIONE CON OROLOGIO DIGITALE -->
        <div class="weekend-top-header">
          <div class="header-left">
            <span class="session-badge">${n.name.toUpperCase()}</span>
            <h2>${r.flag} Gran Premio di ${r.displayName}</h2>
            <div class="session-clock-pill">
              <span class="clock-icon">⏱️</span>
              <span>TEMPO RIMANENTE: <strong>${u.timeRemainingMinutes}:00</strong> / ${u.totalMinutes}:00</span>
              <span class="clock-weather-tag">${u.weatherText}</span>
            </div>
          </div>

          <!-- CONTROLLI VELOCITÀ & SALTA SESSIONE -->
          <div class="session-speed-actions">
            <div class="speed-buttons-group">
              <button class="speed-btn ${t.simulationSpeed===1?`active`:``}" data-speed="1">1x</button>
              <button class="speed-btn ${t.simulationSpeed===2?`active`:``}" data-speed="2">2x</button>
              <button class="speed-btn ${t.simulationSpeed===5?`active`:``}" data-speed="5">5x</button>
              <button class="speed-btn ${t.simulationSpeed===10?`active`:``}" data-speed="10">10x ⚡</button>
            </div>

            ${d?`
              <button id="btn-proceed-next-session" class="speed-ctrl-btn next pulse-glow">
                <span>Avanza alla Sessione Successiva ➔</span>
              </button>
            `:`
              <button id="btn-toggle-autoplay-practice" class="btn-play-pause ${t.isAutoPlaying?`pause`:`play`}">
                ${t.isAutoPlaying?`⏸ PAUSA`:`▶ AVVIA PROVE`}
              </button>
              <button id="btn-step-5min-practice" class="speed-ctrl-btn">
                <span>+5 Minuti ⏩</span>
              </button>
              <button id="btn-skip-practice" class="speed-ctrl-btn skip pulse-glow" title="Simula istantaneamente tutti i minuti rimanenti della sessione">
                <span>⏭️ Salta Sessione (Simula Tempi)</span>
              </button>
            `}
          </div>
        </div>

        <!-- GRIGLIA PRINCIPALE: ASSETTO/STINT + TABELLA TEMPI LIVE -->
        <div class="practice-stage-grid">
          <!-- Colonna Sinistra: Regolazione Assetto, Scelta Gomme & Stint -->
          <div class="practice-controls-col">
            <div class="dash-card setup-sliders-card">
              <div class="card-title-row">
                <h3 class="card-title">Messa a Punto Assetto Meccanico & Aero</h3>
                <span class="setup-gain-badge">Guadagno Stimato: -${u.feedback.lapTimeBonusSec.toFixed(3)}s</span>
              </div>
              <p class="section-subtext">Regola i parametri e scegli la mescola per mandare la monoposto in pista.</p>

              <div class="slider-group-box">
                <div class="slider-item">
                  <div class="slider-label-row">
                    <span>Carico Aerodinamico</span>
                    <strong id="val-aero">${t.setupSettings.aeroLevel}%</strong>
                  </div>
                  <input type="range" id="range-aero" min="10" max="90" value="${t.setupSettings.aeroLevel}" class="motorsport-range">
                  <div class="range-endpoints">
                    <small>Basso Carico (Monza/Spa)</small>
                    <small>Alto Carico (Monaco/Hungaroring)</small>
                  </div>
                </div>

                <div class="slider-item">
                  <div class="slider-label-row">
                    <span>Rigidità Sospensioni</span>
                    <strong id="val-susp">${t.setupSettings.suspensionStiffness}%</strong>
                  </div>
                  <input type="range" id="range-susp" min="10" max="90" value="${t.setupSettings.suspensionStiffness}" class="motorsport-range">
                  <div class="range-endpoints">
                    <small>Morbida (Cordoli & Trazione)</small>
                    <small>Rigida (Reattività & Stabilità)</small>
                  </div>
                </div>

                <div class="slider-item">
                  <div class="slider-label-row">
                    <span>Pressione Pneumatici</span>
                    <strong id="val-tyres">${t.setupSettings.tyrePressure}%</strong>
                  </div>
                  <input type="range" id="range-tyres" min="10" max="90" value="${t.setupSettings.tyrePressure}" class="motorsport-range">
                  <div class="range-endpoints">
                    <small>Bassa (Grip Immediato)</small>
                    <small>Alta (Conservazione Gomma)</small>
                  </div>
                </div>
              </div>

              <!-- Selettore Gomme per lo Stint -->
              <div class="practice-tyre-choice-row">
                <label>Mescola per lo Stint:</label>
                <select id="select-practice-tyre" class="dark-select">
                  <option value="SOFT" ${t.practiceSelectedTyre===`SOFT`?`selected`:``}>🔴 Gomme Soft (Veloci, alto degrado)</option>
                  <option value="MEDIUM" ${t.practiceSelectedTyre===`MEDIUM`?`selected`:``}>🟡 Gomme Medium (Equilibrate)</option>
                  <option value="HARD" ${t.practiceSelectedTyre===`HARD`?`selected`:``}>⚪ Gomme Hard (Lunga percorrenza)</option>
                  <option value="INTER" ${t.practiceSelectedTyre===`INTER`?`selected`:``}>🟢 Intermedie (Pioggia leggera/umido)</option>
                  <option value="WET" ${t.practiceSelectedTyre===`WET`?`selected`:``}>🔵 Gomme Wet (Bagnato estremo)</option>
                </select>
              </div>

              <div class="practice-action-buttons">
                <button id="btn-run-stint" class="btn-primary-action" ${d?`disabled`:``}>
                  <span>⏱️ Manda in Pista • Esegui Stint (Nuovo Giro Veloce)</span>
                </button>
              </div>

              <!-- Radio Box Ingegnere -->
              <div class="engineer-radio-card">
                <div class="radio-head">
                  <span class="radio-icon">📻</span>
                  <strong>Muretto Box Telemetria:</strong>
                </div>
                <p class="radio-quote">"${u.feedback.advice}"</p>
                <div class="confidence-bar-box">
                  <span>Fiducia Assetto: <strong>${u.feedback.setupMastery}%</strong></span>
                  <div class="confidence-track">
                    <div class="confidence-fill" style="width: ${u.feedback.setupMastery}%"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Colonna Destra: Classifica dei Tempi Live -->
          <div class="practice-timing-col">
            <div class="dash-card timing-board-card">
              <div class="card-title-row">
                <h3 class="card-title">Classifica dei Tempi Ufficiale • ${n.name}</h3>
                <span class="timing-count-badge">${u.timingBoard.length} Piloti Iscritti</span>
              </div>
              <p class="section-subtext">Classifica progressiva sul giro secco. All'inizio della sessione tutti i piloti sono al box a zero giri.</p>

              <div class="timing-table-wrapper">
                <table class="timing-tower-table">
                  <thead>
                    <tr>
                      <th class="text-center" style="width: 45px;">POS</th>
                      <th>PILOTA</th>
                      <th>SCUDERIA</th>
                      <th class="text-center">GOMMA</th>
                      <th class="text-center">SETTORE 1</th>
                      <th class="text-center">SETTORE 2</th>
                      <th class="text-center">SETTORE 3</th>
                      <th class="text-right">TEMPO MIGLIORE</th>
                      <th class="text-right">DISTACCO</th>
                      <th class="text-center">GIRI</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${u.timingBoard.map(e=>{let t=`<span class="tyre-circle medium">M</span>`;return e.compound===`SOFT`&&(t=`<span class="tyre-circle soft">S</span>`),e.compound===`HARD`&&(t=`<span class="tyre-circle hard">H</span>`),e.compound===`INTER`&&(t=`<span class="tyre-circle inter">I</span>`),e.compound===`WET`&&(t=`<span class="tyre-circle wet">W</span>`),`
                        <tr class="${e.isPlayer?`player-timing-row`:``}">
                          <td class="pos-badge-cell text-center">
                            <span class="badge pos-${e.position}">${e.position}</span>
                          </td>
                          <td class="pilot-cell">
                            <span class="team-bar" style="background:${e.color||`#888`}"></span>
                            <strong>${e.name}</strong>
                            <small class="driver-code-tag">${e.code}</small>
                            ${e.isPlayer?`<span class="you-tag">TU</span>`:``}
                            <small class="status-tag ${e.status===`IN PISTA`?`on-track`:`in-pit`}">${e.status}</small>
                          </td>
                          <td class="team-name-cell">${e.teamName}</td>
                          <td class="text-center">${t}</td>
                          <td class="sector-time text-center">${e.s1===`-`?`-`:`${e.s1}s`}</td>
                          <td class="sector-time text-center">${e.s2===`-`?`-`:`${e.s2}s`}</td>
                          <td class="sector-time text-center">${e.s3===`-`?`-`:`${e.s3}s`}</td>
                          <td class="lap-time-cell text-right"><strong>${e.formattedTime}</strong></td>
                          <td class="gap-cell text-right">${e.gap}</td>
                          <td class="laps-run-cell text-center"><small>${e.lapsRun} Giri</small></td>
                        </tr>
                      `}).join(``)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;let f=e.querySelector(`#range-aero`),p=e.querySelector(`#range-susp`),m=e.querySelector(`#range-tyres`);f&&(f.oninput=n=>{t.setupSettings.aeroLevel=parseInt(n.target.value,10),e.querySelector(`#val-aero`).textContent=`${t.setupSettings.aeroLevel}%`}),p&&(p.oninput=n=>{t.setupSettings.suspensionStiffness=parseInt(n.target.value,10),e.querySelector(`#val-susp`).textContent=`${t.setupSettings.suspensionStiffness}%`}),m&&(m.oninput=n=>{t.setupSettings.tyrePressure=parseInt(n.target.value,10),e.querySelector(`#val-tyres`).textContent=`${t.setupSettings.tyrePressure}%`});let h=e.querySelector(`#select-practice-tyre`);h&&(h.onchange=e=>{t.practiceSelectedTyre=e.target.value;let n=u.timingBoard.find(e=>e.isPlayer);n&&(n.compound=e.target.value)}),e.querySelectorAll(`.speed-btn`).forEach(l=>{l.onclick=()=>{s.playClick(),t.simulationSpeed=parseInt(l.dataset.speed,10),t.isAutoPlaying&&this.startPracticeAutoPlay(e,t,n,r,i,a,o,c),this.renderPracticeSession(e,t,n,r,i,a,o,c)}});let g=e.querySelector(`#btn-toggle-autoplay-practice`);g&&(g.onclick=()=>{s.playClick(),t.isAutoPlaying?(t.autoPlayTimer&&clearInterval(t.autoPlayTimer),t.autoPlayTimer=null,t.isAutoPlaying=!1):(t.isAutoPlaying=!0,this.startPracticeAutoPlay(e,t,n,r,i,a,o,c)),this.renderPracticeSession(e,t,n,r,i,a,o,c)});let _=e.querySelector(`#btn-step-5min-practice`);_&&(_.onclick=()=>{s.playRadioBeep(),y.stepPracticeTime(u,5,!1,o,i,r,t.setupSettings,o.discipline),this.renderPracticeSession(e,t,n,r,i,a,o,c)});let v=e.querySelector(`#btn-run-stint`);v&&(v.onclick=()=>{s.playEngineRev(),y.stepPracticeTime(u,5,!0,o,i,r,t.setupSettings,o.discipline),l.show(`⏱️ Stint completato! Telemetria e intertempi aggiornati.`,`info`),this.renderPracticeSession(e,t,n,r,i,a,o,c)});let b=e.querySelector(`#btn-skip-practice`);b&&(b.onclick=()=>{s.playRadioBeep(),t.autoPlayTimer&&clearInterval(t.autoPlayTimer),t.isAutoPlaying=!1,y.fastForwardPracticeToEnd(u,o,i,r,t.setupSettings,o.discipline),l.show(`⏭️ Sessione completata con successo! Tempi definitivi calcolati.`,`success`),this.renderPracticeSession(e,t,n,r,i,a,o,c)});let x=e.querySelector(`#btn-proceed-next-session`);x&&(x.onclick=()=>{s.playClick(),t.currentSessionIndex++,c()})}static startPracticeAutoPlay(e,t,n,r,i,a,o,c){t.autoPlayTimer&&clearInterval(t.autoPlayTimer);let l={1:600,2:300,5:120,10:60}[t.simulationSpeed]||400;t.autoPlayTimer=setInterval(()=>{let l=t.practiceStates[n.id];if(l.isFinished){clearInterval(t.autoPlayTimer),t.autoPlayTimer=null,t.isAutoPlaying=!1,s.playChequeredFlag(),this.renderPracticeSession(e,t,n,r,i,a,o,c);return}y.stepPracticeTime(l,2,!1,o,i,r,t.setupSettings,o.discipline),this.renderPracticeSession(e,t,n,r,i,a,o,c)},l)}static renderQualifyingSession(e,t,n,r,i,a,o,c){if(!t.qualifyingState){let e=Object.values(t.practiceStates).reduce((e,t)=>Math.max(e,t?.feedback?.lapTimeBonusSec||0),0);t.qualifyingState=y.initQualifyingState(r,a,a.roster,o,i,e,o.discipline)}let u=t.qualifyingState,d=u.isFinished,f=u.grid.find(e=>e.isPlayer),p=d&&f&&f.position===1,m=Math.floor(u.phaseTimeRemainingSec/60),h=(u.phaseTimeRemainingSec%60).toString().padStart(2,`0`);e.innerHTML=`
      <div class="weekend-stage-wrapper">
        ${this.renderSessionStepper(t.sessionsList,t.currentSessionIndex)}

        <!-- HEADER QUALIFICHE CON COUNTDOWN TEMPORALE -->
        <div class="weekend-top-header">
          <div class="header-left">
            <span class="session-badge">${u.currentPhase} • SHOOTOUT</span>
            <h2>${r.flag} Griglia di Partenza • ${r.displayName}</h2>
            <div class="session-clock-pill">
              <span class="clock-icon">⏱️</span>
              <span>TEMPO FASE ${u.currentPhase}: <strong>${m}:${h}</strong></span>
              <span class="clock-weather-tag">${u.weatherText}</span>
            </div>
          </div>

          <!-- CONTROLLI VELOCITÀ & SALTA -->
          <div class="session-speed-actions">
            <div class="speed-buttons-group">
              <button class="speed-btn ${t.simulationSpeed===1?`active`:``}" data-speed="1">1x</button>
              <button class="speed-btn ${t.simulationSpeed===2?`active`:``}" data-speed="2">2x</button>
              <button class="speed-btn ${t.simulationSpeed===5?`active`:``}" data-speed="5">5x</button>
              <button class="speed-btn ${t.simulationSpeed===10?`active`:``}" data-speed="10">10x ⚡</button>
            </div>

            ${d?`
              <button id="btn-start-race-action" class="speed-ctrl-btn start-race pulse-glow">
                <span>Schierati sulla Griglia di Partenza 🏁</span>
              </button>
            `:`
              <button id="btn-toggle-autoplay-qualy" class="btn-play-pause ${t.isAutoPlaying?`pause`:`play`}">
                ${t.isAutoPlaying?`⏸ PAUSA`:`▶ AVVIA QUALIFICHE`}
              </button>
              <button id="btn-step-qualy" class="speed-ctrl-btn">
                <span>+3 Minuti ⏩</span>
              </button>
              <button id="btn-player-hotlap" class="speed-ctrl-btn pulse-glow" ${f?.eliminated?`disabled`:``}>
                <span>🔥 Fai Giro Lanciato</span>
              </button>
              <button id="btn-skip-quali" class="speed-ctrl-btn skip" title="Simula istantaneamente tutte le fasi rimanenti">
                <span>⏭️ Salta Qualifiche (Simula Griglia)</span>
              </button>
            `}
          </div>
        </div>

        ${d?`
          <!-- HERO RISULTATO FINALE QUALIFICHE -->
          <div class="quali-results-summary-card ${p?`pole-celebration`:``}">
            <div class="quali-summary-flex">
              <div class="grid-slot-display">
                <span class="slot-label">LA TUA POSIZIONE IN GRIGLIA</span>
                <strong class="slot-big-number pos-${f.position}">P${f.position}</strong>
                <span class="slot-time">${f.formattedTime} (${f.gap})</span>
              </div>
              <div class="quali-message">
                ${p?`
                  <h3 class="pole-title">👑 POLE POSITION MONDIALE!</h3>
                  <p>Prestazione stratosferica! Scatterai in testa al gruppo dalla prima casella della griglia.</p>
                `:f.position<=4?`
                  <h3>PRIMA / SECONDA FILA CONQUISTATA! 🔥</h3>
                  <p>Posizione di vertice per attaccare la vittoria fin dallo stacco della frizione.</p>
                `:`
                  <h3>QUALIFICA COMPLETATA IN P${f.position}</h3>
                  <p>Partirai nel cuore del gruppo. Sarà fondamentale una grande partenza e la giusta strategia gomme.</p>
                `}
              </div>
            </div>
          </div>
        `:``}

        <!-- TABELLA QUALIFICHE -->
        <div class="dash-card timing-board-card">
          <div class="card-title-row">
            <h3 class="card-title">Classifica Tempi Qualifiche • Fase Attuale: ${u.currentPhase}</h3>
            <span class="timing-count-badge">${u.grid.filter(e=>!e.eliminated).length} Piloti Attivi</span>
          </div>
          <p class="section-subtext">I piloti escono dai box per completare i loro tentativi cronometrati prima della bandiera a scacchi.</p>

          <div class="timing-table-wrapper">
            <table class="timing-tower-table full-quali-table">
              <thead>
                <tr>
                  <th class="text-center" style="width: 45px;">POS</th>
                  <th>PILOTA</th>
                  <th>SCUDERIA</th>
                  <th class="text-center">Q1</th>
                  <th class="text-center">Q2</th>
                  <th class="text-center">Q3</th>
                  <th class="text-right">TEMPO MIGLIORE</th>
                  <th class="text-right">DISTACCO</th>
                </tr>
              </thead>
              <tbody>
                ${u.grid.map((e,t)=>{let n=``;return u.isMultiStage&&(t===10&&u.currentPhase!==`Q3`?n=`<tr class="cutoff-line-row q2-cutoff"><td colspan="8">── TAGLIO TOP 10 (QUALIFICATI PER Q3 SHOOTOUT) ──</td></tr>`:t===16&&u.currentPhase===`Q1`&&(n=`<tr class="cutoff-line-row q1-cutoff"><td colspan="8">── ZONA ELIMINAZIONE Q1 (P17-P22) ──</td></tr>`)),`
                    ${n}
                    <tr class="${e.isPlayer?`player-timing-row`:``} ${e.eliminated?`eliminated-row`:``}">
                      <td class="pos-badge-cell text-center">
                        <span class="badge pos-${e.position}">${e.position}</span>
                      </td>
                      <td class="pilot-cell">
                        <span class="team-bar" style="background:${e.color||`#888`}"></span>
                        <strong>${e.name}</strong>
                        <small class="driver-code-tag">${e.code}</small>
                        ${e.isPlayer?`<span class="you-tag">TU</span>`:``}
                        ${e.eliminated?`<span class="eliminated-tag">OUT in ${e.stageReached}</span>`:`<small class="status-tag ${e.status===`IN PISTA`?`on-track`:`in-pit`}">${e.status}</small>`}
                      </td>
                      <td class="team-name-cell">${e.teamName}</td>
                      <td class="sector-time text-center">${e.q1Time}</td>
                      <td class="sector-time text-center">${e.q2Time}</td>
                      <td class="sector-time text-center ${e.q3Time===`-`?``:`q3-active`}">${e.q3Time}</td>
                      <td class="lap-time-cell text-right"><strong>${e.formattedTime}</strong></td>
                      <td class="gap-cell text-right">${e.gap}</td>
                    </tr>
                  `}).join(``)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `,e.querySelectorAll(`.speed-btn`).forEach(l=>{l.onclick=()=>{s.playClick(),t.simulationSpeed=parseInt(l.dataset.speed,10),t.isAutoPlaying&&this.startQualyAutoPlay(e,t,n,r,i,a,o,c),this.renderQualifyingSession(e,t,n,r,i,a,o,c)}});let g=e.querySelector(`#btn-toggle-autoplay-qualy`);g&&(g.onclick=()=>{s.playClick(),t.isAutoPlaying?(t.autoPlayTimer&&clearInterval(t.autoPlayTimer),t.autoPlayTimer=null,t.isAutoPlaying=!1):(t.isAutoPlaying=!0,this.startQualyAutoPlay(e,t,n,r,i,a,o,c)),this.renderQualifyingSession(e,t,n,r,i,a,o,c)});let _=e.querySelector(`#btn-step-qualy`);_&&(_.onclick=()=>{s.playRadioBeep(),y.stepQualifyingTime(u,180,!1,o,i,r,o.discipline),this.renderQualifyingSession(e,t,n,r,i,a,o,c)});let v=e.querySelector(`#btn-player-hotlap`);v&&(v.onclick=()=>{s.playEngineRev(),y.stepQualifyingTime(u,180,!0,o,i,r,o.discipline),l.show(`🔥 Giro lanciato completato! Tempo sul giro registrato.`,`info`),this.renderQualifyingSession(e,t,n,r,i,a,o,c)});let b=e.querySelector(`#btn-skip-quali`);b&&(b.onclick=()=>{s.playClick(),t.autoPlayTimer&&clearInterval(t.autoPlayTimer),t.isAutoPlaying=!1,y.fastForwardQualifyingToEnd(u,o,i,r,o.discipline),l.show(`Griglia di partenza ufficiale definita!`,`success`),this.renderQualifyingSession(e,t,n,r,i,a,o,c)});let x=e.querySelector(`#btn-start-race-action`);x&&(x.onclick=()=>{s.playEngineRev();let e=n.type===`sprint`;t.raceState=y.initRaceState(u.grid,r,a,e,o.discipline,t.setupSettings,o),t.currentSessionIndex++,c()})}static startQualyAutoPlay(e,t,n,r,i,a,o,c){t.autoPlayTimer&&clearInterval(t.autoPlayTimer);let l={1:600,2:300,5:120,10:60}[t.simulationSpeed]||400;t.autoPlayTimer=setInterval(()=>{let l=t.qualifyingState;if(l.isFinished){clearInterval(t.autoPlayTimer),t.autoPlayTimer=null,t.isAutoPlaying=!1,s.playChequeredFlag(),this.renderQualifyingSession(e,t,n,r,i,a,o,c);return}y.stepQualifyingTime(l,45,!1,o,i,r,o.discipline),this.renderQualifyingSession(e,t,n,r,i,a,o,c)},l)}static renderRaceSession(e,t,n,r,i,a,o,c){if(!t.raceState){let e=t.qualifyingState?t.qualifyingState.grid:t.qualifyingGrid,i=n.type===`sprint`;t.raceState=y.initRaceState(e,r,a,i,o.discipline,t.setupSettings,o)}let u=t.raceState,d=u.drivers.find(e=>e.isPlayer),f=u.finished,p=n.type===`sprint`,m=u.weather.condition===`HEAVY_RAIN`||u.weather.condition===`LIGHT_RAIN`;if(u.gridPhase){e.innerHTML=`
        <div class="weekend-stage-wrapper grid-start-stage">
          ${this.renderSessionStepper(t.sessionsList,t.currentSessionIndex)}

          <div class="grid-start-hero-card">
            <div class="grid-semafori-row">
              <span class="start-light red pulse"></span>
              <span class="start-light red pulse"></span>
              <span class="start-light red pulse"></span>
              <span class="start-light red pulse"></span>
              <span class="start-light red pulse"></span>
            </div>

            <h2 class="grid-main-title">SCHIERAMENTO SULLA GRIGLIA DI PARTENZA</h2>
            <p class="grid-sub-text">
              ${r.flag} ${r.displayName} • ${p?`Gara Sprint`:`Gran Premio Ufficiale`} • ${u.totalLaps} Giri Previsti
            </p>

            <div class="grid-briefing-grid">
              <!-- Meteo & Condizioni Tracciato -->
              <div class="grid-briefing-tile">
                <span class="tile-lbl">CONDIZIONI METEO</span>
                <strong class="tile-val ${m?`wet-highlight`:`dry-highlight`}">${u.weatherText}</strong>
                <small>Aria: ${u.airTemp} • Asfalto: ${u.trackTemp} • Rischio Pioggia: ${Math.round(u.weather.rainChance*100)}%</small>
              </div>

              <!-- Posizione di Partenza -->
              <div class="grid-briefing-tile">
                <span class="tile-lbl">CASELLA DI PARTENZA</span>
                <strong class="tile-val pos-highlight">P${d.startPos}</strong>
                <small>Distacco iniziale a semafori spenti: 0.000s</small>
              </div>

              <!-- Regolamento Soste -->
              <div class="grid-briefing-tile">
                <span class="tile-lbl">REGOLAMENTO SOSTE AI BOX</span>
                <strong class="tile-val">${u.mandatoryPit?`OBBLIGATORIO (Almeno 1 Sosta)`:`LIBERO / FLAG-TO-FLAG`}</strong>
                <small>${u.mandatoryTwoDryCompounds?`F1: Obbligo di usare 2 mescole da asciutto diverse`:u.isMotoGP?`MotoGP: Cambio moto consentito se piove`:`Gara standard`}</small>
              </div>
            </div>

            <!-- SCELTA GOMMA DI PARTENZA -->
            <div class="grid-tyre-selection-card">
              <h3>Scegli la Mescola di Partenza per il Via</h3>
              <p class="tyre-hint-text">
                ${m?`🌧️ L'asfalto è bagnato! Si consigliano vivamente gomme WET o INTERMEDIE per evitare aquaplaning e testacoda alla partenza.`:`☀️ L'asfalto è asciutto. Scegli tra lo scatto delle Soft, l'equilibrio delle Medium o la durata delle Hard.`}
              </p>

              <div class="grid-tyres-flex">
                <label class="grid-tyre-card ${d.tyreCompound===`SOFT`?`active`:``}">
                  <input type="radio" name="startTyre" value="SOFT" ${d.tyreCompound===`SOFT`?`checked`:``} style="display:none;">
                  <span class="tyre-circle soft">S</span>
                  <strong>SOFT (Rossa)</strong>
                  <small>Grip massimo al via, degrado rapido</small>
                </label>

                <label class="grid-tyre-card ${d.tyreCompound===`MEDIUM`?`active`:``}">
                  <input type="radio" name="startTyre" value="MEDIUM" ${d.tyreCompound===`MEDIUM`?`checked`:``} style="display:none;">
                  <span class="tyre-circle medium">M</span>
                  <strong>MEDIUM (Gialla)</strong>
                  <small>Ritmo bilanciato e flessibilità tattica</small>
                </label>

                <label class="grid-tyre-card ${d.tyreCompound===`HARD`?`active`:``}">
                  <input type="radio" name="startTyre" value="HARD" ${d.tyreCompound===`HARD`?`checked`:``} style="display:none;">
                  <span class="tyre-circle hard">H</span>
                  <strong>HARD (Bianca)</strong>
                  <small>Riscaldamento lento, durata estrema</small>
                </label>

                <label class="grid-tyre-card ${d.tyreCompound===`INTER`?`active`:``}">
                  <input type="radio" name="startTyre" value="INTER" ${d.tyreCompound===`INTER`?`checked`:``} style="display:none;">
                  <span class="tyre-circle inter">I</span>
                  <strong>INTERMEDIA (Verde)</strong>
                  <small>Per asfalto umido o pioggerellina</small>
                </label>

                <label class="grid-tyre-card ${d.tyreCompound===`WET`?`active`:``}">
                  <input type="radio" name="startTyre" value="WET" ${d.tyreCompound===`WET`?`checked`:``} style="display:none;">
                  <span class="tyre-circle wet">W</span>
                  <strong>FULL WET (Blu)</strong>
                  <small>Massimo drenaggio per pioggia battente</small>
                </label>
              </div>
            </div>

            <!-- PULSANTE SPEGNI I SEMAFORI -->
            <div class="grid-action-box">
              <button id="btn-lights-out" class="start-race-button pulse-glow">
                <span>🚦 SPEGNI I SEMAFORI • VIA AL GRAN PREMIO!</span>
                <span class="btn-arrow">🏁</span>
              </button>
            </div>
          </div>
        </div>
      `,e.querySelectorAll(`.grid-tyre-card`).forEach(t=>{t.onclick=()=>{s.playClick(),e.querySelectorAll(`.grid-tyre-card`).forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`);let n=t.querySelector(`input`).value;d.tyreCompound=n,d.compoundsUsed=[n]}});let l=e.querySelector(`#btn-lights-out`);l&&(l.onclick=()=>{s.playEngineRev(),y.stepRaceLap(u,t.playerTactics,o.discipline),this.renderRaceSession(e,t,n,r,i,a,o,c)});return}e.innerHTML=`
      <div class="weekend-stage-wrapper race-stage-wrapper">
        <!-- BARRA SUPERIORE TELEVISIVA F1 STYLE -->
        <div class="f1-broadcast-top-bar ${u.safetyCar?`sc-active`:``}">
          <div class="broadcast-left">
            <div class="f1-badge-logo">${o.discipline===`auto`?`F1 TV LIVE`:`MOTOGP LIVE`}</div>
            <span class="live-dot-pulse"></span>
            <div class="lap-counter-box">
              <span class="lap-title">GIRO</span>
              <strong class="lap-num">${u.currentLap} / ${u.totalLaps}</strong>
            </div>
            <div class="track-status-pill ${u.safetyCar?`sc`:`green`}">
              ${u.safetyCar?`🟡 SAFETY CAR IN PISTA`:`🟢 TRACK CLEAR • BANDIERA VERDE`}
            </div>
            <div class="weather-pill">
              <span>${u.weatherText} • Aria ${u.airTemp} / Asfalto ${u.trackTemp}</span>
            </div>
          </div>

          <!-- CONTROLLI VELOCITÀ GARA -->
          <div class="race-speed-controller">
            <div class="speed-buttons-group">
              <button class="speed-btn ${t.simulationSpeed===1?`active`:``}" data-speed="1">1x</button>
              <button class="speed-btn ${t.simulationSpeed===2?`active`:``}" data-speed="2">2x</button>
              <button class="speed-btn ${t.simulationSpeed===5?`active`:``}" data-speed="5">5x</button>
              <button class="speed-btn ${t.simulationSpeed===10?`active`:``}" data-speed="10">10x ⚡</button>
            </div>

            ${f?`
              <button id="btn-proceed-podium" class="speed-ctrl-btn podium pulse-glow">
                <span>VAI AL PODIO & PREMIAZIONI 🏆</span>
              </button>
            `:`
              <button id="btn-toggle-autoplay-race" class="btn-play-pause ${t.isAutoPlaying?`pause`:`play`}">
                ${t.isAutoPlaying?`⏸ PAUSA`:`▶ AVVIA CONTINUA`}
              </button>
              <button id="btn-step-single-lap" class="speed-ctrl-btn">
                <span>+1 Giro ⏩</span>
              </button>
              <button id="btn-skip-to-finish" class="speed-ctrl-btn skip-finish pulse-glow" title="Simula istantaneamente tutti i giri rimanenti">
                <span>⏭️ Salta al Traguardo</span>
              </button>
            `}
          </div>
        </div>

        <!-- GRIGLIA PRINCIPALE DELLA GARA: COLONNINA F1 A SINISTRA + COCKPIT A DESTRA -->
        <div class="race-main-broadcast-grid">
          <!-- ===============================================================
               COLONNINA DEI TEMPI TIPO QUELLA DELLA F1 (TIMING TOWER)
               =============================================================== -->
          <div class="f1-timing-tower-card">
            <div class="tower-header">
              <div class="tower-header-title">
                <span class="f1-icon">${o.discipline===`auto`?`🏎️`:`🏍️`}</span>
                <strong>CLASSIFICA LIVE</strong>
              </div>
              <div class="tower-mode-toggle">
                <button id="btn-toggle-tower-mode" class="toggle-mode-btn">
                  ${t.timingTowerMode===`interval`?`MODO: INTERVALLO`:`MODO: DISTACCO`}
                </button>
              </div>
            </div>

            <div class="f1-tower-rows-container">
              ${u.drivers.map(e=>{let n=e.currentPos===1,r=e.startPos-e.currentPos,i=`<span class="pos-delta same">-</span>`;r>0&&(i=`<span class="pos-delta gain">▲${r}</span>`),r<0&&(i=`<span class="pos-delta loss">▼${Math.abs(r)}</span>`);let a=`medium`;e.tyreCompound===`SOFT`&&(a=`soft`),e.tyreCompound===`HARD`&&(a=`hard`),e.tyreCompound===`INTER`&&(a=`inter`),e.tyreCompound===`WET`&&(a=`wet`);let o=n?`LEADER`:`+${e.gapToLeaderSec.toFixed(1)}s`;return t.timingTowerMode===`interval`&&(o=n?`LEADER`:`+${e.intervalAheadSec.toFixed(1)}s`),e.status===`DNF`&&(o=`OUT`),e.status===`PITTING`&&(o=`IN PIT`),`
                  <div class="f1-tower-row ${e.isPlayer?`player-row`:``} ${e.status===`DNF`?`dnf`:``} ${e.status===`PITTING`?`pitting`:``}">
                    <div class="tower-pos-box">
                      <span class="pos-num">${e.status===`DNF`?`OUT`:e.currentPos}</span>
                      ${i}
                    </div>

                    <div class="team-stripe-bar" style="background: ${e.color||`#888`}"></div>

                    <div class="tower-driver-box">
                      <strong class="driver-code">${e.code}</strong>
                      <span class="driver-full-mini">${e.name.split(` `).slice(-1)[0]}</span>
                      ${e.isPlayer?`<span class="tower-you-badge">TU</span>`:``}
                      ${e.hasDrs&&e.status===`RUNNING`?`<span class="drs-active-badge">DRS</span>`:``}
                      ${u.fastestLapHolder===e.name?`<span class="fl-purple-badge" title="Giro più veloce">🟣 FL</span>`:``}
                    </div>

                    <div class="tower-tyre-box" title="${e.tyreCompound} (${Math.round(e.tyreLife)}% vita)">
                      <span class="tyre-circle ${a}">${e.tyreCompound.charAt(0)}</span>
                      <div class="mini-tyre-wear-bar">
                        <div class="wear-fill ${e.tyreLife<25?`critical`:``}" style="width:${e.tyreLife}%"></div>
                      </div>
                    </div>

                    <div class="tower-gap-box">
                      <span class="gap-text ${n?`leader`:``}">${o}</span>
                    </div>
                  </div>
                `}).join(``)}
            </div>
          </div>

          <!-- ===============================================================
               COCKPIT MURETTO BOX, GOMME, METEO & PIT STOP
               =============================================================== -->
          <div class="race-cockpit-controls-card">
            <!-- Alert Gomma Errata / Meteo -->
            ${m&&[`SOFT`,`MEDIUM`,`HARD`].includes(d.tyreCompound)?`
              <div class="tyre-weather-alert-card pulse-glow">
                <span class="alert-icon">⚠️</span>
                <div>
                  <strong>AQUAPLANING GRAVE: Gomme Slick su Pista Bagnata!</strong>
                  <p>Stai perdendo oltre 9 secondi al giro e rischi l'uscita di pista. Chiama subito il box per montare gomme WET!</p>
                </div>
              </div>
            `:``}

            ${!m&&[`WET`,`INTER`].includes(d.tyreCompound)?`
              <div class="tyre-weather-alert-card dry-warning pulse-glow">
                <span class="alert-icon">♨️</span>
                <div>
                  <strong>SURRISCALDAMENTO GOMME: Gomme da Bagnato su Asfalto Asciutto!</strong>
                  <p>Le gomme wet si stanno distruggendo rapidamente. Rientra ai box per passare alle Slick!</p>
                </div>
              </div>
            `:``}

            <!-- Scheda Status Telemetria Giocatore -->
            <div class="dash-card player-cockpit-status">
              <div class="card-title-row">
                <h3 class="card-title">Cockpit Pilota: ${o.firstName} ${o.lastName}</h3>
                <span class="cockpit-pos-big">P${d.currentPos}</span>
              </div>

              <div class="cockpit-stats-grid">
                <div class="cockpit-stat-tile">
                  <span class="lbl">Stato Gomme (${d.tyreCompound})</span>
                  <strong class="val ${d.tyreLife<25?`danger`:``}">${Math.round(d.tyreLife)}%</strong>
                  <div class="tyre-life-bar">
                    <div class="tyre-life-fill" style="width:${d.tyreLife}%; background:${d.tyreLife<30?`#ff1801`:`#00e676`}"></div>
                  </div>
                </div>

                <div class="cockpit-stat-tile">
                  <span class="lbl">Distacco dal Leader</span>
                  <strong class="val">${d.currentPos===1?`LEADER`:`+${d.gapToLeaderSec.toFixed(2)}s`}</strong>
                </div>

                <div class="cockpit-stat-tile">
                  <span class="lbl">Soste ai Box Effettuate</span>
                  <strong class="val">${d.pitStops} Pit Stop</strong>
                </div>

                <div class="cockpit-stat-tile">
                  <span class="lbl">Zona DRS</span>
                  <strong class="val ${d.hasDrs?`drs-on`:``}">${d.hasDrs?`🟢 ATTIVO (<1s)`:`DISATTIVO`}</strong>
                </div>
              </div>

              <!-- TELEMETRIA DEGRADO GOMME: ASSETTO & PILOTA -->
              <div class="cockpit-tyre-telemetry-box">
                <div class="telemetry-row-header">
                  <span class="telemetry-lbl">🔬 TELEMETRIA DEGRADO GOMME</span>
                  <span class="telemetry-val-rate">~${(d.baseWearRate*(d.tyreCompound===`SOFT`?1.6:d.tyreCompound===`HARD`?.7:1.05)*(d.setupWearMultiplier||1)*(d.driverStatsMultiplier||1)).toFixed(1)}% / giro</span>
                </div>
                <div class="telemetry-pills-flex">
                  <span class="wear-info-pill setup" title="Impatto dell'assetto vettura sulla gomma">
                    📐 Assetto: <strong>${u.setupWearInfo?.feedback||`Standard`}</strong>
                  </span>
                  <span class="wear-info-pill pilot" title="Impatto della Gestione Gomme del pilota">
                    ⭐ Pilota (Gest. Gomme ${d.tyreSkill||Math.round(o.attributes?.tyreMgmt||75)}): 
                    <strong>${Math.round(((d.driverStatsMultiplier||1)-1)*100)>0?`+`:``}${Math.round(((d.driverStatsMultiplier||1)-1)*100)}% usura</strong>
                  </span>
                </div>
              </div>
            </div>

            <!-- Muretto Box: Tattica, Ritmo & Pit Stop -->
            <div class="dash-card race-tactics-box">
              <h3 class="card-title">Muretto Box: Ordini di Scuderia & Strategia</h3>

              <div class="tactics-group">
                <label>Ritmo di Guida & Degrado Battistrada</label>
                <div class="tactics-btn-row" id="pace-mode-group">
                  <button class="tactic-btn ${t.playerTactics.paceMode===`SAVE`?`active`:``}" data-pace="SAVE">
                    <span>🔋 Conserva Gomme</span>
                    <small>Risparmia pneumatico</small>
                  </button>
                  <button class="tactic-btn ${t.playerTactics.paceMode===`BALANCED`?`active`:``}" data-pace="BALANCED">
                    <span>⚡ Ritmo Bilanciato</span>
                    <small>Passo di riferimento</small>
                  </button>
                  <button class="tactic-btn ${t.playerTactics.paceMode===`PUSH`?`active`:``}" data-pace="PUSH">
                    <span>🔥 Spinta al Limite</span>
                    <small>Attacca per sorpassare</small>
                  </button>
                </div>
              </div>

              <!-- SEZIONE PIT STOP REALISTICA -->
              ${p?``:`
                <div class="tactics-group pit-action-group">
                  <div class="pit-header-row">
                    <label>Sosta ai Box & Cambio Mescola</label>
                    <span class="pit-rule-tag">
                      ${u.mandatoryTwoDryCompounds?`F1: Mescole usate: [${d.compoundsUsed.join(`, `)}] • Obbligo: ${d.compoundsUsed.filter(e=>[`SOFT`,`MEDIUM`,`HARD`].includes(e)).length>=2?`✅ OK`:`⚠️ Serve 2ª mescola`}`:u.isMotoGP?`MotoGP: Cambio Moto Flag-to-Flag se piove`:`Sosta standard`}
                    </span>
                  </div>

                  <div class="pit-controls-row">
                    <button id="btn-call-box-action" class="btn-pit-call ${t.playerTactics.boxThisLap?`active pulse-glow`:``}">
                      ${t.playerTactics.boxThisLap?`🛑 PIT STOP PROGRAMMATO QUESTO GIRO!`:`🛠️ CHIAMA SOSTA AI BOX (BOX THIS LAP)`}
                    </button>
                    <select id="select-pit-tyre" class="dark-select">
                      <option value="HARD" ${t.playerTactics.newCompound===`HARD`?`selected`:``}>⚪ Hard (Dura)</option>
                      <option value="MEDIUM" ${t.playerTactics.newCompound===`MEDIUM`?`selected`:``}>🟡 Medium (Media)</option>
                      <option value="SOFT" ${t.playerTactics.newCompound===`SOFT`?`selected`:``}>🔴 Soft (Morbida)</option>
                      <option value="INTER" ${t.playerTactics.newCompound===`INTER`?`selected`:``}>🟢 Intermedie (Umido)</option>
                      <option value="WET" ${t.playerTactics.newCompound===`WET`?`selected`:``}>🔵 Wet (Bagnato Estremo)</option>
                    </select>
                  </div>
                </div>
              `}
            </div>

            <!-- Feed Radio & Cronaca Pista -->
            <div class="dash-card live-radio-feed-card">
              <h3 class="card-title">Live Radio Muretto & Cronaca</h3>
              <div class="race-log-scroller">
                ${u.log.map(e=>`
                  <div class="log-entry">${e}</div>
                `).join(``)}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;let h=e.querySelector(`#btn-toggle-tower-mode`);h&&(h.onclick=()=>{s.playClick(),t.timingTowerMode=t.timingTowerMode===`interval`?`gap`:`interval`,this.renderRaceSession(e,t,n,r,i,a,o,c)}),e.querySelectorAll(`.speed-btn`).forEach(l=>{l.onclick=()=>{s.playClick(),t.simulationSpeed=parseInt(l.dataset.speed,10),t.isAutoPlaying&&this.startRaceAutoPlay(e,t,n,r,i,a,o,c),this.renderRaceSession(e,t,n,r,i,a,o,c)}});let g=e.querySelector(`#btn-toggle-autoplay-race`);g&&(g.onclick=()=>{s.playClick(),t.isAutoPlaying?(t.autoPlayTimer&&clearInterval(t.autoPlayTimer),t.autoPlayTimer=null,t.isAutoPlaying=!1):(t.isAutoPlaying=!0,this.startRaceAutoPlay(e,t,n,r,i,a,o,c)),this.renderRaceSession(e,t,n,r,i,a,o,c)});let _=e.querySelector(`#btn-step-single-lap`);_&&(_.onclick=()=>{s.playEngineRev(),y.stepRaceLap(t.raceState,t.playerTactics,o.discipline),t.playerTactics.boxThisLap=!1,this.renderRaceSession(e,t,n,r,i,a,o,c)});let v=e.querySelector(`#btn-skip-to-finish`);v&&(v.onclick=()=>{s.playChequeredFlag(),t.autoPlayTimer&&clearInterval(t.autoPlayTimer),t.isAutoPlaying=!1,y.fastForwardToEnd(t.raceState,t.playerTactics,o.discipline),l.show(`🏁 Bandiera a scacchi! Il Gran Premio si è concluso.`,`success`),this.renderRaceSession(e,t,n,r,i,a,o,c)}),e.querySelectorAll(`#pace-mode-group .tactic-btn`).forEach(l=>{l.onclick=()=>{s.playClick(),t.playerTactics.paceMode=l.dataset.pace,this.renderRaceSession(e,t,n,r,i,a,o,c)}});let b=e.querySelector(`#btn-call-box-action`);b&&(b.onclick=()=>{s.playRadioBeep(),t.playerTactics.boxThisLap=!t.playerTactics.boxThisLap,this.renderRaceSession(e,t,n,r,i,a,o,c)});let x=e.querySelector(`#select-pit-tyre`);x&&(x.onchange=e=>{t.playerTactics.newCompound=e.target.value});let S=e.querySelector(`#btn-proceed-podium`);S&&(S.onclick=()=>{s.playChequeredFlag(),t.currentSessionIndex++,c()})}static startRaceAutoPlay(e,t,n,r,i,a,o,c){t.autoPlayTimer&&clearInterval(t.autoPlayTimer);let l={1:600,2:300,5:120,10:60}[t.simulationSpeed]||400;t.autoPlayTimer=setInterval(()=>{if(t.raceState.finished){clearInterval(t.autoPlayTimer),t.autoPlayTimer=null,t.isAutoPlaying=!1,s.playChequeredFlag(),this.renderRaceSession(e,t,n,r,i,a,o,c);return}y.stepRaceLap(t.raceState,t.playerTactics,o.discipline),t.playerTactics.boxThisLap=!1,this.renderRaceSession(e,t,n,r,i,a,o,c)},l)}static renderPodiumSession(e,t,n,r,i){let a=t.raceState,c=a.drivers.find(e=>e.isPlayer),l=c?c.currentPos:10,d=l===1,f=l<=3,p=l<=10,m=o.recordGrandPrixResults(t.qualifyingState?.grid||t.qualifyingGrid,a)?.earnedSkillPoints||o.career.lastWeekendRecap?.earnedSkillPoints||1,h=a.drivers.filter(e=>e.status!==`DNF`).slice(0,3);e.innerHTML=`
      <div class="weekend-stage-wrapper podium-stage">
        <div class="podium-hero-card ${d?`gold-celebration`:``}">
          <span class="podium-trophy">${d?`🏆`:f?`🍾`:`🏁`}</span>
          <h2 class="podium-title">
            ${d?`VITTORIA ASSOLUTA NEL GRAN PREMIO!`:f?`PODIO CONQUISTATO!`:`GRAN PREMIO CONCLUSO IN P${l}`}
          </h2>
          <p class="podium-sub">
            ${n.flag} Gran Premio di ${n.displayName} • ${n.country}
          </p>

          <!-- PODIO A 3 GRADINI -->
          <div class="podium-3d-display">
            <!-- P2 -->
            <div class="podium-step-column p2">
              <div class="podium-pilot-info">
                <span class="podium-pos-badge">P2</span>
                <strong>${h[1]?.name||`Pilota P2`}</strong>
                <small>${h[1]?.teamName||``}</small>
              </div>
              <div class="podium-pillar p2-pillar">2</div>
            </div>

            <!-- P1 -->
            <div class="podium-step-column p1">
              <div class="podium-pilot-info">
                <span class="podium-pos-badge gold">P1 👑</span>
                <strong>${h[0]?.name||`Pilota P1`}</strong>
                <small>${h[0]?.teamName||``}</small>
              </div>
              <div class="podium-pillar p1-pillar">1</div>
            </div>

            <!-- P3 -->
            <div class="podium-step-column p3">
              <div class="podium-pilot-info">
                <span class="podium-pos-badge bronze">P3</span>
                <strong>${h[2]?.name||`Pilota P3`}</strong>
                <small>${h[2]?.teamName||``}</small>
              </div>
              <div class="podium-pillar p3-pillar">3</div>
            </div>
          </div>

          <!-- RIEPILOGO PUNTI & GUADAGNI -->
          <div class="podium-points-award-card">
            <div class="points-bubble">
              <span class="lbl">PUNTI MONDIALE</span>
              <strong class="val">+${y.calculatePoints(l,!1)} pts</strong>
            </div>
            <div class="points-bubble">
              <span class="lbl">PREMIO GARA & STIPENDIO</span>
              <strong class="val money">+€${((o.career.contract?.salaryPerRace||5e3)+(d?o.career.contract?.winBonus||1e4:f?Math.round((o.career.contract?.winBonus||1e4)*.4):0)).toLocaleString()}</strong>
            </div>
            <div class="points-bubble">
              <span class="lbl">PUNTI SUPERRICENZA</span>
              <strong class="val license">+${f?5:p?2:1} Pts</strong>
            </div>
            <div class="points-bubble skill-award-bubble">
              <span class="lbl">SVILUPPO PILOTA</span>
              <strong class="val skill-val">+${m} Punti Abilità ⭐</strong>
            </div>
          </div>

          <div class="podium-action-bar">
            <button id="btn-conclude-weekend" class="start-race-button pulse-glow">
              <span>${(o.player?.unspentSkillPoints||0)>0?`ASSEGNA PUNTI ABILITÀ (${o.player.unspentSkillPoints} Disp.) ➔`:`RITORNA AL PADDOCK HUB ➔`}</span>
            </button>
          </div>
        </div>
      </div>
    `;let g=e.querySelector(`#btn-conclude-weekend`);g&&(g.onclick=()=>{s.playClick(),(o.player?.unspentSkillPoints||0)>0?u.open({isPostWeekend:!0,onConfirm:()=>i(),onClose:()=>i()}):i()})}},x=class{static render(e,t){let n=o.player,i=o.career,a=o.getPlayerTeam()||r.getTeam(i.currentTeamId,n.discipline),c=a?.displayName||a?.realName||a?.fictionalName||a?.name||`Scuderia`,u=a?.color||`#e10600`,d=r.getSeriesName(i.currentCategory,n.discipline),f=i.contractOffers||o.generateContractOffers(),p=i.contract||{yearsLeft:1,durationYears:1,buyoutClause:0},m=(p.yearsLeft||0)>0,h=m&&p.buyoutClause||0,g={};f.forEach((e,t)=>{g[t]=1});let _=()=>{e.innerHTML=`
        <div class="market-view-wrapper">
          <div class="weekend-top-header">
            <span class="session-badge">PADDOCK & TRATTATIVE</span>
            <h2>Mercato Piloti & Contratti Ufficiali</h2>
            <p class="header-sub">Gestisci il tuo ingaggio, valuta le proposte delle scuderie e scala le categorie del motorsport mondiale.</p>
          </div>

          <div class="market-grid-layout">
            <!-- Card Contratto Attuale -->
            <div class="dash-card current-contract-card">
              <div class="card-title-row">
                <h3 class="card-title">Il Tuo Contratto Attuale</h3>
                <div class="team-identity-badge">
                  <span class="team-badge-bullet" style="background:${u}; box-shadow: 0 0 8px ${u}"></span>
                  <span class="team-badge-name">${c}</span>
                </div>
              </div>

              <div class="contract-details-grid">
                <div class="contract-stat-item">
                  <span class="c-label">Campionato</span>
                  <strong class="c-val">${d}</strong>
                </div>

                <div class="contract-stat-item">
                  <span class="c-label">Ruolo nel Team</span>
                  <strong class="c-val highlight-role">${p.role||`Prima Guida`}</strong>
                </div>

                <div class="contract-stat-item">
                  <span class="c-label">Stipendio per Gara</span>
                  <strong class="c-val money">€${(p.salaryPerRace||5e3).toLocaleString()}</strong>
                </div>

                <div class="contract-stat-item">
                  <span class="c-label">Bonus Vittoria</span>
                  <strong class="c-val bonus">€${(p.winBonus||1e4).toLocaleString()}</strong>
                </div>

                <div class="contract-stat-item">
                  <span class="c-label">Fondi Disponibili</span>
                  <strong class="c-val money">€${i.money.toLocaleString()}</strong>
                </div>

                <div class="contract-stat-item">
                  <span class="c-label">Durata Contratto</span>
                  <strong class="c-val ${m?`gold-text`:``}">
                    ${m?`${p.yearsLeft} Anno/i rimanenti (di ${p.durationYears||1})`:`Scaduto (Free Agent)`}
                  </strong>
                </div>
              </div>

              <!-- Banner di Stato Contrattuale -->
              <div class="contract-alert-banner ${m?`under-contract`:`free-agent`}">
                ${m?`
                  <span class="alert-icon">🔒</span>
                  <div>
                    <strong>CONTRATTO IN CORSO (${p.yearsLeft} Anno/i Rimanenti)</strong>
                    <p>Sei vincolato contrattualmente con <strong>${c}</strong>. Se intendi trasferirti in un'altra scuderia prima della scadenza dovrai corrispondere una <strong>penale di rescissione di €${h.toLocaleString()}</strong>.</p>
                  </div>
                `:`
                  <span class="alert-icon">✨</span>
                  <div>
                    <strong>PILOTA LIBERO SUL MERCATO (FREE AGENT)</strong>
                    <p>Il tuo contratto è giunto al termine. Puoi rinnovare o firmare con qualsiasi nuova scuderia a costo zero (€0 penale di rescissione).</p>
                  </div>
                `}
              </div>
            </div>

            <!-- Offerte di Mercato Ricevute -->
            <div class="dash-card offers-card">
              <h3 class="card-title">Offerte sul Tavolo delle Trattative</h3>
              <p class="section-subtext">Scegli tra accordo annuale o biennale (con stipendio maggiorato e clausola rescissoria).</p>

              <div class="offers-list-container">
                ${f.map((e,t)=>{let n=g[t]||1,r=n===2?e.salaryPerRace2yr:e.salaryPerRace1yr,a=e.teamId!==i.currentTeamId&&m&&h>0,o=i.money>=h,s=!a||o;return`
                    <div class="offer-item-card ${e.isPromotion?`promotion-offer`:``} ${e.isRenewal?`renewal-offer`:``}">
                      <div class="offer-header">
                        <div class="offer-team-title">
                          <span class="team-badge-bullet" style="background:${e.color||`#888`}; box-shadow: 0 0 8px ${e.color||`#888`}"></span>
                          <div>
                            <strong>${e.teamName||`Scuderia`}</strong>
                            <small class="cat-subtitle">${e.categoryName||``} • Competitività Mezzo: ${e.carPace||75}/99</small>
                          </div>
                        </div>
                        ${e.isPromotion?`<span class="promo-badge">PROMOZIONE DI CATEGORIA 🚀</span>`:e.isRenewal?`<span class="renewal-badge">PROPOSTA DI RINNOVO 📄</span>`:`<span class="rival-badge">OFFERTA TEAM RIVALE ⚔️</span>`}
                      </div>

                      <!-- Selettore Durata Contratto -->
                      <div class="contract-duration-selector">
                        <span class="selector-lbl">DURATA ACCORDO:</span>
                        <div class="duration-btn-group">
                          <button class="duration-pill ${n===1?`active`:``}" data-idx="${t}" data-dur="1">
                            1 Anno
                          </button>
                          <button class="duration-pill ${n===2?`active`:``}" data-idx="${t}" data-dur="2">
                            2 Anni (+15% Stipendio ⭐)
                          </button>
                        </div>
                      </div>

                      <div class="offer-financials">
                        <div class="fin-col">
                          <span>Stipendio a Gara</span>
                          <strong class="salary-val">€${r.toLocaleString()}</strong>
                        </div>
                        <div class="fin-col">
                          <span>Bonus Vittoria</span>
                          <strong>€${e.winBonus.toLocaleString()}</strong>
                        </div>
                        <div class="fin-col">
                          <span>Ruolo</span>
                          <strong class="role-text">${e.role}</strong>
                        </div>
                        <div class="fin-col">
                          <span>Clausola Rescissione</span>
                          <strong class="${n===2?`buyout-tag`:``}">
                            ${n===2?`€${e.buyoutClause2yr.toLocaleString()}`:`Nessuna (€0)`}
                          </strong>
                        </div>
                      </div>

                      ${a?`
                        <div class="offer-buyout-warning ${o?``:`danger`}">
                          <span>⚠️ Rescissione vecchio contratto: <strong>€${h.toLocaleString()}</strong></span>
                          ${o?``:`<small class="not-enough-funds">Fondi insufficienti (Mancano €${(h-i.money).toLocaleString()})</small>`}
                        </div>
                      `:``}

                      <div class="offer-action-row">
                        <button class="accept-offer-btn ${s?``:`disabled`}" data-idx="${t}" ${s?``:`disabled`}>
                          <span>${e.isRenewal?`RINNOVA ACCORDO UFFICIALE ✍️`:a?`PAGA PENALE (€${h.toLocaleString()}) E FIRMA ✍️`:`FIRMA ACCORDO UFFICIALE ✍️`}</span>
                        </button>
                      </div>
                    </div>
                  `}).join(``)}
              </div>
            </div>
          </div>

          <div class="finish-weekend-action-bar">
            <button id="btn-return-from-market" class="start-race-button">
              <span>RITORNA ALLA DASHBOARD ➔</span>
            </button>
          </div>
        </div>
      `,e.querySelectorAll(`.duration-pill`).forEach(e=>{e.onclick=()=>{s.playClick();let t=parseInt(e.dataset.idx,10),n=parseInt(e.dataset.dur,10);g[t]=n,_()}}),e.querySelectorAll(`.accept-offer-btn`).forEach(e=>{e.onclick=()=>{let n=parseInt(e.dataset.idx,10),r=f[n],a=g[n]||1,c=a===2?r.salaryPerRace2yr:r.salaryPerRace1yr,u=r.teamId!==i.currentTeamId&&m&&h>0,d=`Confermi l'accordo di ${a} anno/i con ${r.teamName} (${r.categoryName}) con stipendio di €${c.toLocaleString()} a Gran Premio?`;u&&(d+=`\n\n⚠️ RESCISSIONE ANTICIPATA: Verrà addebitata la penale di rescissione di €${h.toLocaleString()} dal tuo saldo personale.`),l.confirm({title:u?`Rescissione e Firma Nuovo Contratto`:`Firma Contratto Ufficiale`,message:d,confirmText:u?`Paga €${h.toLocaleString()} e Firma ✍️`:`Firma Contratto ✍️`,cancelText:`Valuta Ancora`,danger:u,onConfirm:()=>{let e=o.acceptContract(r,a);e.success?(s.playChequeredFlag(),l.show(`🤝 Congratulazioni! Hai firmato ufficialmente con ${r.teamName}! ${e.paidBuyout>0?`Pagata clausola di €${e.paidBuyout.toLocaleString()}.`:``}`,`success`),window.dispatchEvent(new CustomEvent(`career-data-updated`)),t(`dashboard`)):l.show(e.reason||`Errore nella stipula del contratto.`,`danger`)}})}});let n=e.querySelector(`#btn-return-from-market`);n&&(n.onclick=()=>{s.playClick(),t(`dashboard`)})};_()}},S=class e{static render(t,n){let i=o.player,a=o.career,c=a.hqUpgrades||{simulatorLevel:0,gymLevel:0,prAgencyLevel:0,telemetryCoachLevel:0},u=[{id:`supercar`,name:i.discipline===`auto`?r.isRealNames?`Supercar Ferrari SF90 Stradale`:`Supercar Cavallino SF90`:r.isRealNames?`Ducati Panigale V4 SP2`:`Bologna Desmo V4 SP2`,price:22e4,fameBonus:5,icon:`🏎️`,desc:`Bolide stradale da sfoggiare nel paddock dei Gran Premi.`},{id:`villa_monaco`,name:`Attico Panoramico a Monte Carlo`,price:15e5,fameBonus:15,icon:`🏰`,desc:`Residenza fiscale con vista mozzafiato sul circuito e sul porto di Monaco.`},{id:`private_jet`,name:`Jet Privato Bombardier con Livrea Personale`,price:35e5,fameBonus:25,icon:`✈️`,desc:`Spostamenti transcontinentali tra una gara e l'altra senza jet-lag.`},{id:`kart_team`,name:`Scuderia Personale Karting / Minimoto`,price:65e4,fameBonus:10,icon:`🏆`,desc:`Finanzia e allena i campioni del domani per costruire la tua dinastia.`}];t.innerHTML=`
      <div class="lifestyle-view-wrapper">
        <div class="weekend-top-header">
          <span class="session-badge">VITA DA PILOTA & INVESTIMENTI</span>
          <h2>Headquarters, Allenamento & Lifestyle</h2>
          <p class="header-sub">Investi i tuoi milioni in strutture all'avanguardia per migliorare le prestazioni e scalare la notorietà mondiale.</p>
        </div>

        <div class="lifestyle-grid-layout">
          <!-- Strutture HQ & Performance -->
          <div class="dash-card hq-upgrades-card">
            <h3 class="card-title">Strutture di Allenamento Personali (HQ)</h3>
            <p class="section-subtext">Aumentano l'efficacia dei tuoi allenamenti tra un Gran Premio e l'altro.</p>

            <div class="hq-items-list">
              ${this.renderHqItem(`simulatorLevel`,`Simulatore Dinamico Professionale`,`Migliora l'acquisizione di ritmo e passo sul giro secco.`,c.simulatorLevel,4e4,`🖥️`)}
              ${this.renderHqItem(`gymLevel`,`Palestra & Fisioterapista Personale`,`Aumenta la resistenza fisica e la concentrazione negli ultimi giri.`,c.gymLevel,3e4,`🏋️`)}
              ${this.renderHqItem(`prAgencyLevel`,`Agenzia di PR & Comunicazione`,`Incrementa la popolarità mediatica e attrae sponsor milionari.`,c.prAgencyLevel,5e4,`📱`)}
              ${this.renderHqItem(`telemetryCoachLevel`,`Ingegnere Telemetrista Dedicato`,`Ottimizza il feedback per trovare l'assetto perfetto nelle libere.`,c.telemetryCoachLevel,45e3,`📈`)}
            </div>
          </div>

          <!-- Lusso & Sfizi da Campione -->
          <div class="dash-card luxury-purchases-card">
            <h3 class="card-title">Stile di Vita & Status da Celebrità</h3>
            <p class="section-subtext">Oggetti di lusso che testimoniano il tuo status da superstar globale del motorsport.</p>

            <div class="luxury-items-grid">
              ${u.map(e=>{let t=a.lifestyleItems?.some(t=>t.id===e.id);return`
                  <div class="luxury-item-card ${t?`owned`:``}">
                    <div class="luxury-icon">${e.icon}</div>
                    <div class="luxury-info">
                      <strong>${e.name}</strong>
                      <span class="luxury-desc">${e.desc}</span>
                      <div class="luxury-meta">
                        <span class="fame-tag">+${e.fameBonus} Popolarità</span>
                        <span class="price-tag">€${e.price.toLocaleString()}</span>
                      </div>
                    </div>
                    <div class="luxury-action">
                      ${t?`
                        <span class="owned-badge">POSSEDUTO ✅</span>
                      `:`
                        <button class="buy-luxury-btn" data-item='${JSON.stringify(e)}'>
                          ACQUISTA
                        </button>
                      `}
                    </div>
                  </div>
                `}).join(``)}
            </div>
          </div>
        </div>

        <div class="finish-weekend-action-bar">
          <button id="btn-return-from-lifestyle" class="start-race-button">
            <span>RITORNA ALLA DASHBOARD ➔</span>
          </button>
        </div>
      </div>
    `,t.querySelectorAll(`.buy-hq-btn`).forEach(r=>{r.onclick=()=>{let i=r.dataset.type,a=o.buyHqUpgrade(i);a.success?(s.playClick(),l.show(`🏛️ Struttura HQ potenziata con successo!`,`success`),e.render(t,n)):l.show(`⚠️ ${a.message}`,`warning`)}}),t.querySelectorAll(`.buy-luxury-btn`).forEach(r=>{r.onclick=()=>{let i=JSON.parse(r.dataset.item),a=o.buyLifestyleItem(i);a.success?(s.playChequeredFlag(),l.show(`🎉 Acquisto completato: ${i.name}!`,`success`),e.render(t,n)):l.show(`⚠️ ${a.message}`,`warning`)}});let d=t.querySelector(`#btn-return-from-lifestyle`);d&&(d.onclick=()=>{s.playClick(),n(`dashboard`)})}static renderHqItem(e,t,n,r,i,a){let o=i*(r+1),s=r>=5;return`
      <div class="hq-item-row" data-key="${e}">
        <div class="hq-icon-box">${a}</div>
        <div class="hq-info-box">
          <strong>${t} <small class="level-tag">Lvl ${r}/5</small></strong>
          <span class="hq-desc">${n}</span>
          <div class="dept-progress-bar">
            <div class="dept-fill" style="width:${r/5*100}%"></div>
          </div>
        </div>
        <div class="hq-action-box">
          ${s?`
            <span class="max-badge">MAX</span>
          `:`
            <button class="buy-hq-btn" data-type="${e}">
              <span>Potenzia</span>
              <small>€${o.toLocaleString()}</small>
            </button>
          `}
        </div>
      </div>
    `}},C=class e{static render(t,n){let r=o.player,a=o.career,c=a.stats,u=i.calculateScore(r,c),d=i.getTitleAndTier(u),f=i.getHallOfFameRanking(u,r,c);t.innerHTML=`
      <div class="goat-view-wrapper">
        <div class="goat-hero-banner">
          <div class="crown-glow-badge">👑 MOTORSPORT GOAT INDEX</div>
          <h1 class="goat-hero-title">${d.title}</h1>
          <p class="goat-hero-desc">${d.desc}</p>
          
          <div class="goat-score-meter-box">
            <span class="meter-label">IL TUO PUNTEGGIO LEGACY GOAT</span>
            <strong class="meter-score-glow">${u}</strong>
            <span class="meter-rank">Posizione Storica Mondiale: #${f.playerRank} di ${f.totalDrivers}</span>
          </div>
        </div>

        <div class="goat-main-grid">
          <!-- Scomposizione Punti Legacy -->
          <div class="dash-card goat-breakdown-card">
            <h3 class="card-title">Dettaglio Punteggio GOAT</h3>
            <p class="section-subtext">Come è calcolata la tua grandezza rispetto ai canoni storici del motorsport.</p>

            <div class="breakdown-list">
              <div class="breakdown-item">
                <span>🏆 Titoli Mondiali (${c.worldTitles}x)</span>
                <strong>+${c.worldTitles*250} Punti</strong>
              </div>
              <div class="breakdown-item">
                <span>🥇 Vittorie nei Gran Premi (${c.wins}x)</span>
                <strong>+${c.wins*12} Punti</strong>
              </div>
              <div class="breakdown-item">
                <span>⏱️ Pole Position Ufficiali (${c.poles}x)</span>
                <strong>+${c.poles*6} Punti</strong>
              </div>
              <div class="breakdown-item">
                <span>🍾 Piazzamenti a Podio (${c.podiums}x)</span>
                <strong>+${c.podiums*4} Punti</strong>
              </div>
              <div class="breakdown-item">
                <span>🏁 Gare Disputate & Longevità (${c.racesStarted} GP)</span>
                <strong>+${Math.min(100,Math.floor(c.racesStarted*.4))} Punti</strong>
              </div>
              <div class="breakdown-item">
                <span>⚔️ Stagioni sopra il Compagno di Squadra (${c.teammateBeatenCount||0}x)</span>
                <strong>+${(c.teammateBeatenCount||0)*15} Punti</strong>
              </div>
              <div class="breakdown-item">
                <span>⭐ Picco di Valutazione Raggiunto (${c.peakOvr||r.ovr} OVR)</span>
                <strong>+${c.peakOvr>=95?100:c.peakOvr>=90?60:30} Punti</strong>
              </div>
            </div>

            ${a.isRetired?`
              <div class="retired-badge-box">
                <span class="retired-stamp">PILOTA UFFICIALMENTE RITIRATO</span>
              </div>
            `:`
              <div class="retire-action-box">
                <button id="btn-retire-career" class="retire-button danger">
                  <span>ANNUNCIA IL RITIRO DALLE CORSE 🏁</span>
                  <small>Sigilla per sempre le tue statistiche e ritirati da leggenda</small>
                </button>
              </div>
            `}
          </div>

          <!-- Classifica All-Time Hall of Fame -->
          <div class="dash-card hall-of-fame-card">
            <h3 class="card-title">Classifica Storica dei Mostri Sacri</h3>
            <p class="section-subtext">Confronto con le leggende di tutti i tempi dell'Automobilismo e del Motociclismo.</p>

            <div class="hall-table-wrapper">
              <table class="motorsport-table compact">
                <thead>
                  <tr>
                    <th>RANK</th>
                    <th>PILOTA / LEGGENDARIO</th>
                    <th>ERA</th>
                    <th>TITOLI</th>
                    <th>VITTORIE</th>
                    <th class="text-right">GOAT SCORE</th>
                  </tr>
                </thead>
                <tbody>
                  ${f.ranking.map((e,t)=>`
                    <tr class="${e.isPlayer?`player-hall-row`:``}">
                      <td class="pos-cell"><span class="badge pos-${t+1}">${t+1}</span></td>
                      <td class="pilot-cell">
                        <strong>${e.name}</strong>
                        ${e.isPlayer?`<span class="you-tag">TU</span>`:``}
                      </td>
                      <td><small>${e.era}</small></td>
                      <td>🏆 ${e.titles}</td>
                      <td>🥇 ${e.wins}</td>
                      <td class="points-cell text-right"><strong>${e.goatScore}</strong></td>
                    </tr>
                  `).join(``)}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="finish-weekend-action-bar">
          <button id="btn-return-from-goat" class="start-race-button">
            <span>RITORNA ALLA DASHBOARD ➔</span>
          </button>
        </div>
      </div>
    `;let p=t.querySelector(`#btn-retire-career`);p&&(p.onclick=()=>{l.confirm({title:`Ritiro Definitivo dalle Corse`,message:`Vuoi davvero annunciare il tuo ritiro ufficiale dalle corse? La tua leggenda e le tue statistiche saranno sigillate per sempre nella GOAT Hall of Fame.`,confirmText:`Annuncia Ritiro 🏁`,cancelText:`Continua a Correre`,danger:!0,onConfirm:()=>{s.playChequeredFlag(),o.retire(),l.show(`Hai ufficializzato il tuo ritiro dalle corse.`,`info`),e.render(t,n)}})});let m=t.querySelector(`#btn-return-from-goat`);m&&(m.onclick=()=>{s.playClick(),n(`dashboard`)})}},w=class{static open(e){let t=document.createElement(`div`);t.className=`modal-backdrop-overlay`,t.id=`mod-manager-modal`,t.innerHTML=`
      <div class="modal-card-dialog">
        <div class="modal-dialog-header">
          <div class="modal-header-text">
            <span class="modal-pill-badge">⚙️ IMPOSTAZIONI & DATABASE NOMI</span>
            <h3>Opzioni Nomi (Fittizi / Reali 2026) & File Personalizzati</h3>
          </div>
          <button id="btn-close-modal" class="modal-close-icon">✕</button>
        </div>

        <div class="modal-dialog-body">
          <p class="modal-intro-text">
            Come in <em>ilnuovogoat.it</em>, il gioco include divertenti nomi parodistici e fittizi.
            Puoi selezionare la modalità desiderata: passa ai <strong>Nomi Reali Ufficiali di Settembre 2026</strong> oppure importa/esporta un tuo file JSON personalizzato.
          </p>

          <div class="modal-toggle-card">
            <div class="toggle-info">
              <strong>Modalità Attuale: <span id="current-mode-label" class="highlight-mode">${r.isRealNames?`🏁 Nomi Reali Ufficiali (2026)`:`🎭 Nomi Fittizi / Parodistici`}</span></strong>
              <small>L'aggiornamento ha effetto immediato su tutte le classifiche, griglie e piloti.</small>
            </div>
            <button id="btn-modal-toggle-names" class="btn-toggle-switch ${r.isRealNames?`active`:``}">
              ${r.isRealNames?`ATTIVI: REALI 2026`:`ATTIVI: FITTIZI`}
            </button>
          </div>

          <div class="modal-actions-grid">
            <!-- Scarica File JSON Ufficiale -->
            <div class="modal-action-box">
              <span class="box-icon">📥</span>
              <div class="box-desc">
                <strong>Scarica File Nomi Reali</strong>
                <small>Ottieni il file <code>motorsport_real_names.json</code> completo e modificabile.</small>
              </div>
              <button id="btn-download-json" class="btn-secondary-action">
                SCARICA JSON
              </button>
            </div>

            <!-- Importa File JSON Personalizzato -->
            <div class="modal-action-box">
              <span class="box-icon">📤</span>
              <div class="box-desc">
                <strong>Importa File JSON Personalizzato</strong>
                <small>Carica un file JSON con i tuoi nomi, scuderie e piloti personalizzati.</small>
              </div>
              <label class="btn-secondary-action upload-label">
                <span>CARICA JSON</span>
                <input type="file" id="input-upload-json" accept=".json" style="display:none;">
              </label>
            </div>
          </div>

          <div class="modal-reset-area">
            <button id="btn-reset-db" class="btn-link-danger">Ripristina Database ai Valori Predefiniti</button>
          </div>
        </div>
      </div>
    `,document.body.appendChild(t);let n=t.querySelector(`#btn-close-modal`);n.onclick=()=>{s.playClick(),t.remove(),e&&e()};let i=t.querySelector(`#btn-modal-toggle-names`);i&&(i.onclick=e=>{e.stopPropagation(),s.playClick();let n=r.toggleRealNames();i.className=`btn-toggle-switch ${n?`active`:``}`,i.textContent=n?`ATTIVI: REALI 2026`:`ATTIVI: FITTIZI`;let a=t.querySelector(`#current-mode-label`);a&&(a.textContent=n?`🏁 Nomi Reali Ufficiali (2026)`:`🎭 Nomi Fittizi / Parodistici`),l.show(n?`🏁 Database impostato sui Nomi Reali Ufficiali 2026!`:`🎭 Database impostato sui Nomi Fittizi / Parodia!`,`success`)});let a=t.querySelector(`.modal-toggle-card`);a&&i&&(a.style.cursor=`pointer`,a.onclick=()=>{i.click()});let o=t.querySelector(`#btn-download-json`);o.onclick=async()=>{s.playClick();try{let e=await(await fetch(`/motorsport_real_names.json`)).text(),t=new Blob([e],{type:`application/json`}),n=URL.createObjectURL(t),r=document.createElement(`a`);r.href=n,r.download=`motorsport_real_names.json`,document.body.appendChild(r),r.click(),r.remove(),URL.revokeObjectURL(n)}catch{let e=r.exportDatabaseJson(),t=new Blob([e],{type:`application/json`}),n=URL.createObjectURL(t),i=document.createElement(`a`);i.href=n,i.download=`motorsport_names.json`,document.body.appendChild(i),i.click(),i.remove(),URL.revokeObjectURL(n)}};let c=t.querySelector(`#input-upload-json`);c.onchange=n=>{let i=n.target.files[0];if(!i)return;let a=new FileReader;a.onload=n=>{let i=r.importCustomJson(n.target.result);l.show(i.message,i.success?`success`:`danger`),i.success&&(t.remove(),e&&e())},a.readAsText(i)};let u=t.querySelector(`#btn-reset-db`);u.onclick=()=>{l.confirm({title:`Ripristinare Database?`,message:`Vuoi davvero ripristinare i dati ai valori predefiniti? Tutte le modifiche personalizzate verranno sovrascritte.`,confirmText:`Ripristina Database`,cancelText:`Annulla`,danger:!0,onConfirm:()=>{s.playClick(),r.resetToDefault(),l.show(`Database ripristinato con successo ai valori 2026 predefiniti.`,`info`),t.remove(),e&&e()}})}}},T=class{constructor(){this.headerContainer=document.getElementById(`app-header`),this.mainContainer=document.getElementById(`app-main-content`),this.currentRoute=`landing`,r.onModeChange(()=>{this.render()}),window.addEventListener(`career-data-updated`,()=>{this.render()})}init(){this.navigate(`landing`)}navigate(e){this.currentRoute=e,this.render(),window.scrollTo({top:0,behavior:`smooth`})}openModManager(){w.open(()=>{this.render()})}render(){switch(!o.hasActiveCareer()&&this.currentRoute!==`landing`&&this.currentRoute!==`creation`&&(this.currentRoute=`landing`),d.render(this.headerContainer,this.currentRoute,e=>this.navigate(e),()=>this.openModManager()),this.currentRoute){case`landing`:f.render(this.mainContainer,e=>this.navigate(e),()=>this.openModManager());break;case`creation`:p.render(this.mainContainer,()=>{this.navigate(`dashboard`)});break;case`dashboard`:h.render(this.mainContainer,e=>{this.navigate(e)});break;case`calendar`:g.render(this.mainContainer,e=>{this.navigate(e)});break;case`standings`:_.render(this.mainContainer,e=>{this.navigate(e)});break;case`rd`:v.render(this.mainContainer,e=>{this.navigate(e)});break;case`weekend`:b.render(this.mainContainer,()=>{this.navigate(`dashboard`)});break;case`market`:x.render(this.mainContainer,e=>{this.navigate(e)});break;case`lifestyle`:S.render(this.mainContainer,e=>{this.navigate(e)});break;case`goat`:C.render(this.mainContainer,e=>{this.navigate(e)});break;default:f.render(this.mainContainer,e=>this.navigate(e),()=>this.openModManager())}}};document.addEventListener(`DOMContentLoaded`,()=>{new T().init()});
CREATE POLICY "Admins can read contact requests" ON public.contact_requests FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

INSERT INTO public.site_content (key, value) VALUES
('seo.shared', '### Nachhaltige Quartiers- und Gebäudekonzepte: Energieeffizienz & zukunftsfähige Mobilität im Verbund gedacht

Ein Nichtwohngebäude ist weit mehr als die Summe seiner Quadratmeter – es ist ein lebendiger Teil unserer gebauten Umwelt. Als Ihr Ingenieurbüro mit Sitz in Münster begleiten wir Kommunen, Betriebe und Architekten im östlichen Münsterland, dem westlichen Ostwestfalen sowie im südlichen Osnabrücker Land auf dem Weg zu zukunftsfähigen Immobilien. Unser Anspruch ist so einfach wie wirkungsvoll: Gemeinsam zur Lösung. Wir begegnen Ihnen auf Augenhöhe – sachlich kompetent, behördengerecht und spürbar partnerschaftlich.

Unser einzigartiger USP liegt in der konsequenten Verknüpfung von Energieeffizienz und moderner Mobilitätsinfrastruktur. Wir betrachten die Immobilie im Verbund mit ihrem Umfeld. Durch eine präzise Analyse der Gebäudenutzer ermitteln wir den exakten, bedarfsgerechten Bedarf, um den Modal Split nachhaltig zugunsten umweltfreundlicher Verkehrsträger zu verschieben. Wir planen fußgängerfreundliche Wege, sichere Fahrradinfrastruktur und separate, verkehrsberuhigte Fahrbahnen, die vorzugsweise für die E-Mobilität optimiert sind – perfekt abgestimmt auf die Richtlinien von Elektromobilität.NRW.

Gleichzeitig steigern wir den Gesamtwert und die Resilienz Ihrer Immobilie durch messbaren Mehrwert für Mensch und Natur. Wir schaffen Lebensqualität durch effektive Lärmminderung und Emissionsreduktion. Durch die gezielte Entsiegelung von Parkflächen und mehr Grün in der Fläche bringen wir Biodiversität zurück und sorgen für eine natürliche Gebäudekühlung durch Schatten. Bei der Realisierung von Dach- und Fassadenbegrünungen stehen wir Ihnen beratend zur Seite und sichern Ihnen die passenden Zuschüsse.

Wir navigieren Sie sicher durch den Dschungel gesetzlicher Vorgaben und Zertifizierungen. Ob es um die Erfüllung des GEIG, Energieaudits nach DIN EN ISO 50001 oder DIN 16247 geht – wir konzipieren Ihr Vorhaben förderoptimiert nach den Richtlinien von KfW, BAFA und dena. Überregional bringen wir unsere tiefgehende Mobilitätsexpertise zudem in anspruchsvolle Gebäudezertifizierungen nach DGNB, BREEAM, QNG oder LEED ein. Effizienz, Nachhaltigkeit und Lebensqualität entstehen bei uns im Verbund – für Immobilien, die heute schon die Standards von morgen erfüllen.'),
('home.hero.eyebrow', 'Ingenieurbüro aus Münster'),
('home.hero.title', 'Mobilität und Energie.'),
('home.hero.title.accent', 'Zusammen gedacht.'),
('home.hero.text', 'Unabhängige Planung und Beratung für zukunftsfähige Gebäude, Betriebe und Quartiere.'),
('home.cta.title', 'Lassen Sie uns früh ins Gespräch kommen.'),
('about.person.name', 'Marcel Stüer'),
('about.person.role', 'Gründer & Ingenieur')
ON CONFLICT (key) DO NOTHING;

INSERT INTO public.site_images (key, url, gray_filter, dim_filter) VALUES
('home.hero', NULL, false, true),
('home.mobility', NULL, true, false),
('home.energy', NULL, true, false),
('about.portrait', NULL, false, false)
ON CONFLICT (key) DO NOTHING;
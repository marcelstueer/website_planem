# Logo-Wasserzeichen für Bilder

## Umsetzung
- Bild-Einstellungen um einen unabhängigen Schalter „Logo-Overlay anzeigen“ erweitern und dauerhaft speichern.
- Das Planem-Logo oben rechts mit angemessenem Abstand, dezenter hinterlegter Fläche und Schatten darstellen.
- Bei Anthrazit automatisch eine helle Logo-Variante verwenden; bei Grau, Transparent und ohne Filter die Markenfarben behalten.
- Dieselbe Darstellung in der Live-Vorschau der Redaktion und auf allen betroffenen Seiten verwenden.
- Bestehende Filter, Piktogramme und KI-Kennzeichnungen unverändert kombinierbar lassen.

## Technische Details
- Das vorhandene SVG-Logo wird wiederverwendet; es entsteht kein zusätzliches Bild.
- Die Einstellung wird als boolesches Feld beim jeweiligen Bildplatz gespeichert und dynamisch geladen.
- Darstellung und Vorschau teilen dieselbe Komponente, damit beide identisch bleiben.

## Prüfung
- Speicherung und erneutes Laden des Schalters prüfen.
- Darstellung mit allen Filtervarianten sowie ohne Filter kontrollieren.
- Mobile und Desktop-Größen sowie fehlerfreien Seitenaufbau prüfen.

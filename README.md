# Hurghada Drive – Website

Statische Website für die Autovermietung **Hurghada Drive** in Hurghada (Ägypten).
Sie braucht keinen Server, keine Datenbank und keine Programmierung. Die Dateien laufen auf jedem Webspace.

## Vor dem Veröffentlichen anpassen

1. **`js/config.js`**: WhatsApp-Nummer, Telefon, E-Mail, Adresse, Öffnungszeiten, Fahrzeuge, Preise, Extras und Übergabeorte.
   Die ganze Website übernimmt diese Werte automatisch.
2. **`impressum.html`, `datenschutz.html`, `agb.html`**: Alle gelb markierten Platzhalter ersetzen und die gelben Hinweisboxen entfernen.
3. **Domain**: Wenn deine Domain nicht `www.hurghada-drive.com` ist, ersetze sie in `index.html` (canonical, og:image, JSON-LD), `robots.txt` und `sitemap.xml`.
   Im JSON-LD-Block in `index.html` stehen außerdem Telefon und E-Mail. Die musst du dort auch ändern.

## Veröffentlichen (kostenlos)

**GitHub Pages:** Repository → *Settings* → *Pages* → Source: *Deploy from a branch*, Branch wählen, Ordner `/ (root)` → *Save*.
Nach etwa einer Minute ist die Seite unter `https://<benutzername>.github.io/Car-Rental/` erreichbar. Eine eigene Domain lässt sich dort ebenfalls eintragen.

**Netlify:** Auf app.netlify.com den Ordner per Drag & Drop hochladen und fertig.

## Funktionen

- Preisrechner mit Tages- und Wochenpreis, Extras und Zustellgebühren
- Anfrageformular: Die Anfrage öffnet sich als fertige Nachricht in WhatsApp oder im E-Mail-Programm
- Flotte, Übergabeorte, Voraussetzungen, FAQ, Kontakt
- Für Handys optimiert, SEO-Metadaten, strukturierte Daten (schema.org)
- DSGVO-freundlich: keine Cookies, kein Tracking, keine externen Schriften, Google Maps lädt erst nach Klick

## Dateien

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite |
| `js/config.js` | **Alle Firmendaten und Preise** |
| `js/main.js` | Preisrechner, Formular, Menü |
| `css/style.css` | Design |
| `impressum.html`, `datenschutz.html`, `agb.html` | Rechtstexte (Vorlagen) |
| `404.html` | Fehlerseite |
| `img/` | Logo/Favicon, Vorschaubild für Social Media |

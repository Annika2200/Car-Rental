# Hurghada Drive – Website

Statische Website für die Autovermietung **Hurghada Drive** in Hurghada (Ägypten).
Sie braucht keinen Server, keine Datenbank und keine Programmierung. Die Dateien laufen auf jedem Webspace.

## Vor dem Veröffentlichen anpassen

1. **`js/config.js`**: WhatsApp-Nummer, Telefon, E-Mail, Adresse, Öffnungszeiten, Fahrzeuge, Preise, Extras und Übergabeorte.
   Die ganze Website übernimmt diese Werte automatisch. Texte, die übersetzt werden, stehen dort als `{ de: "…", en: "…", ar: "…", ru: "…", fr: "…" }`.
2. **`impressum.html`, `datenschutz.html`, `agb.html`**: Alle gelb markierten Platzhalter ersetzen und die gelben Hinweisboxen entfernen.
3. **Domain**: Wenn deine Domain nicht `www.hurghada-drive.com` ist, ersetze sie in `index.html` (canonical, og:image, JSON-LD), `robots.txt` und `sitemap.xml`.
   Im JSON-LD-Block in `index.html` stehen außerdem Telefon und E-Mail. Die musst du dort auch ändern.

## Veröffentlichen (kostenlos)

**GitHub Pages:** Repository → *Settings* → *Pages* → Source: *Deploy from a branch*, Branch wählen, Ordner `/ (root)` → *Save*.
Nach etwa einer Minute ist die Seite unter `https://<benutzername>.github.io/Car-Rental/` erreichbar. Eine eigene Domain lässt sich dort ebenfalls eintragen.

**Netlify:** Auf app.netlify.com den Ordner per Drag & Drop hochladen und fertig.

## Sprachen

Die Startseite gibt es auf **Deutsch, Englisch, Arabisch, Russisch und Französisch**. Arabisch wird von rechts nach links angezeigt.

- Besucher wechseln die Sprache über den Umschalter oben rechts. Die Auswahl wird im Browser gespeichert.
- Beim ersten Besuch wird die Browsersprache erkannt. Wird sie nicht angeboten, erscheint die Seite auf Deutsch.
- Jede Sprache hat einen eigenen Link zum Teilen: `?lang=en`, `?lang=ar`, `?lang=ru`, `?lang=fr`.
- Die deutschen Texte stehen in `index.html`, alle Übersetzungen in **`js/i18n.js`**. Wenn du einen deutschen Text änderst, passe auch die Übersetzungen dort an.
- Anfragen per WhatsApp oder E-Mail kommen in der Sprache des Kunden an. Am Ende steht, welche Sprache er gewählt hat.
- Impressum, Datenschutz und Mietbedingungen gibt es nur auf Deutsch. Besucher, die eine andere Sprache gewählt haben, sehen dort einen entsprechenden Hinweis.

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
| `js/i18n.js` | **Übersetzungen** (EN, AR, RU, FR) |
| `js/main.js` | Preisrechner, Formular, Menü, Sprachumschaltung |
| `js/legal.js` | Sprachhinweis auf den Rechtsseiten |
| `css/style.css` | Design |
| `impressum.html`, `datenschutz.html`, `agb.html` | Rechtstexte (Vorlagen) |
| `404.html` | Fehlerseite |
| `img/` | Logo/Favicon, Vorschaubild für Social Media |

/* =========================================================
   HURGHADA DRIVE – ZENTRALE EINSTELLUNGEN
   ---------------------------------------------------------
   Hier trägst du deine echten Firmendaten und Preise ein.
   Alles auf der Website (Telefon, WhatsApp, E-Mail, Flotte,
   Preise) wird automatisch aus dieser Datei übernommen.
   ========================================================= */

window.SITE_CONFIG = {
  company: "Hurghada Drive",

  // WhatsApp-Nummer im internationalen Format OHNE "+" und ohne Leerzeichen
  // Beispiel Ägypten: 201001234567
  whatsapp: "201000000000",

  // Telefonnummer so, wie sie angezeigt werden soll
  phoneDisplay: "+20 100 000 0000",
  // Telefonnummer für den Anruf-Link (mit +, ohne Leerzeichen)
  phoneLink: "+201000000000",

  email: "info@hurghada-drive.com",

  address: "Sheraton Road, Hurghada, Red Sea Governorate, Ägypten",
  openingHours: "Täglich 08:00 – 22:00 Uhr · Flughafen-Übergabe rund um die Uhr",

  currency: "€",

  // Übergabeorte. fee = Aufpreis in € (0 = kostenlos)
  locations: [
    { name: "Flughafen Hurghada (HRG)", info: "Ankunftshalle, rund um die Uhr", fee: 0 },
    { name: "Hurghada Stadt / Hotel", info: "Sakkala, Dahar, Sheraton Road, Village Road", fee: 0 },
    { name: "El Gouna", info: "ca. 25 km nördlich des Flughafens", fee: 10 },
    { name: "Sahl Hasheesh", info: "ca. 20 km südlich", fee: 10 },
    { name: "Makadi Bay", info: "ca. 30 km südlich", fee: 15 },
    { name: "Soma Bay", info: "ca. 45 km südlich", fee: 20 },
    { name: "Safaga", info: "ca. 55 km südlich", fee: 25 }
  ],

  // Extras pro Tag (Preis) bzw. einmalig (oneTime: true)
  extras: [
    { id: "childseat", label: "Kindersitz", price: 5 },
    { id: "driver2",   label: "Zusatzfahrer", price: 4 },
    { id: "gps",       label: "Navi / GPS", price: 3 },
    { id: "fullins",   label: "Vollkasko ohne Selbstbeteiligung", price: 9 },
    { id: "delivery",  label: "Lieferung ans Hotel", price: 15, oneTime: true }
  ],

  // Deine Fahrzeugflotte – Preise pro Tag
  // type: "small" | "sedan" | "suv" | "van"  (bestimmt die Grafik)
  fleet: [
    {
      id: "economy",
      name: "Hyundai i10",
      category: "Kleinwagen",
      type: "small",
      color: "#e8b04b",
      seats: 4, bags: 2, gearbox: "Automatik", ac: true,
      price: 25,
      priceWeek: 22
    },
    {
      id: "compact",
      name: "Toyota Yaris",
      category: "Kompaktklasse",
      type: "small",
      color: "#d9534f",
      seats: 5, bags: 2, gearbox: "Automatik", ac: true,
      price: 30,
      priceWeek: 27
    },
    {
      id: "sedan",
      name: "Hyundai Elantra",
      category: "Limousine",
      type: "sedan",
      color: "#3c6e91",
      seats: 5, bags: 3, gearbox: "Automatik", ac: true,
      price: 38,
      priceWeek: 34
    },
    {
      id: "suv",
      name: "Kia Sportage",
      category: "SUV",
      type: "suv",
      color: "#2f4858",
      seats: 5, bags: 4, gearbox: "Automatik", ac: true,
      price: 55,
      priceWeek: 49
    },
    {
      id: "jeep",
      name: "Toyota Land Cruiser",
      category: "Geländewagen 4x4",
      type: "suv",
      color: "#c9b79c",
      seats: 7, bags: 5, gearbox: "Automatik", ac: true,
      price: 95,
      priceWeek: 85
    },
    {
      id: "van",
      name: "Toyota Hiace",
      category: "Kleinbus",
      type: "van",
      color: "#f5f5f0",
      seats: 12, bags: 8, gearbox: "Schaltung", ac: true,
      price: 80,
      priceWeek: 72
    }
  ],

  // Ab wie vielen Tagen gilt der Wochenpreis
  weekThreshold: 7
};

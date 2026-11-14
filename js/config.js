/* =========================================================
   HURGHADA DRIVE – ZENTRALE EINSTELLUNGEN
   ---------------------------------------------------------
   Hier trägst du deine echten Firmendaten und Preise ein.
   Alles auf der Website (Telefon, WhatsApp, E-Mail, Flotte,
   Preise) wird automatisch aus dieser Datei übernommen.

   Texte, die übersetzt werden, stehen in { de, en, ar, ru, fr }.
   Fehlt eine Sprache, wird automatisch Deutsch angezeigt.
   Alle übrigen Texte der Website stehen in js/i18n.js.
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

  address: {
    de: "Sheraton Road, Hurghada, Red Sea Governorate, Ägypten",
    en: "Sheraton Road, Hurghada, Red Sea Governorate, Egypt",
    ar: "طريق الشيراتون، الغردقة، محافظة البحر الأحمر، مصر",
    ru: "Sheraton Road, Хургада, мухафаза Красное море, Египет",
    fr: "Sheraton Road, Hurghada, gouvernorat de la mer Rouge, Égypte"
  },
  // Adresse für Google Maps (immer in lateinischer Schrift)
  mapQuery: "Sheraton Road, Hurghada, Egypt",

  openingHours: {
    de: "Täglich 08:00 – 22:00 Uhr · Flughafen-Übergabe rund um die Uhr",
    en: "Daily 08:00 – 22:00 · Airport handover 24/7",
    ar: "يوميًا 08:00 – 22:00 · التسليم في المطار على مدار الساعة",
    ru: "Ежедневно 08:00 – 22:00 · Выдача в аэропорту круглосуточно",
    fr: "Tous les jours 08:00 – 22:00 · Remise à l'aéroport 24 h/24"
  },

  // Währung für alle Preise auf der Website
  currency: { de: "LE", en: "LE", ar: "ج.م", ru: "LE", fr: "LE" },

  // Übergabeorte. fee = Aufpreis in LE (0 = kostenlos) – BEISPIELWERTE, bitte anpassen
  locations: [
    {
      name: { de: "Flughafen Hurghada (HRG)", en: "Hurghada Airport (HRG)", ar: "مطار الغردقة (HRG)", ru: "Аэропорт Хургады (HRG)", fr: "Aéroport de Hurghada (HRG)" },
      info: { de: "Ankunftshalle, rund um die Uhr", en: "Arrivals hall, 24/7", ar: "صالة الوصول، على مدار الساعة", ru: "Зал прилёта, круглосуточно", fr: "Hall des arrivées, 24 h/24" },
      fee: 0
    },
    {
      name: { de: "Hurghada Stadt / Hotel", en: "Hurghada city / hotel", ar: "مدينة الغردقة / الفندق", ru: "Хургада, город / отель", fr: "Hurghada ville / hôtel" },
      info: { de: "Sakkala, Dahar, Sheraton Road, Village Road", en: "Sakkala, Dahar, Sheraton Road, Village Road", ar: "السقالة، الدهار، طريق الشيراتون، طريق الفيلاج", ru: "Саккала, Дахар, Шератон-роуд, Виллидж-роуд", fr: "Sakkala, Dahar, Sheraton Road, Village Road" },
      fee: 0
    },
    {
      name: { de: "El Gouna", en: "El Gouna", ar: "الجونة", ru: "Эль-Гуна", fr: "El Gouna" },
      info: { de: "ca. 25 km nördlich des Flughafens", en: "approx. 25 km north of the airport", ar: "حوالي 25 كم شمال المطار", ru: "≈ 25 км к северу от аэропорта", fr: "à env. 25 km au nord de l'aéroport" },
      fee: 500
    },
    {
      name: { de: "Sahl Hasheesh", en: "Sahl Hasheesh", ar: "سهل حشيش", ru: "Сахль-Хашиш", fr: "Sahl Hasheesh" },
      info: { de: "ca. 20 km südlich", en: "approx. 20 km south", ar: "حوالي 20 كم جنوبًا", ru: "≈ 20 км к югу", fr: "à env. 20 km au sud" },
      fee: 500
    },
    {
      name: { de: "Makadi Bay", en: "Makadi Bay", ar: "مكادي باي", ru: "Макади-Бей", fr: "Makadi Bay" },
      info: { de: "ca. 30 km südlich", en: "approx. 30 km south", ar: "حوالي 30 كم جنوبًا", ru: "≈ 30 км к югу", fr: "à env. 30 km au sud" },
      fee: 750
    },
    {
      name: { de: "Soma Bay", en: "Soma Bay", ar: "سوما باي", ru: "Сома-Бей", fr: "Soma Bay" },
      info: { de: "ca. 45 km südlich", en: "approx. 45 km south", ar: "حوالي 45 كم جنوبًا", ru: "≈ 45 км к югу", fr: "à env. 45 km au sud" },
      fee: 1000
    },
    {
      name: { de: "Safaga", en: "Safaga", ar: "سفاجا", ru: "Сафага", fr: "Safaga" },
      info: { de: "ca. 55 km südlich", en: "approx. 55 km south", ar: "حوالي 55 كم جنوبًا", ru: "≈ 55 км к югу", fr: "à env. 55 km au sud" },
      fee: 1250
    }
  ],

  // Extras in LE pro Tag bzw. einmalig (oneTime: true) – BEISPIELWERTE, bitte anpassen
  extras: [
    { id: "childseat", price: 250,
      label: { de: "Kindersitz", en: "Child seat", ar: "مقعد أطفال", ru: "Детское кресло", fr: "Siège enfant" } },
    { id: "driver2", price: 200,
      label: { de: "Zusatzfahrer", en: "Additional driver", ar: "سائق إضافي", ru: "Дополнительный водитель", fr: "Conducteur supplémentaire" } },
    { id: "gps", price: 150,
      label: { de: "Navi / GPS", en: "Navigation / GPS", ar: "جهاز ملاحة / GPS", ru: "Навигатор / GPS", fr: "GPS / navigation" } },
    { id: "fullins", price: 450,
      label: { de: "Vollkasko ohne Selbstbeteiligung", en: "Full coverage with no excess", ar: "تأمين شامل بدون تحمّل", ru: "Полная страховка без франшизы", fr: "Tous risques sans franchise" } },
    { id: "delivery", price: 750, oneTime: true,
      label: { de: "Lieferung ans Hotel", en: "Delivery to your hotel", ar: "التوصيل إلى الفندق", ru: "Доставка к отелю", fr: "Livraison à l'hôtel" } }
  ],

  // Deine Fahrzeugflotte
  // -------------------------------------------------------
  // ECHTES FAHRZEUG: name, images und prices eintragen.
  //   images: Fotos in img/cars/. Das erste Bild (bzw. "cover") ist das Kartenbild,
  //           alle Bilder erscheinen in der Galerie.
  //   prices: Preise in LE. day = Preis pro Tag, week = 7 Tage gesamt,
  //           twoWeeks = 14 Tage gesamt, month = 30 Tage gesamt.
  //           Fehlende Staffeln einfach weglassen.
  //   minDays: Mindestmietdauer in Tagen.
  // PLATZHALTER: ohne name/prices zeigt die Website "Modell folgt" und "Preis folgt";
  //   Platzhalter erscheinen nicht im Preisrechner. Nicht benötigte Kategorien löschen.
  // type: "small" | "sedan" | "suv" | "van" (Grafik, solange kein Foto da ist)
  // gearbox: "auto" (Automatik) | "manual" (Schaltung)
  // bags: Anzahl Koffer (weglassen, wenn unbekannt)
  fleet: [
    {
      id: "avante", type: "sedan", color: "#f5f5f0",
      category: { de: "Limousine", en: "Saloon", ar: "سيدان", ru: "Седан", fr: "Berline" },
      name: "Hyundai Avante",
      cover: "img/cars/avante-card.jpg",
      images: [
        "img/cars/avante-1.jpg", "img/cars/avante-2.jpg", "img/cars/avante-3.jpg",
        "img/cars/avante-4.jpg", "img/cars/avante-5.jpg", "img/cars/avante-6.jpg",
        "img/cars/avante-7.jpg"
      ],
      seats: 5, gearbox: "auto", ac: true,
      minDays: 3,
      prices: { day: 1600, week: 10000, twoWeeks: 18500, month: 28000 }
    },
    {
      id: "cerato", type: "sedan", color: "#c0392b",
      category: { de: "Limousine", en: "Saloon", ar: "سيدان", ru: "Седан", fr: "Berline" },
      name: "Kia Cerato",
      cover: "img/cars/cerato-card.jpg",
      images: [
        "img/cars/cerato-1.jpg", "img/cars/cerato-2.jpg", "img/cars/cerato-3.jpg",
        "img/cars/cerato-4.jpg", "img/cars/cerato-5.jpg", "img/cars/cerato-6.jpg",
        "img/cars/cerato-7.jpg"
      ],
      seats: 5, gearbox: "auto", ac: true,
      minDays: 3,
      prices: { day: 1500, week: 9500, twoWeeks: 17500, month: 27000 }
    },

    // ----- Platzhalter -----
    { id: "economy", type: "small", color: "#519e43",
      category: { de: "Kleinwagen", en: "Small car", ar: "سيارة صغيرة", ru: "Малый класс", fr: "Petite voiture" } },
    { id: "compact", type: "small", color: "#d9534f",
      category: { de: "Kompaktklasse", en: "Compact", ar: "مدمجة", ru: "Компакт", fr: "Compacte" } },
    { id: "suv", type: "suv", color: "#9aa3a8",
      category: { de: "SUV", en: "SUV", ar: "SUV", ru: "Кроссовер (SUV)", fr: "SUV" } },
    { id: "jeep", type: "suv", color: "#c9b79c",
      category: { de: "Geländewagen 4x4", en: "4x4 off-roader", ar: "دفع رباعي 4x4", ru: "Внедорожник 4x4", fr: "4x4 tout-terrain" } },
    { id: "van", type: "van", color: "#cfd3d6",
      category: { de: "Kleinbus", en: "Minibus", ar: "ميني باص", ru: "Микроавтобус", fr: "Minibus" } }
  ]
};

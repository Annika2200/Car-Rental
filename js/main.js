(function () {
  "use strict";

  var C = window.SITE_CONFIG;
  var I = window.I18N;
  var $ = function (s, ctx) { return (ctx || document).querySelector(s); };
  var $$ = function (s, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(s)); };
  var root = document.documentElement;

  /* =========================================================
     SPRACHE
     ========================================================= */
  var LANGS = I.languages.map(function (l) { return l.code; });
  var lang = LANGS.indexOf(root.lang) >= 0 ? root.lang : "de";
  var langInfo = function () { return I.languages.filter(function (l) { return l.code === lang; })[0]; };

  // Deutsche Originaltexte aus dem HTML merken (für das Zurückschalten)
  var orig = {};
  $$("[data-i18n]").forEach(function (el) {
    var k = el.getAttribute("data-i18n");
    if (!(k in orig)) orig[k] = el.textContent;
  });
  $$("[data-i18n-html]").forEach(function (el) {
    var k = el.getAttribute("data-i18n-html");
    if (!(k in orig)) orig[k] = el.innerHTML;
  });
  $$("[data-i18n-attr]").forEach(function (el) {
    el.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
      var p = pair.split(":");
      if (!(p[1] in orig)) orig[p[1]] = el.getAttribute(p[0]);
    });
  });
  orig["meta.title"] = document.title;
  var metaDesc = $('meta[name="description"]');
  orig["meta.desc"] = metaDesc.content;

  function t(key, vars) {
    var s = (I.strings[lang] && I.strings[lang][key]);
    if (s === undefined) s = I.strings.de[key];
    if (s === undefined) s = orig[key];
    if (s === undefined) s = key;
    if (vars && typeof s === "string") {
      s = s.replace(/\{(\w+)\}/g, function (m, v) { return v in vars ? vars[v] : m; });
    }
    return s;
  }

  // Mehrsprachige Werte aus config.js: { de: "...", en: "..." } oder einfacher Text
  function L(v) {
    if (v && typeof v === "object") return v[lang] || v.de || "";
    return v;
  }

  function esc(v) {
    return String(v).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
  }

  // "Kategorie – Modell" bzw. nur "Kategorie", solange kein Modell eingetragen ist
  function carLabel(car) {
    return L(car.category) + (car.name ? " – " + car.name : "");
  }

  function daysText(n) {
    var forms = t("days");
    var cat = "other";
    try { cat = new Intl.PluralRules(langInfo().locale).select(n); } catch (e) {}
    var s = forms[cat] || forms.other;
    return s.replace("{n}", n);
  }

  function money(n) {
    return Math.round(n).toLocaleString(langInfo().locale, { maximumFractionDigits: 0 }) + "\u00a0" + L(C.currency);
  }

  function fillConfig() {
    var phonePending = /^\+?20 ?100 ?000 ?0000$/.test(String(C.phoneDisplay).trim());
    $$("[data-config]").forEach(function (el) {
      var key = el.getAttribute("data-config");
      if (key === "phoneDisplay" && phonePending) { el.textContent = t("contact.pending"); el.classList.add("is-pending"); return; }
      var v = C[key];
      if (v !== undefined) el.textContent = L(v);
    });
  }

  function applyStatic() {
    $$("[data-i18n]").forEach(function (el) { el.textContent = t(el.getAttribute("data-i18n")); });
    $$("[data-i18n-html]").forEach(function (el) { el.innerHTML = t(el.getAttribute("data-i18n-html")); });
    $$("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
        var p = pair.split(":");
        el.setAttribute(p[0], t(p[1]));
      });
    });
    document.title = t("meta.title");
    metaDesc.content = t("meta.desc");
    var og = $('meta[property="og:locale"]');
    if (og) og.content = langInfo().og;
    fillConfig();
  }

  /* =========================================================
     LINKS
     ========================================================= */
  var waBase = "https://wa.me/" + C.whatsapp;
  function updateLinks() {
    $$("[data-whatsapp]").forEach(function (a) {
      a.href = waBase + "?text=" + encodeURIComponent(t("wa.greeting", { company: C.company }));
      a.target = "_blank";
      a.rel = "noopener";
    });
    $$("[data-whatsapp-transfer]").forEach(function (a) {
      a.href = waBase + "?text=" + encodeURIComponent(t("tr.msg", { company: C.company }));
      a.target = "_blank";
      a.rel = "noopener";
    });
  }
  $$("[data-phone]").forEach(function (a) { a.href = "tel:" + C.phoneLink; });
  $$("[data-email]").forEach(function (a) { a.href = "mailto:" + C.email; });
  $("#year").textContent = new Date().getFullYear();

  /* =========================================================
     MOBILE NAVIGATION
     ========================================================= */
  var toggle = $(".nav-toggle");
  var nav = $("#main-nav");
  function setNav(open) {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open);
    toggle.setAttribute("aria-label", t(open ? "nav.close" : "nav.open"));
  }
  toggle.addEventListener("click", function () { setNav(!nav.classList.contains("open")); });
  $$("a", nav).forEach(function (a) { a.addEventListener("click", function () { setNav(false); }); });

  /* =========================================================
     SPRACHUMSCHALTER
     ========================================================= */
  var langBtn = $(".lang-btn");
  var langMenu = $("#lang-menu");
  function setMenu(open) {
    langMenu.hidden = !open;
    langBtn.setAttribute("aria-expanded", open);
  }
  langBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    setMenu(langMenu.hidden);
    if (!langMenu.hidden) {
      var cur = $('[data-lang="' + lang + '"]', langMenu);
      if (cur) cur.focus();
    }
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest("#lang-switch")) setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !langMenu.hidden) { setMenu(false); langBtn.focus(); }
  });
  langMenu.addEventListener("click", function (e) {
    var b = e.target.closest("[data-lang]");
    if (!b) return;
    setLanguage(b.getAttribute("data-lang"), true);
    setMenu(false);
    langBtn.focus();
  });

  /* =========================================================
     FAHRZEUG-GRAFIKEN
     ========================================================= */
  function carSvg(type, color) {
    var body = {
      small: "M40 92 L58 62 Q66 50 82 50 L170 50 Q186 50 198 62 L224 86 L262 92 Q280 96 280 112 L280 124 L24 124 L24 108 Q24 94 40 92Z",
      sedan: "M20 96 L60 64 Q72 54 90 54 L190 54 Q206 54 220 66 L246 88 L286 94 Q300 98 300 114 L300 124 L14 124 L14 108 Q14 98 20 96Z",
      suv:   "M22 80 L44 46 Q50 38 62 38 L214 38 Q228 38 236 50 L254 80 L284 86 Q300 90 300 106 L300 126 L16 126 L16 92 Q16 82 22 80Z",
      van:   "M18 46 Q18 30 34 30 L244 30 Q258 30 266 44 L292 86 Q300 96 300 108 L300 126 L18 126Z"
    }[type] || "";
    var win = {
      small: '<path d="M70 86 L84 60 L124 60 L124 86Z M132 86 L132 60 L168 60 Q178 60 186 68 L204 86Z" fill="#cfe6ee"/>',
      sedan: '<path d="M70 88 L94 64 L148 64 L148 88Z M156 88 L156 64 L190 64 Q200 64 210 72 L228 88Z" fill="#cfe6ee"/>',
      suv:   '<path d="M50 76 L66 48 L136 48 L136 76Z M144 76 L144 48 L212 48 Q222 48 228 56 L240 76Z" fill="#cfe6ee"/>',
      van:   '<path d="M34 72 L34 42 L94 42 L94 72Z M102 72 L102 42 L162 42 L162 72Z M170 72 L170 42 L240 42 Q250 42 256 52 L270 72Z" fill="#cfe6ee"/>'
    }[type] || "";
    var w1 = type === "van" ? 74 : 76, w2 = type === "van" ? 248 : 238;
    return '<svg viewBox="0 0 316 150" role="img" aria-hidden="true">' +
      '<ellipse cx="158" cy="138" rx="140" ry="7" fill="rgba(0,0,0,.12)"/>' +
      '<path d="' + body + '" fill="' + color + '" stroke="rgba(0,0,0,.25)" stroke-width="2"/>' +
      win +
      '<rect x="270" y="100" width="18" height="8" rx="3" fill="#ffe9a8"/>' +
      '<rect x="20" y="100" width="12" height="8" rx="3" fill="#e05a4f"/>' +
      [w1, w2].map(function (x) {
        return '<circle cx="' + x + '" cy="124" r="20" fill="#222"/><circle cx="' + x + '" cy="124" r="9" fill="#bbb"/>';
      }).join("") +
      "</svg>";
  }

  /* =========================================================
     DYNAMISCHE INHALTE (werden bei Sprachwechsel neu erzeugt)
     ========================================================= */
  var grid = $("#fleet-grid");

  // Ein Fahrzeug ist buchbar, sobald Preise eingetragen sind
  function icon(name) { return '<svg class="icon" aria-hidden="true"><use href="#i-' + name + '"/></svg>'; }

  function bookable(car) { return !!(car && car.prices && car.prices.day); }
  function carImages(car) { return car.images || (car.image ? [car.image] : []); }

  function renderFleet() {
    grid.innerHTML = C.fleet.filter(bookable).map(function (car) {
      var cat = L(car.category);
      var imgs = carImages(car);
      var cover = car.cover || imgs[0];
      var alt = esc(car.name || cat);
      var imgTag = cover ? '<img src="' + esc(cover) + '" alt="' + alt + '" loading="lazy" width="960" height="640">' : "";
      var img = cover
        ? '<div class="car-img has-photo">' +
            (imgs.length > 1
              ? '<button type="button" class="car-gallery-btn" data-gallery="' + car.id + '" aria-label="' + esc(t("car.photos", { n: imgs.length })) + '">' +
                  imgTag + '<span class="car-photo-count" aria-hidden="true">' + icon("camera") + imgs.length + "</span></button>"
              : imgTag) +
          "</div>"
        : '<div class="car-img is-placeholder">' + carSvg(car.type, car.color) + '<span class="car-badge">' + t("car.photoSoon") + "</span></div>";
      var title = car.name
        ? "<h3><bdi>" + esc(car.name) + "</bdi></h3>"
        : '<h3 class="is-placeholder">' + t("car.placeholder") + "</h3>";
      var specs = [];
      if (car.seats) specs.push('<li title="' + t("car.seats") + '">' + icon("user") + car.seats + "</li>");
      if (car.bags) specs.push('<li title="' + t("car.bags") + '">' + icon("bag") + car.bags + "</li>");
      if (car.gearbox) specs.push('<li title="' + t("car.gearbox") + '">' + icon("gear") + t(car.gearbox === "manual" ? "car.manual" : "car.auto") + "</li>");
      if (car.ac) specs.push("<li>" + icon("snow") + t("car.ac") + "</li>");
      var price;
      if (bookable(car)) {
        var p = car.prices, tiers = [];
        if (p.week) tiers.push("<li><span>" + t("tier.week") + "</span><strong>" + money(p.week) + "</strong></li>");
        if (p.twoWeeks) tiers.push("<li><span>" + t("tier.twoWeeks") + "</span><strong>" + money(p.twoWeeks) + "</strong></li>");
        if (p.month) tiers.push("<li><span>" + t("tier.month") + "</span><strong>" + money(p.month) + "</strong></li>");
        price =
          '<div class="car-foot">' +
            '<p class="car-price"><strong>' + money(p.day) + "</strong><span>" + t("car.perDay") + "</span></p>" +
            '<button type="button" class="btn btn-accent btn-small" data-choose="' + car.id + '">' + t("car.choose") + "</button>" +
          "</div>" +
          (tiers.length ? '<ul class="car-tiers">' + tiers.join("") + "</ul>" : "") +
          (car.minDays > 1 ? '<p class="car-price-note">' + t("car.minDays", { days: daysText(car.minDays) }) + "</p>" : "");
      } else {
        price = '<div class="car-foot"><p class="car-price is-placeholder">' + t("car.pricePending") + "</p></div>";
      }
      return '<article class="car card' + (bookable(car) ? "" : " is-placeholder") + '">' + img +
        '<div class="car-body">' +
          '<p class="car-cat">' + cat + "</p>" + title +
          (specs.length ? '<ul class="car-specs">' + specs.join("") + "</ul>" : "") +
          price +
        "</div></article>";
    }).join("");
    // Kategorien ohne Fahrzeug: eine Tafel statt leerer Karten
    var rest = C.fleet.filter(function (c) { return !bookable(c); });
    var altLang = lang === "ar" ? "en" : "ar";
    $("#fleet-more").hidden = !rest.length;
    $("#fleet-more-list").innerHTML = rest.map(function (c) {
      var alt = c.category && typeof c.category === "object" ? c.category[altLang] : "";
      return '<li><span class="more-name">' + esc(L(c.category)) + "</span>" +
        (alt && alt !== L(c.category) ? '<span class="more-alt" lang="' + altLang + '">' + esc(alt) + "</span>" : "") +
        '<span class="more-note">' + t("fleet.moreNote") + "</span></li>";
    }).join("");
  }

  function renderSelects() {
    $$("[data-fleet-select]").forEach(function (sel) {
      var v = sel.value;
      sel.innerHTML = C.fleet.filter(bookable).map(function (c) {
        return '<option value="' + c.id + '">' + carLabel(c) + " (" + money(c.prices.day) + t("car.perDay") + ")</option>";
      }).join("");
      if (v) sel.value = v;
    });
    $$("[data-locations]").forEach(function (sel) {
      var v = sel.value;
      sel.innerHTML = C.locations.map(function (l, i) {
        return '<option value="' + i + '">' + L(l.name) + (l.fee ? " (+" + money(l.fee) + ")" : "") + "</option>";
      }).join("");
      if (v) sel.value = v;
    });
  }

  // Wegweiser: Ortsname zweisprachig wie auf ägyptischen Schildern
  function renderLocations() {
    $("#locations-list").innerHTML = C.locations.map(function (l) {
      var altLang = lang === "ar" ? "en" : "ar";
      var alt = l.name && typeof l.name === "object" ? l.name[altLang] : "";
      var km = (L(l.info) || "").match(/(\d+)\s*(km|كم|км)/);
      return '<li class="dir-row">' +
        '<span class="dir-arrow">' + icon("arrow") + (km ? '<span class="dir-km">' + km[1] + " km</span>" : "") + "</span>" +
        "<span><span class=\"dir-name\">" + esc(L(l.name)) + "</span>" +
          (alt && alt !== L(l.name) ? '<span class="dir-alt" lang="' + altLang + '">' + esc(alt) + "</span>" : "") +
          '<span class="dir-info">' + esc(L(l.info)) + "</span></span>" +
        '<span class="dir-fee">' + (l.fee ? t("loc.delivery", { price: money(l.fee) }) : t("loc.free")) + "</span>" +
        "</li>";
    }).join("");
  }

  function renderExtras() {
    var box = $("#extras");
    var checked = $$('input[name="extra"]:checked', box).map(function (cb) { return cb.value; });
    box.innerHTML = C.extras.map(function (x) {
      return '<label class="check"><input type="checkbox" name="extra" value="' + x.id + '"' +
        (checked.indexOf(x.id) >= 0 ? " checked" : "") + "><span>" + L(x.label) +
        " <em>+" + money(x.price) + (x.oneTime ? " " + t("extra.oneTime") : t("car.perDay")) + "</em></span></label>";
    }).join("");
  }

  /* =========================================================
     DATUMSFELDER
     ========================================================= */
  function iso(d) {
    var z = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    return z.toISOString().slice(0, 10);
  }
  var today = new Date();
  var dStart = new Date(today); dStart.setDate(dStart.getDate() + 1);
  var dEnd = new Date(today); dEnd.setDate(dEnd.getDate() + 8);
  $$('input[type="date"]').forEach(function (inp) {
    inp.min = iso(today);
    inp.value = iso(inp.name === "from" ? dStart : dEnd);
  });

  /* =========================================================
     PREISBERECHNUNG
     ========================================================= */
  function findCar(id) { return C.fleet.filter(function (c) { return c.id === id; })[0]; }

  function days(from, to) {
    if (!from || !to) return 0;
    var d = Math.round((new Date(to) - new Date(from)) / 86400000);
    return d > 0 ? d : 0;
  }

  /* Mietpreis nach Staffel: Tag / Woche / 2 Wochen / Monat.
     Es gilt der Tagessatz der erreichten Staffel; ist eine höhere Staffel
     insgesamt günstiger, wird deren Gesamtpreis berechnet. */
  function rentalPrice(car, n) {
    var p = car.prices;
    var tiers = [[1, p.day], [7, p.week], [14, p.twoWeeks], [30, p.month]].filter(function (x) { return x[1]; });
    var cur = tiers[0];
    tiers.forEach(function (x) { if (x[0] <= n) cur = x; });
    var total = cur[1] / cur[0] * n;
    tiers.forEach(function (x) { if (x[0] > n && x[1] < total) total = x[1]; });
    return Math.round(total);
  }

  function calc(form) {
    var car = findCar(form.car.value);
    var n = days(form.from.value, form.to.value);
    if (!bookable(car) || !n) return null;
    if (car.minDays && n < car.minDays) return { short: true, car: car, days: n, min: car.minDays };
    var rental = rentalPrice(car, n);
    var extras = [];
    var extrasSum = 0;
    $$('input[name="extra"]:checked', form).forEach(function (cb) {
      var x = C.extras.filter(function (e) { return e.id === cb.value; })[0];
      var cost = x.oneTime ? x.price : x.price * n;
      extras.push({ label: L(x.label), cost: cost });
      extrasSum += cost;
    });
    var fee = 0;
    // Zustellgebühr gilt einmal für Bringen und Abholen zusammen (höherer Ort zählt)
    fee = Math.max(form.pickup ? C.locations[form.pickup.value].fee : 0, form.dropoff ? C.locations[form.dropoff.value].fee : 0);
    return { car: car, days: n, rental: rental, extras: extras, extrasSum: extrasSum, fee: fee,
             total: rental + extrasSum + fee };
  }

  var quick = $("#quick-form");
  var booking = $("#booking-form");

  function updateQuick() {
    var r = calc(quick);
    $("#quick-total").textContent = !r ? "–" : r.short ? t("car.minDays", { days: daysText(r.min) }) : money(r.total) + "\u2002–\u2002" + daysText(r.days);
  }

  function updateBooking() {
    var r = calc(booking);
    if (!r || r.short) {
      ["car", "days", "rate", "extras", "total"].forEach(function (k) { $("#sum-" + k).textContent = "–"; });
      if (booking.car.value) $("#sum-car").textContent = carLabel(findCar(booking.car.value));
      if (r && r.short) {
        $("#sum-days").textContent = daysText(r.days);
        $("#sum-total").textContent = t("car.minDays", { days: daysText(r.min) });
      }
      return;
    }
    $("#sum-car").textContent = carLabel(r.car);
    $("#sum-days").textContent = daysText(r.days);
    $("#sum-rate").textContent = money(r.rental);
    var ex = r.extras.map(function (e) { return e.label; });
    if (r.fee) ex.push(t("sum.deliveryFee"));
    $("#sum-extras").textContent = ex.length ? ex.join(t("list.sep")) + " (" + money(r.extrasSum + r.fee) + ")" : t("sum.none");
    $("#sum-total").textContent = money(r.total);
  }

  quick.addEventListener("input", updateQuick);
  quick.addEventListener("change", updateQuick);
  booking.addEventListener("input", updateBooking);
  booking.addEventListener("change", updateBooking);

  // Rückgabedatum nie vor Abholdatum
  [quick, booking].forEach(function (f) {
    f.from.addEventListener("change", function () {
      f.to.min = f.from.value;
      if (f.to.value && f.to.value <= f.from.value) {
        var d = new Date(f.from.value); d.setDate(d.getDate() + 1);
        f.to.value = iso(d);
      }
    });
  });

  function goToBooking(carId) {
    if (carId) booking.car.value = carId;
    updateBooking();
    $("#buchen").scrollIntoView({ behavior: "smooth" });
  }

  quick.addEventListener("submit", function (e) {
    e.preventDefault();
    booking.car.value = quick.car.value;
    booking.pickup.value = quick.pickup.value;
    booking.dropoff.value = quick.pickup.value;
    booking.from.value = quick.from.value;
    booking.to.value = quick.to.value;
    goToBooking();
  });

  grid.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-choose]");
    if (btn) goToBooking(btn.getAttribute("data-choose"));
  });

  /* =========================================================
     ANFRAGE ABSENDEN
     ========================================================= */
  var submitter = "whatsapp";
  $$("[data-channel]", booking).forEach(function (b) {
    b.addEventListener("click", function () { submitter = b.getAttribute("data-channel"); });
  });

  function fmtDate(v) {
    if (!v) return "";
    var p = v.split("-");
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    return d.toLocaleDateString(langInfo().locale, { weekday: "short", day: "2-digit", month: "2-digit", year: "numeric" });
  }

  function mark(field, bad) {
    if (bad) field.setAttribute("aria-invalid", "true"); else field.removeAttribute("aria-invalid");
  }

  function validate() {
    var problems = [];
    var r = calc(booking);
    mark(booking.name, !booking.name.value.trim());
    mark(booking.phone, !booking.phone.value.trim());
    mark(booking.to, !r || !!r.short);
    mark(booking.privacy, !booking.privacy.checked);
    if (!booking.name.value.trim()) problems.push(t("err.name"));
    if (!booking.phone.value.trim()) problems.push(t("err.phone"));
    if (!r) problems.push(t("err.dates"));
    else if (r.short) problems.push(t("err.minDays", { days: daysText(r.min), n: r.min }));
    if (!booking.privacy.checked) problems.push(t("err.privacy"));
    return problems;
  }

  // Markierung verschwindet, sobald das Feld korrigiert wird
  booking.addEventListener("input", function (e) {
    if (e.target.getAttribute && e.target.getAttribute("aria-invalid")) validate();
  });
  booking.addEventListener("change", function () {
    if (booking.querySelector("[aria-invalid]")) {
      var p = validate(), err = $("#form-error");
      if (!p.length) err.hidden = true; else if (!err.hidden) err.textContent = t("err.prefix") + p.join(t("list.sep")) + ".";
    }
  });

  booking.addEventListener("submit", function (e) {
    e.preventDefault();
    var err = $("#form-error");
    var problems = validate();
    if (problems.length) {
      err.textContent = t("err.prefix") + problems.join(t("list.sep")) + ".";
      err.hidden = false;
      var first = booking.querySelector("[aria-invalid]");
      if (first) first.focus();
      return;
    }
    err.hidden = true;
    var r = calc(booking);

    var Loc = C.locations;
    var time = function (v) { return t("msg.time", { t: v }); };
    var lines = [
      t("msg.title", { company: C.company }),
      "",
      t("msg.car") + ": " + carLabel(r.car),
      t("msg.pickup") + ": " + fmtDate(booking.from.value) + ", " + time(booking.fromTime.value) + " – " + L(Loc[booking.pickup.value].name),
      t("msg.return") + ": " + fmtDate(booking.to.value) + ", " + time(booking.toTime.value) + " – " + L(Loc[booking.dropoff.value].name),
      t("msg.duration") + ": " + daysText(r.days)
    ];
    if (booking.flight.value.trim()) lines.push(t("msg.flight") + ": " + booking.flight.value.trim());
    lines.push(t("msg.extras") + ": " + (r.extras.length ? r.extras.map(function (x) { return x.label; }).join(t("list.sep")) : t("sum.none")));
    lines.push(t("msg.price") + ": " + money(r.total));
    lines.push("");
    lines.push(t("msg.name") + ": " + booking.name.value.trim());
    lines.push(t("msg.phone") + ": " + booking.phone.value.trim());
    if (booking.email.value.trim()) lines.push(t("msg.email") + ": " + booking.email.value.trim());
    if (booking.hotel.value.trim()) lines.push(t("msg.hotel") + ": " + booking.hotel.value.trim());
    if (booking.message.value.trim()) { lines.push(""); lines.push(t("msg.message") + ": " + booking.message.value.trim()); }
    lines.push("");
    lines.push(t("msg.lang") + ": " + langInfo().name);

    var text = lines.join("\n");
    if (submitter === "email") {
      window.location.href = "mailto:" + C.email +
        "?subject=" + encodeURIComponent(t("mail.subject", { name: booking.name.value.trim() })) +
        "&body=" + encodeURIComponent(text);
    } else {
      window.open(waBase + "?text=" + encodeURIComponent(text), "_blank", "noopener");
    }
  });

  /* =========================================================
     GOOGLE MAPS ERST NACH KLICK (DSGVO)
     ========================================================= */
  $("#map").addEventListener("click", function (e) {
    if (!e.target.closest("#load-map")) return;
    var q = encodeURIComponent(C.mapQuery || L(C.address));
    var hl = lang;
    $("#map").innerHTML = '<iframe title="' + t("map.iframe") + " " + C.company + '" src="https://maps.google.com/maps?q=' + q +
      "&hl=" + hl + '&z=13&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>';
    $("#map").classList.add("map-loaded");
  });

  /* =========================================================
     FOTOGALERIE
     ========================================================= */
  var lb = document.createElement("div");
  lb.className = "lightbox";
  lb.hidden = true;
  lb.setAttribute("role", "dialog");
  lb.setAttribute("aria-modal", "true");
  lb.innerHTML =
    '<button type="button" class="lb-btn lb-close" data-lb="close">' + icon("x") + '</button>' +
    '<button type="button" class="lb-btn lb-prev" data-lb="prev">' + icon("left") + '</button>' +
    '<figure class="lb-figure"><img class="lb-img" alt=""><figcaption class="lb-caption"></figcaption></figure>' +
    '<button type="button" class="lb-btn lb-next" data-lb="next">' + icon("right") + '</button>';
  document.body.appendChild(lb);
  var lbImg = $(".lb-img", lb), lbCap = $(".lb-caption", lb);
  var lbCar = null, lbIdx = 0, lbReturn = null;

  function lbShow(i) {
    var imgs = carImages(lbCar);
    lbIdx = (i + imgs.length) % imgs.length;
    var src = imgs[lbIdx];
    if (lbImg.getAttribute("src") && lbImg.getAttribute("src") !== src) {
      lbImg.classList.add("is-swapping");
      lbImg.onload = function () { lbImg.classList.remove("is-swapping"); };
    }
    lbImg.src = src;
    lbImg.alt = (lbCar.name || L(lbCar.category)) + " – " + (lbIdx + 1) + "/" + imgs.length;
    lbCap.textContent = (lbIdx + 1) + " / " + imgs.length;
    // nächstes Bild vorladen
    var pre = new Image(); pre.src = imgs[(lbIdx + 1) % imgs.length];
  }
  function lbOpen(car, from) {
    lbCar = car; lbReturn = from;
    lb.setAttribute("aria-label", t("car.photos", { n: carImages(car).length }));
    $(".lb-close", lb).setAttribute("aria-label", t("gallery.close"));
    $(".lb-prev", lb).setAttribute("aria-label", t("gallery.prev"));
    $(".lb-next", lb).setAttribute("aria-label", t("gallery.next"));
    lbShow(0);
    lb.hidden = false;
    document.body.classList.add("no-scroll");
    $(".lb-close", lb).focus();
  }
  function lbClose() {
    lb.hidden = true;
    document.body.classList.remove("no-scroll");
    if (lbReturn) lbReturn.focus();
  }
  grid.addEventListener("click", function (e) {
    var g = e.target.closest("[data-gallery]");
    if (g) lbOpen(findCar(g.getAttribute("data-gallery")), g);
  });
  lb.addEventListener("click", function (e) {
    var b = e.target.closest("[data-lb]");
    if (b) {
      var a = b.getAttribute("data-lb");
      if (a === "close") lbClose(); else lbShow(lbIdx + (a === "next" ? 1 : -1));
    } else if (e.target === lb) {
      lbClose();
    }
  });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    var rtl = root.dir === "rtl";
    if (e.key === "Escape") lbClose();
    else if (e.key === "ArrowRight") lbShow(lbIdx + (rtl ? -1 : 1));
    else if (e.key === "ArrowLeft") lbShow(lbIdx + (rtl ? 1 : -1));
    else if (e.key === "Tab") {
      // Fokus im Dialog halten
      var f = $$("button", lb), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  var touchX = null;
  lb.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) lbShow(lbIdx + (dx < 0 ? 1 : -1) * (root.dir === "rtl" ? -1 : 1));
    touchX = null;
  });

  /* =========================================================
     SPRACHE ANWENDEN
     ========================================================= */
  function setLanguage(code, remember) {
    if (LANGS.indexOf(code) < 0) code = "de";
    lang = code;
    var info = langInfo();
    root.lang = code;
    root.dir = info.dir;

    applyStatic();
    renderFleet();
    renderSelects();
    renderLocations();
    renderExtras();
    updateLinks();
    setNav(nav.classList.contains("open"));

    $(".lang-current").textContent = info.short;
    $$("[data-lang]", langMenu).forEach(function (b) {
      b.setAttribute("aria-current", b.getAttribute("data-lang") === code ? "true" : "false");
    });

    // Fehlermeldung in neuer Sprache neu aufbauen
    var err = $("#form-error");
    if (!err.hidden) {
      var p = validate();
      if (p.length) err.textContent = t("err.prefix") + p.join(t("list.sep")) + ".";
      else err.hidden = true;
    }

    updateQuick();
    updateBooking();

    if (remember) {
      try { localStorage.setItem("hd-lang", code); } catch (e) {}
      try {
        var url = new URL(location.href);
        if (code === "de") url.searchParams.delete("lang"); else url.searchParams.set("lang", code);
        history.replaceState(null, "", url.pathname + url.search + url.hash);
      } catch (e) {}
    }
    root.classList.remove("i18n-loading");
  }

  setLanguage(lang, false);
})();

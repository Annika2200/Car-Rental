(function () {
  "use strict";

  var C = window.SITE_CONFIG;
  var $ = function (s, ctx) { return (ctx || document).querySelector(s); };
  var $$ = function (s, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(s)); };

  function money(n) {
    return n.toLocaleString("de-DE", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " " + C.currency;
  }

  /* ---------- Config-Werte einsetzen ---------- */
  $$("[data-config]").forEach(function (el) {
    var v = C[el.getAttribute("data-config")];
    if (v !== undefined) el.textContent = v;
  });
  var waBase = "https://wa.me/" + C.whatsapp;
  $$("[data-whatsapp]").forEach(function (a) {
    a.href = waBase + "?text=" + encodeURIComponent("Hallo " + C.company + ", ich interessiere mich für einen Mietwagen.");
    a.target = "_blank";
    a.rel = "noopener";
  });
  $$("[data-phone]").forEach(function (a) { a.href = "tel:" + C.phoneLink; });
  $$("[data-email]").forEach(function (a) { a.href = "mailto:" + C.email; });
  $("#year").textContent = new Date().getFullYear();

  /* ---------- Mobile Navigation ---------- */
  var toggle = $(".nav-toggle");
  var nav = $("#main-nav");
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
    toggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
  });
  $$("a", nav).forEach(function (a) {
    a.addEventListener("click", function () {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Fahrzeug-Grafiken ---------- */
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

  /* ---------- Flotte rendern ---------- */
  var grid = $("#fleet-grid");
  grid.innerHTML = C.fleet.map(function (car) {
    return '<article class="car card">' +
      '<div class="car-img">' + carSvg(car.type, car.color) + "</div>" +
      '<div class="car-body">' +
        '<p class="car-cat">' + car.category + "</p>" +
        "<h3>" + car.name + ' <span class="car-similar">oder ähnlich</span></h3>' +
        '<ul class="car-specs">' +
          '<li title="Sitze">👤 ' + car.seats + "</li>" +
          '<li title="Gepäck">🧳 ' + car.bags + "</li>" +
          '<li title="Getriebe">⚙️ ' + car.gearbox + "</li>" +
          (car.ac ? '<li title="Klimaanlage">❄️ Klima</li>' : "") +
        "</ul>" +
        '<div class="car-foot">' +
          '<p class="car-price"><span>ab</span> <strong>' + money(car.priceWeek) + '</strong><span>/Tag</span></p>' +
          '<button type="button" class="btn btn-accent btn-small" data-choose="' + car.id + '">Auswählen</button>' +
        "</div>" +
        '<p class="car-price-note">' + money(car.price) + "/Tag · ab " + C.weekThreshold + " Tagen " + money(car.priceWeek) + "/Tag</p>" +
      "</div></article>";
  }).join("");

  /* ---------- Select-Felder befüllen ---------- */
  $$("[data-fleet-select]").forEach(function (sel) {
    sel.innerHTML = C.fleet.map(function (c) {
      return '<option value="' + c.id + '">' + c.category + " – " + c.name + " (ab " + money(c.priceWeek) + "/Tag)</option>";
    }).join("");
  });
  $$("[data-locations]").forEach(function (sel) {
    sel.innerHTML = C.locations.map(function (l, i) {
      return '<option value="' + i + '">' + l.name + (l.fee ? " (+" + money(l.fee) + ")" : "") + "</option>";
    }).join("");
  });
  $("#locations-list").innerHTML = C.locations.map(function (l) {
    return '<li class="card"><h3>' + l.name + "</h3><p>" + l.info + '</p><p class="loc-fee">' +
      (l.fee ? "Zustellung " + money(l.fee) : "Kostenlos") + "</p></li>";
  }).join("");

  $("#extras").innerHTML = C.extras.map(function (x) {
    return '<label class="check"><input type="checkbox" name="extra" value="' + x.id + '"><span>' + x.label +
      ' <em>+' + money(x.price) + (x.oneTime ? " einmalig" : "/Tag") + "</em></span></label>";
  }).join("");

  /* ---------- Datumsfelder ---------- */
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

  /* ---------- Preisberechnung ---------- */
  function findCar(id) { return C.fleet.filter(function (c) { return c.id === id; })[0]; }

  function days(from, to) {
    if (!from || !to) return 0;
    var d = Math.round((new Date(to) - new Date(from)) / 86400000);
    return d > 0 ? d : 0;
  }

  function calc(form) {
    var car = findCar(form.car.value);
    var n = days(form.from.value, form.to.value);
    if (!car || !n) return null;
    var rate = n >= C.weekThreshold ? car.priceWeek : car.price;
    var extras = [];
    var extrasSum = 0;
    $$('input[name="extra"]:checked', form).forEach(function (cb) {
      var x = C.extras.filter(function (e) { return e.id === cb.value; })[0];
      var cost = x.oneTime ? x.price : x.price * n;
      extras.push({ label: x.label, cost: cost });
      extrasSum += cost;
    });
    var fee = 0;
    if (form.pickup) fee += C.locations[form.pickup.value].fee;
    if (form.dropoff) fee += C.locations[form.dropoff.value].fee;
    return { car: car, days: n, rate: rate, extras: extras, extrasSum: extrasSum, fee: fee,
             total: rate * n + extrasSum + fee };
  }

  var quick = $("#quick-form");
  var booking = $("#booking-form");

  function updateQuick() {
    var r = calc(quick);
    $("#quick-total").textContent = r ? money(r.total) + " · " + r.days + (r.days === 1 ? " Tag" : " Tage") : "–";
  }

  function updateBooking() {
    var r = calc(booking);
    if (!r) {
      ["car", "days", "rate", "extras", "total"].forEach(function (k) { $("#sum-" + k).textContent = "–"; });
      if (booking.car.value) $("#sum-car").textContent = findCar(booking.car.value).name;
      return;
    }
    $("#sum-car").textContent = r.car.category + " – " + r.car.name;
    $("#sum-days").textContent = r.days + (r.days === 1 ? " Tag" : " Tage");
    $("#sum-rate").textContent = money(r.rate);
    var ex = r.extras.map(function (e) { return e.label; });
    if (r.fee) ex.push("Zustellung");
    $("#sum-extras").textContent = ex.length ? ex.join(", ") + " (" + money(r.extrasSum + r.fee) + ")" : "keine";
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

  /* ---------- Anfrage absenden ---------- */
  var submitter = "whatsapp";
  $$("[data-channel]", booking).forEach(function (b) {
    b.addEventListener("click", function () { submitter = b.getAttribute("data-channel"); });
  });

  function fmtDate(v) {
    return v ? new Date(v).toLocaleDateString("de-DE", { weekday: "short", day: "2-digit", month: "2-digit", year: "numeric" }) : "";
  }

  booking.addEventListener("submit", function (e) {
    e.preventDefault();
    var err = $("#form-error");
    var r = calc(booking);
    var problems = [];
    if (!booking.name.value.trim()) problems.push("deinen Namen");
    if (!booking.phone.value.trim()) problems.push("deine Telefonnummer");
    if (!r) problems.push("ein gültiges Rückgabedatum nach dem Abholdatum");
    if (!booking.privacy.checked) problems.push("die Zustimmung zur Datenschutzerklärung");
    if (problems.length) {
      err.textContent = "Bitte ergänze noch: " + problems.join(", ") + ".";
      err.hidden = false;
      return;
    }
    err.hidden = true;

    var L = C.locations;
    var lines = [
      "Mietwagen-Anfrage – " + C.company,
      "",
      "Fahrzeug: " + r.car.category + " – " + r.car.name,
      "Abholung: " + fmtDate(booking.from.value) + ", " + booking.fromTime.value + " Uhr – " + L[booking.pickup.value].name,
      "Rückgabe: " + fmtDate(booking.to.value) + ", " + booking.toTime.value + " Uhr – " + L[booking.dropoff.value].name,
      "Mietdauer: " + r.days + (r.days === 1 ? " Tag" : " Tage")
    ];
    if (booking.flight.value.trim()) lines.push("Flugnummer: " + booking.flight.value.trim());
    lines.push("Extras: " + (r.extras.length ? r.extras.map(function (x) { return x.label; }).join(", ") : "keine"));
    lines.push("Geschätzter Preis: " + money(r.total));
    lines.push("");
    lines.push("Name: " + booking.name.value.trim());
    lines.push("Telefon: " + booking.phone.value.trim());
    if (booking.email.value.trim()) lines.push("E-Mail: " + booking.email.value.trim());
    if (booking.hotel.value.trim()) lines.push("Hotel: " + booking.hotel.value.trim());
    if (booking.message.value.trim()) { lines.push(""); lines.push("Nachricht: " + booking.message.value.trim()); }

    var text = lines.join("\n");
    if (submitter === "email") {
      window.location.href = "mailto:" + C.email +
        "?subject=" + encodeURIComponent("Mietwagen-Anfrage " + booking.name.value.trim()) +
        "&body=" + encodeURIComponent(text);
    } else {
      window.open(waBase + "?text=" + encodeURIComponent(text), "_blank", "noopener");
    }
  });

  /* ---------- Google Maps erst nach Klick (DSGVO) ---------- */
  $("#load-map").addEventListener("click", function () {
    var q = encodeURIComponent(C.address);
    $("#map").innerHTML = '<iframe title="Karte ' + C.company + '" src="https://maps.google.com/maps?q=' + q +
      '&z=13&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>';
    $("#map").classList.add("map-loaded");
  });

  updateQuick();
  updateBooking();
})();

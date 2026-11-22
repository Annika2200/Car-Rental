/* Hinweis auf den Rechtsseiten, wenn eine andere Sprache als Deutsch gewählt wurde */
(function () {
  var notes = {
    en: ["This page is only available in German.", "Back to homepage"],
    ar: ["هذه الصفحة متاحة باللغة الألمانية فقط.", "العودة إلى الصفحة الرئيسية"],
    ru: ["Эта страница доступна только на немецком языке.", "На главную"],
    fr: ["Cette page est uniquement disponible en allemand.", "Retour à l'accueil"]
  };
  var l = null;
  try { l = localStorage.getItem("hd-lang"); } catch (e) {}
  if (!notes[l]) return;
  var box = document.createElement("p");
  box.className = "legal-note";
  box.lang = l;
  box.dir = l === "ar" ? "rtl" : "ltr";
  box.innerHTML = notes[l][0] + ' <a href="index.html?lang=' + l + '">' + notes[l][1] + "</a>";
  var c = document.querySelector(".legal .container");
  if (c) c.insertBefore(box, c.firstChild);
  var back = document.querySelector(".site-header .back-label");
  if (back) back.textContent = notes[l][1];
})();

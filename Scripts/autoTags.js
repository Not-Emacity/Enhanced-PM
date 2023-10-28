// @name        Auto Tags
// @version     1.0
// @author      Emacity
// @description Automatically applies [DEPRECATED] and Bus tags to select models

(function() {
  'use strict';

  const electric = "#CheckBox36";
  const bus = "#CheckBox21";
  const make = "#frm > fieldset:nth-child(3) > div.row.margin-bottom-10 > div:nth-child(1) > select";
  const model = "#model";

  //ADD HYBRID/EV ONLY MODELS HERE
  const evModels = new Set([
    "e-tron",
    "Q4 e-tron",
    "e-tron GT",
    "i3",
    "i4",
    "i5",
    "i7",
    "i8",
    "iX",
    "XM",
    "EQA",
    "EQB",
    "EQC",
    "EQE",
    "EQS",
    "EQT",
    "EQV",
    "EQXX",
    "C40",
    "Hummer EV",
    "P1",
    "Artura",
    "LaFerrari",
    "SF90",
    "296",
    "918",
    "Taycan",
    "I-Pace",
    "Insight",
    "Prius",
    "bZ4X",
    "Lyriq",
    "GV60",
    "MX-30",
    "Mustang Mach-E",
    "Niro",
    "EV6",
    "Ioniq",
    "Ioniq 5",
    "Ioniq 6",
    "Solterra",
    "Ariya",
    "Leaf",
    "ID.3",
    "ID.4",
    "ID.5",
    "ID.6",
    "ID.7",
    "ID.Buzz",
    "Bolt"
  ]);

  //ADD HYBRID/EV ONLY MAKES HERE
  const evMakes = new Set([
    "Th!nk",
    "VinFast",
    "Canoo",
    "Polestar",
    "Fisker",
    "Karma",
    "Rivian",
    "Lucid",
    "Tesla"
  ]);

  //ADD BRAND EXCLUSIONS FOR EV HERE
  const evExceptions = new Set([
    "Irizar",
    "Roewe"
  ]);

  //ADD BUS MODELS HERE
  const busModels = new Set([
    "7000/7700",
    "7000A/7700A",
    "7900",
    "8500",
    "8700",
    "8900",
    "9300",
    "9500",
    "9700",
    "9800",
    "9900",
    "B10",
    "B12",
    "B57",
    "B58",
    "B6",
    "B7",
    "B9M",
    "C10",
    "Civis 12",
    "Civis 18"
  ])

  //ADD BUS ONLY MAKES HERE
  const busMakes = new Set([
    "Thomas",
    "IC",
    "Irizar",
    "Van Hool",
    "Prevost",
    "NABI",
    "Gillig",
    "MCI",
    "Blue Bird"
  ]);

  //ADD BRAND EXCLUSIONS FOR BUS HERE
  const busExceptions = new Set([
    "TagAZ"
  ])

  //ADD MODEL EXCLUSIONS FOR BUS BRANDS
  const busModelExceptions = new Set([
    "1000 1652"
  ]);

  console.log("Working!");
  document.querySelector(model).onchange = function() {
    // checkEV();
    checkBus();
    changeModel(document.querySelector(model).value);
  };

  // function checkEV() {
  //   if (evModels.has(document.querySelector(model).options[document.querySelector(model).selectedIndex].text) && !evExceptions.has(document.querySelector(make).options[document.querySelector(make).selectedIndex].text)) {
  //     document.querySelector(electric).checked = true;

  //   } else if (evMakes.has(document.querySelector(make).options[document.querySelector(make).selectedIndex].text)) {
  //     document.querySelector(electric).checked = true;

  //   } else {
  //     document.querySelector(electric).checked = false;
  //   }
  // };

  function checkBus() {
    if (busModels.has(document.querySelector(model).options[document.querySelector(model).selectedIndex].text) && !busExceptions.has(document.querySelector(make).options[document.querySelector(make).selectedIndex].text)) {
      document.querySelector(bus).checked = true;

    } else if (busMakes.has(document.querySelector(make).options[document.querySelector(make).selectedIndex].text) && !busModelExceptions.has(document.querySelector(model).options[document.querySelector(model).selectedIndex].text)) {
      document.querySelector(bus).checked = true;

    } else {
      document.querySelector(bus).checked = false;
    }
  }

})();
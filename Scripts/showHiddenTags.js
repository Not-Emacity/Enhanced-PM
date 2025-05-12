// @name        Show Hidden Tags
// @version     1.0
// @author      Emacity
// @description Adds Oldtimer and Tuning tags to upload page

(function() {
  'use strict';

  var newTagsHTML = `
  <div id="collapse-One" class="panel-collapse collapse in" aria-expanded="true" style="">
                    <div class="panel-body">
						<div class="inline-group">
              <label class="checkbox-inline"><input id="CheckBox4" name="CheckBox[4]" type="checkbox"> abandoned vehicle</label>
              <label class="checkbox-inline"><input id="CheckBox47" name="CheckBox[47]" type="checkbox"> aerial device truck</label>
              <label class="checkbox-inline"><input id="CheckBox5" name="CheckBox[5]" type="checkbox"> aerography</label>
              <label class="checkbox-inline"><input id="CheckBox18" name="CheckBox[18]" type="checkbox"> ambulance</label>
              <label class="checkbox-inline"><input id="CheckBox52" name="CheckBox[52]" type="checkbox"> archive photo</label>
              <label class="checkbox-inline"><input id="CheckBox16" name="CheckBox[16]" type="checkbox"> armored</label>
              <label class="checkbox-inline"><input id="CheckBox21" name="CheckBox[21]" type="checkbox"> bus</label>
              <label class="checkbox-inline"><input id="CheckBox8" name="CheckBox[8]" type="checkbox"> cabriolet</label>
              <label class="checkbox-inline"><input id="CheckBox20" name="CheckBox[20]" type="checkbox"> cash-in-transit vehicle</label>
              <label class="checkbox-inline"><input id="CheckBox38" name="CheckBox[38]" type="checkbox"> concrete mixer</label>
              <label class="checkbox-inline"><input id="CheckBox14" name="CheckBox[14]" type="checkbox"> damaged</label>
              <label class="checkbox-inline"><input id="CheckBox26" name="CheckBox[26]" type="checkbox"> deliberately changed license plate</label>
              <label class="checkbox-inline"><input id="CheckBox53" name="CheckBox[53]" type="checkbox"> drilling rig</label>
              <label class="checkbox-inline"><input id="CheckBox40" name="CheckBox[40]" type="checkbox"> dump truck</label>
              <label class="checkbox-inline"><input id="CheckBox15" name="CheckBox[15]" type="checkbox"> fire appliance</label>
              <label class="checkbox-inline"><input id="CheckBox42" name="CheckBox[42]" type="checkbox"> garbage truck</label>
              <label class="checkbox-inline"><input id="CheckBox58" name="CheckBox[58]" type="checkbox"> hearse</label>
              <label class="checkbox-inline"><input id="CheckBox36" name="CheckBox[36]" type="checkbox"> hybrid/electric vehicle</label>
              <label class="checkbox-inline"><input id="CheckBox27" name="CheckBox[27]" type="checkbox"> improper parking</label>
              <label class="checkbox-inline"><input id="CheckBox9" name="CheckBox[9]" type="checkbox"> limousine</label>
              <label class="checkbox-inline"><input id="CheckBox57" name="CheckBox[57]" type="checkbox"> motorcycle</label>
              <label class="checkbox-inline"><input id="CheckBox46" name="CheckBox[46]" type="checkbox"> motorhome</label>
              <label class="checkbox-inline"><input id="CheckBox13" name="CheckBox[13]" type="checkbox"> new letter combination</label>
              <label class="checkbox-inline"><input id="CheckBox43" name="CheckBox[43]" type="checkbox"> non-standard plate</label>
              <label class="checkbox-inline"><input id="CheckBox50" name="CheckBox[50]" type="checkbox"> plate for brand or model of vehicle</label>
              <label class="checkbox-inline"><input id="CheckBox23" name="CheckBox[23]" type="checkbox"> police</label>
              <label class="checkbox-inline"><input id="CheckBox1" name="CheckBox[1]" type="checkbox"> road accident</label>
              <label class="checkbox-inline"><input id="CheckBox56" name="CheckBox[56]" type="checkbox"> spyspot</label>
              <label class="checkbox-inline"><input id="CheckBox39" name="CheckBox[39]" type="checkbox"> tank truck</label>
              <label class="checkbox-inline"><input id="CheckBox24" name="CheckBox[24]" type="checkbox"> taxicab</label>
              <label class="checkbox-inline"><input id="CheckBox45" name="CheckBox[45]" type="checkbox"> test drive</label>
              <label class="checkbox-inline"><input id="CheckBox49" name="CheckBox[49]" type="checkbox"> tow truck</label>
              <label class="checkbox-inline"><input id="CheckBox41" name="CheckBox[41]" type="checkbox"> tractor unit</label>
              <label class="checkbox-inline"><input id="CheckBox2" name="CheckBox[2]" type="checkbox"> traffic code violation</label>
              <label class="checkbox-inline"><input id="CheckBox33" name="CheckBox[33]" type="checkbox"> trailer</label>
              <label class="checkbox-inline"><input id="CheckBox19" name="CheckBox[19]" type="checkbox"> training vehicle</label>
              <label class="checkbox-inline"><input id="CheckBox25" name="CheckBox[25]" type="checkbox"> transferred/re-issued plate</label>
              <label class="checkbox-inline"><input id="CheckBox22" name="CheckBox[22]" type="checkbox"> truck</label>
              <label class="checkbox-inline"><input id="CheckBox37" name="CheckBox[37]" type="checkbox"> truck-mounted crane</label>
              <label class="checkbox-inline"><input id="CheckBox6" name="CheckBox[6]" type="checkbox"> unmarked with emergency lights</label>
              <label class="checkbox-inline"><input id="CheckBox44" name="CheckBox[44]" type="checkbox"> vinyl wrapping</label>
              <label class="checkbox-inline"><input id="CheckBox48" name="CheckBox[48]" type="checkbox"> wedding car</label>
              <label class="checkbox-inline"><input id="CheckBox10" name="CheckBox[10]" type="checkbox"> oldtimer</label>
              <label class="checkbox-inline"><input id="CheckBox28" name="CheckBox[28]" type="checkbox"> tuning</label>
                      </div>
                    </div>
                </div>`;
  
  document.getElementById('collapse-One').outerHTML = newTagsHTML;
})();

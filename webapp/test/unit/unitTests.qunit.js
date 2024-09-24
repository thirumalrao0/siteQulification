/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"rbx.week5.109/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});

import { rank2stat } from "./rank2stat.js";
import { rank2ssbs } from "./rank2ssbs.js";

// from Thomas Vosegaard
export function csa2xyNMR(values, verbose = false) {
	const iso = (values[0] + values[1] + values[2]) / 3.0;
	if (verbose) console.log(" iso :", iso);
	const sorted = values.sort((a, b) => Math.abs(a - iso) - Math.abs(b - iso));
	const zz = sorted[2]; // largest
	const xx = sorted[1]; // second largest
	const yy = sorted[0]; // smallest
	const sAni = zz - iso; // > 0
	const eta = Math.abs(sAni) < 1e-10 ? 0.0 : (yy - xx) / sAni;
	const mi = Math.min(yy, xx, zz);
	const ma = Math.max(yy, xx, zz);
	if (verbose) console.log("P iso :", iso, " sAni :", sAni, " eta :", eta);
	//const eta = (yy - xx) / sAni;
	var integral = 0.0;
	let etaRoundedDown = (Math.floor(eta * 100) / 100).toFixed(2); // Rounds down to 2 decimal places and converts to a string
	let etaRoundedUp = (Math.ceil(eta * 100) / 100).toFixed(2); // Rounds down to 2 decimal places and converts to a string
	const factorCorr = (eta - etaRoundedDown) * 100;
	if (verbose) console.log("factorCorr :", factorCorr);
	const crudeArrayDown = rank2stat[etaRoundedDown];
	if (verbose) console.log("etaString :", etaRoundedDown);
	if (verbose) console.log("etaString :", etaRoundedUp);
	if (verbose) console.log("etaRoundedDown :", rank2stat[etaRoundedDown].i0);
	if (verbose) console.log("etaRoundedUp :", rank2stat[etaRoundedUp].i0);
	const i0Down = rank2stat[etaRoundedDown].i0;
	const crudeArrayUp = rank2stat[etaRoundedUp];
	const i0Up = rank2stat[etaRoundedUp].i0;

	let fullDown = new Array(crudeArrayDown.i0).fill(0.0);
	fullDown = fullDown.concat(crudeArrayDown.y);
	let fullUp = new Array(crudeArrayUp.i0).fill(0.0);
	fullUp = fullUp.concat(crudeArrayUp.y);

	var x = [];
	var y = [];
	var previousValue = -100;
	var integralDown = -100;
	var integralUp = -100;

	for (var i = 0; i < crudeArrayDown.y.length; i++) {
		const valx = rank2stat.x.origin + (i0Down + i) * rank2stat.x.increment;
		const valxFiexedAnis = (sAni * valx) / 1000.0 + iso;
		x.push(valxFiexedAnis);
		// first order correction
		let valy0 = crudeArrayDown.y[i];
		const ishift = i + i0Down - i0Up;
		if (ishift > 0 && ishift < crudeArrayUp.y.length) {
			let diff = crudeArrayUp.y[ishift] - crudeArrayDown.y[i];
			valy0 += diff * factorCorr;
		}

		// integrate
		integral += valy0;
		if (previousValue >= valy0) {
			// DEBU
			integralUp += valy0;
		} else {
			integralDown += valy0;
		}

		previousValue = valy0;
		y.push(valy0);
	}

	if (verbose)
		console.log(" ratio integralDown/integralUp :", integralDown / integralUp);
	const source = {
		comment:
			"here will come details about the origin of the data: csa2xyNMR from solidStateNMRCSA-reader",
	};
	return { x, y, iso, sAni, eta, mi, ma, integral, source };
}

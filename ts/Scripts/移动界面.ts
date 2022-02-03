import { ins } from "../InstructionSet.js"
import { PLACES } from "../GameData.js"
import { sm } from "../ScriptManager.js";
import { 地点界面 } from "./地点界面.js"

export function* 移动界面() {

	// unpack the element into [place, innerplaces]
	let UnpackElement = (element: any): [string, any] => {
		// If toCheck is a string list
		if(Array.isArray(element)) {
			return [
				<string>element[0],
				element[1]
			];
		}
		// If toCheck is a string
		else {
			return [
				<string><unknown>element,
				[]
			];
		}
	};

	// Cal place candidates According to current place
	let placeCands:any = PLACES;
	for (const current of sm.gd.place) {
		let succeed: boolean = false;
		for(let i=0; i<placeCands.length; i++) {
			const element = placeCands[i];

			let [toCheck, innerPlaces] = UnpackElement(element);

			// If match, we are now at here,
			//	so, iterate inner from here.
			if(current == toCheck) {
				placeCands = innerPlaces;
				succeed = true;
				break;
			}
		}
		// If not found, report the error,
		// and just go following.
		if(!succeed) {
			console.error(
`Current '${current}' not found in PLACES.
Current: ${sm.gd.place}
PLACES: ${PLACES}`
			);
			break;
		}
	}

	// ====== Regist buttons =======
	{
		// outer option
		ins.buttonStyle = "place_button";
		if(sm.gd.place.length > 0) {
			ins.lbtn("向外", () => {
				sm.gd.place.pop();
				sm.Push(移动界面());
			});
		}

		// inner options
		for(let i = 0; i < placeCands.length; i++) {
			const element = placeCands[i];

			let [cand, innerPlaces] = UnpackElement(element);

			// Enter into the place
			ins.buttonStyle = "place_button";
			ins.lbtn(cand, () => {
				sm.gd.place.push(cand);
				// If we reach the leaf, enter 地点界面
				if(innerPlaces.length == 0)
					sm.Push(地点界面());
				// If we not reach the leaf, continue enter 移动界面
				else
					sm.Push(移动界面());
			});
		}
	}

	// Layout
	ins.linebreak();
}
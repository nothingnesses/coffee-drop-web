/*
TODO:
* Periodcally ping API to update map.
* Use `Set` to store locations, to prevent duplicates.
*/

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
const show_navigation = () => {
	const x = document.getElementById("navbar");
	if (!x.classList.contains("responsive")) {
		x.className += " responsive";
	} else {
		x.className = "top-nav";
	}
};

const coffeedrop_locations_api =
	"http://coffeedrop.staging2.image-plus.co.uk/api/locations";
const united_kingdom = { lat: 54.6067501, lng: -4.1019986 };
const map_pin = "./lib/images/map-pin.svg";
const multiplier = 0.8;
const map_pin_dimensions = [multiplier * 84 * 64 / 84, multiplier * 84];
const color_land = "#e6e6e6";
const color_road = "#dcdcdc";
const color_water = "#d2d2d2";

const get_api_json = async (url) => {
	const response = await fetch(url);
	const data = await response.json();
	return data;
};

const range = (start, end) =>
	[...Array(end - start).keys()].map((a) => a + start);

const get_pages_promises = async () => {
	// TODO: This is also page 1, so we could optimise by only fetching other pages.
	const api_data = await get_api_json(coffeedrop_locations_api);
	const pages_promises = range(1, api_data.meta.last_page + 1).map(
		(page_number) => {
			return get_api_json(coffeedrop_locations_api + "?page=" + page_number);
		}
	);
	return await Promise.all(pages_promises).then((pages) => {
		return pages;
	});
};

const get_locations = async (url) => {
	const pages = await get_pages_promises();
	const locations = pages.flatMap((page) => page.data);
	return locations;
};

const initialise_map = async () => {
	const map = new google.maps.Map(document.getElementById("map"), {
		zoom: 5,
		styles: ["administrative", "landscape", "poi"]
			.map((feature_type) => ({
				featureType: feature_type,
				elementType: "geometry",
				stylers: [
					{
						color: color_land,
					},
				],
			}))
			.concat(
				["road", "transit"].map((feature_type) => ({
					featureType: feature_type,
					elementType: "geometry",
					stylers: [
						{
							color: color_road,
						},
					],
				}))
			)
			.concat([
				{
					featureType: "water",
					stylers: [
						{
							color: color_water,
						},
					],
				},
			]),
		center: united_kingdom,
	});
	const locations = await get_locations();
	locations.forEach((location) => {
		const open_times = location.openings.reduce((accumulator, day) => {
			return accumulator + `</br>${day.day}: ${day.open} to ${day.closed}`;
		}, "");
		const content = `Address:</br>
${location.address.line1},</br>
${location.address.line2},</br>
${location.address.city},</br>
${location.address.postcode}</br></br>
Coordinates: ${location.coordinates.latitude}, ${location.coordinates.longitude} </br></br>
Opening times: ${open_times}`;
		const info_window = new google.maps.InfoWindow({
			content: content,
			ariaLabel: location.location,
		});
		const marker = new google.maps.Marker({
			position: new google.maps.LatLng(
				location.coordinates.latitude,
				location.coordinates.longitude
			),
			map: map,
			icon: {
				url: map_pin,
				scaledSize: new google.maps.Size(map_pin_dimensions[0], map_pin_dimensions[1]),
			},
			title: location.location,
		});
		marker.addListener("click", () => {
			info_window.open({
				anchor: marker,
				map,
			});
		});
	});
};

const main = async () => {
	window.initialise_map = initialise_map;
};

main();

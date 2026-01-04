/**
 * Disable Page Visibility API
 * Copyright (C) 2021 Marvin Schopf
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

// Get browser API (works for both Firefox and Chrome)
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

// Event handlers
function blockVisibilityChange(event) {
	event.stopImmediatePropagation();
}

function blockWebkitVisibilityChange(event) {
	event.stopImmediatePropagation();
}

function blockBlur(event) {
	event.stopImmediatePropagation();
}

// Check if extension is enabled and add event listeners if so
browserAPI.storage.sync.get(['enabled'], function(result) {
	const enabled = result.enabled !== false; // Default to true if not set
	
	if (enabled) {
		window.addEventListener("visibilitychange", blockVisibilityChange, true);
		window.addEventListener("webkitvisibilitychange", blockWebkitVisibilityChange, true);
		window.addEventListener("blur", blockBlur, true);
	}
});

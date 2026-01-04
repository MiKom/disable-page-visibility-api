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

// Initialize extension state on install
browserAPI.runtime.onInstalled.addListener(function() {
    // Set default enabled state to true
    browserAPI.storage.sync.get(['enabled'], function(result) {
        if (result.enabled === undefined) {
            browserAPI.storage.sync.set({ enabled: true });
        }
    });
});

// Listen for messages from popup
browserAPI.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'toggleExtension') {
        // The state is already saved by popup.js, we just need to reload active tabs
        reloadActiveTabs();
    }
});

// Function to reload all active tabs to apply the new state
function reloadActiveTabs() {
    browserAPI.tabs.query({}, function(tabs) {
        tabs.forEach(function(tab) {
            // Only reload http/https pages (not chrome:// or about: pages)
            if (tab.url && (tab.url.startsWith('http://') || tab.url.startsWith('https://'))) {
                browserAPI.tabs.reload(tab.id);
            }
        });
    });
}

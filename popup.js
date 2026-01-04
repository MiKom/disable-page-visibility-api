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

// DOM elements
const toggleSwitch = document.getElementById('toggleSwitch');
const statusText = document.getElementById('statusText');

// Load current state when popup opens
browserAPI.storage.sync.get(['enabled'], function(result) {
    const enabled = result.enabled !== false; // Default to true if not set
    toggleSwitch.checked = enabled;
    updateStatusText(enabled);
});

// Handle toggle switch changes
toggleSwitch.addEventListener('change', function() {
    const enabled = toggleSwitch.checked;
    
    // Save the new state
    browserAPI.storage.sync.set({ enabled: enabled }, function() {
        updateStatusText(enabled);
        
        // Notify background script of the change
        browserAPI.runtime.sendMessage({ action: 'toggleExtension', enabled: enabled });
    });
});

// Update status text based on enabled state
function updateStatusText(enabled) {
    if (enabled) {
        statusText.textContent = 'Enabled';
        statusText.classList.remove('disabled');
    } else {
        statusText.textContent = 'Disabled';
        statusText.classList.add('disabled');
    }
}

# Auto Approval Chrome Extension (AWS SSO Login)

The extension is for lazy ass that is too lazy for 2 manual mouse clicks.

## Features

- Automatically approves items based on predefined criteria.
- Runs in the background on specified URLs.

## Installation

1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode**.
4. Click **Load unpacked** and select this extension's directory.

## Usage

- The extension will activate on matching URLs as defined in `manifest.json`.
- Approval actions are handled by `contentscript.js`.

## Permissions

- Access to specified web pages (see `manifest.json`).
- Scripting permissions to interact with page content.

## Contributing

Pull requests are welcome!

## License

MIT
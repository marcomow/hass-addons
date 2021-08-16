# Home Assistant Petoneer Smart Dot Add-on

An add-on to integrate [Petoneer Smart Dot](https://www.petoneer.com/playdot) with Home Assistant.

# Installation
- Head to Supervisor => Add-on Store.
- Click on the three dots on the top right, select Repositories.
- Add this repository https://github.com/marcomow/hass-addons.
- A new section should appear "marcomow Home Assistant add-on repo", click on "Petoneer Smart Dot controller", install.

# Setup
## Input Select
- Head to Configuration -> Helpers.
- Create a new "Input Select".
- Name it "Smartdot" and add the following options: stop, preset_small, preset_medium, preset_large. 
## Automation
- Head to Configuration -> Automations.
- Add automation.
- Click on the three dots on the top right, select Edit in YAML.
- Copy-paste the following code.
``` yaml
alias: Smartdot Handler
description: ''
trigger:
  - platform: state
    entity_id: input_select.smartdot
condition: []
action:
  - service: hassio.addon_stdin
    data:
      addon: 96fe3986_smartdot
      input: '{{ states(''input_select.smartdot'') }}'
mode: single
```
## Lovelace interface
Add a new card by entity and select input_select.smartdot.

Enjoy!

# Credits
I learned how to reverse engineer a bluetooth device thanks to [@urish](https://github.com/urish)! 
In particular I took inspiration from these articles:
- [Reverse Engineering a Bluetooth Lightbulb](https://urish.medium.com/reverse-engineering-a-bluetooth-lightbulb-56580fcb7546)
- [Start Building with Web Bluetooth and Progressive Web Apps](https://urish.medium.com/start-building-with-web-bluetooth-and-progressive-web-apps-6534835959a6)

Without the open source code of [@balda](https://github.com/balda) I would never had properly setup the Dockerfile, I heavily took inspiration from [this repository](https://github.com/balda/ruuvitag-discovery).

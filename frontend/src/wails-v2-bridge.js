import * as Backend from "../wailsjs/go/backend/Backend";
import { EventsOn } from "../wailsjs/runtime/runtime";

// Preserve Wails v2's own internal window.wails object.
// Only expose the generated Backend bindings and a separate
// compatibility object for the old OCM event API.
window.backend = {
  Backend
};

window.ocmRuntime = {
  Events: {
    On: EventsOn
  }
};

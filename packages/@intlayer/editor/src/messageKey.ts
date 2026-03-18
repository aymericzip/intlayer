export enum MessageKey {
  /** Client → editor: announces the client is ready (also used as response to ARE_YOU_THERE) */
  INTLAYER_CLIENT_READY = 'INTLAYER_CLIENT_READY',
  /** Editor → client: asks if the client is still alive */
  INTLAYER_ARE_YOU_THERE = 'INTLAYER_ARE_YOU_THERE',
  /** Editor → client: instructs the client to activate the editor selector */
  INTLAYER_EDITOR_ACTIVATE = 'INTLAYER_EDITOR_ACTIVATE',
  /** Client → editor: instructs the editor that the client is enabled */
  INTLAYER_EDITOR_ENABLED = 'INTLAYER_EDITOR_ENABLED',

  /** Client → editor: send information related the app */
  INTLAYER_CONFIGURATION = 'INTLAYER_CONFIGURATION',
  INTLAYER_CURRENT_LOCALE = 'INTLAYER_CURRENT_LOCALE',
  INTLAYER_URL_CHANGE = 'INTLAYER_URL_CHANGE',

  /** Client → editor: load and update content */
  INTLAYER_LOCALE_DICTIONARIES_CHANGED = 'INTLAYER_LOCALE_DICTIONARIES_CHANGED',
  INTLAYER_DISTANT_DICTIONARIES_CHANGED = 'INTLAYER_DISTANT_DICTIONARIES_CHANGED',

  /** Client → editor & Editor → client: Update focus and changed content */
  INTLAYER_HOVERED_CONTENT_CHANGED = 'INTLAYER_HOVERED_CONTENT_CHANGED',
  INTLAYER_FOCUSED_CONTENT_CHANGED = 'INTLAYER_FOCUSED_CONTENT_CHANGED',
  INTLAYER_EDITED_CONTENT_CHANGED = 'INTLAYER_EDITED_CONTENT_CHANGED',

  /** Client → editor: Helper to sync iframe client reactivity on click client */
  INTLAYER_IFRAME_CLICKED = 'INTLAYER_IFRAME_CLICKED',
}

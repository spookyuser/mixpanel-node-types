// Type definitions for mixpanel-browser v2.46.0+
// Project: https://github.com/mixpanel/mixpanel-js
// Definitions by: Giedrius Grabauskas <https://github.com/GiedriusGrabauskas>, Carlos Ambrogi <https://github.com/cambrogi>, Tim Buckland <https://github.com/timtől>, Zheyang Song <https://github.com/ZheyangSong>, Vihan Bhargava <https://github.com/vihanb>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// Based on the provided mixpanel-core.js source code
// eslint-disable-next-line @typescript-eslint/no-triple-slash-reference
/// <reference types="node" />

// Basic type for Mixpanel properties
export type MixpanelType =
  | string
  | number
  | boolean
  | Date
  | Array<MixpanelType>
  | { [key: string]: MixpanelType }
  | null
  | undefined

// Generic properties object
export type Properties = Record<string, MixpanelType>

// Type for Query Selectors used in DOM tracking
export type Query = string | Element | Element[] | NodeList

// Type for the return value of track calls
export type TrackResponse = object | false

// Type for the callback function
export type ResponseCallback = (
  response: number | Record<string, any>,
  data?: string
) => void // data is the stringified payload

// Configuration Options
export interface Config {
  /** Host for API requests (e.g., 'https://api-js.mixpanel.com'). */
  api_host?: string
  /** Endpoints for different request types. */
  api_routes?: {
    track?: string
    engage?: string
    groups?: string
    record?: string
  }
  /** HTTP method for tracking requests ('POST' or 'GET'). */
  api_method?: "POST" | "GET"
  /** Transport for sending requests ('XHR' or 'sendBeacon'). */
  api_transport?: "XHR" | "sendBeacon"
  /** Payload format ('base64' or 'json'). */
  api_payload_format?: "base64" | "json"
  /** Host for the Mixpanel UI application (e.g., 'https://mixpanel.com'). */
  app_host?: string
  /** Enable automatic event tracking (integrations). */
  autocapture?:
    | boolean
    | {
        css_selector_limit?: number
        dom_event_limit?: number
        element_attribute_limit?: number
      }
  /** CDN host for retrieving assets (e.g., 'https://cdn.mxpnl.com'). */
  cdn?: string
  /** If true, cookie will be set with SameSite=None; Secure. */
  cross_site_cookie?: boolean
  /** Allow cookies to span subdomains. */
  cross_subdomain_cookie?: boolean
  /** Custom error reporting function. */
  error_reporter?: (error: Error, originalError?: Error) => void
  /** Persistence mechanism ('cookie' or 'localStorage'). */
  persistence?: "cookie" | "localStorage"
  /** Name for the persistence store (cookie or localStorage key). */
  persistence_name?: string
  /** Override value for cookie domain. */
  cookie_domain?: string
  /** Name for the super properties cookie. */
  cookie_name?: string
  /** Function to call after the library is loaded. */
  loaded?: (mixpanel: MixpanelLib) => void
  /** Internal loader identifier. */
  mp_loader?: string | null
  /** Track UTM parameters and marketing campaigns. */
  track_marketing?: boolean
  /** Enable automatic page view tracking. boolean for SPA (hash changes), 'full-url' for full URL changes including query/hash, 'url-with-path-and-query-string' for path + query changes, 'url-with-path' for path changes */
  track_pageview?:
    | boolean
    | "full-url"
    | "url-with-path-and-query-string"
    | "url-with-path"
  /** Skip persisting first touch marketing data (utm params). */
  skip_first_touch_marketing?: boolean
  /** @deprecated Store Google Ads (gclid) and UTM parameters as super properties. */
  store_google?: boolean
  /** @deprecated Stop persisting UTM parameters in cookies/localStorage. */
  stop_utm_persistence?: boolean
  /** Persist referrer information. */
  save_referrer?: boolean
  /** Enable test mode (sends data to /decide?test=1). */
  test?: boolean
  /** Enable verbose logging output. */
  verbose?: boolean
  /** Send requests via `<img>` tags (forces GET, no callbacks). */
  img?: boolean
  /** Enable debug mode (more logging). */
  debug?: boolean
  /** Timeout in milliseconds for track_links/track_forms. */
  track_links_timeout?: number
  /** Super properties cookie expiration in days. */
  cookie_expiration?: number
  /** If true, check for and import data from the older Mixpanel JS library cookie. */
  upgrade?: boolean
  /** Disable all persistence (cookie/localStorage). */
  disable_persistence?: boolean
  /** @deprecated Alias for disable_persistence. */
  disable_cookie?: boolean
  /** Mark cookies as Secure (HTTPS only). */
  secure_cookie?: boolean
  /** Track IP address of the user. */
  ip?: boolean
  /** Opt users out of tracking by default. */
  opt_out_tracking_by_default?: boolean
  /** Opt users out of persistence storage by default. */
  opt_out_persistence_by_default?: boolean
  /** Persistence type for GDPR opt-out ('localStorage' or 'cookie'). */
  opt_out_tracking_persistence_type?: "localStorage" | "cookie"
  /** Prefix for the GDPR opt-out cookie/localStorage key. */
  opt_out_tracking_cookie_prefix?: string | null
  /** List of property names to exclude from track() calls. */
  property_blacklist?: string[]
  /** Extra headers for XHR requests. */
  xhr_headers?: Record<string, string>
  /** Ignore the browser's Do Not Track setting. */
  ignore_dnt?: boolean
  /** Enable request batching. */
  batch_requests?: boolean
  /** Maximum number of items per batch request. */
  batch_size?: number
  /** Maximum time in milliseconds between sending batch requests. */
  batch_flush_interval_ms?: number
  /** Timeout in milliseconds for batch requests before retry. */
  batch_request_timeout_ms?: number
  /** Automatically start batch senders on init. */
  batch_autostart?: boolean
  /** Hooks for modifying data before sending. */
  hooks?: {
    before_send_track?: (
      data: Properties
    ) => Properties | null | undefined | void
    before_send_people?: (
      data: Properties
    ) => Properties | null | undefined | void
    before_send_groups?: (
      data: Properties
    ) => Properties | null | undefined | void
    // Potentially others if added in the future
  }
  /** Regex for class names to block recording. */
  record_block_class?: RegExp
  /** CSS selector for elements to block recording (besides default img, video). */
  record_block_selector?: string
  /** Enable canvas recording. */
  record_canvas?: boolean
  /** Enable font collection during recording. */
  record_collect_fonts?: boolean
  /** Idle timeout in milliseconds for session recording. */
  record_idle_timeout_ms?: number
  /** Regex for class names to mask text content during recording. */
  record_mask_text_class?: RegExp
  /** CSS selector for elements to mask text content during recording. */
  record_mask_text_selector?: string
  /** Maximum duration in milliseconds for a single recording chunk. */
  record_max_ms?: number
  /** Minimum duration in milliseconds before starting a recording. */
  record_min_ms?: number
  /** Percentage of sessions to record (0-100). */
  record_sessions_percent?: number
  /** URL source for the recorder bundle. */
  recorder_src?: string

  // Undocumented or less common options from the code might exist
  token?: string // Added internally during init
  callback_fn?: string // Added internally during init
  name?: string // Added internally during init
}

// Options for track method
export interface TrackOptions {
  /** Transport method ('xhr' or 'sendBeacon'). */
  transport?: "xhr" | "sendBeacon"
  /** Send the track request immediately, bypassing batching. */
  send_immediately?: boolean
  /** Timeout in milliseconds for XHR requests (used internally if transport='xhr'). */
  timeout_ms?: number
  /** Internal flag to skip before_send hooks. */
  skip_hooks?: boolean
  /** Internal flag for ignoring JSON parse errors in verbose mode. */
  ignore_json_errors?: boolean
}

// Options for track_pageview method
export interface TrackPageViewOptions {
  /** Custom event name for the page view event (default: '$mp_web_page_view'). */
  event_name?: string
}

// Options for register methods
export interface RegisterOptions {
  /** Whether to store the properties in persistent storage (default: true). */
  persistent?: boolean
  /** Number of days since last visit to keep persistent properties (default: cookie_expiration). */
  days?: number
}

// Base options for GDPR methods
export interface GDPROptions {
  /** Persistence mechanism ('localStorage' or 'cookie'). Defaults to instance config. */
  persistence_type?: "localStorage" | "cookie"
  /** Custom prefix for the opt-out cookie/localStorage key. Defaults to instance config. */
  cookie_prefix?: string | null
  /** Cookie expiration in days. Defaults to instance config. */
  cookie_expiration?: number
  /** Custom cookie domain. Defaults to instance config. */
  cookie_domain?: string
  /** Set cross-site cookie attribute. Defaults to instance config. */
  cross_site_cookie?: boolean
  /** Set cross-subdomain cookie attribute. Defaults to instance config. */
  cross_subdomain_cookie?: boolean
  /** Set secure cookie attribute. Defaults to instance config. */
  secure_cookie?: boolean
  /** Ignore Do Not Track browser setting. Defaults to instance config. */
  ignore_dnt?: boolean
}

// Options for opt_in_tracking method
export interface OptInTrackingOptions extends GDPROptions {
  /** Function to track the opt-in event (default: current instance's track). */
  track?: (event_name: string, properties?: Properties) => void
  /** Event name for the opt-in event (default: '$opt_in'). */
  track_event_name?: string
  /** Properties to include with the opt-in event. */
  track_properties?: Properties
  /** Re-enable persistence if previously disabled (default: true). */
  enable_persistence?: boolean
}

// Options for opt_out_tracking method
export interface OptOutTrackingOptions extends GDPROptions {
  /** Delete the user's profile and clear charges (default: true). */
  delete_user?: boolean
  /** Clear all persisted data (super properties, distinct_id, etc.) (default: true). */
  clear_persistence?: boolean
}

// Options for clear_opt_in_out_tracking method
export interface ClearOptInOutOptions extends GDPROptions {
  /** Re-enable persistence if previously disabled (default: true). */
  enable_persistence?: boolean
}

// Represents the Mixpanel People API interface
export interface MixpanelPeople {
  /**
   * Set properties on the current user's profile.
   * @param prop - Property name or object of properties.
   * @param to - Value for the property if `prop` is a string.
   * @param callback - Optional callback function.
   */
  set(
    prop: string | Properties,
    to?: MixpanelType,
    callback?: ResponseCallback
  ): void

  /**
   * Set properties on the current user's profile only if they are not already set.
   * @param prop - Property name or object of properties.
   * @param to - Value for the property if `prop` is a string.
   * @param callback - Optional callback function.
   */
  set_once(
    prop: string | Properties,
    to?: MixpanelType,
    callback?: ResponseCallback
  ): void

  /**
   * Unset properties on the current user's profile.
   * @param props - Property name or array of property names.
   * @param callback - Optional callback function.
   */
  unset(props: string | string[], callback?: ResponseCallback): void

  /**
   * Increment a numeric property or multiple properties.
   * @param prop - Property name or object of properties to increment.
   * @param by - Amount to increment if `prop` is a string (default: 1).
   * @param callback - Optional callback function.
   */
  increment(
    prop: string | Properties,
    by?: number,
    callback?: ResponseCallback
  ): void

  /**
   * Append a value to a list-type property.
   * @param prop - Property name or object of properties to append to.
   * @param value - Value to append if `prop` is a string.
   * @param callback - Optional callback function.
   */
  append(
    prop: string | Properties,
    value?: MixpanelType,
    callback?: ResponseCallback
  ): void

  /**
   * Remove a value from a list-type property.
   * @param prop - Property name or object of properties to remove from.
   * @param value - Value to remove if `prop` is a string.
   * @param callback - Optional callback function.
   */
  remove(
    prop: string | Properties,
    value?: MixpanelType,
    callback?: ResponseCallback
  ): void

  /**
   * Merge a value into a list-type property, ensuring uniqueness.
   * @param prop - Property name or object of properties to union.
   * @param value - Value to union if `prop` is a string.
   * @param callback - Optional callback function.
   */
  union(
    prop: string | Properties,
    value?: MixpanelType,
    callback?: ResponseCallback
  ): void

  /**
   * Record a transaction.
   * @param amount - Transaction amount.
   * @param properties - Optional properties describing the transaction.
   * @param callback - Optional callback function.
   */
  track_charge(
    amount: number,
    properties?: Properties,
    callback?: ResponseCallback
  ): void

  /**
   * Clear all recorded transactions.
   * @param callback - Optional callback function.
   */
  clear_charges(callback?: ResponseCallback): void

  /**
   * Delete the current user's profile.
   * @param callback - Optional callback function.
   */
  delete_user(callback?: ResponseCallback): void

  /**
   * @deprecated People identification is now handled by the main `identify` method.
   * Set the distinct_id for the current user in People Analytics.
   */
  identify(distinct_id: string): void // Deprecated, but might still be used.

  // Internal or less common methods might exist
  _init(mixpanel_instance: MixpanelLib): void
  _flush(
    _set_callback?: ResponseCallback,
    _add_callback?: ResponseCallback,
    _append_callback?: ResponseCallback,
    _set_once_callback?: ResponseCallback,
    _union_callback?: ResponseCallback,
    _unset_callback?: ResponseCallback,
    _remove_callback?: ResponseCallback
  ): void
  toString(): string
  _identify_called(): boolean
}

// Represents the Mixpanel Group API interface
export interface MixpanelGroup {
  /**
   * Set properties on the group profile.
   * @param prop - Property name or object of properties.
   * @param to - Value for the property if `prop` is a string.
   * @param callback - Optional callback function.
   */
  set(
    prop: string | Properties,
    to?: MixpanelType,
    callback?: ResponseCallback
  ): void

  /**
   * Set properties on the group profile only if they are not already set.
   * @param prop - Property name or object of properties.
   * @param to - Value for the property if `prop` is a string.
   * @param callback - Optional callback function.
   */
  set_once(
    prop: string | Properties,
    to?: MixpanelType,
    callback?: ResponseCallback
  ): void

  /**
   * Unset properties on the group profile.
   * @param props - Property name or array of property names.
   * @param callback - Optional callback function.
   */
  unset(props: string | string[], callback?: ResponseCallback): void

  /**
   * Merge a value into a list-type group property, ensuring uniqueness.
   * @param prop - Property name or object of properties to union.
   * @param value - Value to union if `prop` is a string.
   * @param callback - Optional callback function.
   */
  union(
    prop: string | Properties,
    value?: MixpanelType,
    callback?: ResponseCallback
  ): void

  /**
   * Remove a value from a list-type group property.
   * @param key - The group property key.
   * @param value - The value to remove from the list.
   * @param callback - Optional callback function.
   */
  remove(key: string, value: MixpanelType, callback?: ResponseCallback): void

  /**
   * Delete the group profile.
   * @param callback - Optional callback function.
   */
  delete_group(callback?: ResponseCallback): void

  // Internal properties/methods
  _group_key: string
  _group_id: MixpanelType
  _init(
    mixpanel_instance: MixpanelLib,
    group_key: string,
    group_id: MixpanelType
  ): void
  toString(): string
}

// Main Mixpanel Library Interface
export interface MixpanelLib {
  /** The Mixpanel People API interface. */
  people: MixpanelPeople

  /**
   * Initializes a new instance of the Mixpanel tracking object.
   * All new instances are added to the main mixpanel object as sub properties (e.g., mixpanel.library_name)
   * and also returned by this function. To define a second instance on the page, you would call:
   * mixpanel.init('new token', { your: 'config' }, 'library_name');
   *
   * @param token - Your Mixpanel API token.
   * @param config - Optional configuration object.
   * @param name - Optional name for the new instance. Required if creating a new instance after the main one.
   * @returns The initialized Mixpanel instance.
   */
  init(token: string, config?: Partial<Config>, name?: string): MixpanelLib

  /**
   * Push an array representing a function call onto the internal command queue.
   * This is useful for executing commands before the library is fully loaded.
   * @param item - An array like ['track', 'My Event', { prop: 'value' }]
   */
  push(item: [string, ...any[]]): void

  /**
   * Disable sending of data to Mixpanel.
   * Can be called with an array of event names to disable only specific events.
   * If called without arguments, all events and people updates are disabled.
   * @param events - Optional array of event names to disable.
   */
  disable(events?: string[]): void

  /**
   * Track an event.
   * @param event_name - The name of the event.
   * @param properties - Optional properties object.
   * @param options - Optional tracking options (e.g., transport).
   * @param callback - Optional callback function.
   * @returns The tracking payload object if the request was initiated/queued, otherwise false.
   */
  track(
    event_name: string,
    properties?: Properties,
    options?: TrackOptions,
    callback?: ResponseCallback
  ): TrackResponse

  /**
   * Track clicks on links.
   * @param query - A CSS selector, DOM element(s).
   * @param event_name - The name of the event to track.
   * @param properties - Optional properties object or function returning properties.
   */
  track_links(
    query: Query,
    event_name: string,
    properties?: Properties | ((element: Element) => Properties)
  ): void

  /**
   * Track form submissions.
   * @param query - A CSS selector, DOM element(s).
   * @param event_name - The name of the event to track.
   * @param properties - Optional properties object or function returning properties.
   */
  track_forms(
    query: Query,
    event_name: string,
    properties?: Properties | ((element: Element) => Properties)
  ): void

  /**
   * Track a page view event, optionally with additional properties.
   * By default, sends the `$mp_web_page_view` event.
   * @param properties - Optional properties object.
   * @param options - Optional page view tracking options (e.g., custom event name).
   * @returns The tracking payload object if the request was initiated/queued, otherwise false.
   */
  track_pageview(
    properties?: Properties,
    options?: TrackPageViewOptions
  ): TrackResponse

  /**
   * Start timing an event. Calling track() for the same event name will add a '$duration' property.
   * @param event_name - The name of the event.
   */
  time_event(event_name: string): void

  /**
   * Register a set of super properties, included with all subsequent events.
   * @param properties - Properties object.
   * @param days_or_options - Optional number of days to persist or options object.
   */
  register(
    properties: Properties,
    days_or_options?: number | RegisterOptions
  ): void

  /**
   * Register super properties only if they haven't been set before or have the default value.
   * @param properties - Properties object.
   * @param default_value - Optional value to overwrite if already set.
   * @param days_or_options - Optional number of days to persist or options object.
   */
  register_once(
    properties: Properties,
    default_value?: MixpanelType,
    days_or_options?: number | RegisterOptions
  ): void

  /**
   * Unregister a super property.
   * @param property - Name of the super property.
   * @param options - Optional options object (only `persistent` is relevant here).
   */
  unregister(
    property: string,
    options?: Pick<RegisterOptions, "persistent">
  ): void

  /**
   * Identify a user with a unique ID. Call this when a user logs in or signs up.
   * Ties subsequent events and people updates to this ID.
   * If ID Merge is enabled, this can also merge anonymous activity.
   * @param unique_id - The unique ID for the user.
   * @param _set_callback - Internal/optional callback for people.set queue flush.
   * @param _add_callback - Internal/optional callback for people.add queue flush.
   * @param _append_callback - Internal/optional callback for people.append queue flush.
   * @param _set_once_callback - Internal/optional callback for people.set_once queue flush.
   * @param _union_callback - Internal/optional callback for people.union queue flush.
   * @param _unset_callback - Internal/optional callback for people.unset queue flush.
   * @param _remove_callback - Internal/optional callback for people.remove queue flush.
   */
  identify(
    unique_id?: string,
    _set_callback?: ResponseCallback,
    _add_callback?: ResponseCallback,
    _append_callback?: ResponseCallback,
    _set_once_callback?: ResponseCallback,
    _union_callback?: ResponseCallback,
    _unset_callback?: ResponseCallback,
    _remove_callback?: ResponseCallback
  ): void

  /**
   * Create an alias for the current distinct_id. Useful for connecting pre-signup anonymous activity
   * to a known user ID *if ID Merge is not enabled*. Call this only once per user, typically upon registration.
   * @param alias - The new alias (typically the user's main ID).
   * @param original - The original distinct_id to alias from (defaults to the current distinct_id).
   * @returns The tracking payload object if the request was initiated/queued, otherwise false (or -1, -2 on specific errors).
   */
  alias(alias: string, original?: string): TrackResponse | number

  /**
   * Clear super properties and generates a new random distinct_id. Call this on user logout.
   */
  reset(): void

  /**
   * Get the current distinct_id.
   * @returns The distinct_id.
   */
  get_distinct_id(): string

  /**
   * Get the value of a super property.
   * @param property_name - Name of the super property.
   * @returns The value of the super property.
   */
  get_property(property_name: string): MixpanelType

  /**
   * Get the current configuration object.
   * @param prop_name - Optional property name to retrieve a specific config value.
   * @returns The configuration object or a specific value.
   */
  get_config(): Config
  get_config(prop_name: keyof Config): Config[keyof Config]

  /**
   * Update the library's configuration.
   * @param config - Configuration object with values to update.
   */
  set_config(config: Partial<Config>): void

  /**
   * @deprecated Set a name tag for the current user in Mixpanel Streams.
   * @param name_tag - The name tag string.
   */
  name_tag(name_tag: string): void

  /**
   * Opt the user in to tracking & persistence.
   * @param options - Optional configuration for opt-in behavior.
   */
  opt_in_tracking(options?: OptInTrackingOptions): void

  /**
   * Opt the user out of tracking & persistence.
   * @param options - Optional configuration for opt-out behavior.
   */
  opt_out_tracking(options?: OptOutTrackingOptions): void

  /**
   * Check if the user has opted in to tracking.
   * @param options - Optional options to check against specific persistence settings.
   * @returns True if opted in, false otherwise.
   */
  has_opted_in_tracking(options?: GDPROptions): boolean

  /**
   * Check if the user has opted out of tracking.
   * @param options - Optional options to check against specific persistence settings.
   * @returns True if opted out, false otherwise.
   */
  has_opted_out_tracking(options?: GDPROptions): boolean

  /**
   * Clear the user's opt-in/out status.
   * @param options - Optional configuration for clearing status.
   */
  clear_opt_in_out_tracking(options?: ClearOptInOutOptions): void

  /**
   * Get a reference to a Mixpanel Group object.
   * @param group_key - The group key (e.g., 'company').
   * @param group_id - The ID of the specific group.
   * @returns The MixpanelGroup object.
   */
  get_group(group_key: string, group_id: MixpanelType): MixpanelGroup

  /**
   * Set the groups for the current user. Overwrites existing groups for the given key.
   * Also sends a people.set update.
   * @param group_key - The group key (e.g., 'company').
   * @param group_ids - An array of group IDs or a single group ID.
   * @param callback - Optional callback for the people update.
   */
  set_group(
    group_key: string,
    group_ids: MixpanelType[] | MixpanelType,
    callback?: ResponseCallback
  ): void

  /**
   * Add a group ID to the list of groups for the user.
   * Also sends a people.union update.
   * @param group_key - The group key.
   * @param group_id - The group ID to add.
   * @param callback - Optional callback for the people update.
   */
  add_group(
    group_key: string,
    group_id: MixpanelType,
    callback?: ResponseCallback
  ): void

  /**
   * Remove a group ID from the list of groups for the user.
   * Also sends a people.remove update.
   * @param group_key - The group key.
   * @param group_id - The group ID to remove.
   * @param callback - Optional callback for the people update.
   */
  remove_group(
    group_key: string,
    group_id: MixpanelType,
    callback?: ResponseCallback
  ): void

  /**
   * Track an event associated with specific groups.
   * @param event_name - The name of the event.
   * @param properties - Optional event properties.
   * @param groups - An object mapping group keys to group IDs (e.g., { 'company': 'Acme' }).
   * @param callback - Optional callback function.
   * @returns The tracking payload object if the request was initiated/queued, otherwise false.
   */
  track_with_groups(
    event_name: string,
    properties?: Properties,
    groups?: Record<string, MixpanelType>,
    callback?: ResponseCallback
  ): TrackResponse

  /**
   * Start the batch senders if batching is enabled and autostart is false.
   */
  start_batch_senders(): void

  /**
   * Stop the batch senders and clear any queued requests.
   */
  stop_batch_senders(): void

  /**
   * Manually start a session recording. Requires session recording to be configured.
   */
  start_session_recording(): void

  /**
   * Stop the current session recording.
   */
  stop_session_recording(): void

  /**
   * Pause the current session recording.
   */
  pause_session_recording(): void

  /**
   * Resume a paused session recording.
   */
  resume_session_recording(): void

  /**
   * Get properties related to the current session recording (e.g., $mp_replay_id).
   * Returns an empty object if no recording is active.
   * @returns Recording properties.
   */
  get_session_recording_properties(): Properties

  /**
   * Get the URL to view the current session replay in Mixpanel, if available.
   * @returns Replay URL string or null.
   */
  get_session_replay_url(): string | null

  /**
   * Get the unique ID assigned to the current browser tab/window session.
   * Requires sessionStorage support.
   * @returns Tab ID string or null.
   */
  get_tab_id(): string | null

  /**
   * Return the library instance's name (e.g., "mixpanel" or "mixpanel.library_name").
   */
  toString(): string

  // Potentially other internal or undocumented methods/properties exist
  // e.g., _init, _loaded, _dom_loaded, request_batchers, persistence, etc.
}

// --- Global Variable ---
// This represents the main mixpanel instance, usually available globally after loading the snippet.
export const mixpanel: MixpanelLib

export default mixpanel

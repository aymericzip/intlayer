/**
 * Enum for HTTP response status codes.
 * Contains all the possible HTTP response codes according to the standard.
 *
 *
 * 1xx: Informational responses
 *
 *
 * 100 - CONTINUE - The server has received the request headers and the client should proceed to send the request body.
 *
 * 101 - SWITCHING_PROTOCOLS - The requester has asked the server to switch protocols and the server has agreed to do so.
 *
 * 102 - PROCESSING - Used to return some response headers before final HTTP message.
 *
 * 103 - EARLY_HINTS - Early hints - part of optimization to improve page load time.
 *
 *
 * 2xx: Successful responses
 *
 *
 * 200 - OK - The request has succeeded.
 *
 * 201 - CREATED - The request has been fulfilled and has resulted in one or more new resources being created.
 *
 * 202 - ACCEPTED - The request has been accepted for processing, but the processing has not been completed.
 *
 * 203 - NON_AUTHORITATIVE_INFORMATION - The server successfully processed the request, but is returning information that may be from another source.
 *
 * 204 - NO_CONTENT - The server successfully processed the request and is not returning any content.
 *
 * 205 - RESET_CONTENT - The server successfully processed the request, but is not returning any content and requires that the requester reset the document view.
 *
 * 206 - PARTIAL_CONTENT - The server is delivering only part of the resource due to a range header sent by the client.
 *
 * 207 - MULTI_STATUS - Multi-status response providing status for multiple independent operations.
 *
 * 208 - ALREADY_REPORTED - The members of a DAV binding have already been enumerated in a preceding part of the request.
 *
 * 226 - IM_USED - The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance manipulations applied to the current instance.
 *
 *
 * 3xx: Redirection messages
 *
 *
 * 300 - MULTIPLE_CHOICES - The request has more than one possible response. The user-agent or user should choose one of them.
 *
 * 301 - MOVED_PERMANENTLY - The URL of the requested resource has been changed permanently.
 *
 * 302 - FOUND - The requested resource is available at a different URI.
 *
 * 303 - SEE_OTHER - The response to the request can be found under another URI using a GET method.
 *
 * 304 - NOT_MODIFIED - Indicates that the resource has not been modified since the version specified by the request headers.
 *
 * 305 - USE_PROXY - The requested resource must be accessed through the proxy given by the Location field.
 *
 * 306 - SWITCH_PROXY - No longer used. Originally meant to direct the client to switch to a different proxy.
 *
 * 307 - TEMPORARY_REDIRECT - The requested resource resides temporarily under a different URI.
 *
 * 308 - PERMANENT_REDIRECT - The request should be repeated with another URI, but future requests should still use the original URI.
 *
 *
 * 4xx: Client error responses
 *
 *
 * 400 - BAD_REQUEST - The server cannot or will not process the request due to something perceived to be a client error.
 *
 * 401 - UNAUTHORIZED - The client must authenticate itself to get the requested response.
 *
 * 403 - FORBIDDEN - The client does not have access rights to the content.
 *
 * 404 - NOT_FOUND - The server can not find the requested resource.
 *
 * 405 - METHOD_NOT_ALLOWED - The request method is known by the server but is not supported by the target resource.
 *
 * 406 - NOT_ACCEPTABLE - This response is sent when the requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request.
 *
 * 407 - PROXY_AUTHENTICATION_REQUIRED - This is similar to 401 but authentication is needed to be done by a proxy.
 *
 * 408 - REQUEST_TIMEOUT - This response is sent on an idle connection by some servers, even without any previous request by the client.
 *
 * 409 - CONFLICT - This response is sent when a request conflicts with the current state of the server.
 *
 * 410 - GONE - This response is sent when the requested resource is no longer available and will not be available again.
 *
 * 411 - LENGTH_REQUIRED - The request did not specify the length of its content, which is required by the requested resource.
 *
 * 412 - PRECONDITION_FAILED - The server does not meet one of the preconditions that the requester put on the request.
 *
 * 413 - PAYLOAD_TOO_LARGE - The request is larger than the server is willing or able to process.
 *
 * 414 - URI_TOO_LONG - The URI requested by the client is longer than the server is willing to interpret.
 *
 * 415 - UNSUPPORTED_MEDIA_TYPE - The media format of the requested data is not supported by the server.
 *
 * 416 - RANGE_NOT_SATISFIABLE - The range specified by the Range header field in the request can't be fulfilled.
 *
 * 417 - EXPECTATION_FAILED - The expectation indicated by the Expect request header field can't be met by the server.
 *
 * 418 - IM_A_TEAPOT - The server refuses the attempt to brew coffee with a teapot.
 *
 * 421 - MISDIRECTED_REQUEST - The request was directed at a server that is not able to produce a response.
 *
 * 422 - UNPROCESSABLE_ENTITY - The request was well-formed but was unable to be followed due to semantic errors.
 *
 * 423 - LOCKED - The resource that is being accessed is locked.
 *
 * 424 - FAILED_DEPENDENCY - The request failed due to failure of a previous request.
 *
 * 425 - TOO_EARLY - Indicates that the server is unwilling to risk processing a request that might be replayed.
 *
 * 426 - UPGRADE_REQUIRED - The server refuses to perform the request using the current protocol but might be willing to do so after the client upgrades to a different protocol.
 *
 * 428 - PRECONDITION_REQUIRED - The origin server requires the request to be conditional.
 *
 * 429 - TOO_MANY_REQUESTS - The user has sent too many requests in a given amount of time.
 *
 * 431 - REQUEST_HEADER_FIELDS_TOO_LARGE - The server is unwilling to process the request because its header fields are too large.
 *
 * 451 - UNAVAILABLE_FOR_LEGAL_REASONS - The user-agent requested a resource that cannot legally be provided, such as a censored resource.
 *
 *
 * 5xx: Server error responses
 *
 *
 * 500 - INTERNAL_SERVER_ERROR - The server encountered an unexpected condition that prevented it from fulfilling the request.
 *
 * 501 - NOT_IMPLEMENTED - The server does not support the functionality required to fulfill the request.
 *
 * 502 - BAD_GATEWAY - The server, while acting as a gateway or proxy, received an invalid response from the upstream server.
 *
 * 503 - SERVICE_UNAVAILABLE - The server is currently unavailable (because it is overloaded or down for maintenance).
 *
 * 504 - GATEWAY_TIMEOUT - The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.
 *
 * 505 - HTTP_VERSION_NOT_SUPPORTED - The server does not support the HTTP protocol version used in the request.
 *
 * 506 - VARIANT_ALSO_NEGOTIATES - The server has an internal configuration error, such as a misconfigured gateway.
 *
 * 507 - INSUFFICIENT_STORAGE - The server is unable to store the representation needed to complete the request.
 *
 * 508 - LOOP_DETECTED - The server detected an infinite loop while processing a request.
 */
export enum HttpStatusCodes {
  //* ********************************
  // 1xx: Informational responses
  //* ********************************

  /**
   * The server has received the request headers and the client should proceed to send the request body.
   */
  CONTINUE_100 = 100,

  /**
   * The requester has asked the server to switch protocols and the server has agreed to do so.
   */
  SWITCHING_PROTOCOLS_101 = 101,

  /**
   * Used to return some response headers before final HTTP message.
   */
  PROCESSING_102 = 102, // WebDAV

  /**
   * Early hints - part of optimization to improve page load time.
   */
  EARLY_HINTS_103 = 103,

  //* ********************************
  // 2xx: Successful responses
  //* ********************************

  /**
   * The request has succeeded.
   */
  OK_200 = 200,

  /**
   * The request has been fulfilled and has resulted in one or more new resources being created.
   */
  CREATED_201 = 201,

  /**
   * The request has been accepted for processing, but the processing has not been completed.
   */
  ACCEPTED_202 = 202,

  /**
   * The server successfully processed the request, but is returning information that may be from another source.
   */
  NON_AUTHORITATIVE_INFORMATION_203 = 203,

  /**
   * The server successfully processed the request and is not returning any content.
   */
  NO_CONTENT_204 = 204,

  /**
   * The server successfully processed the request, but is not returning any content and requires that the requester reset the document view.
   */
  RESET_CONTENT_205 = 205,

  /**
   * The server is delivering only part of the resource due to a range header sent by the client.
   */
  PARTIAL_CONTENT_206 = 206,

  /**
   * Multi-status response providing status for multiple independent operations.
   */
  MULTI_STATUS_207 = 207, // WebDAV

  /**
   * The members of a DAV binding have already been enumerated in a preceding part of the request.
   */
  ALREADY_REPORTED_208 = 208, // WebDAV

  /**
   * The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance manipulations applied to the current instance.
   */
  IM_USED_226 = 226,

  //* ********************************
  // 3xx: Redirection messages
  //* ********************************

  /**
   * The request has more than one possible response. The user-agent or user should choose one of them.
   */
  MULTIPLE_CHOICES_300 = 300,

  /**
   * The URL of the requested resource has been changed permanently.
   */
  MOVED_PERMANENTLY_301 = 301,

  /**
   * The requested resource is available at a different URI.
   */
  FOUND_302 = 302,

  /**
   * The response to the request can be found under another URI using a GET method.
   */
  SEE_OTHER_303 = 303,

  /**
   * Indicates that the resource has not been modified since the version specified by the request headers.
   */
  NOT_MODIFIED_304 = 304,

  /**
   * The requested resource must be accessed through the proxy given by the Location field.
   */
  USE_PROXY_305 = 305,

  /**
   * No longer used. Originally meant to direct the client to switch to a different proxy.
   */
  SWITCH_PROXY_306 = 306,

  /**
   * The requested resource resides temporarily under a different URI.
   */
  TEMPORARY_REDIRECT_307 = 307,

  /**
   * The request should be repeated with another URI, but future requests should still use the original URI.
   */
  PERMANENT_REDIRECT_308 = 308,

  //* ********************************
  // 4xx: Client error responses
  //* ********************************

  /**
   * The server cannot or will not process the request due to something perceived to be a client error.
   */
  BAD_REQUEST_400 = 400,

  /**
   * The client must authenticate itself to get the requested response.
   */
  UNAUTHORIZED_401 = 401,

  /**
   * The client does not have access rights to the content.
   */
  FORBIDDEN_403 = 403,

  /**
   * The server can not find the requested resource.
   */
  NOT_FOUND_404 = 404,

  /**
   * The request method is known by the server but is not supported by the target resource.
   */
  METHOD_NOT_ALLOWED_405 = 405,

  /**
   * This response is sent when the requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request.
   */
  NOT_ACCEPTABLE_406 = 406,

  /**
   * This is similar to 401 but authentication is needed to be done by a proxy.
   */
  PROXY_AUTHENTICATION_REQUIRED_407 = 407,

  /**
   * This response is sent on an idle connection by some servers, even without any previous request by the client.
   */
  REQUEST_TIMEOUT_408 = 408,

  /**
   * This response is sent when a request conflicts with the current state of the server.
   */
  CONFLICT_409 = 409,

  /**
   * This response is sent when the requested resource is no longer available and will not be available again.
   */
  GONE_410 = 410,

  /**
   * The request did not specify the length of its content, which is required by the requested resource.
   */
  LENGTH_REQUIRED_411 = 411,

  /**
   * The server does not meet one of the preconditions that the requester put on the request.
   */
  PRECONDITION_FAILED_412 = 412,

  /**
   * The request is larger than the server is willing or able to process.
   */
  PAYLOAD_TOO_LARGE_413 = 413,

  /**
   * The URI requested by the client is longer than the server is willing to interpret.
   */
  URI_TOO_LONG_414 = 414,

  /**
   * The media format of the requested data is not supported by the server.
   */
  UNSUPPORTED_MEDIA_TYPE_415 = 415,

  /**
   * The range specified by the Range header field in the request can't be fulfilled.
   */
  RANGE_NOT_SATISFIABLE_416 = 416,

  /**
   * The expectation indicated by the Expect request header field can't be met by the server.
   */
  EXPECTATION_FAILED_417 = 417,

  /**
   * The server refuses the attempt to brew coffee with a teapot.
   */
  IM_A_TEAPOT_418 = 418, // Easter egg from the HTCPCP/1.0 protocol.

  /**
   * The request was directed at a server that is not able to produce a response.
   */
  MISDIRECTED_REQUEST_421 = 421,

  /**
   * The request was well-formed but was unable to be followed due to semantic errors.
   */
  UNPROCESSABLE_ENTITY_422 = 422, // WebDAV

  /**
   * The resource that is being accessed is locked.
   */
  LOCKED_423 = 423, // WebDAV

  /**
   * The request failed due to failure of a previous request.
   */
  FAILED_DEPENDENCY_424 = 424, // WebDAV

  /**
   * Indicates that the server is unwilling to risk processing a request that might be replayed.
   */
  TOO_EARLY_425 = 425,

  /**
   * The server refuses to perform the request using the current protocol but might be willing to do so after the client upgrades to a different protocol.
   */
  UPGRADE_REQUIRED_426 = 426,

  /**
   * The origin server requires the request to be conditional.
   */
  PRECONDITION_REQUIRED_428 = 428,

  /**
   * The user has sent too many requests in a given amount of time.
   */
  TOO_MANY_REQUESTS_429 = 429,

  /**
   * The server is unwilling to process the request because its header fields are too large.
   */
  REQUEST_HEADER_FIELDS_TOO_LARGE_431 = 431,

  /**
   * The user-agent requested a resource that cannot legally be provided, such as a censored resource.
   */
  UNAVAILABLE_FOR_LEGAL_REASONS_451 = 451,

  //* ********************************
  // 5xx: Server error responses
  //* ********************************

  /**
   * The server encountered an unexpected condition that prevented it from fulfilling the request.
   */
  INTERNAL_SERVER_ERROR_500 = 500,

  /**
   * The server does not support the functionality required to fulfill the request.
   */
  NOT_IMPLEMENTED_501 = 501,

  /**
   * The server, while acting as a gateway or proxy, received an invalid response from the upstream server.
   */
  BAD_GATEWAY_502 = 502,

  /**
   * The server is currently unavailable (because it is overloaded or down for maintenance).
   */
  SERVICE_UNAVAILABLE_503 = 503,

  /**
   * The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.
   */
  GATEWAY_TIMEOUT_504 = 504,

  /**
   * The server does not support the HTTP protocol version used in the request.
   */
  HTTP_VERSION_NOT_SUPPORTED_505 = 505,

  /**
   * The server has an internal configuration error, such as a misconfigured gateway.
   */
  VARIANT_ALSO_NEGOTIATES_506 = 506,

  /**
   * The server is unable to store the representation needed to complete the request.
   */
  INSUFFICIENT_STORAGE_507 = 507, // WebDAV

  /**
   * The server detected an infinite loop while processing a request.
   */
  LOOP_DETECTED_508 = 508, // WebDAV

  /**
   * Further extensions to the request are required for the server to fulfill it.
   */
  NOT_EXTENDED_510 = 510,

  /**
   * The client needs to authenticate to gain network access.
   */
  NETWORK_AUTHENTICATION_REQUIRED_511 = 511,
}

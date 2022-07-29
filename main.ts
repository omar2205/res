import HttpStatusCode from './constants/HTTP_STATUS.ts'

export { HttpStatusCode }

export function JsonResponse(
  body: string | null | Record<string, unknown>,
  status: HttpStatusCode = HttpStatusCode.OK,
  headers?: Record<string, string>
): Response {
  let payload

  if (typeof body === 'object') {
    payload = JSON.stringify(body)
  } else {
    payload = body
  }

  return new Response(payload, {
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    status,
  })
}

export function badRequest(message = 'bad-request') {
  return JsonResponse(
    {code: HttpStatusCode.BAD_REQUEST, message},
    HttpStatusCode.BAD_REQUEST
  )
}

export function unauthorizedRequest(message = 'authentication-required') {
  return JsonResponse(
    {code: HttpStatusCode.UNAUTHORIZED, message},
    HttpStatusCode.UNAUTHORIZED
  )
}

export function forbidden(message = 'access-forbidden') {
  return JsonResponse(
    {code: HttpStatusCode.FORBIDDEN, message},
    HttpStatusCode.FORBIDDEN
  )
}

export function notFound(message = 'not-found') {
  return JsonResponse(
    {code: HttpStatusCode.NOT_FOUND, message},
    HttpStatusCode.NOT_FOUND
  )
}

export function methodNotAllowed(message = 'method not allowed') {
  return JsonResponse(
    {code: HttpStatusCode.METHOD_NOT_ALLOWED, message},
    HttpStatusCode.METHOD_NOT_ALLOWED
  )
}

export function notAcceptable(message = 'not-acceptable') {
  return JsonResponse(
    {code: HttpStatusCode.NOT_ACCEPTABLE, message},
    HttpStatusCode.NOT_ACCEPTABLE
  )
}

export function conflict(message = 'conflict') {
  return JsonResponse(
    {code: HttpStatusCode.CONFLICT, message},
    HttpStatusCode.CONFLICT
  )
}


export function unsupportedMediaType(message = 'unsupported media type') {
  return JsonResponse(
    {code: HttpStatusCode.UNSUPPORTED_MEDIA_TYPE, message},
    HttpStatusCode.UNSUPPORTED_MEDIA_TYPE
  )
}

export function unprocessableEntity(message = 'unprocessable-entity', errors: Record<string, unknown>[]) {
  return JsonResponse(
    {code: HttpStatusCode.UNPROCESSABLE_ENTITY, message, errors},
    HttpStatusCode.UNPROCESSABLE_ENTITY
  )
}

export function tooManyRequests(message = 'too many requests', cooldown?: number) {

  const res = JsonResponse(
    {code: HttpStatusCode.UNPROCESSABLE_ENTITY, message},
    HttpStatusCode.TOO_MANY_REQUESTS
  )
  if (cooldown) {
    res.headers.append('Retry-After', cooldown.toString())
    return res
  }
  return res
}

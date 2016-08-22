# Refreshing an API Token with Angular 2

## Problem Statement

When using Angular 2 Typescript, the angular services may need to acquire access tokens in
order to call back end services.  Those tokens may expire and need to be refreshed.  A mechanism is need to detect a 401 api response and trigger the renewal of the access token.

### Standards that can be considered for an API

All clients that call APIs with a token with a validity period will have this problem.

### Background

While Angular has a concept of a http interceptor it appears this is not yet available for Angular 2 (reference required).

### Approach

####  Simplest Approach
The simples approach taken is to assume that there is a service which retrieves a valid token (the TokenService) and as well as a service that retrieves the api data (the APIService).

When the APIService makes and invocation , code is added to catch the exception (specifically a 401)
and in the exception handler we retrieve a new token and then re-submit the APIService request.

While this works it does require each instance of an APIService to be coded correctly...something not likely to be done consistently if there are more than a couple api clients.

#### Second Approach

Another approach is to implement a 'filter' service which would wrap the call to the API Service.
This would remove the 401 handler code into a service which would be reusable.

Component
-filter
--APIService
--catch error
---retrieve token
---resubmit request

This would have the drawback that the developer of the component needs to know of the filter service and the problem of token refresh.

#### Third approach
Another approach is to provide a wrapper around the http service that has the desired behaviour.

Instead of an angular2 Http being injected into the service, a APIClientService is injected.

This client has the same interface as Http namely get/post methods matching the functionality of angular HTTP. However these versions handle the 401 and redo the operations when invoked.

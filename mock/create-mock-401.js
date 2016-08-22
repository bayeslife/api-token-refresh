var mockServer = require('mockserver-client'),
    mockServerClient = mockServer.mockServerClient;


mockServerClient("localhost", 1080).mockAnyResponse(
        {
            'httpRequest': {
                'method': 'OPTIONS',
                'path': '/api/.*',
            },
            'httpResponse': {
                'statusCode': 200,
    	           'headers':[
    		             { 'name': 'Access-Control-Allow-Origin', 'values': ['*']},
                     { 'name': 'Access-Control-Allow-Method', 'values': ['GET']},
                     { 'name': 'Access-Control-Request-Headers', 'values': ['Authorization']},
                     { 'name': 'Access-Control-Allow-Headers', 'values': ['Authorization']},
    		             ]
            },
            'times': {
                'unlimited': true
            }
        }
    )

    mockServerClient("localhost", 1080)
    .mockAnyResponse(
        {
            'httpRequest': {
                'method': 'GET',
                'path': '/api/token',
            },
            'httpResponse': {
                'statusCode': 200,
                'body': JSON.stringify({ token: "token" }),
    	           'headers':[
    		             { 'name': 'Access-Control-Allow-Origin', 'values': ['*']},
    	              ]
            },
            'times': {
                'unlimited': true
            }
        }
    )


mockServerClient("localhost", 1080).mockAnyResponse(
    {
        'httpRequest': {
            'method': 'GET',
            'path': '/api/stuff',
            'headers': [
              { 'name': 'Authorization', 'values': ['expiredtoken']}
            ]
        },
        'httpResponse': {
            'statusCode': 401,
	           'headers':[
		             { 'name': 'Access-Control-Allow-Origin', 'values': ['*']},
		             ]
        },
        'times': {
            'unlimited': true
        }
    }
)

mockServerClient("localhost", 1080)
.mockAnyResponse(
    {
        'httpRequest': {
            'method': 'GET',
            'path': '/api/stuff',
            'headers': [
              { 'name': 'Authorization', 'values': ['token']}
            ]
        },
        'httpResponse': {
            'statusCode': 200,
            'body': JSON.stringify({ id: 1, name: "fromserver" }),
	           'headers':[
		             { 'name': 'Access-Control-Allow-Origin', 'values': ['*']},
	              ]
        },
        'times': {
            'unlimited': true
        }
    }
)

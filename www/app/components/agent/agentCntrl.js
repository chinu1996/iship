app.controller('agentCntrl', function ($rootScope, $scope, $http) {

    $scope.textToClassify = undefined;
    $scope.chat = [];
    $scope.method = 'POST';
    $scope.url = 'https://watson-api-explorer.mybluemix.net/conversation/api/v1/workspaces/780b266b-dbc4-48fb-b1cc-d5233f8a56f3/message?version=2017-02-03';
    //https://watson-api-explorer.mybluemix.net/conversation/api/v1/workspaces/d703736d-15b4-485e-913f-a3154e5aeb22/message?version=2017-02-03

    $scope.queryClassify = function () {
        $scope.response = null;
        $scope.data = {
            "input": {
                "text": $scope.textToClassify
            },
            "context": {
                "conversation_id": "62a0c55f-a833-4ca5-aaee-9f0d3ccf875b",
                "system": {
                    "dialog_stack": [
                        {
                            "dialog_node": "root"
                        }
                    ],
                    "dialog_turn_counter": 1,
                    "dialog_request_counter": 1
                }
            },
            "alternate_intents": true
        }

        // Chat message push into chatbox
        $scope.chat.push($scope.textToClassify);

        $scope.textToClassify = "";
        $http({
            method: $scope.method,
            url: $scope.url,
            data: $scope.data,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic OTk3NTc1NzktOGJlNy00ZDFjLWFkZDYtNWE3YzRlZmE2ZTg2Om5hWDhPU0w2SFNYZg==',
            },
        }).
        then(function (response) {
            $scope.status = response.status;
            $scope.data = response.data;
            console.log($scope.status);
            console.log("$scope.data==>", $scope.data);
            console.log("Intents==>", $scope.data.intents);
            $scope.intents = $scope.data.intents;
            //            $scope.entity = $scope.data.entities;
            //            $scope.input_1 = $scope.data.input;
            //            $scope.output_1 = $scope.data.output.text[0];
            //            console.info('output', $scope.output_1);
            //            $scope.context_1 = $scope.data.context;
            if ($scope.intents[0].intent == "greeting") {
                $scope.getAnswer = false;
            } else {
                $scope.servercall($scope.intents[0].intent)
                $scope.getAnswer = true;
            }


        }, function (response) {
            $scope.data = response.data || 'Request failed';
            $scope.status = response.status;
            console.log($scope.status);
        });

    }


    $scope.servercall = function (intent) {
        var qid = intent;
        console.log("qid", qid);
        console.log("intent1", intent);
        //        $scope.textToClassify = undefined;
        //    $scope.chat = [];
        // method = 'GET';
        //    url = 'http://mobilitycoe.genpact.com:9906/gnip170classifier/neural-chat/faq/getSeed/' + qid;


        $http({
            method: 'GET',
            url: 'http://mobilitycoe.genpact.com:9906/gnip170classifier/neural-chat/faq/getSeed/' + qid,
            data_qid: qid,
            headers: {
                'Content-Type': 'application/json'
            },
        }).
        then(function (response) {
            $scope.status = response.status;
            $scope.data = response.data;
            console.log($scope.status);
            console.log("$scope.data==>", $scope.data);
            console.log($scope.status);

            $scope.answer = $scope.data.entries[0].answer;


        }, function (response) {
            $scope.data = response.data || 'Request failed';
            $scope.status = response.status;
        });


    }


});

//function servercall(intent) {
//    var qid = intent;
//    console.log("qid", qid);
//    console.log("intent1", intent);
//    //        $scope.textToClassify = undefined;
//    //    $scope.chat = [];
//    // method = 'GET';
//    //    url = 'http://mobilitycoe.genpact.com:9906/gnip170classifier/neural-chat/faq/getSeed/' + qid;
//
//
//    $.ajax({
//        method: 'GET',
//        url: 'http://mobilitycoe.genpact.com:9906/gnip170classifier/neural-chat/faq/getSeed/' + qid,
//        data_qid: qid,
//        headers: {
//            'Content-Type': 'application/json'
//        },
//    }).
//    then(function (response) {
//        var status = response.status;
//        var data = response.data_qid;
//        console.log(status);
//        console.log("data==>", data);
//        // var answer = data.entries[0].answer;
//
//
//    }, function (response) {
//        data = response.data || 'Request failed';
//        status = response.status;
//    });
//
//
//}
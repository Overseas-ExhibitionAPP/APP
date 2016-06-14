angular.module('starter.controllers', ['starter.services', 'ngCordova'])
.controller('LobbyCtrl', function($scope,$state, $stateParams) {

})
.controller('StallsCtrl', function($scope,$state, $stateParams,$http,STALLS) {
	var tmpList;
	STALLS.getStallList()
		.success(function(res) {
			$scope.Stall_Set = res.layout_list;
			tmpList = res.layout_list;
			$scope.pic_model = tmpList[0].layout;
		})
		.error(function(res){
			
		});
	$scope.setPic = function(picName) {
		var tmp = STALLS.searchStalls(picName , tmpList);
		$scope.pic_model = tmp.layout;
	}
})
.controller('SchoolSearchCtrl', function($scope,$state, $stateParams) {

})
.controller('ThemeEventsCtrl', function($scope,$state, $stateParams, ThemeEvents_serve,$http,$cordovaBarcodeScanner) {

	var alphabet_list;
	var i;
	var j;
	var picture = "";
	var alphabet_tmp = [];
	var Block = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAYAAAA+s9J6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAKISURBVHhe7dMxAQAgDMCwgX/PwIGHPslTBV3nGSCzf4GICSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQUjMXJIEFvkOhX5EAAAAASUVORK5CYII=";
	ThemeEvents_serve.getalphabet('my','test003')
		.success(function(response){
			alphabet_list = response.collectionbox;
			if(alphabet_list.length == 0){
				for (i = 1;i <= 30;i++){
					alphabet_tmp.push(Block);
				}
			}else{
				if (alphabet_list.length == 30){
					$scope.test = "可兌換";
				}
				
				for (i = 0;i <= alphabet_list.length-1;i++){
					$scope.test = "可兌換";
					picture = alphabet_list[i].picture;
					alphabet_tmp.push(picture);
				}
				$scope.list_num = 30-alphabet_list.length;
				for (j = 1;j <= $scope.list_num;j++){
					alphabet_tmp.push(Block);
				}
			}
			$scope.alphabet = alphabet_tmp;
		})
		.error(function (response) {
		});
    $scope.scanBarcodeStamp = function () {
        //掃描學校QRcode
        $cordovaBarcodeScanner.scan().then(function (result) {                   
            $scope.barcode = result.text;
            $scope.format = result.format;
        }, function (error) {
            console.warn("An error happened -> " + error);
        });
    };
    $scope.scanBarcode = function() {
    
    };
})
.controller('TrafficCtrl', function($scope,$state, $stateParams, $http) {

})
.controller('NewsCtrl', function($scope,$state, $stateParams, $http, News, $ionicPopup, $timeout) {
	var tmpList;
	News.getNewsList()
		.success(function(res) {
            $scope.News_Set = res.news_set;
            tmpList = res.news_set;
		})
		.error(function(res){
		});
	$scope.getNews = function(newsTitle) {
		var tmp = News.searchNews(newsTitle , tmpList);
        $ionicPopup.alert({
            title: tmp.title,
            template: tmp.content
        });
	}
})
.controller('QuestionnaireSelect', function($scope, $window, $http, Questionnaire_serve,  $state, $ionicHistory, localStorage) {
	var qSet;
	var count = 0;
	var change = "";
    var ansSunmary={};
	var UserId = "test005";
	
	Questionnaire_serve.getQuestionnaire('hk','2016')
		.success(function (response) {      
			qSet = response.questionset; 
			$scope.selected = [];
			$scope.isChecked = false;	
			$scope.q_Ans = [];
			var user = {	
			};
 			ansSunmary= {
				"userid" : UserId,
				"userAnsList" : $scope.q_Ans
			};  
			$scope.Questionnaire_List_question1 = qSet[0].description;
			if (qSet[0].type == "MultiSelect"){
				$scope.q_option_type_Test = qSet[count].type;
				$scope.Questionnaire_List_option_M = qSet[count].options;
				$scope.checkedOrNot = function (asset, isChecked, index) {
					if (isChecked) {
						$scope.selected.push(asset);
					} else {
						var _index = $scope.selected.indexOf(asset);
						$scope.selected.splice(_index, 1);
					}
				};
			}
			if (qSet[0].type == "SingleSelect"){
				$scope.q_option_type_Test = qSet[count].type;
				$scope.Questionnaire_List_option_S = qSet[count].options;
				$scope.selectedOrNot=function(item){
					$scope.selected = [];
					$scope.selected.push(item);
				}
			}
			$scope.q_option_type_Test = qSet[0].type;
			$scope.info = response.info;
			
			if (count == qSet.length)
			{
				$scope.state = "問卷結束";
				$scope.Questionnaire_List_question1 = "";
				$scope.Questionnaire_List_option1 = "";
			}
			else
			{
				count = count + 1;
			}
      })
      .error(function (response) {

      });
	$scope.state = "下一題";
	$scope.nextQ = function() {    //下一題的功能區塊
    var tmp = {
		"options" : $scope.selected
	};
		if (count == qSet.length+1){
			$window.location.href = '#index';
			$window.location.reload();
			count = 0;
		}
		else
		{
			if (count == qSet.length){
				
				$scope.q_Ans.push(tmp);
				$scope.selected = [];
				change = null;
				$scope.state = "回首頁";
				$scope.Questionnaire_List_question1 = "";
				$scope.Questionnaire_List_option_M = "";
				$scope.Questionnaire_List_option_S = "";
				$scope.q_option_type_Test = "";
				$scope.Questionnaire_List_count = count;
				count = count + 1;
				$scope.ansSunmary_test = ansSunmary;
				Questionnaire_serve.postQuestionnaire(ansSunmary,'2016','hk')
					.success(function (response){
						$scope.end_content = "感謝頗冗填寫此活動問卷";
						console.log(response.status);
						console.log("YES");
					})
					.error(function (response) {
						$scope.end_content = "感謝頗冗填寫此活動問卷";
						console.log(response);
						console.log("NO");
					});
				
			}else{
				$scope.state = "下一題";
				$scope.Questionnaire_List_question1 = qSet[count].description;
				$scope.Questionnaire_List_count = count;
				$scope.q_option_type_Test = qSet[count].type;
				
				if (qSet[count].type == "MultiSelect"){
					$scope.Questionnaire_List_option_M = "";
					$scope.Questionnaire_List_option_S = "";
					$scope.q_option_type_Test = qSet[count].type;
					$scope.Questionnaire_List_option_M = qSet[count].options;
					$scope.checkedOrNot = function (asset, isChecked, index) {
						if (isChecked) {
							$scope.selected.push(asset);
						} else {
							var _index = $scope.selected.indexOf(asset);
							$scope.selected.splice(_index, 1);
						}
					}; 
				}
				if (qSet[count].type == "SingleSelect"){
					$scope.Questionnaire_List_option_M = "";
					$scope.Questionnaire_List_option_S = "";
					$scope.q_option_type_Test = qSet[count].type;
					$scope.Questionnaire_List_option_S = qSet[count].options;
					$scope.selectedOrNot=function(item){
						$scope.selected = [];
						$scope.selected.push(item);
					} 
				}
				tmp = {
				"options" : $scope.selected
					};
					$scope.q_Ans.push(tmp);
					count = count + 1;
					$scope.selected = [];
					change = null;
			}
		}
	}
})
.controller('PhotosCtrl', function($scope,$state, $stateParams) {

})
.controller('LikeListCrtl', function($scope,$state, $stateParams) {

})
.controller('LecturetimeCrtl', function($scope,$state, $stateParams, $http, Lecture) {
    var tmpList;
	Lecture.getLectureList()
		.success(function(res) {
			$scope.button_Set = res.area_set;
			$scope.Lecture_Set = res.area_set[0].lec_Set;
			tmpList = res.area_set;
		})
		.error(function(res){
			
		});
	$scope.setLecture = function(areaName) {
		var tmp = Lecture.searchLecture(areaName , tmpList);
		$scope.Lecture_Set = tmp.lec_Set;
	}
})
.controller('OtherCtrl', function($scope,$state, $stateParams) {

})
;
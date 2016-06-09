angular.module('starter.services', [])
	.factory('localStorage', ['$window', function($window) {
	  return {
		set: function(key, value) {
		  $window.localStorage[key] = value;
		},
		get: function(key, defaultValue) {
		  return $window.localStorage[key] || defaultValue;
		},
		setObject: function(key, value) {
		  $window.localStorage[key] = JSON.stringify(value);
		},
		getObject: function(key) {
		  return JSON.parse($window.localStorage[key] || '{}');
		},
		removeItem: function(key){
		  $window.localStorage.removeItem(key);
		}
	  }
	}])
	.factory('STALLS',function ($filter, $http) {
		var self = this;
		self.searchStalls = function(stallName , tmpList) {
			var stalls_tmp = null;
			
			var found = $filter('filter')(tmpList,{"name": stallName}, true)
			if (found.length) {
				stalls_tmp = angular.fromJson(found[0]);
			}
			return stalls_tmp;
		}
		self.getStallList = function() {
			var Stalls_List;
			var link = 'http://163.22.17.174:8080/V1/exhibitions/2016/layout/my';
			Stalls_List = $http.get(link);
			return Stalls_List;
		}
		return self;
	})
	.factory('Questionnaire_serve', function($http){
		var Questionnaire_List;
		var self = this;
		self.getQuestionnaire = function(country,year){
			var link = 'http://163.22.17.174:8080/V1/questionnaire/'+year+'/'+country;
			Questionnaire_List = $http.get(link);
			return Questionnaire_List;
		}
		self.postQuestionnaire = function(ansList,year,country){
			var link = 'http://163.22.17.174:8080/V1/questionnaire/'+year+'/'+country;
			var data = ansList;
			return $http.post(link,data);
		}
		return self;
	})
	.factory('ThemeEvents_serve', function($http){
		var alphabet_list;
		var self = this;
		self.getalphabet = function(country,id){
			var link = 'http://163.22.17.174:8080/V1/exhibitions/activity/'+id+'/'+country+'/collectionbox';
			alphabet_list = http.get(link);
			return alphabet_list;
		}
		
	})

;
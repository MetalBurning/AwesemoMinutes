angular.module('NBAApp').controller('NBAToolController', [ '$scope', '$filter', '$uibModal', '$window', function ($scope, $filter, $uibModal, $window) {
    var nba = this;

    $scope.alerts = [
      { type: 'info', msg: 'Please Upload/Load Players...', number: 1 }
    ];

    $scope.AllPlayers = [];
    $scope.AllTeams = [];
    $scope.Title =  "Main"
    $scope.Date = new Date()
    $scope.savedPastSettings = [];
    $scope.statsLoaded = false;
    $scope.sampleData = false;
    $scope.OwnershipLoaded = false;

    var compareNumbers = function(a, b) {
        return b-a;
    }


    $scope.displayNewMessage = function (messageType, messageContent) {
      $window.scrollTo(0, 0);
      $scope.addAlert(messageType, messageContent);
    }
    $scope.addAlert = function(type, message) {
      var sameNumberOfAlerts = 1;
      if($scope.alerts.length > 100) {
        $scope.alerts = [];
      }
      $scope.alerts.forEach(function(alert) {
        if(alert.type === type && alert.msg === message) {
          sameNumberOfAlerts++;
        }
      });
      if(message.indexOf('Unauthenticated') !== -1) {
        $scope.alerts.push({type: type, msg: message, number: sameNumberOfAlerts, login: true});
      } else {
        $scope.alerts.push({type: type, msg: message, number: sameNumberOfAlerts, login: false});
      }

    }
    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    }

    $scope.parse = function(row) {
      var insideQuote = false,
          entries = [],
          entry = [];
      row.toString().split('').forEach(function (character) {
        if(character === '"') {
          insideQuote = !insideQuote;
        } else {
          if(character == "," && !insideQuote) {
            entries.push(entry.join(''));
            entry = [];
          } else {
            entry.push(character);
          }
        }
      });
      entries.push(entry.join(''));
      return entries;
    }

    $scope.loadSampleData = function() {
      var data = JSON.parse('{"Title":"5276bc43-d22f-4c84-8eb4-146312ae20f2","Date":"2020-01-12T04:56:24.649Z","AllPlayers":[{"PlayerName":"kemba walker","PlayerTeam":"BOS","PlayerOpp":"NO","PlayerOriginalMinutes":33,"PlayerMinutes":33,"PlayerOriginalPoints":23.07,"PlayerPoints":23.07,"PlayerOriginalThrees":3.35,"PlayerThrees":3.35,"PlayerOriginalRebounds":4.16,"PlayerRebounds":4.16,"PlayerOriginalAssists":4.97,"PlayerAssists":4.97,"PlayerOriginalSteals":1.18,"PlayerSteals":1.18,"PlayerOriginalBlocks":0.4,"PlayerBlocks":0.4,"PlayerOriginalTurnovers":2.26,"PlayerTurnovers":2.26,"PlayerFDPoints":37.99700000000001,"PlayerDKPoints":39.42999999999999,"PlayerPosition":"PG","PlayerOwnership":16.6,"PlayerSalary":7600,"AdjustedOwnership":16.6,"Over":0,"PlayerValue":5.1881578947368405,"$$hashKey":"object:536"},{"PlayerName":"jaylen brown","PlayerTeam":"BOS","PlayerOpp":"NO","PlayerOriginalMinutes":33,"PlayerMinutes":33,"PlayerOriginalPoints":20.78,"PlayerPoints":20.78,"PlayerOriginalThrees":2.34,"PlayerThrees":2.34,"PlayerOriginalRebounds":7.23,"PlayerRebounds":7.23,"PlayerOriginalAssists":2.31,"PlayerAssists":2.31,"PlayerOriginalSteals":1.18,"PlayerSteals":1.18,"PlayerOriginalBlocks":0.39,"PlayerBlocks":0.39,"PlayerOriginalTurnovers":2.08,"PlayerTurnovers":2.08,"PlayerFDPoints":35.55100000000001,"PlayerDKPoints":36.5525,"PlayerPosition":"SG/SF","PlayerOwnership":12.1,"PlayerSalary":6900,"AdjustedOwnership":12.1,"Over":0,"PlayerValue":5.297463768115942,"$$hashKey":"object:537"},{"PlayerName":"jayson tatum","PlayerTeam":"BOS","PlayerOpp":"NO","PlayerOriginalMinutes":34,"PlayerMinutes":34,"PlayerOriginalPoints":20.73,"PlayerPoints":20.73,"PlayerOriginalThrees":2.87,"PlayerThrees":2.87,"PlayerOriginalRebounds":7.04,"PlayerRebounds":7.04,"PlayerOriginalAssists":2.85,"PlayerAssists":2.85,"PlayerOriginalSteals":1.22,"PlayerSteals":1.22,"PlayerOriginalBlocks":0.69,"PlayerBlocks":0.69,"PlayerOriginalTurnovers":2.16,"PlayerTurnovers":2.16,"PlayerFDPoints":37.022999999999996,"PlayerDKPoints":37.980000000000004,"PlayerPosition":"SF/PF","PlayerOwnership":8.7,"PlayerSalary":8000,"AdjustedOwnership":8.7,"Over":0,"PlayerValue":4.7475000000000005,"$$hashKey":"object:538"},{"PlayerName":"gordon hayward","PlayerTeam":"BOS","PlayerOpp":"NO","PlayerOriginalMinutes":32,"PlayerMinutes":32,"PlayerOriginalPoints":15.91,"PlayerPoints":15.91,"PlayerOriginalThrees":1.53,"PlayerThrees":1.53,"PlayerOriginalRebounds":6.38,"PlayerRebounds":6.38,"PlayerOriginalAssists":3.96,"PlayerAssists":3.96,"PlayerOriginalSteals":0.99,"PlayerSteals":0.99,"PlayerOriginalBlocks":0.36,"PlayerBlocks":0.36,"PlayerOriginalTurnovers":1.87,"PlayerTurnovers":1.87,"PlayerFDPoints":31.685999999999996,"PlayerDKPoints":32.35499999999999,"PlayerPosition":"SF/PF","PlayerOwnership":11.5,"PlayerSalary":6500,"AdjustedOwnership":11.5,"Over":0,"PlayerValue":4.9776923076923065,"$$hashKey":"object:539"},{"PlayerName":"daniel theis","PlayerTeam":"BOS","PlayerOpp":"NO","PlayerOriginalMinutes":21,"PlayerMinutes":21,"PlayerOriginalPoints":7.49,"PlayerPoints":7.49,"PlayerOriginalThrees":0.38,"PlayerThrees":0.38,"PlayerOriginalRebounds":6.18,"PlayerRebounds":6.18,"PlayerOriginalAssists":1.42,"PlayerAssists":1.42,"PlayerOriginalSteals":0.54,"PlayerSteals":0.54,"PlayerOriginalBlocks":1.04,"PlayerBlocks":1.04,"PlayerOriginalTurnovers":0.76,"PlayerTurnovers":0.76,"PlayerFDPoints":21.016,"PlayerDKPoints":20.315,"PlayerPosition":"PF/C","PlayerOwnership":4.1,"PlayerSalary":4500,"AdjustedOwnership":4.1,"Over":0,"PlayerValue":4.514444444444445,"$$hashKey":"object:540"},{"PlayerName":"tacko fall","PlayerTeam":"BOS","PlayerOpp":"NO","PlayerOriginalMinutes":2,"PlayerMinutes":2,"PlayerOriginalPoints":1.13,"PlayerPoints":1.13,"PlayerOriginalThrees":0,"PlayerThrees":0,"PlayerOriginalRebounds":0.6,"PlayerRebounds":0.6,"PlayerOriginalAssists":0.1,"PlayerAssists":0.1,"PlayerOriginalSteals":0.04,"PlayerSteals":0.04,"PlayerOriginalBlocks":0.07,"PlayerBlocks":0.07,"PlayerOriginalTurnovers":0.14,"PlayerTurnovers":0.14,"PlayerFDPoints":2.19,"PlayerDKPoints":2.18,"PlayerPosition":"C","PlayerOwnership":0.1,"PlayerSalary":3000,"AdjustedOwnership":0.1,"Over":0,"PlayerValue":0.7266666666666667,"$$hashKey":"object:541"},{"PlayerName":"marcus smart","PlayerTeam":"BOS","PlayerOpp":"NO","PlayerOriginalMinutes":29,"PlayerMinutes":29,"PlayerOriginalPoints":10.22,"PlayerPoints":10.22,"PlayerOriginalThrees":2.04,"PlayerThrees":2.04,"PlayerOriginalRebounds":2.84,"PlayerRebounds":2.84,"PlayerOriginalAssists":4.5,"PlayerAssists":4.5,"PlayerOriginalSteals":1.76,"PlayerSteals":1.76,"PlayerOriginalBlocks":0.33,"PlayerBlocks":0.33,"PlayerOriginalTurnovers":1.73,"PlayerTurnovers":1.73,"PlayerFDPoints":24.918,"PlayerDKPoints":24.855,"PlayerPosition":"PG/SG","PlayerOwnership":8.4,"PlayerSalary":4800,"AdjustedOwnership":8.4,"Over":0,"PlayerValue":5.1781250000000005,"$$hashKey":"object:542"},{"PlayerName":"grant williams","PlayerTeam":"BOS","PlayerOpp":"NO","PlayerOriginalMinutes":16,"PlayerMinutes":16,"PlayerOriginalPoints":3.57,"PlayerPoints":3.57,"PlayerOriginalThrees":0.24,"PlayerThrees":0.24,"PlayerOriginalRebounds":2.33,"PlayerRebounds":2.33,"PlayerOriginalAssists":1.04,"PlayerAssists":1.04,"PlayerOriginalSteals":0.51,"PlayerSteals":0.51,"PlayerOriginalBlocks":0.44,"PlayerBlocks":0.44,"PlayerOriginalTurnovers":0.81,"PlayerTurnovers":0.81,"PlayerFDPoints":9.966,"PlayerDKPoints":9.6575,"PlayerPosition":"PF","PlayerOwnership":1.5,"PlayerSalary":3000,"AdjustedOwnership":1.5,"Over":0,"PlayerValue":3.219166666666667,"$$hashKey":"object:543"},{"PlayerName":"enes kanter","PlayerTeam":"BOS","PlayerOpp":"NO","PlayerOriginalMinutes":20,"PlayerMinutes":20,"PlayerOriginalPoints":9.68,"PlayerPoints":9.68,"PlayerOriginalThrees":0.03,"PlayerThrees":0.03,"PlayerOriginalRebounds":9.26,"PlayerRebounds":9.26,"PlayerOriginalAssists":1.23,"PlayerAssists":1.23,"PlayerOriginalSteals":0.44,"PlayerSteals":0.44,"PlayerOriginalBlocks":0.43,"PlayerBlocks":0.43,"PlayerOriginalTurnovers":1.18,"PlayerTurnovers":1.18,"PlayerFDPoints":24.067,"PlayerDKPoints":24.264999999999997,"PlayerPosition":"C","PlayerOwnership":2.9,"PlayerSalary":5600,"AdjustedOwnership":2.9,"Over":0,"PlayerValue":4.333035714285714,"$$hashKey":"object:544"},{"PlayerName":"brad wanamaker","PlayerTeam":"BOS","PlayerOpp":"NO","PlayerOriginalMinutes":8,"PlayerMinutes":8,"PlayerOriginalPoints":2.82,"PlayerPoints":2.82,"PlayerOriginalThrees":0.21,"PlayerThrees":0.21,"PlayerOriginalRebounds":0.87,"PlayerRebounds":0.87,"PlayerOriginalAssists":1.24,"PlayerAssists":1.24,"PlayerOriginalSteals":0.3,"PlayerSteals":0.3,"PlayerOriginalBlocks":0.08,"PlayerBlocks":0.08,"PlayerOriginalTurnovers":0.49,"PlayerTurnovers":0.49,"PlayerFDPoints":6.3740000000000006,"PlayerDKPoints":6.387499999999998,"PlayerPosition":"PG/SG","PlayerOwnership":1.5,"PlayerSalary":3000,"AdjustedOwnership":1.5,"Over":0,"PlayerValue":2.129166666666666,"$$hashKey":"object:545"},{"PlayerName":"semi ojeleye","PlayerTeam":"BOS","PlayerOpp":"NO","PlayerOriginalMinutes":10,"PlayerMinutes":10,"PlayerOriginalPoints":1.85,"PlayerPoints":1.85,"PlayerOriginalThrees":0.25,"PlayerThrees":0.25,"PlayerOriginalRebounds":1.24,"PlayerRebounds":1.24,"PlayerOriginalAssists":0.4,"PlayerAssists":0.4,"PlayerOriginalSteals":0.22,"PlayerSteals":0.22,"PlayerOriginalBlocks":0.05,"PlayerBlocks":0.05,"PlayerOriginalTurnovers":0.17,"PlayerTurnovers":0.17,"PlayerFDPoints":4.578,"PlayerDKPoints":4.579999999999999,"PlayerPosition":"SF/PF","PlayerOwnership":1.5,"PlayerSalary":3000,"AdjustedOwnership":1.5,"Over":0,"PlayerValue":1.5266666666666664,"$$hashKey":"object:546"},{"PlayerName":"tomas satoransky","PlayerTeam":"CHI","PlayerOpp":"DET","PlayerOriginalMinutes":32,"PlayerMinutes":32,"PlayerOriginalPoints":11.88,"PlayerPoints":11.88,"PlayerOriginalThrees":1.04,"PlayerThrees":1.04,"PlayerOriginalRebounds":4.24,"PlayerRebounds":4.24,"PlayerOriginalAssists":5.74,"PlayerAssists":5.74,"PlayerOriginalSteals":1.29,"PlayerSteals":1.29,"PlayerOriginalBlocks":0.23,"PlayerBlocks":0.23,"PlayerOriginalTurnovers":2.12,"PlayerTurnovers":2.12,"PlayerFDPoints":28.018,"PlayerDKPoints":28.290000000000003,"PlayerPosition":"PG/SF","PlayerOwnership":10.1,"PlayerSalary":5500,"AdjustedOwnership":10.1,"Over":0,"PlayerValue":5.1436363636363645,"$$hashKey":"object:901"},{"PlayerName":"zach lavine","PlayerTeam":"CHI","PlayerOpp":"DET","PlayerOriginalMinutes":36,"PlayerMinutes":36,"PlayerOriginalPoints":27.01,"PlayerPoints":27.01,"PlayerOriginalThrees":3.32,"PlayerThrees":3.32,"PlayerOriginalRebounds":5.46,"PlayerRebounds":5.46,"PlayerOriginalAssists":4.19,"PlayerAssists":4.19,"PlayerOriginalSteals":1.26,"PlayerSteals":1.26,"PlayerOriginalBlocks":0.51,"PlayerBlocks":0.51,"PlayerOriginalTurnovers":3.8,"PlayerTurnovers":3.8,"PlayerFDPoints":41.357,"PlayerDKPoints":43.42000000000001,"PlayerPosition":"PG/SG","PlayerOwnership":12.2,"PlayerSalary":8300,"AdjustedOwnership":12.2,"Over":0,"PlayerValue":5.23132530120482,"$$hashKey":"object:902"},{"PlayerName":"luke kornet","PlayerTeam":"CHI","PlayerOpp":"DET","PlayerOriginalMinutes":7,"PlayerMinutes":7,"PlayerOriginalPoints":2.04,"PlayerPoints":2.04,"PlayerOriginalThrees":0.34,"PlayerThrees":0.34,"PlayerOriginalRebounds":1,"PlayerRebounds":1,"PlayerOriginalAssists":0.34,"PlayerAssists":0.34,"PlayerOriginalSteals":0.25,"PlayerSteals":0.25,"PlayerOriginalBlocks":0.43,"PlayerBlocks":0.43,"PlayerOriginalTurnovers":0.19,"PlayerTurnovers":0.19,"PlayerFDPoints":5.6,"PlayerDKPoints":5.235,"PlayerPosition":"PF/C","PlayerOwnership":0.1,"PlayerSalary":3000,"AdjustedOwnership":0.1,"Over":0,"PlayerValue":1.745,"$$hashKey":"object:903"},{"PlayerName":"lauri markkanen","PlayerTeam":"CHI","PlayerOpp":"DET","PlayerOriginalMinutes":32,"PlayerMinutes":32,"PlayerOriginalPoints":16.67,"PlayerPoints":16.67,"PlayerOriginalThrees":2.31,"PlayerThrees":2.31,"PlayerOriginalRebounds":8.42,"PlayerRebounds":8.42,"PlayerOriginalAssists":1.71,"PlayerAssists":1.71,"PlayerOriginalSteals":0.85,"PlayerSteals":0.85,"PlayerOriginalBlocks":0.69,"PlayerBlocks":0.69,"PlayerOriginalTurnovers":1.56,"PlayerTurnovers":1.56,"PlayerFDPoints":32.399,"PlayerDKPoints":33.215,"PlayerPosition":"PF/C","PlayerOwnership":14.5,"PlayerSalary":6300,"AdjustedOwnership":14.5,"Over":0,"PlayerValue":5.272222222222222,"$$hashKey":"object:904"},{"PlayerName":"kris dunn","PlayerTeam":"CHI","PlayerOpp":"DET","PlayerOriginalMinutes":29,"PlayerMinutes":29,"PlayerOriginalPoints":8.7,"PlayerPoints":8.7,"PlayerOriginalThrees":0.72,"PlayerThrees":0.72,"PlayerOriginalRebounds":4.69,"PlayerRebounds":4.69,"PlayerOriginalAssists":4.06,"PlayerAssists":4.06,"PlayerOriginalSteals":2,"PlayerSteals":2,"PlayerOriginalBlocks":0.48,"PlayerBlocks":0.48,"PlayerOriginalTurnovers":1.59,"PlayerTurnovers":1.59,"PlayerFDPoints":26.268,"PlayerDKPoints":25.1775,"PlayerPosition":"PG/SF","PlayerOwnership":4.3,"PlayerSalary":5300,"AdjustedOwnership":4.3,"Over":0,"PlayerValue":4.750471698113207,"$$hashKey":"object:905"},{"PlayerName":"coby white","PlayerTeam":"CHI","PlayerOpp":"DET","PlayerOriginalMinutes":26,"PlayerMinutes":26,"PlayerOriginalPoints":12.21,"PlayerPoints":12.21,"PlayerOriginalThrees":1.92,"PlayerThrees":1.92,"PlayerOriginalRebounds":4.07,"PlayerRebounds":4.07,"PlayerOriginalAssists":2.33,"PlayerAssists":2.33,"PlayerOriginalSteals":0.9,"PlayerSteals":0.9,"PlayerOriginalBlocks":0.11,"PlayerBlocks":0.11,"PlayerOriginalTurnovers":1.58,"PlayerTurnovers":1.58,"PlayerFDPoints":22.039,"PlayerDKPoints":22.9825,"PlayerPosition":"PG/SG","PlayerOwnership":5.7,"PlayerSalary":4300,"AdjustedOwnership":5.7,"Over":0,"PlayerValue":5.344767441860466,"$$hashKey":"object:906"},{"PlayerName":"thaddeus young","PlayerTeam":"CHI","PlayerOpp":"DET","PlayerOriginalMinutes":26,"PlayerMinutes":26,"PlayerOriginalPoints":10.41,"PlayerPoints":10.41,"PlayerOriginalThrees":1.26,"PlayerThrees":1.26,"PlayerOriginalRebounds":5.51,"PlayerRebounds":5.51,"PlayerOriginalAssists":2.16,"PlayerAssists":2.16,"PlayerOriginalSteals":1.4,"PlayerSteals":1.4,"PlayerOriginalBlocks":0.41,"PlayerBlocks":0.41,"PlayerOriginalTurnovers":1.55,"PlayerTurnovers":1.55,"PlayerFDPoints":24.142,"PlayerDKPoints":24.012500000000006,"PlayerPosition":"SF/PF","PlayerOwnership":2,"PlayerSalary":6000,"AdjustedOwnership":2,"Over":0,"PlayerValue":4.002083333333334,"$$hashKey":"object:907"},{"PlayerName":"chandler hutchison","PlayerTeam":"CHI","PlayerOpp":"DET","PlayerOriginalMinutes":12,"PlayerMinutes":12,"PlayerOriginalPoints":4.5,"PlayerPoints":4.5,"PlayerOriginalThrees":0.34,"PlayerThrees":0.34,"PlayerOriginalRebounds":2.39,"PlayerRebounds":2.39,"PlayerOriginalAssists":0.68,"PlayerAssists":0.68,"PlayerOriginalSteals":0.35,"PlayerSteals":0.35,"PlayerOriginalBlocks":0.1,"PlayerBlocks":0.1,"PlayerOriginalTurnovers":0.53,"PlayerTurnovers":0.53,"PlayerFDPoints":9.208,"PlayerDKPoints":9.312499999999998,"PlayerPosition":"SF/PF","PlayerOwnership":0.1,"PlayerSalary":3000,"AdjustedOwnership":0.1,"Over":0,"PlayerValue":3.104166666666666,"$$hashKey":"object:908"},{"PlayerName":"ryan arcidiacono","PlayerTeam":"CHI","PlayerOpp":"DET","PlayerOriginalMinutes":15,"PlayerMinutes":15,"PlayerOriginalPoints":4,"PlayerPoints":4,"PlayerOriginalThrees":0.74,"PlayerThrees":0.74,"PlayerOriginalRebounds":1.66,"PlayerRebounds":1.66,"PlayerOriginalAssists":1.53,"PlayerAssists":1.53,"PlayerOriginalSteals":0.52,"PlayerSteals":0.52,"PlayerOriginalBlocks":0.04,"PlayerBlocks":0.04,"PlayerOriginalTurnovers":0.52,"PlayerTurnovers":0.52,"PlayerFDPoints":9.447,"PlayerDKPoints":9.600000000000001,"PlayerPosition":"PG/SG","PlayerOwnership":0.1,"PlayerSalary":3000,"AdjustedOwnership":0.1,"Over":0,"PlayerValue":3.2000000000000006,"$$hashKey":"object:909"},{"PlayerName":"daniel gafford","PlayerTeam":"CHI","PlayerOpp":"DET","PlayerOriginalMinutes":25,"PlayerMinutes":25,"PlayerOriginalPoints":8.78,"PlayerPoints":8.78,"PlayerOriginalThrees":0,"PlayerThrees":0,"PlayerOriginalRebounds":4.31,"PlayerRebounds":4.31,"PlayerOriginalAssists":0.78,"PlayerAssists":0.78,"PlayerOriginalSteals":0.39,"PlayerSteals":0.39,"PlayerOriginalBlocks":3.16,"PlayerBlocks":3.16,"PlayerOriginalTurnovers":0.86,"PlayerTurnovers":0.86,"PlayerFDPoints":24.912,"PlayerDKPoints":22.0075,"PlayerPosition":"C","PlayerOwnership":6.5,"PlayerSalary":4400,"AdjustedOwnership":6.5,"Over":0,"PlayerValue":5.001704545454546,"$$hashKey":"object:910"},{"PlayerName":"collin sexton","PlayerTeam":"CLE","PlayerOpp":"DEN","PlayerOriginalMinutes":34,"PlayerMinutes":34,"PlayerOriginalPoints":19.46,"PlayerPoints":19.46,"PlayerOriginalThrees":1.32,"PlayerThrees":1.32,"PlayerOriginalRebounds":3.44,"PlayerRebounds":3.44,"PlayerOriginalAssists":2.48,"PlayerAssists":2.48,"PlayerOriginalSteals":0.73,"PlayerSteals":0.73,"PlayerOriginalBlocks":0.09,"PlayerBlocks":0.09,"PlayerOriginalTurnovers":2.42,"PlayerTurnovers":2.42,"PlayerFDPoints":27.348,"PlayerDKPoints":28.57,"PlayerPosition":"PG/SG","PlayerOwnership":7.7,"PlayerSalary":5700,"AdjustedOwnership":7.7,"Over":0,"PlayerValue":5.012280701754387,"$$hashKey":"object:823"},{"PlayerName":"cedi osman","PlayerTeam":"CLE","PlayerOpp":"DEN","PlayerOriginalMinutes":34,"PlayerMinutes":34,"PlayerOriginalPoints":13.83,"PlayerPoints":13.83,"PlayerOriginalThrees":1.98,"PlayerThrees":1.98,"PlayerOriginalRebounds":3.75,"PlayerRebounds":3.75,"PlayerOriginalAssists":2.41,"PlayerAssists":2.41,"PlayerOriginalSteals":0.84,"PlayerSteals":0.84,"PlayerOriginalBlocks":0.19,"PlayerBlocks":0.19,"PlayerOriginalTurnovers":1.64,"PlayerTurnovers":1.64,"PlayerFDPoints":23.395,"PlayerDKPoints":24.3625,"PlayerPosition":"SF/PF","PlayerOwnership":8.8,"PlayerSalary":4300,"AdjustedOwnership":8.8,"Over":0,"PlayerValue":5.665697674418605,"$$hashKey":"object:824"},{"PlayerName":"kevin love","PlayerTeam":"CLE","PlayerOpp":"DEN","PlayerOriginalMinutes":32,"PlayerMinutes":32,"PlayerOriginalPoints":17.66,"PlayerPoints":17.66,"PlayerOriginalThrees":2.41,"PlayerThrees":2.41,"PlayerOriginalRebounds":10.51,"PlayerRebounds":10.51,"PlayerOriginalAssists":2.97,"PlayerAssists":2.97,"PlayerOriginalSteals":0.46,"PlayerSteals":0.46,"PlayerOriginalBlocks":0.32,"PlayerBlocks":0.32,"PlayerOriginalTurnovers":2.44,"PlayerTurnovers":2.44,"PlayerFDPoints":34.627,"PlayerDKPoints":38.2975,"PlayerPosition":"PF/C","PlayerOwnership":14.7,"PlayerSalary":7200,"AdjustedOwnership":14.7,"Over":0,"PlayerValue":5.319097222222222,"$$hashKey":"object:825"},{"PlayerName":"tristan thompson","PlayerTeam":"CLE","PlayerOpp":"DEN","PlayerOriginalMinutes":32,"PlayerMinutes":32,"PlayerOriginalPoints":13.07,"PlayerPoints":13.07,"PlayerOriginalThrees":0.03,"PlayerThrees":0.03,"PlayerOriginalRebounds":10.42,"PlayerRebounds":10.42,"PlayerOriginalAssists":2.39,"PlayerAssists":2.39,"PlayerOriginalSteals":0.75,"PlayerSteals":0.75,"PlayerOriginalBlocks":0.71,"PlayerBlocks":0.71,"PlayerOriginalTurnovers":1.81,"PlayerTurnovers":1.81,"PlayerFDPoints":31.729000000000003,"PlayerDKPoints":33.21,"PlayerPosition":"C","PlayerOwnership":4.7,"PlayerSalary":7000,"AdjustedOwnership":4.7,"Over":0,"PlayerValue":4.744285714285715,"$$hashKey":"object:826"},{"PlayerName":"darius garland","PlayerTeam":"CLE","PlayerOpp":"DEN","PlayerOriginalMinutes":34,"PlayerMinutes":34,"PlayerOriginalPoints":13.43,"PlayerPoints":13.43,"PlayerOriginalThrees":2.09,"PlayerThrees":2.09,"PlayerOriginalRebounds":2.33,"PlayerRebounds":2.33,"PlayerOriginalAssists":3.88,"PlayerAssists":3.88,"PlayerOriginalSteals":0.78,"PlayerSteals":0.78,"PlayerOriginalBlocks":0,"PlayerBlocks":0,"PlayerOriginalTurnovers":2.8,"PlayerTurnovers":2.8,"PlayerFDPoints":21.586,"PlayerDKPoints":23.3675,"PlayerPosition":"PG","PlayerOwnership":7.1,"PlayerSalary":4700,"AdjustedOwnership":7.1,"Over":0,"PlayerValue":4.971808510638297,"$$hashKey":"object:827"},{"PlayerName":"matthew dellavedova","PlayerTeam":"CLE","PlayerOpp":"DEN","PlayerOriginalMinutes":16,"PlayerMinutes":16,"PlayerOriginalPoints":3.15,"PlayerPoints":3.15,"PlayerOriginalThrees":0.4,"PlayerThrees":0.4,"PlayerOriginalRebounds":1.54,"PlayerRebounds":1.54,"PlayerOriginalAssists":3.69,"PlayerAssists":3.69,"PlayerOriginalSteals":0.32,"PlayerSteals":0.32,"PlayerOriginalBlocks":0.03,"PlayerBlocks":0.03,"PlayerOriginalTurnovers":0.96,"PlayerTurnovers":0.96,"PlayerFDPoints":10.622999999999998,"PlayerDKPoints":11.030000000000001,"PlayerPosition":"PG/SG","PlayerOwnership":0.1,"PlayerSalary":3200,"AdjustedOwnership":0.1,"Over":0,"PlayerValue":3.4468750000000004,"$$hashKey":"object:828"},{"PlayerName":"brandon knight","PlayerTeam":"CLE","PlayerOpp":"DEN","PlayerOriginalMinutes":24,"PlayerMinutes":24,"PlayerOriginalPoints":9.32,"PlayerPoints":9.32,"PlayerOriginalThrees":2.18,"PlayerThrees":2.18,"PlayerOriginalRebounds":2.12,"PlayerRebounds":2.12,"PlayerOriginalAssists":3.45,"PlayerAssists":3.45,"PlayerOriginalSteals":0.67,"PlayerSteals":0.67,"PlayerOriginalBlocks":0.08,"PlayerBlocks":0.08,"PlayerOriginalTurnovers":1.17,"PlayerTurnovers":1.17,"PlayerFDPoints":18.119,"PlayerDKPoints":19.15,"PlayerPosition":"PG/SG","PlayerOwnership":0.6,"PlayerSalary":3900,"AdjustedOwnership":0.6,"Over":0,"PlayerValue":4.91025641025641,"$$hashKey":"object:829"},{"PlayerName":"alfonzo mckinnie","PlayerTeam":"CLE","PlayerOpp":"DEN","PlayerOriginalMinutes":19,"PlayerMinutes":19,"PlayerOriginalPoints":5.97,"PlayerPoints":5.97,"PlayerOriginalThrees":0.73,"PlayerThrees":0.73,"PlayerOriginalRebounds":3.56,"PlayerRebounds":3.56,"PlayerOriginalAssists":0.28,"PlayerAssists":0.28,"PlayerOriginalSteals":0.39,"PlayerSteals":0.39,"PlayerOriginalBlocks":0.24,"PlayerBlocks":0.24,"PlayerOriginalTurnovers":0.62,"PlayerTurnovers":0.62,"PlayerFDPoints":11.932000000000002,"PlayerDKPoints":12.155,"PlayerPosition":"SF/PF","PlayerOwnership":0.1,"PlayerSalary":3000,"AdjustedOwnership":0.1,"Over":0,"PlayerValue":4.051666666666666,"$$hashKey":"object:830"},{"PlayerName":"ante zizic","PlayerTeam":"CLE","PlayerOpp":"DEN","PlayerOriginalMinutes":14,"PlayerMinutes":14,"PlayerOriginalPoints":6.4,"PlayerPoints":6.4,"PlayerOriginalThrees":0,"PlayerThrees":0,"PlayerOriginalRebounds":4.68,"PlayerRebounds":4.68,"PlayerOriginalAssists":0.26,"PlayerAssists":0.26,"PlayerOriginalSteals":0.16,"PlayerSteals":0.16,"PlayerOriginalBlocks":0.27,"PlayerBlocks":0.27,"PlayerOriginalTurnovers":0.8,"PlayerTurnovers":0.8,"PlayerFDPoints":12.896,"PlayerDKPoints":13.1,"PlayerPosition":"C","PlayerOwnership":0.4,"PlayerSalary":3400,"AdjustedOwnership":0.4,"Over":0,"PlayerValue":3.852941176470588,"$$hashKey":"object:831"},{"PlayerName":"delon wright","PlayerTeam":"DAL","PlayerOpp":"PHI","PlayerOriginalMinutes":22,"PlayerMinutes":22,"PlayerOriginalPoints":7.56,"PlayerPoints":7.56,"PlayerOriginalThrees":0.56,"PlayerThrees":0.56,"PlayerOriginalRebounds":3.75,"PlayerRebounds":3.75,"PlayerOriginalAssists":3.13,"PlayerAssists":3.13,"PlayerOriginalSteals":1.21,"PlayerSteals":1.21,"PlayerOriginalBlocks":0.31,"PlayerBlocks":0.31,"PlayerOriginalTurnovers":0.78,"PlayerTurnovers":0.78,"PlayerFDPoints":20.534999999999997,"PlayerDKPoints":19.8725,"PlayerPosition":"PG/SG","PlayerOwnership":7.4,"PlayerSalary":4900,"AdjustedOwnership":7.4,"Over":0,"PlayerValue":4.055612244897959,"$$hashKey":"object:990"},{"PlayerName":"justin jackson","PlayerTeam":"DAL","PlayerOpp":"PHI","PlayerOriginalMinutes":17,"PlayerMinutes":17,"PlayerOriginalPoints":6.86,"PlayerPoints":6.86,"PlayerOriginalThrees":1.18,"PlayerThrees":1.18,"PlayerOriginalRebounds":2.76,"PlayerRebounds":2.76,"PlayerOriginalAssists":0.59,"PlayerAssists":0.59,"PlayerOriginalSteals":0.29,"PlayerSteals":0.29,"PlayerOriginalBlocks":0.11,"PlayerBlocks":0.11,"PlayerOriginalTurnovers":0.3,"PlayerTurnovers":0.3,"PlayerFDPoints":11.956999999999999,"PlayerDKPoints":12.435,"PlayerPosition":"SF/PF","PlayerOwnership":1.6,"PlayerSalary":3000,"AdjustedOwnership":1.6,"Over":0,"PlayerValue":4.1450000000000005,"$$hashKey":"object:991"},{"PlayerName":"luka doncic","PlayerTeam":"DAL","PlayerOpp":"PHI","PlayerOriginalMinutes":36,"PlayerMinutes":36,"PlayerOriginalPoints":31.84,"PlayerPoints":31.84,"PlayerOriginalThrees":3.51,"PlayerThrees":3.51,"PlayerOriginalRebounds":10.52,"PlayerRebounds":10.52,"PlayerOriginalAssists":8.7,"PlayerAssists":8.7,"PlayerOriginalSteals":1.15,"PlayerSteals":1.15,"PlayerOriginalBlocks":0.29,"PlayerBlocks":0.29,"PlayerOriginalTurnovers":4.63,"PlayerTurnovers":4.63,"PlayerFDPoints":57.20399999999999,"PlayerDKPoints":61.85999999999999,"PlayerPosition":"PG/SF","PlayerOwnership":12.8,"PlayerSalary":12400,"AdjustedOwnership":12.8,"Over":0,"PlayerValue":4.9887096774193544,"$$hashKey":"object:992"},{"PlayerName":"jalen brunson","PlayerTeam":"DAL","PlayerOpp":"PHI","PlayerOriginalMinutes":15,"PlayerMinutes":15,"PlayerOriginalPoints":6.35,"PlayerPoints":6.35,"PlayerOriginalThrees":0.65,"PlayerThrees":0.65,"PlayerOriginalRebounds":2.03,"PlayerRebounds":2.03,"PlayerOriginalAssists":2.73,"PlayerAssists":2.73,"PlayerOriginalSteals":0.35,"PlayerSteals":0.35,"PlayerOriginalBlocks":0.03,"PlayerBlocks":0.03,"PlayerOriginalTurnovers":0.86,"PlayerTurnovers":0.86,"PlayerFDPoints":13.161000000000001,"PlayerDKPoints":13.637499999999998,"PlayerPosition":"PG/SG","PlayerOwnership":0.9,"PlayerSalary":3000,"AdjustedOwnership":0.9,"Over":0,"PlayerValue":4.5458333333333325,"$$hashKey":"object:993"},{"PlayerName":"seth curry","PlayerTeam":"DAL","PlayerOpp":"PHI","PlayerOriginalMinutes":26,"PlayerMinutes":26,"PlayerOriginalPoints":12.24,"PlayerPoints":12.24,"PlayerOriginalThrees":2.45,"PlayerThrees":2.45,"PlayerOriginalRebounds":2.24,"PlayerRebounds":2.24,"PlayerOriginalAssists":1.85,"PlayerAssists":1.85,"PlayerOriginalSteals":0.62,"PlayerSteals":0.62,"PlayerOriginalBlocks":0.17,"PlayerBlocks":0.17,"PlayerOriginalTurnovers":1.28,"PlayerTurnovers":1.28,"PlayerFDPoints":18.793,"PlayerDKPoints":19.979999999999997,"PlayerPosition":"PG/SG","PlayerOwnership":2.9,"PlayerSalary":4000,"AdjustedOwnership":2.9,"Over":0,"PlayerValue":4.994999999999999,"$$hashKey":"object:994"},{"PlayerName":"tim hardaway","PlayerTeam":"DAL","PlayerOpp":"PHI","PlayerOriginalMinutes":29,"PlayerMinutes":29,"PlayerOriginalPoints":14.87,"PlayerPoints":14.87,"PlayerOriginalThrees":2.4,"PlayerThrees":2.4,"PlayerOriginalRebounds":2.82,"PlayerRebounds":2.82,"PlayerOriginalAssists":1.74,"PlayerAssists":1.74,"PlayerOriginalSteals":0.72,"PlayerSteals":0.72,"PlayerOriginalBlocks":0.09,"PlayerBlocks":0.09,"PlayerOriginalTurnovers":1.13,"PlayerTurnovers":1.13,"PlayerFDPoints":22.163999999999998,"PlayerDKPoints":23.259999999999998,"PlayerPosition":"SG/SF","PlayerOwnership":7.1,"PlayerSalary":4700,"AdjustedOwnership":7.1,"Over":0,"PlayerValue":4.948936170212766,"$$hashKey":"object:995"},{"PlayerName":"dorian finney-smith","PlayerTeam":"DAL","PlayerOpp":"PHI","PlayerOriginalMinutes":31,"PlayerMinutes":31,"PlayerOriginalPoints":9.6,"PlayerPoints":9.6,"PlayerOriginalThrees":1.42,"PlayerThrees":1.42,"PlayerOriginalRebounds":5.65,"PlayerRebounds":5.65,"PlayerOriginalAssists":1.35,"PlayerAssists":1.35,"PlayerOriginalSteals":0.92,"PlayerSteals":0.92,"PlayerOriginalBlocks":0.44,"PlayerBlocks":0.44,"PlayerOriginalTurnovers":1.06,"PlayerTurnovers":1.06,"PlayerFDPoints":21.425000000000004,"PlayerDKPoints":21.5875,"PlayerPosition":"SF/PF","PlayerOwnership":4.7,"PlayerSalary":4500,"AdjustedOwnership":4.7,"Over":0,"PlayerValue":4.797222222222222,"$$hashKey":"object:996"},{"PlayerName":"maxi kleber","PlayerTeam":"DAL","PlayerOpp":"PHI","PlayerOriginalMinutes":31,"PlayerMinutes":31,"PlayerOriginalPoints":10.53,"PlayerPoints":10.53,"PlayerOriginalThrees":1.8,"PlayerThrees":1.8,"PlayerOriginalRebounds":6.48,"PlayerRebounds":6.48,"PlayerOriginalAssists":1.29,"PlayerAssists":1.29,"PlayerOriginalSteals":0.6,"PlayerSteals":0.6,"PlayerOriginalBlocks":1.05,"PlayerBlocks":1.05,"PlayerOriginalTurnovers":1.02,"PlayerTurnovers":1.02,"PlayerFDPoints":24.170999999999996,"PlayerDKPoints":24.255,"PlayerPosition":"PF/C","PlayerOwnership":1,"PlayerSalary":5200,"AdjustedOwnership":1,"Over":0,"PlayerValue":4.664423076923076,"$$hashKey":"object:997"},{"PlayerName":"boban marjanovic","PlayerTeam":"DAL","PlayerOpp":"PHI","PlayerOriginalMinutes":5,"PlayerMinutes":5,"PlayerOriginalPoints":2.65,"PlayerPoints":2.65,"PlayerOriginalThrees":0.01,"PlayerThrees":0.01,"PlayerOriginalRebounds":2.28,"PlayerRebounds":2.28,"PlayerOriginalAssists":0.18,"PlayerAssists":0.18,"PlayerOriginalSteals":0.1,"PlayerSteals":0.1,"PlayerOriginalBlocks":0.15,"PlayerBlocks":0.15,"PlayerOriginalTurnovers":0.44,"PlayerTurnovers":0.44,"PlayerFDPoints":5.966000000000001,"PlayerDKPoints":6.055000000000001,"PlayerPosition":"C","PlayerOwnership":0.1,"PlayerSalary":3000,"AdjustedOwnership":0.1,"Over":0,"PlayerValue":2.0183333333333335,"$$hashKey":"object:998"},{"PlayerName":"dwight powell","PlayerTeam":"DAL","PlayerOpp":"PHI","PlayerOriginalMinutes":28,"PlayerMinutes":28,"PlayerOriginalPoints":10.36,"PlayerPoints":10.36,"PlayerOriginalThrees":0.27,"PlayerThrees":0.27,"PlayerOriginalRebounds":5.68,"PlayerRebounds":5.68,"PlayerOriginalAssists":1.41,"PlayerAssists":1.41,"PlayerOriginalSteals":0.81,"PlayerSteals":0.81,"PlayerOriginalBlocks":0.59,"PlayerBlocks":0.59,"PlayerOriginalTurnovers":0.92,"PlayerTurnovers":0.92,"PlayerFDPoints":22.570999999999998,"PlayerDKPoints":22.049999999999997,"PlayerPosition":"C","PlayerOwnership":4.8,"PlayerSalary":4900,"AdjustedOwnership":4.8,"Over":0,"PlayerValue":4.5,"$$hashKey":"object:999"},{"PlayerName":"jamal murray","PlayerTeam":"DEN","PlayerOpp":"CLE","PlayerOriginalMinutes":32,"PlayerMinutes":32,"PlayerOriginalPoints":19.45,"PlayerPoints":19.45,"PlayerOriginalThrees":2,"PlayerThrees":2,"PlayerOriginalRebounds":4.05,"PlayerRebounds":4.05,"PlayerOriginalAssists":4.8,"PlayerAssists":4.8,"PlayerOriginalSteals":1.19,"PlayerSteals":1.19,"PlayerOriginalBlocks":0.43,"PlayerBlocks":0.43,"PlayerOriginalTurnovers":2.27,"PlayerTurnovers":2.27,"PlayerFDPoints":34.099999999999994,"PlayerDKPoints":34.8175,"PlayerPosition":"PG/SG","PlayerOwnership":12.4,"PlayerSalary":6900,"AdjustedOwnership":12.4,"Over":0,"PlayerValue":5.046014492753623,"$$hashKey":"object:727"},{"PlayerName":"gary harris","PlayerTeam":"DEN","PlayerOpp":"CLE","PlayerOriginalMinutes":34,"PlayerMinutes":34,"PlayerOriginalPoints":12.43,"PlayerPoints":12.43,"PlayerOriginalThrees":1.45,"PlayerThrees":1.45,"PlayerOriginalRebounds":2.77,"PlayerRebounds":2.77,"PlayerOriginalAssists":2.22,"PlayerAssists":2.22,"PlayerOriginalSteals":1.44,"PlayerSteals":1.44,"PlayerOriginalBlocks":0.47,"PlayerBlocks":0.47,"PlayerOriginalTurnovers":1.16,"PlayerTurnovers":1.16,"PlayerFDPoints":23.654,"PlayerDKPoints":23.1875,"PlayerPosition":"SG","PlayerOwnership":9.1,"PlayerSalary":4300,"AdjustedOwnership":9.1,"Over":0,"PlayerValue":5.392441860465116,"$$hashKey":"object:728"},{"PlayerName":"will barton","PlayerTeam":"DEN","PlayerOpp":"CLE","PlayerOriginalMinutes":34,"PlayerMinutes":34,"PlayerOriginalPoints":15.77,"PlayerPoints":15.77,"PlayerOriginalThrees":1.72,"PlayerThrees":1.72,"PlayerOriginalRebounds":6.81,"PlayerRebounds":6.81,"PlayerOriginalAssists":3.74,"PlayerAssists":3.74,"PlayerOriginalSteals":0.91,"PlayerSteals":0.91,"PlayerOriginalBlocks":0.73,"PlayerBlocks":0.73,"PlayerOriginalTurnovers":1.7,"PlayerTurnovers":1.7,"PlayerFDPoints":32.77199999999999,"PlayerDKPoints":33.1825,"PlayerPosition":"PG/SF","PlayerOwnership":6.8,"PlayerSalary":7100,"AdjustedOwnership":6.8,"Over":0,"PlayerValue":4.673591549295774,"$$hashKey":"object:729"},{"PlayerName":"nikola jokic","PlayerTeam":"DEN","PlayerOpp":"CLE","PlayerOriginalMinutes":31,"PlayerMinutes":31,"PlayerOriginalPoints":21.05,"PlayerPoints":21.05,"PlayerOriginalThrees":1.11,"PlayerThrees":1.11,"PlayerOriginalRebounds":9.59,"PlayerRebounds":9.59,"PlayerOriginalAssists":6.47,"PlayerAssists":6.47,"PlayerOriginalSteals":1.52,"PlayerSteals":1.52,"PlayerOriginalBlocks":0.91,"PlayerBlocks":0.91,"PlayerOriginalTurnovers":3.27,"PlayerTurnovers":3.27,"PlayerFDPoints":46.282999999999994,"PlayerDKPoints":46.5225,"PlayerPosition":"C","PlayerOwnership":15.2,"PlayerSalary":9700,"AdjustedOwnership":15.2,"Over":0,"PlayerValue":4.796134020618557,"$$hashKey":"object:730"},{"PlayerName":"monte morris","PlayerTeam":"DEN","PlayerOpp":"CLE","PlayerOriginalMinutes":18,"PlayerMinutes":18,"PlayerOriginalPoints":7.64,"PlayerPoints":7.64,"PlayerOriginalThrees":0.62,"PlayerThrees":0.62,"PlayerOriginalRebounds":1.47,"PlayerRebounds":1.47,"PlayerOriginalAssists":3.4,"PlayerAssists":3.4,"PlayerOriginalSteals":0.77,"PlayerSteals":0.77,"PlayerOriginalBlocks":0.11,"PlayerBlocks":0.11,"PlayerOriginalTurnovers":0.56,"PlayerTurnovers":0.56,"PlayerFDPoints":16.583999999999996,"PlayerDKPoints":16.367499999999996,"PlayerPosition":"PG","PlayerOwnership":2.1,"PlayerSalary":3500,"AdjustedOwnership":2.1,"Over":0,"PlayerValue":4.67642857142857,"$$hashKey":"object:731"},{"PlayerName":"malik beasley","PlayerTeam":"DEN","PlayerOpp":"CLE","PlayerOriginalMinutes":5,"PlayerMinutes":5,"PlayerOriginalPoints":2.55,"PlayerPoints":2.55,"PlayerOriginalThrees":0.44,"PlayerThrees":0.44,"PlayerOriginalRebounds":0.51,"PlayerRebounds":0.51,"PlayerOriginalAssists":0.36,"PlayerAssists":0.36,"PlayerOriginalSteals":0.18,"PlayerSteals":0.18,"PlayerOriginalBlocks":0.04,"PlayerBlocks":0.04,"PlayerOriginalTurnovers":0.2,"PlayerTurnovers":0.2,"PlayerFDPoints":4.162,"PlayerDKPoints":4.2875000000000005,"PlayerPosition":"PG/SG","PlayerOwnership":0.1,"PlayerSalary":3000,"AdjustedOwnership":0.1,"Over":0,"PlayerValue":1.429166666666667,"$$hashKey":"object:732"},{"PlayerName":"michael porter","PlayerTeam":"DEN","PlayerOpp":"CLE","PlayerOriginalMinutes":18,"PlayerMinutes":18,"PlayerOriginalPoints":9.97,"PlayerPoints":9.97,"PlayerOriginalThrees":0.98,"PlayerThrees":0.98,"PlayerOriginalRebounds":4.72,"PlayerRebounds":4.72,"PlayerOriginalAssists":0.74,"PlayerAssists":0.74,"PlayerOriginalSteals":0.29,"PlayerSteals":0.29,"PlayerOriginalBlocks":0.87,"PlayerBlocks":0.87,"PlayerOriginalTurnovers":1.34,"PlayerTurnovers":1.34,"PlayerFDPoints":18.884,"PlayerDKPoints":19.119999999999994,"PlayerPosition":"SF/PF","PlayerOwnership":7.1,"PlayerSalary":3600,"AdjustedOwnership":7.1,"Over":0,"PlayerValue":5.311111111111109,"$$hashKey":"object:733"},{"PlayerName":"jerami grant","PlayerTeam":"DEN","PlayerOpp":"CLE","PlayerOriginalMinutes":29,"PlayerMinutes":29,"PlayerOriginalPoints":12.98,"PlayerPoints":12.98,"PlayerOriginalThrees":1.56,"PlayerThrees":1.56,"PlayerOriginalRebounds":3.75,"PlayerRebounds":3.75,"PlayerOriginalAssists":1.22,"PlayerAssists":1.22,"PlayerOriginalSteals":0.71,"PlayerSteals":0.71,"PlayerOriginalBlocks":1.32,"PlayerBlocks":1.32,"PlayerOriginalTurnovers":0.89,"PlayerTurnovers":0.89,"PlayerFDPoints":24.51,"PlayerDKPoints":23.892500000000005,"PlayerPosition":"PF/C","PlayerOwnership":8.9,"PlayerSalary":4900,"AdjustedOwnership":8.9,"Over":0,"PlayerValue":4.876020408163266,"$$hashKey":"object:734"},{"PlayerName":"mason plumlee","PlayerTeam":"DEN","PlayerOpp":"CLE","PlayerOriginalMinutes":20,"PlayerMinutes":20,"PlayerOriginalPoints":8.56,"PlayerPoints":8.56,"PlayerOriginalThrees":0.01,"PlayerThrees":0.01,"PlayerOriginalRebounds":5.83,"PlayerRebounds":5.83,"PlayerOriginalAssists":2.95,"PlayerAssists":2.95,"PlayerOriginalSteals":0.87,"PlayerSteals":0.87,"PlayerOriginalBlocks":1.16,"PlayerBlocks":1.16,"PlayerOriginalTurnovers":1.75,"PlayerTurnovers":1.75,"PlayerFDPoints":24.321,"PlayerDKPoints":23.462500000000002,"PlayerPosition":"PF/C","PlayerOwnership":5.9,"PlayerSalary":3800,"AdjustedOwnership":5.9,"Over":0,"PlayerValue":6.174342105263158,"$$hashKey":"object:735"},{"PlayerName":"torrey craig","PlayerTeam":"DEN","PlayerOpp":"CLE","PlayerOriginalMinutes":6,"PlayerMinutes":6,"PlayerOriginalPoints":1.44,"PlayerPoints":1.44,"PlayerOriginalThrees":0.19,"PlayerThrees":0.19,"PlayerOriginalRebounds":0.98,"PlayerRebounds":0.98,"PlayerOriginalAssists":0.34,"PlayerAssists":0.34,"PlayerOriginalSteals":0.17,"PlayerSteals":0.17,"PlayerOriginalBlocks":0.26,"PlayerBlocks":0.26,"PlayerOriginalTurnovers":0.17,"PlayerTurnovers":0.17,"PlayerFDPoints":4.2459999999999996,"PlayerDKPoints":4.044999999999999,"PlayerPosition":"SG/SF","PlayerOwnership":0.1,"PlayerSalary":3000,"AdjustedOwnership":0.1,"Over":0,"PlayerValue":1.3483333333333332,"$$hashKey":"object:736"},{"PlayerName":"juancho hernangomez","PlayerTeam":"DEN","PlayerOpp":"CLE","PlayerOriginalMinutes":12,"PlayerMinutes":12,"PlayerOriginalPoints":3.16,"PlayerPoints":3.16,"PlayerOriginalThrees":0.51,"PlayerThrees":0.51,"PlayerOriginalRebounds":2.3,"PlayerRebounds":2.3,"PlayerOriginalAssists":0.78,"PlayerAssists":0.78,"PlayerOriginalSteals":0.28,"PlayerSteals":0.28,"PlayerOriginalBlocks":0.29,"PlayerBlocks":0.29,"PlayerOriginalTurnovers":0.37,"PlayerTurnovers":0.37,"PlayerFDPoints":8.43,"PlayerDKPoints":8.415,"PlayerPosition":"SF/PF","PlayerOwnership":0.1,"PlayerSalary":3000,"AdjustedOwnership":0.1,"Over":0,"PlayerValue":2.8049999999999997,"$$hashKey":"object:737"},{"PlayerName":"sekou doumbouya","PlayerTeam":"DET","PlayerOpp":"CHI","PlayerOriginalMinutes":30,"PlayerMinutes":30,"PlayerOriginalPoints":11.13,"PlayerPoints":11.13,"PlayerOriginalThrees":1.14,"PlayerThrees":1.14,"PlayerOriginalRebounds":6.16,"PlayerRebounds":6.16,"PlayerOriginalAssists":0.63,"PlayerAssists":0.63,"PlayerOriginalSteals":1.28,"PlayerSteals":1.28,"PlayerOriginalBlocks":0.64,"PlayerBlocks":0.64,"PlayerOriginalTurnovers":0.96,"PlayerTurnovers":0.96,"PlayerFDPoints":24.266999999999996,"PlayerDKPoints":23.705000000000002,"PlayerPosition":"SF/PF","PlayerOwnership":4.7,"PlayerSalary":5300,"AdjustedOwnership":4.7,"Over":0,"PlayerValue":4.472641509433962,"$$hashKey":"object:282"},{"PlayerName":"bruce brown","PlayerTeam":"DET","PlayerOpp":"CHI","PlayerOriginalMinutes":31,"PlayerMinutes":31,"PlayerOriginalPoints":11.02,"PlayerPoints":11.02,"PlayerOriginalThrees":0.74,"PlayerThrees":0.74,"PlayerOriginalRebounds":5.18,"PlayerRebounds":5.18,"PlayerOriginalAssists":5.49,"PlayerAssists":5.49,"PlayerOriginalSteals":1.17,"PlayerSteals":1.17,"PlayerOriginalBlocks":0.88,"PlayerBlocks":0.88,"PlayerOriginalTurnovers":1.77,"PlayerTurnovers":1.77,"PlayerFDPoints":29.850999999999996,"PlayerDKPoints":29.314999999999998,"PlayerPosition":"PG/SF","PlayerOwnership":4.7,"PlayerSalary":5800,"AdjustedOwnership":4.7,"Over":0,"PlayerValue":5.054310344827586,"$$hashKey":"object:283"},{"PlayerName":"tony snell","PlayerTeam":"DET","PlayerOpp":"CHI","PlayerOriginalMinutes":28,"PlayerMinutes":28,"PlayerOriginalPoints":8.95,"PlayerPoints":8.95,"PlayerOriginalThrees":1.89,"PlayerThrees":1.89,"PlayerOriginalRebounds":1.86,"PlayerRebounds":1.86,"PlayerOriginalAssists":1.59,"PlayerAssists":1.59,"PlayerOriginalSteals":0.51,"PlayerSteals":0.51,"PlayerOriginalBlocks":0.35,"PlayerBlocks":0.35,"PlayerOriginalTurnovers":0.43,"PlayerTurnovers":0.43,"PlayerFDPoints":15.716999999999999,"PlayerDKPoints":16.11,"PlayerPosition":"SF/PF","PlayerOwnership":1.5,"PlayerSalary":4200,"AdjustedOwnership":1.5,"Over":0,"PlayerValue":3.8357142857142854,"$$hashKey":"object:284"},{"PlayerName":"tim frazier","PlayerTeam":"DET","PlayerOpp":"CHI","PlayerOriginalMinutes":4,"PlayerMinutes":4,"PlayerOriginalPoints":1.23,"PlayerPoints":1.23,"PlayerOriginalThrees":0,"PlayerThrees":0,"PlayerOriginalRebounds":0.37,"PlayerRebounds":0.37,"PlayerOriginalAssists":1.33,"PlayerAssists":1.33,"PlayerOriginalSteals":0.13,"PlayerSteals":0.13,"PlayerOriginalBlocks":0.03,"PlayerBlocks":0.03,"PlayerOriginalTurnovers":0.35,"PlayerTurnovers":0.35,"PlayerFDPoints":3.799,"PlayerDKPoints":3.8324999999999996,"PlayerPosition":"PG","PlayerOwnership":0.1,"PlayerSalary":3000,"AdjustedOwnership":0.1,"Over":0,"PlayerValue":1.2774999999999999,"$$hashKey":"object:285"},{"PlayerName":"andre drummond","PlayerTeam":"DET","PlayerOpp":"CHI","PlayerOriginalMinutes":35,"PlayerMinutes":35,"PlayerOriginalPoints":19.76,"PlayerPoints":19.76,"PlayerOriginalThrees":0.03,"PlayerThrees":0.03,"PlayerOriginalRebounds":17.63,"PlayerRebounds":17.63,"PlayerOriginalAssists":3,"PlayerAssists":3,"PlayerOriginalSteals":2.04,"PlayerSteals":2.04,"PlayerOriginalBlocks":2.41,"PlayerBlocks":2.41,"PlayerOriginalTurnovers":2.92,"PlayerTurnovers":2.92,"PlayerFDPoints":55.84599999999999,"PlayerDKPoints":55.2525,"PlayerPosition":"C","PlayerOwnership":24.2,"PlayerSalary":10100,"AdjustedOwnership":24.2,"Over":0,"PlayerValue":5.470544554455445,"$$hashKey":"object:286"},{"PlayerName":"derrick rose","PlayerTeam":"DET","PlayerOpp":"CHI","PlayerOriginalMinutes":29,"PlayerMinutes":29,"PlayerOriginalPoints":21.28,"PlayerPoints":21.28,"PlayerOriginalThrees":1.26,"PlayerThrees":1.26,"PlayerOriginalRebounds":3,"PlayerRebounds":3,"PlayerOriginalAssists":6.2,"PlayerAssists":6.2,"PlayerOriginalSteals":0.86,"PlayerSteals":0.86,"PlayerOriginalBlocks":0.37,"PlayerBlocks":0.37,"PlayerOriginalTurnovers":2.34,"PlayerTurnovers":2.34,"PlayerFDPoints":35.53,"PlayerDKPoints":36.25,"PlayerPosition":"PG/SG","PlayerOwnership":5.7,"PlayerSalary":7300,"AdjustedOwnership":5.7,"Over":0,"PlayerValue":4.965753424657534,"$$hashKey":"object:287"},{"PlayerName":"svi mykhailiuk","PlayerTeam":"DET","PlayerOpp":"CHI","PlayerOriginalMinutes":30,"PlayerMinutes":30,"PlayerOriginalPoints":11.95,"PlayerPoints":11.95,"PlayerOriginalThrees":2.99,"PlayerThrees":2.99,"PlayerOriginalRebounds":2.17,"PlayerRebounds":2.17,"PlayerOriginalAssists":2.45,"PlayerAssists":2.45,"PlayerOriginalSteals":1.01,"PlayerSteals":1.01,"PlayerOriginalBlocks":0.08,"PlayerBlocks":0.08,"PlayerOriginalTurnovers":1.58,"PlayerTurnovers":1.58,"PlayerFDPoints":19.918999999999997,"PlayerDKPoints":21.2225,"PlayerPosition":"SG/SF","PlayerOwnership":4.8,"PlayerSalary":4000,"AdjustedOwnership":4.8,"Over":0,"PlayerValue":5.305625,"$$hashKey":"object:288"},{"PlayerName":"markieff morris","PlayerTeam":"DET","PlayerOpp":"CHI","PlayerOriginalMinutes":18,"PlayerMinutes":18,"PlayerOriginalPoints":9.42,"PlayerPoints":9.42,"PlayerOriginalThrees":1.45,"PlayerThrees":1.45,"PlayerOriginalRebounds":3.33,"PlayerRebounds":3.33,"PlayerOriginalAssists":1.62,"PlayerAssists":1.62,"PlayerOriginalSteals":0.55,"PlayerSteals":0.55,"PlayerOriginalBlocks":0.33,"PlayerBlocks":0.33,"PlayerOriginalTurnovers":1.06,"PlayerTurnovers":1.06,"PlayerFDPoints":17.426,"PlayerDKPoints":17.9675,"PlayerPosition":"PF/C","PlayerOwnership":3.6,"PlayerSalary":4300,"AdjustedOwnership":3.6,"Over":0,"PlayerValue":4.178488372093023,"$$hashKey":"object:289"},{"PlayerName":"christian wood","PlayerTeam":"DET","PlayerOpp":"CHI","PlayerOriginalMinutes":12,"PlayerMinutes":12,"PlayerOriginalPoints":6.33,"PlayerPoints":6.33,"PlayerOriginalThrees":0.38,"PlayerThrees":0.38,"PlayerOriginalRebounds":3.69,"PlayerRebounds":3.69,"PlayerOriginalAssists":0.56,"PlayerAssists":0.56,"PlayerOriginalSteals":0.27,"PlayerSteals":0.27,"PlayerOriginalBlocks":0.67,"PlayerBlocks":0.67,"PlayerOriginalTurnovers":0.65,"PlayerTurnovers":0.65,"PlayerFDPoints":13.767999999999999,"PlayerDKPoints":13.5275,"PlayerPosition":"PF/C","PlayerOwnership":0.1,"PlayerSalary":4100,"AdjustedOwnership":0.1,"Over":0,"PlayerValue":3.2993902439024394,"$$hashKey":"object:290"},{"PlayerName":"langston galloway","PlayerTeam":"DET","PlayerOpp":"CHI","PlayerOriginalMinutes":21,"PlayerMinutes":21,"PlayerOriginalPoints":8.33,"PlayerPoints":8.33,"PlayerOriginalThrees":1.55,"PlayerThrees":1.55,"PlayerOriginalRebounds":2,"PlayerRebounds":2,"PlayerOriginalAssists":1.18,"PlayerAssists":1.18,"PlayerOriginalSteals":0.54,"PlayerSteals":0.54,"PlayerOriginalBlocks":0.15,"PlayerBlocks":0.15,"PlayerOriginalTurnovers":0.36,"PlayerTurnovers":0.36,"PlayerFDPoints":14.21,"PlayerDKPoints":14.575000000000001,"PlayerPosition":"PG/SG","PlayerOwnership":0.1,"PlayerSalary":3400,"AdjustedOwnership":0.1,"Over":0,"PlayerValue":4.286764705882353,"$$hashKey":"object:291"},{"PlayerName":"russell westbrook","PlayerTeam":"HOU","PlayerOpp":"","PlayerOriginalMinutes":37,"PlayerMinutes":37,"PlayerOriginalPoints":26.03,"PlayerPoints":26.03,"PlayerOriginalThrees":1.54,"PlayerThrees":1.54,"PlayerOriginalRebounds":9.41,"PlayerRebounds":9.41,"PlayerOriginalAssists":6.84,"PlayerAssists":6.84,"PlayerOriginalSteals":1.89,"PlayerSteals":1.89,"PlayerOriginalBlocks":0.49,"PlayerBlocks":0.49,"PlayerOriginalTurnovers":4.91,"PlayerTurnovers":4.91,"PlayerFDPoints":49.812,"PlayerDKPoints":51.1275,"PlayerPosition":"","PlayerOwnership":0,"PlayerSalary":0,"AdjustedOwnership":0,"Over":0,"$$hashKey":"object:1078"},{"PlayerName":"james harden","PlayerTeam":"HOU","PlayerOpp":"","PlayerOriginalMinutes":37,"PlayerMinutes":37,"PlayerOriginalPoints":37.6,"PlayerPoints":37.6,"PlayerOriginalThrees":4.87,"PlayerThrees":4.87,"PlayerOriginalRebounds":6.81,"PlayerRebounds":6.81,"PlayerOriginalAssists":7.07,"PlayerAssists":7.07,"PlayerOriginalSteals":1.99,"PlayerSteals":1.99,"PlayerOriginalBlocks":0.89,"PlayerBlocks":0.89,"PlayerOriginalTurnovers":4.88,"PlayerTurnovers":4.88,"PlayerFDPoints":60.13699999999999,"PlayerDKPoints":62.4725,"PlayerPosition":"","PlayerOwnership":0,"PlayerSalary":0,"AdjustedOwnership":0,"Over":0,"$$hashKey":"object:1079"},{"PlayerName":"danuel house","PlayerTeam":"HOU","PlayerOpp":"","PlayerOriginalMinutes":24,"PlayerMinutes":24,"PlayerOriginalPoints":8.16,"PlayerPoints":8.16,"PlayerOriginalThrees":1.47,"PlayerThrees":1.47,"PlayerOriginalRebounds":3.51,"PlayerRebounds":3.51,"PlayerOriginalAssists":0.93,"PlayerAssists":0.93,"PlayerOriginalSteals":0.61,"PlayerSteals":0.61,"PlayerOriginalBlocks":0.39,"PlayerBlocks":0.39,"PlayerOriginalTurnovers":0.8,"PlayerTurnovers":0.8,"PlayerFDPoints":15.966999999999999,"PlayerDKPoints":16.2775,"PlayerPosition":"","PlayerOwnership":0,"PlayerSalary":0,"AdjustedOwnership":0,"Over":0,"$$hashKey":"object:1080"},{"PlayerName":"p.j. tucker","PlayerTeam":"HOU","PlayerOpp":"","PlayerOriginalMinutes":36,"PlayerMinutes":36,"PlayerOriginalPoints":8.87,"PlayerPoints":8.87,"PlayerOriginalThrees":1.72,"PlayerThrees":1.72,"PlayerOriginalRebounds":8.64,"PlayerRebounds":8.64,"PlayerOriginalAssists":1.4,"PlayerAssists":1.4,"PlayerOriginalSteals":1.22,"PlayerSteals":1.22,"PlayerOriginalBlocks":0.56,"PlayerBlocks":0.56,"PlayerOriginalTurnovers":0.93,"PlayerTurnovers":0.93,"PlayerFDPoints":25.748,"PlayerDKPoints":25.725000000000005,"PlayerPosition":"","PlayerOwnership":0,"PlayerSalary":0,"AdjustedOwnership":0,"Over":0,"$$hashKey":"object:1081"},{"PlayerName":"austin rivers","PlayerTeam":"HOU","PlayerOpp":"","PlayerOriginalMinutes":10,"PlayerMinutes":10,"PlayerOriginalPoints":3.34,"PlayerPoints":3.34,"PlayerOriginalThrees":0.59,"PlayerThrees":0.59,"PlayerOriginalRebounds":1.17,"PlayerRebounds":1.17,"PlayerOriginalAssists":0.67,"PlayerAssists":0.67,"PlayerOriginalSteals":0.24,"PlayerSteals":0.24,"PlayerOriginalBlocks":0.12,"PlayerBlocks":0.12,"PlayerOriginalTurnovers":0.33,"PlayerTurnovers":0.33,"PlayerFDPoints":6.499,"PlayerDKPoints":6.6575,"PlayerPosition":"","PlayerOwnership":0,"PlayerSalary":0,"AdjustedOwnership":0,"Over":0,"$$hashKey":"object:1082"},{"PlayerName":"tyson chandler","PlayerTeam":"HOU","PlayerOpp":"","PlayerOriginalMinutes":13,"PlayerMinutes":13,"PlayerOriginalPoints":2.3,"PlayerPoints":2.3,"PlayerOriginalThrees":0,"PlayerThrees":0,"PlayerOriginalRebounds":4.69,"PlayerRebounds":4.69,"PlayerOriginalAssists":0.42,"PlayerAssists":0.42,"PlayerOriginalSteals":0.32,"PlayerSteals":0.32,"PlayerOriginalBlocks":0.4,"PlayerBlocks":0.4,"PlayerOriginalTurnovers":0.48,"PlayerTurnovers":0.48,"PlayerFDPoints":10.238,"PlayerDKPoints":9.992500000000003,"PlayerPosition":"","PlayerOwnership":0,"PlayerSalary":0,"AdjustedOwnership":0,"Over":0,"$$hashKey":"object:1083"},{"PlayerName":"isaiah hartenstein","PlayerTeam":"HOU","PlayerOpp":"","PlayerOriginalMinutes":26,"PlayerMinutes":26,"PlayerOriginalPoints":9.11,"PlayerPoints":9.11,"PlayerOriginalThrees":0.07,"PlayerThrees":0.07,"PlayerOriginalRebounds":9.55,"PlayerRebounds":9.55,"PlayerOriginalAssists":1.62,"PlayerAssists":1.62,"PlayerOriginalSteals":0.8,"PlayerSteals":0.8,"PlayerOriginalBlocks":1.32,"PlayerBlocks":1.32,"PlayerOriginalTurnovers":1.87,"PlayerTurnovers":1.87,"PlayerFDPoints":27.49,"PlayerDKPoints":26.817500000000003,"PlayerPosition":"","PlayerOwnership":0,"PlayerSalary":0,"AdjustedOwnership":0,"Over":0,"$$hashKey":"object:1084"},{"PlayerName":"ben mclemore","PlayerTeam":"HOU","PlayerOpp":"","PlayerOriginalMinutes":27,"PlayerMinutes":27,"PlayerOriginalPoints":11.51,"PlayerPoints":11.51,"PlayerOriginalThrees":2.79,"PlayerThrees":2.79,"PlayerOriginalRebounds":3.2,"PlayerRebounds":3.2,"PlayerOriginalAssists":0.99,"PlayerAssists":0.99,"PlayerOriginalSteals":0.79,"PlayerSteals":0.79,"PlayerOriginalBlocks":0.3,"PlayerBlocks":0.3,"PlayerOriginalTurnovers":0.9,"PlayerTurnovers":0.9,"PlayerFDPoints":19.205000000000002,"PlayerDKPoints":20.12,"PlayerPosition":"","PlayerOwnership":0,"PlayerSalary":0,"AdjustedOwnership":0,"Over":0,"$$hashKey":"object:1085"},{"PlayerName":"eric gordon","PlayerTeam":"HOU","PlayerOpp":"","PlayerOriginalMinutes":30,"PlayerMinutes":30,"PlayerOriginalPoints":14.06,"PlayerPoints":14.06,"PlayerOriginalThrees":2.7,"PlayerThrees":2.7,"PlayerOriginalRebounds":1.88,"PlayerRebounds":1.88,"PlayerOriginalAssists":1.3,"PlayerAssists":1.3,"PlayerOriginalSteals":0.55,"PlayerSteals":0.55,"PlayerOriginalBlocks":0.4,"PlayerBlocks":0.4,"PlayerOriginalTurnovers":1.23,"PlayerTurnovers":1.23,"PlayerFDPoints":19.885999999999996,"PlayerDKPoints":20.995,"PlayerPosition":"","PlayerOwnership":0,"PlayerSalary":0,"AdjustedOwnership":0,"Over":0,"$$hashKey":"object:1086"},{"PlayerName":"rajon rondo","PlayerTeam":"LAL","PlayerOpp":"OKC","PlayerOriginalMinutes":32,"PlayerMinutes":32,"PlayerOriginalPoints":13.02,"PlayerPoints":13.02,"PlayerOriginalThrees":1.8,"PlayerThrees":1.8,"PlayerOriginalRebounds":6.01,"PlayerRebounds":6.01,"PlayerOriginalAssists":10.81,"PlayerAssists":10.81,"PlayerOriginalSteals":1.2,"PlayerSteals":1.2,"PlayerOriginalBlocks":0.11,"PlayerBlocks":0.11,"PlayerOriginalTurnovers":3.78,"PlayerTurnovers":3.78,"PlayerFDPoints":36.597,"PlayerDKPoints":39.87749999999999,"PlayerPosition":"PG","PlayerOwnership":56.1,"PlayerSalary":3800,"AdjustedOwnership":56.1,"Over":0,"PlayerValue":9.63078947368421,"$$hashKey":"object:30"},{"PlayerName":"dwight howard","PlayerTeam":"LAL","PlayerOpp":"OKC","PlayerOriginalMinutes":26,"PlayerMinutes":26,"PlayerOriginalPoints":13.67,"PlayerPoints":13.67,"PlayerOriginalThrees":0.05,"PlayerThrees":0.05,"PlayerOriginalRebounds":10.83,"PlayerRebounds":10.83,"PlayerOriginalAssists":1.39,"PlayerAssists":1.39,"PlayerOriginalSteals":0.54,"PlayerSteals":0.54,"PlayerOriginalBlocks":1.36,"PlayerBlocks":1.36,"PlayerOriginalTurnovers":2.16,"PlayerTurnovers":2.16,"PlayerFDPoints":32.291,"PlayerDKPoints":33.5375,"PlayerPosition":"C","PlayerOwnership":1.7,"PlayerSalary":5100,"AdjustedOwnership":1.7,"Over":0,"PlayerValue":6.575980392156863,"$$hashKey":"object:31"},{"PlayerName":"quinn cook","PlayerTeam":"LAL","PlayerOpp":"OKC","PlayerOriginalMinutes":16,"PlayerMinutes":16,"PlayerOriginalPoints":6.48,"PlayerPoints":6.48,"PlayerOriginalThrees":0.78,"PlayerThrees":0.78,"PlayerOriginalRebounds":1.34,"PlayerRebounds":1.34,"PlayerOriginalAssists":1.97,"PlayerAssists":1.97,"PlayerOriginalSteals":0.28,"PlayerSteals":0.28,"PlayerOriginalBlocks":0.03,"PlayerBlocks":0.03,"PlayerOriginalTurnovers":0.81,"PlayerTurnovers":0.81,"PlayerFDPoints":11.163,"PlayerDKPoints":11.715000000000002,"PlayerPosition":"PG","PlayerOwnership":0.1,"PlayerSalary":3000,"AdjustedOwnership":0.1,"Over":0,"PlayerValue":3.9050000000000007,"$$hashKey":"object:32"},{"PlayerName":"kentavious caldwell-pope","PlayerTeam":"LAL","PlayerOpp":"OKC","PlayerOriginalMinutes":27,"PlayerMinutes":27,"PlayerOriginalPoints":11.74,"PlayerPoints":11.74,"PlayerOriginalThrees":1.36,"PlayerThrees":1.36,"PlayerOriginalRebounds":2.74,"PlayerRebounds":2.74,"PlayerOriginalAssists":2.42,"PlayerAssists":2.42,"PlayerOriginalSteals":0.84,"PlayerSteals":0.84,"PlayerOriginalBlocks":0.16,"PlayerBlocks":0.16,"PlayerOriginalTurnovers":0.91,"PlayerTurnovers":0.91,"PlayerFDPoints":20.748,"PlayerDKPoints":21.020000000000003,"PlayerPosition":"SG/SF","PlayerOwnership":12,"PlayerSalary":3700,"AdjustedOwnership":12,"Over":0,"PlayerValue":5.681081081081082,"$$hashKey":"object:33"},{"PlayerName":"kyle kuzma","PlayerTeam":"LAL","PlayerOpp":"OKC","PlayerOriginalMinutes":32,"PlayerMinutes":32,"PlayerOriginalPoints":19.18,"PlayerPoints":19.18,"PlayerOriginalThrees":2.47,"PlayerThrees":2.47,"PlayerOriginalRebounds":5.49,"PlayerRebounds":5.49,"PlayerOriginalAssists":1.7,"PlayerAssists":1.7,"PlayerOriginalSteals":0.47,"PlayerSteals":0.47,"PlayerOriginalBlocks":0.32,"PlayerBlocks":0.32,"PlayerOriginalTurnovers":2.09,"PlayerTurnovers":2.09,"PlayerFDPoints":28.598000000000003,"PlayerDKPoints":30.362500000000004,"PlayerPosition":"SF/PF","PlayerOwnership":7.2,"PlayerSalary":5400,"AdjustedOwnership":7.2,"Over":0,"PlayerValue":5.622685185185186,"$$hashKey":"object:34"},{"PlayerName":"javale mcgee","PlayerTeam":"LAL","PlayerOpp":"OKC","PlayerOriginalMinutes":22,"PlayerMinutes":22,"PlayerOriginalPoints":11.86,"PlayerPoints":11.86,"PlayerOriginalThrees":0.02,"PlayerThrees":0.02,"PlayerOriginalRebounds":8.48,"PlayerRebounds":8.48,"PlayerOriginalAssists":0.99,"PlayerAssists":0.99,"PlayerOriginalSteals":0.57,"PlayerSteals":0.57,"PlayerOriginalBlocks":1.65,"PlayerBlocks":1.65,"PlayerOriginalTurnovers":1.35,"PlayerTurnovers":1.35,"PlayerFDPoints":28.831,"PlayerDKPoints":27.72,"PlayerPosition":"C","PlayerOwnership":9.7,"PlayerSalary":4100,"AdjustedOwnership":9.7,"Over":0,"PlayerValue":6.760975609756097,"$$hashKey":"object:35"},{"PlayerName":"avery bradley","PlayerTeam":"LAL","PlayerOpp":"OKC","PlayerOriginalMinutes":27,"PlayerMinutes":27,"PlayerOriginalPoints":11.05,"PlayerPoints":11.05,"PlayerOriginalThrees":1.28,"PlayerThrees":1.28,"PlayerOriginalRebounds":2.77,"PlayerRebounds":2.77,"PlayerOriginalAssists":1.39,"PlayerAssists":1.39,"PlayerOriginalSteals":0.61,"PlayerSteals":0.61,"PlayerOriginalBlocks":0.17,"PlayerBlocks":0.17,"PlayerOriginalTurnovers":1.53,"PlayerTurnovers":1.53,"PlayerFDPoints":17.269000000000002,"PlayerDKPoints":18.0325,"PlayerPosition":"PG/SG","PlayerOwnership":1.3,"PlayerSalary":3500,"AdjustedOwnership":1.3,"Over":0,"PlayerValue":5.152142857142857,"$$hashKey":"object:36"},{"PlayerName":"alex caruso","PlayerTeam":"LAL","PlayerOpp":"OKC","PlayerOriginalMinutes":20,"PlayerMinutes":20,"PlayerOriginalPoints":5.94,"PlayerPoints":5.94,"PlayerOriginalThrees":0.6,"PlayerThrees":0.6,"PlayerOriginalRebounds":2.11,"PlayerRebounds":2.11,"PlayerOriginalAssists":2.1,"PlayerAssists":2.1,"PlayerOriginalSteals":0.92,"PlayerSteals":0.92,"PlayerOriginalBlocks":0.24,"PlayerBlocks":0.24,"PlayerOriginalTurnovers":0.97,"PlayerTurnovers":0.97,"PlayerFDPoints":14.132000000000001,"PlayerDKPoints":13.862500000000002,"PlayerPosition":"PG/SG","PlayerOwnership":1.7,"PlayerSalary":3100,"AdjustedOwnership":1.7,"Over":0,"PlayerValue":4.471774193548388,"$$hashKey":"object:37"},{"PlayerName":"jared dudley","PlayerTeam":"LAL","PlayerOpp":"OKC","PlayerOriginalMinutes":19,"PlayerMinutes":19,"PlayerOriginalPoints":3.85,"PlayerPoints":3.85,"PlayerOriginalThrees":0.64,"PlayerThrees":0.64,"PlayerOriginalRebounds":2.32,"PlayerRebounds":2.32,"PlayerOriginalAssists":1.78,"PlayerAssists":1.78,"PlayerOriginalSteals":0.54,"PlayerSteals":0.54,"PlayerOriginalBlocks":0.19,"PlayerBlocks":0.19,"PlayerOriginalTurnovers":0.49,"PlayerTurnovers":0.49,"PlayerFDPoints":11.004,"PlayerDKPoints":10.955000000000002,"PlayerPosition":"SF/PF","PlayerOwnership":0.1,"PlayerSalary":3000,"AdjustedOwnership":0.1,"Over":0,"PlayerValue":3.6516666666666673,"$$hashKey":"object:38"},{"PlayerName":"troy daniels","PlayerTeam":"LAL","PlayerOpp":"OKC","PlayerOriginalMinutes":19,"PlayerMinutes":19,"PlayerOriginalPoints":6.53,"PlayerPoints":6.53,"PlayerOriginalThrees":1.48,"PlayerThrees":1.48,"PlayerOriginalRebounds":1.65,"PlayerRebounds":1.65,"PlayerOriginalAssists":0.68,"PlayerAssists":0.68,"PlayerOriginalSteals":0.51,"PlayerSteals":0.51,"PlayerOriginalBlocks":0.1,"PlayerBlocks":0.1,"PlayerOriginalTurnovers":0.54,"PlayerTurnovers":0.54,"PlayerFDPoints":10.82,"PlayerDKPoints":11.302499999999998,"PlayerPosition":"SG","PlayerOwnership":0.1,"PlayerSalary":3000,"AdjustedOwnership":0.1,"Over":0,"PlayerValue":3.7674999999999996,"$$hashKey":"object:39"},{"PlayerName":"eric bledsoe","PlayerTeam":"MIL","PlayerOpp":"POR","PlayerOriginalMinutes":28,"PlayerMinutes":28,"PlayerOriginalPoints":15.82,"PlayerPoints":15.82,"PlayerOriginalThrees":1.32,"PlayerThrees":1.32,"PlayerOriginalRebounds":5.06,"PlayerRebounds":5.06,"PlayerOriginalAssists":5.14,"PlayerAssists":5.14,"PlayerOriginalSteals":1.27,"PlayerSteals":1.27,"PlayerOriginalBlocks":0.44,"PlayerBlocks":0.44,"PlayerOriginalTurnovers":2.16,"PlayerTurnovers":2.16,"PlayerFDPoints":32.572,"PlayerDKPoints":32.855000000000004,"PlayerPosition":"PG","PlayerOwnership":11.6,"PlayerSalary":6100,"AdjustedOwnership":11.6,"Over":0,"PlayerValue":5.386065573770493,"$$hashKey":"object:631"},{"PlayerName":"wesley matthews","PlayerTeam":"MIL","PlayerOpp":"POR","PlayerOriginalMinutes":24,"PlayerMinutes":24,"PlayerOriginalPoints":7.18,"PlayerPoints":7.18,"PlayerOriginalThrees":1.19,"PlayerThrees":1.19,"PlayerOriginalRebounds":2.38,"PlayerRebounds":2.38,"PlayerOriginalAssists":1.23,"PlayerAssists":1.23,"PlayerOriginalSteals":0.64,"PlayerSteals":0.64,"PlayerOriginalBlocks":0.21,"PlayerBlocks":0.21,"PlayerOriginalTurnovers":0.72,"PlayerTurnovers":0.72,"PlayerFDPoints":13.711,"PlayerDKPoints":13.935,"PlayerPosition":"SG/SF","PlayerOwnership":0.1,"PlayerSalary":3600,"AdjustedOwnership":0.1,"Over":0,"PlayerValue":3.870833333333333,"$$hashKey":"object:632"},{"PlayerName":"khris middleton","PlayerTeam":"MIL","PlayerOpp":"POR","PlayerOriginalMinutes":31,"PlayerMinutes":31,"PlayerOriginalPoints":20.1,"PlayerPoints":20.1,"PlayerOriginalThrees":2.35,"PlayerThrees":2.35,"PlayerOriginalRebounds":6.72,"PlayerRebounds":6.72,"PlayerOriginalAssists":3.73,"PlayerAssists":3.73,"PlayerOriginalSteals":0.95,"PlayerSteals":0.95,"PlayerOriginalBlocks":0.11,"PlayerBlocks":0.11,"PlayerOriginalTurnovers":2.3,"PlayerTurnovers":2.3,"PlayerFDPoints":34.639,"PlayerDKPoints":36.24,"PlayerPosition":"SG/SF","PlayerOwnership":5.7,"PlayerSalary":7500,"AdjustedOwnership":5.7,"Over":0,"PlayerValue":4.832000000000001,"$$hashKey":"object:633"},{"PlayerName":"giannis antetokounmpo","PlayerTeam":"MIL","PlayerOpp":"POR","PlayerOriginalMinutes":31,"PlayerMinutes":31,"PlayerOriginalPoints":28.07,"PlayerPoints":28.07,"PlayerOriginalThrees":1.53,"PlayerThrees":1.53,"PlayerOriginalRebounds":13.15,"PlayerRebounds":13.15,"PlayerOriginalAssists":5.23,"PlayerAssists":5.23,"PlayerOriginalSteals":1.17,"PlayerSteals":1.17,"PlayerOriginalBlocks":1.45,"PlayerBlocks":1.45,"PlayerOriginalTurnovers":3.71,"PlayerTurnovers":3.71,"PlayerFDPoints":55.845,"PlayerDKPoints":58.0025,"PlayerPosition":"SF/PF","PlayerOwnership":15.6,"PlayerSalary":11500,"AdjustedOwnership":15.6,"Over":0,"PlayerValue":5.043695652173913,"$$hashKey":"object:634"},{"PlayerName":"brook lopez","PlayerTeam":"MIL","PlayerOpp":"POR","PlayerOriginalMinutes":26,"PlayerMinutes":26,"PlayerOriginalPoints":10.23,"PlayerPoints":10.23,"PlayerOriginalThrees":1.5,"PlayerThrees":1.5,"PlayerOriginalRebounds":4.92,"PlayerRebounds":4.92,"PlayerOriginalAssists":1.34,"PlayerAssists":1.34,"PlayerOriginalSteals":0.59,"PlayerSteals":0.59,"PlayerOriginalBlocks":2.38,"PlayerBlocks":2.38,"PlayerOriginalTurnovers":0.96,"PlayerTurnovers":0.96,"PlayerFDPoints":26.094,"PlayerDKPoints":24.600000000000005,"PlayerPosition":"C","PlayerOwnership":3.5,"PlayerSalary":5400,"AdjustedOwnership":3.5,"Over":0,"PlayerValue":4.555555555555556,"$$hashKey":"object:635"},{"PlayerName":"george hill","PlayerTeam":"MIL","PlayerOpp":"POR","PlayerOriginalMinutes":21,"PlayerMinutes":21,"PlayerOriginalPoints":8.41,"PlayerPoints":8.41,"PlayerOriginalThrees":1.19,"PlayerThrees":1.19,"PlayerOriginalRebounds":3.41,"PlayerRebounds":3.41,"PlayerOriginalAssists":3.06,"PlayerAssists":3.06,"PlayerOriginalSteals":0.74,"PlayerSteals":0.74,"PlayerOriginalBlocks":0.13,"PlayerBlocks":0.13,"PlayerOriginalTurnovers":0.86,"PlayerTurnovers":0.86,"PlayerFDPoints":18.842,"PlayerDKPoints":19.167500000000004,"PlayerPosition":"PG/SG","PlayerOwnership":1.5,"PlayerSalary":4200,"AdjustedOwnership":1.5,"Over":0,"PlayerValue":4.5636904761904775,"$$hashKey":"object:636"},{"PlayerName":"pat connaughton","PlayerTeam":"MIL","PlayerOpp":"POR","PlayerOriginalMinutes":18,"PlayerMinutes":18,"PlayerOriginalPoints":4.99,"PlayerPoints":4.99,"PlayerOriginalThrees":0.68,"PlayerThrees":0.68,"PlayerOriginalRebounds":4.33,"PlayerRebounds":4.33,"PlayerOriginalAssists":1.62,"PlayerAssists":1.62,"PlayerOriginalSteals":0.39,"PlayerSteals":0.39,"PlayerOriginalBlocks":0.43,"PlayerBlocks":0.43,"PlayerOriginalTurnovers":0.53,"PlayerTurnovers":0.53,"PlayerFDPoints":14.546000000000001,"PlayerDKPoints":14.547499999999998,"PlayerPosition":"SG/SF","PlayerOwnership":0.3,"PlayerSalary":3500,"AdjustedOwnership":0.3,"Over":0,"PlayerValue":4.15642857142857,"$$hashKey":"object:637"},{"PlayerName":"sterling brown","PlayerTeam":"MIL","PlayerOpp":"POR","PlayerOriginalMinutes":4,"PlayerMinutes":4,"PlayerOriginalPoints":1.32,"PlayerPoints":1.32,"PlayerOriginalThrees":0.21,"PlayerThrees":0.21,"PlayerOriginalRebounds":1.02,"PlayerRebounds":1.02,"PlayerOriginalAssists":0.26,"PlayerAssists":0.26,"PlayerOriginalSteals":0.11,"PlayerSteals":0.11,"PlayerOriginalBlocks":0.03,"PlayerBlocks":0.03,"PlayerOriginalTurnovers":0.19,"PlayerTurnovers":0.19,"PlayerFDPoints":3.164,"PlayerDKPoints":3.2750000000000004,"PlayerPosition":"SG/SF","PlayerOwnership":0.1,"PlayerSalary":3000,"AdjustedOwnership":0.1,"Over":0,"PlayerValue":1.0916666666666668,"$$hashKey":"object:638"},{"PlayerName":"ersan ilyasova","PlayerTeam":"MIL","PlayerOpp":"POR","PlayerOriginalMinutes":17,"PlayerMinutes":17,"PlayerOriginalPoints":7.74,"PlayerPoints":7.74,"PlayerOriginalThrees":0.99,"PlayerThrees":0.99,"PlayerOriginalRebounds":5.57,"PlayerRebounds":5.57,"PlayerOriginalAssists":0.92,"PlayerAssists":0.92,"PlayerOriginalSteals":0.42,"PlayerSteals":0.42,"PlayerOriginalBlocks":0.32,"PlayerBlocks":0.32,"PlayerOriginalTurnovers":0.69,"PlayerTurnovers":0.69,"PlayerFDPoints":17.334,"PlayerDKPoints":17.712500000000002,"PlayerPosition":"PF/C","PlayerOwnership":0.1,"PlayerSalary":4000,"AdjustedOwnership":0.1,"Over":0,"PlayerValue":4.4281250000000005,"$$hashKey":"object:639"},{"PlayerName":"robin lopez","PlayerTeam":"MIL","PlayerOpp":"POR","PlayerOriginalMinutes":16,"PlayerMinutes":16,"PlayerOriginalPoints":6.19,"PlayerPoints":6.19,"PlayerOriginalThrees":0.38,"PlayerThrees":0.38,"PlayerOriginalRebounds":3.21,"PlayerRebounds":3.21,"PlayerOriginalAssists":0.67,"PlayerAssists":0.67,"PlayerOriginalSteals":0.12,"PlayerSteals":0.12,"PlayerOriginalBlocks":0.88,"PlayerBlocks":0.88,"PlayerOriginalTurnovers":0.93,"PlayerTurnovers":0.93,"PlayerFDPoints":13.117,"PlayerDKPoints":12.932500000000003,"PlayerPosition":"C","PlayerOwnership":0.1,"PlayerSalary":3000,"AdjustedOwnership":0.1,"Over":0,"PlayerValue":4.310833333333334,"$$hashKey":"object:640"},{"PlayerName":"donte divincenzo","PlayerTeam":"MIL","PlayerOpp":"POR","PlayerOriginalMinutes":23,"PlayerMinutes":23,"PlayerOriginalPoints":7.32,"PlayerPoints":7.32,"PlayerOriginalThrees":0.92,"PlayerThrees":0.92,"PlayerOriginalRebounds":4.85,"PlayerRebounds":4.85,"PlayerOriginalAssists":2.14,"PlayerAssists":2.14,"PlayerOriginalSteals":1.17,"PlayerSteals":1.17,"PlayerOriginalBlocks":0.3,"PlayerBlocks":0.3,"PlayerOriginalTurnovers":1,"PlayerTurnovers":1,"PlayerFDPoints":19.759999999999998,"PlayerDKPoints":19.492500000000003,"PlayerPosition":"PG/SG","PlayerOwnership":1.5,"PlayerSalary":4600,"AdjustedOwnership":1.5,"Over":0,"PlayerValue":4.237500000000001,"$$hashKey":"object:641"},{"PlayerName":"jeff teague","PlayerTeam":"MIN","PlayerOpp":"","PlayerOriginalMinutes":27,"PlayerMinutes":27,"PlayerOriginalPoints":13.11,"PlayerPoints":13.11,"PlayerOriginalThrees":0.99,"PlayerThrees":0.99,"PlayerOriginalRebounds":2.78,"PlayerRebounds":2.78,"PlayerOriginalAssists":5.25,"PlayerAssists":5.25,"PlayerOriginalSteals":0.87,"PlayerSteals":0.87,"PlayerOriginalBlocks":0.35,"PlayerBlocks":0.35,"PlayerOriginalTurnovers":2.19,"PlayerTurnovers":2.19,"PlayerFDPoints":25.790999999999997,"PlayerDKPoints":26.299999999999997,"PlayerPosition":"","PlayerOwnership":0,"PlayerSalary":0,"AdjustedOwnership":0,"Over":0,"$$hashKey":"object:1087"},{"PlayerName":"andrew wiggins","PlayerTeam":"MIN","PlayerOpp":"","PlayerOriginalMinutes":34,"PlayerMinutes":34,"PlayerOriginalPoints":23.07,"PlayerPoints":23.07,"PlayerOriginalThrees":2.51,"PlayerThrees":2.51,"PlayerOriginalRebounds":5.77,"PlayerRebounds":5.77,"PlayerOriginalAssists":2.93,"PlayerAssists":2.93,"PlayerOriginalSteals":0.93,"PlayerSteals":0.93,"PlayerOriginalBlocks":0.71,"PlayerBlocks":0.71,"PlayerOriginalTurnovers":2.27,"PlayerTurnovers":2.27,"PlayerFDPoints":37.039,"PlayerDKPoints":38.0775,"PlayerPosition":"","PlayerOwnership":0,"PlayerSalary":0,"AdjustedOwnership":0,"Over":0,"$$hashKey":"object:1088"},{"PlayerName":"naz reid","PlayerTeam":"MIN","PlayerOpp":"","PlayerOriginalMinutes":15,"PlayerMinutes":15,"PlayerOriginalPoints":8.33,"PlayerPoints":8.33,"PlayerOriginalThrees":1.44,"PlayerThrees":1.44,"PlayerOriginalRebounds":3.87,"PlayerRebounds":3.87,"PlayerOriginalAssists":1.19,"PlayerAssists":1.19,"PlayerOriginalSteals":0.62,"PlayerSteals":0.62,"PlayerOriginalBlocks":0.57,"PlayerBlocks":0.57,"PlayerOriginalTurnovers":1.01,"PlayerTurnovers":1.01,"PlayerFDPoints":17.319,"PlayerDKPoints":17.547500000000003,"PlayerPosition":"","PlayerOwnership":0,"PlayerSalary":0,"AdjustedOwnership":0,"Over":0,"$$hashKey":"object:1089"},{"PlayerName":"robert covington","PlayerTeam":"MIN","PlayerOpp":"","PlayerOriginalMinutes":30,"PlayerMinutes":30,"PlayerOriginalPoints":13.46,"PlayerPoints":13.46,"PlayerOriginalThrees":2.56,"PlayerThrees":2.56,"PlayerOriginalRebounds":6.83,"PlayerRebounds":6.83,"PlayerOriginalAssists":1.07,"PlayerAssists":1.07,"PlayerOriginalSteals":1.84,"PlayerSteals":1.84,"PlayerOriginalBlocks":1.04,"PlayerBlocks":1.04,"PlayerOriginalTurnovers":1.46,"PlayerTurnovers":1.46,"PlayerFDPoints":30.441,"PlayerDKPoints":29.912499999999998,"PlayerPosition":"","PlayerOwnership":0,"PlayerSalary":0,"AdjustedOwnership":0,"Over":0,"$$hashKey":"object:1090"},{"PlayerName":"shabazz napier","PlayerTeam":"MIN","PlayerOpp":"","PlayerOriginalMinutes":26,"PlayerMinutes":26,"PlayerOriginalPoints":11.78,"PlayerPoints":11.78,"PlayerOriginalThrees":1.68,"PlayerThrees":1.68,"PlayerOriginalRebounds":3.28,"PlayerRebounds":3.28,"PlayerOriginalAssists":4.69,"PlayerAssists":4.69,"PlayerOriginalSteals":1.23,"PlayerSteals":1.23,"PlayerOriginalBlocks":0.36,"PlayerBlocks":0.36,"PlayerOriginalTurnovers":1.8,"PlayerTurnovers":1.8,"PlayerFDPoints":25.721,"PlayerDKPoints":26.035,"PlayerPosition":"","PlayerOwnership":0,"PlayerSalary":0,"AdjustedOwnership":0,"Over":0,"$$hashKey":"object:1091"},{"PlayerName":"josh okogie","PlayerTeam":"MIN","PlayerOpp":"","PlayerOriginalMinutes":19,"PlayerMinutes":19,"PlayerOriginalPoints":6.49,"PlayerPoints":6.49,"PlayerOriginalThrees":0.58,"PlayerThrees":0.58,"PlayerOriginalRebounds":4,"PlayerRebounds":4,"PlayerOriginalAssists":1.09,"PlayerAssists":1.09,"PlayerOriginalSteals":0.95,"PlayerSteals":0.95,"PlayerOriginalBlocks":0.35,"PlayerBlocks":0.35,"PlayerOriginalTurnovers":0.87,"PlayerTurnovers":0.87,"PlayerFDPoints":15.955,"PlayerDKPoints":15.58,"PlayerPosition":"","PlayerOwnership":0,"PlayerSalary":0,"AdjustedOwnership":0,"Over":0,"$$hashKey":"object:1092"},{"PlayerName":"jarrett culver","PlayerTeam":"MIN","PlayerOpp":"","PlayerOriginalMinutes":26,"PlayerMinutes":26,"PlayerOriginalPoints":9.92,"PlayerPoints":9.92,"PlayerOriginalThrees":0.99,"PlayerThrees":0.99,"PlayerOriginalRebounds":4.26,"PlayerRebounds":4.26,"PlayerOriginalAssists":1.9,"PlayerAssists":1.9,"PlayerOriginalSteals":1.19,"PlayerSteals":1.19,"PlayerOriginalBlocks":0.69,"PlayerBlocks":0.69,"PlayerOriginalTurnovers":1.4,"PlayerTurnovers":1.4,"PlayerFDPoints":22.122,"PlayerDKPoints":21.649999999999995,"PlayerPosition":"","PlayerOwnership":0,"PlayerSalary":0,"AdjustedOwnership":0,"Over":0,"$$hashKey":"object:1093"},{"PlayerName":"noah vonleh","PlayerTeam":"MIN","PlayerOpp":"","PlayerOriginalMinutes":11,"PlayerMinutes":11,"PlayerOriginalPoints":3.74,"PlayerPoints":3.74,"PlayerOriginalThrees":0.13,"PlayerThrees":0.13,"PlayerOriginalRebounds":3.74,"PlayerRebounds":3.74,"PlayerOriginalAssists":0.77,"PlayerAssists":0.77,"PlayerOriginalSteals":0.32,"PlayerSteals":0.32,"PlayerOriginalBlocks":0.29,"PlayerBlocks":0.29,"PlayerOriginalTurnovers":0.55,"PlayerTurnovers":0.55,"PlayerFDPoints":10.662999999999998,"PlayerDKPoints":10.58,"PlayerPosition":"","PlayerOwnership":0,"PlayerSalary":0,"AdjustedOwnership":0,"Over":0,"$$hashKey":"object:1094"},{"PlayerName":"gorgui dieng","PlayerTeam":"MIN","PlayerOpp":"","PlayerOriginalMinutes":25,"PlayerMinutes":25,"PlayerOriginalPoints":10.91,"PlayerPoints":10.91,"PlayerOriginalThrees":1.06,"PlayerThrees":1.06,"PlayerOriginalRebounds":9.08,"PlayerRebounds":9.08,"PlayerOriginalAssists":1.77,"PlayerAssists":1.77,"PlayerOriginalSteals":1.26,"PlayerSteals":1.26,"PlayerOriginalBlocks":1.13,"PlayerBlocks":1.13,"PlayerOriginalTurnovers":1.26,"PlayerTurnovers":1.26,"PlayerFDPoints":30.371,"PlayerDKPoints":29.595000000000002,"PlayerPosition":"","PlayerOwnership":0,"PlayerSalary":0,"AdjustedOwnership":0,"Over":0,"$$hashKey":"object:1095"},{"PlayerName":"keita bates-diop","PlayerTeam":"MIN","PlayerOpp":"","PlayerOriginalMinutes":12,"PlayerMinutes":12,"PlayerOriginalPoints":4.64,"PlayerPoints":4.64,"PlayerOriginalThrees":0.62,"PlayerThrees":0.62,"PlayerOriginalRebounds":2.09,"PlayerRebounds":2.09,"PlayerOriginalAssists":0.36,"PlayerAssists":0.36,"PlayerOriginalSteals":0.39,"PlayerSteals":0.39,"PlayerOriginalBlocks":0.27,"PlayerBlocks":0.27,"PlayerOriginalTurnovers":0.28,"PlayerTurnovers":0.28,"PlayerFDPoints":9.388000000000002,"PlayerDKPoints":9.282499999999999,"PlayerPosition":"","PlayerOwnership":0,"PlayerSalary":0,"AdjustedOwnership":0,"Over":0,"$$hashKey":"object:1096"},{"PlayerName":"kelan martin","PlayerTeam":"MIN","PlayerOpp":"","PlayerOriginalMinutes":14,"PlayerMinutes":14,"PlayerOriginalPoints":4.51,"PlayerPoints":4.51,"PlayerOriginalThrees":0.68,"PlayerThrees":0.68,"PlayerOriginalRebounds":2.81,"PlayerRebounds":2.81,"PlayerOriginalAssists":0.43,"PlayerAssists":0.43,"PlayerOriginalSteals":0.15,"PlayerSteals":0.15,"PlayerOriginalBlocks":0.22,"PlayerBlocks":0.22,"PlayerOriginalTurnovers":0.27,"PlayerTurnovers":0.27,"PlayerFDPoints":9.366999999999999,"PlayerDKPoints":9.6125,"PlayerPosition":"","PlayerOwnership":0,"PlayerSalary":0,"AdjustedOwnership":0,"Over":0,"$$hashKey":"object:1097"},{"PlayerName":"josh hart","PlayerTeam":"NO","PlayerOpp":"BOS","PlayerOriginalMinutes":35,"PlayerMinutes":35,"PlayerOriginalPoints":13.15,"PlayerPoints":13.15,"PlayerOriginalThrees":3.12,"PlayerThrees":3.12,"PlayerOriginalRebounds":7.21,"PlayerRebounds":7.21,"PlayerOriginalAssists":1.76,"PlayerAssists":1.76,"PlayerOriginalSteals":1.18,"PlayerSteals":1.18,"PlayerOriginalBlocks":0.74,"PlayerBlocks":0.74,"PlayerOriginalTurnovers":1.37,"PlayerTurnovers":1.37,"PlayerFDPoints":28.831999999999997,"PlayerDKPoints":29.517500000000002,"PlayerPosition":"SG/SF","PlayerOwnership":18.1,"PlayerSalary":4800,"AdjustedOwnership":18.1,"Over":0,"PlayerValue":6.149479166666667,"$$hashKey":"object:115"},{"PlayerName":"brandon ingram","PlayerTeam":"NO","PlayerOpp":"BOS","PlayerOriginalMinutes":37,"PlayerMinutes":37,"PlayerOriginalPoints":25.99,"PlayerPoints":25.99,"PlayerOriginalThrees":2.75,"PlayerThrees":2.75,"PlayerOriginalRebounds":7.19,"PlayerRebounds":7.19,"PlayerOriginalAssists":5.33,"PlayerAssists":5.33,"PlayerOriginalSteals":0.68,"PlayerSteals":0.68,"PlayerOriginalBlocks":0.8,"PlayerBlocks":0.8,"PlayerOriginalTurnovers":3.16,"PlayerTurnovers":3.16,"PlayerFDPoints":43.89299999999999,"PlayerDKPoints":45.7275,"PlayerPosition":"SF/PF","PlayerOwnership":18.8,"PlayerSalary":8400,"AdjustedOwnership":18.8,"Over":0,"PlayerValue":5.44375,"$$hashKey":"object:116"},{"PlayerName":"nicolo melli","PlayerTeam":"NO","PlayerOpp":"BOS","PlayerOriginalMinutes":16,"PlayerMinutes":16,"PlayerOriginalPoints":5.37,"PlayerPoints":5.37,"PlayerOriginalThrees":0.93,"PlayerThrees":0.93,"PlayerOriginalRebounds":2.58,"PlayerRebounds":2.58,"PlayerOriginalAssists":1.21,"PlayerAssists":1.21,"PlayerOriginalSteals":0.46,"PlayerSteals":0.46,"PlayerOriginalBlocks":0.2,"PlayerBlocks":0.2,"PlayerOriginalTurnovers":0.7,"PlayerTurnovers":0.7,"PlayerFDPoints":11.561000000000002,"PlayerDKPoints":11.845,"PlayerPosition":"PF/C","PlayerOwnership":1.5,"PlayerSalary":3000,"AdjustedOwnership":1.5,"Over":0,"PlayerValue":3.9483333333333333,"$$hashKey":"object:117"},{"PlayerName":"nickeil alexander-walker","PlayerTeam":"NO","PlayerOpp":"BOS","PlayerOriginalMinutes":24,"PlayerMinutes":24,"PlayerOriginalPoints":9.66,"PlayerPoints":9.66,"PlayerOriginalThrees":1.83,"PlayerThrees":1.83,"PlayerOriginalRebounds":3.77,"PlayerRebounds":3.77,"PlayerOriginalAssists":3.51,"PlayerAssists":3.51,"PlayerOriginalSteals":0.58,"PlayerSteals":0.58,"PlayerOriginalBlocks":0.24,"PlayerBlocks":0.24,"PlayerOriginalTurnovers":1.68,"PlayerTurnovers":1.68,"PlayerFDPoints":20.228999999999996,"PlayerDKPoints":21.3525,"PlayerPosition":"PG/SG","PlayerOwnership":17.6,"PlayerSalary":3100,"AdjustedOwnership":17.6,"Over":0,"PlayerValue":6.887903225806451,"$$hashKey":"object:118"},{"PlayerName":"lonzo ball","PlayerTeam":"NO","PlayerOpp":"BOS","PlayerOriginalMinutes":35,"PlayerMinutes":35,"PlayerOriginalPoints":13.22,"PlayerPoints":13.22,"PlayerOriginalThrees":2.56,"PlayerThrees":2.56,"PlayerOriginalRebounds":6.09,"PlayerRebounds":6.09,"PlayerOriginalAssists":7.05,"PlayerAssists":7.05,"PlayerOriginalSteals":1.49,"PlayerSteals":1.49,"PlayerOriginalBlocks":0.43,"PlayerBlocks":0.43,"PlayerOriginalTurnovers":2.79,"PlayerTurnovers":2.79,"PlayerFDPoints":34.073,"PlayerDKPoints":35.13249999999999,"PlayerPosition":"PG","PlayerOwnership":15.7,"PlayerSalary":6700,"AdjustedOwnership":15.7,"Over":0,"PlayerValue":5.2436567164179095,"$$hashKey":"object:119"},{"PlayerName":"frank jackson","PlayerTeam":"NO","PlayerOpp":"BOS","PlayerOriginalMinutes":18,"PlayerMinutes":18,"PlayerOriginalPoints":7.12,"PlayerPoints":7.12,"PlayerOriginalThrees":1,"PlayerThrees":1,"PlayerOriginalRebounds":1.57,"PlayerRebounds":1.57,"PlayerOriginalAssists":1.05,"PlayerAssists":1.05,"PlayerOriginalSteals":0.36,"PlayerSteals":0.36,"PlayerOriginalBlocks":0.04,"PlayerBlocks":0.04,"PlayerOriginalTurnovers":0.84,"PlayerTurnovers":0.84,"PlayerFDPoints":10.939,"PlayerDKPoints":11.5375,"PlayerPosition":"PG/SG","PlayerOwnership":0.1,"PlayerSalary":3000,"AdjustedOwnership":0.1,"Over":0,"PlayerValue":3.845833333333333,"$$hashKey":"object:120"},{"PlayerName":"e\'twaun moore","PlayerTeam":"NO","PlayerOpp":"BOS","PlayerOriginalMinutes":31,"PlayerMinutes":31,"PlayerOriginalPoints":13.33,"PlayerPoints":13.33,"PlayerOriginalThrees":2.35,"PlayerThrees":2.35,"PlayerOriginalRebounds":4.54,"PlayerRebounds":4.54,"PlayerOriginalAssists":2.51,"PlayerAssists":2.51,"PlayerOriginalSteals":0.82,"PlayerSteals":0.82,"PlayerOriginalBlocks":0.22,"PlayerBlocks":0.22,"PlayerOriginalTurnovers":1.22,"PlayerTurnovers":1.22,"PlayerFDPoints":24.443,"PlayerDKPoints":25.415000000000003,"PlayerPosition":"SG/SF","PlayerOwnership":12.9,"PlayerSalary":4500,"AdjustedOwnership":12.9,"Over":0,"PlayerValue":5.647777777777779,"$$hashKey":"object:121"},{"PlayerName":"jaxson hayes","PlayerTeam":"NO","PlayerOpp":"BOS","PlayerOriginalMinutes":26,"PlayerMinutes":26,"PlayerOriginalPoints":9.7,"PlayerPoints":9.7,"PlayerOriginalThrees":0.04,"PlayerThrees":0.04,"PlayerOriginalRebounds":6.1,"PlayerRebounds":6.1,"PlayerOriginalAssists":1.1,"PlayerAssists":1.1,"PlayerOriginalSteals":0.67,"PlayerSteals":0.67,"PlayerOriginalBlocks":1.69,"PlayerBlocks":1.69,"PlayerOriginalTurnovers":0.99,"PlayerTurnovers":0.99,"PlayerFDPoints":24.76,"PlayerDKPoints":23.219999999999995,"PlayerPosition":"C","PlayerOwnership":37.9,"PlayerSalary":3800,"AdjustedOwnership":37.9,"Over":0,"PlayerValue":6.515789473684211,"$$hashKey":"object:122"},{"PlayerName":"jahlil okafor","PlayerTeam":"NO","PlayerOpp":"BOS","PlayerOriginalMinutes":16,"PlayerMinutes":16,"PlayerOriginalPoints":7.56,"PlayerPoints":7.56,"PlayerOriginalThrees":0.03,"PlayerThrees":0.03,"PlayerOriginalRebounds":4.25,"PlayerRebounds":4.25,"PlayerOriginalAssists":1.23,"PlayerAssists":1.23,"PlayerOriginalSteals":0.22,"PlayerSteals":0.22,"PlayerOriginalBlocks":0.78,"PlayerBlocks":0.78,"PlayerOriginalTurnovers":0.94,"PlayerTurnovers":0.94,"PlayerFDPoints":16.565,"PlayerDKPoints":16.2625,"PlayerPosition":"C","PlayerOwnership":4.7,"PlayerSalary":3000,"AdjustedOwnership":4.7,"Over":0,"PlayerValue":5.420833333333333,"$$hashKey":"object:123"},{"PlayerName":"chris paul","PlayerTeam":"OKC","PlayerOpp":"LAL","PlayerOriginalMinutes":33,"PlayerMinutes":33,"PlayerOriginalPoints":17.29,"PlayerPoints":17.29,"PlayerOriginalThrees":1.76,"PlayerThrees":1.76,"PlayerOriginalRebounds":5.3,"PlayerRebounds":5.3,"PlayerOriginalAssists":6.5,"PlayerAssists":6.5,"PlayerOriginalSteals":2.03,"PlayerSteals":2.03,"PlayerOriginalBlocks":0.21,"PlayerBlocks":0.21,"PlayerOriginalTurnovers":2.49,"PlayerTurnovers":2.49,"PlayerFDPoints":37.629999999999995,"PlayerDKPoints":37.78000000000001,"PlayerPosition":"PG","PlayerOwnership":17.9,"PlayerSalary":6800,"AdjustedOwnership":17.9,"Over":0,"PlayerValue":5.555882352941178,"$$hashKey":"object:370"},{"PlayerName":"shai gilgeous-alexander","PlayerTeam":"OKC","PlayerOpp":"LAL","PlayerOriginalMinutes":36,"PlayerMinutes":36,"PlayerOriginalPoints":20.11,"PlayerPoints":20.11,"PlayerOriginalThrees":1.59,"PlayerThrees":1.59,"PlayerOriginalRebounds":5.36,"PlayerRebounds":5.36,"PlayerOriginalAssists":2.79,"PlayerAssists":2.79,"PlayerOriginalSteals":1.54,"PlayerSteals":1.54,"PlayerOriginalBlocks":0.51,"PlayerBlocks":0.51,"PlayerOriginalTurnovers":2.7,"PlayerTurnovers":2.7,"PlayerFDPoints":34.177,"PlayerDKPoints":34.54,"PlayerPosition":"PG/SG","PlayerOwnership":12.5,"PlayerSalary":6600,"AdjustedOwnership":12.5,"Over":0,"PlayerValue":5.2333333333333325,"$$hashKey":"object:371"},{"PlayerName":"danilo gallinari","PlayerTeam":"OKC","PlayerOpp":"LAL","PlayerOriginalMinutes":30,"PlayerMinutes":30,"PlayerOriginalPoints":18.58,"PlayerPoints":18.58,"PlayerOriginalThrees":2.91,"PlayerThrees":2.91,"PlayerOriginalRebounds":5.92,"PlayerRebounds":5.92,"PlayerOriginalAssists":2.19,"PlayerAssists":2.19,"PlayerOriginalSteals":0.74,"PlayerSteals":0.74,"PlayerOriginalBlocks":0.2,"PlayerBlocks":0.2,"PlayerOriginalTurnovers":1.41,"PlayerTurnovers":1.41,"PlayerFDPoints":30.378999999999998,"PlayerDKPoints":31.894999999999996,"PlayerPosition":"SF/PF","PlayerOwnership":10.1,"PlayerSalary":6200,"AdjustedOwnership":10.1,"Over":0,"PlayerValue":5.144354838709677,"$$hashKey":"object:372"},{"PlayerName":"steven adams","PlayerTeam":"OKC","PlayerOpp":"LAL","PlayerOriginalMinutes":30,"PlayerMinutes":30,"PlayerOriginalPoints":12.88,"PlayerPoints":12.88,"PlayerOriginalThrees":0,"PlayerThrees":0,"PlayerOriginalRebounds":11.34,"PlayerRebounds":11.34,"PlayerOriginalAssists":2.79,"PlayerAssists":2.79,"PlayerOriginalSteals":1.2,"PlayerSteals":1.2,"PlayerOriginalBlocks":0.74,"PlayerBlocks":0.74,"PlayerOriginalTurnovers":1.54,"PlayerTurnovers":1.54,"PlayerFDPoints":34.953,"PlayerDKPoints":35.849999999999994,"PlayerPosition":"C","PlayerOwnership":11.2,"PlayerSalary":6400,"AdjustedOwnership":11.2,"Over":0,"PlayerValue":5.601562499999999,"$$hashKey":"object:373"},{"PlayerName":"hamidou diallo","PlayerTeam":"OKC","PlayerOpp":"LAL","PlayerOriginalMinutes":18,"PlayerMinutes":18,"PlayerOriginalPoints":6.8,"PlayerPoints":6.8,"PlayerOriginalThrees":0.15,"PlayerThrees":0.15,"PlayerOriginalRebounds":3.05,"PlayerRebounds":3.05,"PlayerOriginalAssists":0.63,"PlayerAssists":0.63,"PlayerOriginalSteals":0.88,"PlayerSteals":0.88,"PlayerOriginalBlocks":0.24,"PlayerBlocks":0.24,"PlayerOriginalTurnovers":0.82,"PlayerTurnovers":0.82,"PlayerFDPoints":13.945,"PlayerDKPoints":13.4625,"PlayerPosition":"SG/SF","PlayerOwnership":2.4,"PlayerSalary":3000,"AdjustedOwnership":2.4,"Over":0,"PlayerValue":4.4875,"$$hashKey":"object:374"},{"PlayerName":"terrance ferguson","PlayerTeam":"OKC","PlayerOpp":"LAL","PlayerOriginalMinutes":28,"PlayerMinutes":28,"PlayerOriginalPoints":5.99,"PlayerPoints":5.99,"PlayerOriginalThrees":1.25,"PlayerThrees":1.25,"PlayerOriginalRebounds":1.94,"PlayerRebounds":1.94,"PlayerOriginalAssists":0.98,"PlayerAssists":0.98,"PlayerOriginalSteals":0.62,"PlayerSteals":0.62,"PlayerOriginalBlocks":0.22,"PlayerBlocks":0.22,"PlayerOriginalTurnovers":0.65,"PlayerTurnovers":0.65,"PlayerFDPoints":11.658,"PlayerDKPoints":11.864999999999998,"PlayerPosition":"SG/SF","PlayerOwnership":0.1,"PlayerSalary":3300,"AdjustedOwnership":0.1,"Over":0,"PlayerValue":3.595454545454545,"$$hashKey":"object:375"},{"PlayerName":"mike muscala","PlayerTeam":"OKC","PlayerOpp":"LAL","PlayerOriginalMinutes":18,"PlayerMinutes":18,"PlayerOriginalPoints":6.02,"PlayerPoints":6.02,"PlayerOriginalThrees":1.48,"PlayerThrees":1.48,"PlayerOriginalRebounds":3.94,"PlayerRebounds":3.94,"PlayerOriginalAssists":1.31,"PlayerAssists":1.31,"PlayerOriginalSteals":0.32,"PlayerSteals":0.32,"PlayerOriginalBlocks":0.38,"PlayerBlocks":0.38,"PlayerOriginalTurnovers":0.69,"PlayerTurnovers":0.69,"PlayerFDPoints":14.123,"PlayerDKPoints":14.704999999999998,"PlayerPosition":"PF/C","PlayerOwnership":0.9,"PlayerSalary":3200,"AdjustedOwnership":0.9,"Over":0,"PlayerValue":4.5953124999999995,"$$hashKey":"object:376"},{"PlayerName":"dennis schroder","PlayerTeam":"OKC","PlayerOpp":"LAL","PlayerOriginalMinutes":32,"PlayerMinutes":32,"PlayerOriginalPoints":20.15,"PlayerPoints":20.15,"PlayerOriginalThrees":1.95,"PlayerThrees":1.95,"PlayerOriginalRebounds":3.75,"PlayerRebounds":3.75,"PlayerOriginalAssists":3.92,"PlayerAssists":3.92,"PlayerOriginalSteals":0.93,"PlayerSteals":0.93,"PlayerOriginalBlocks":0.11,"PlayerBlocks":0.11,"PlayerOriginalTurnovers":2.54,"PlayerTurnovers":2.54,"PlayerFDPoints":31.11,"PlayerDKPoints":32.5025,"PlayerPosition":"PG/SG","PlayerOwnership":15.5,"PlayerSalary":5600,"AdjustedOwnership":15.5,"Over":0,"PlayerValue":5.804017857142856,"$$hashKey":"object:377"},{"PlayerName":"darius bazley","PlayerTeam":"OKC","PlayerOpp":"LAL","PlayerOriginalMinutes":12,"PlayerMinutes":12,"PlayerOriginalPoints":2.99,"PlayerPoints":2.99,"PlayerOriginalThrees":0.54,"PlayerThrees":0.54,"PlayerOriginalRebounds":2.44,"PlayerRebounds":2.44,"PlayerOriginalAssists":0.36,"PlayerAssists":0.36,"PlayerOriginalSteals":0.28,"PlayerSteals":0.28,"PlayerOriginalBlocks":0.33,"PlayerBlocks":0.33,"PlayerOriginalTurnovers":0.64,"PlayerTurnovers":0.64,"PlayerFDPoints":7.648000000000001,"PlayerDKPoints":7.75,"PlayerPosition":"SF/PF","PlayerOwnership":0.1,"PlayerSalary":3200,"AdjustedOwnership":0.1,"Over":0,"PlayerValue":2.421875,"$$hashKey":"object:378"},{"PlayerName":"ben simmons","PlayerTeam":"PHI","PlayerOpp":"DAL","PlayerOriginalMinutes":36,"PlayerMinutes":36,"PlayerOriginalPoints":17.73,"PlayerPoints":17.73,"PlayerOriginalThrees":0.01,"PlayerThrees":0.01,"PlayerOriginalRebounds":7.5,"PlayerRebounds":7.5,"PlayerOriginalAssists":9.06,"PlayerAssists":9.06,"PlayerOriginalSteals":1.57,"PlayerSteals":1.57,"PlayerOriginalBlocks":0.61,"PlayerBlocks":0.61,"PlayerOriginalTurnovers":3.8,"PlayerTurnovers":3.8,"PlayerFDPoints":43.06000000000001,"PlayerDKPoints":43.160000000000004,"PlayerPosition":"PG/SF","PlayerOwnership":16.7,"PlayerSalary":8500,"AdjustedOwnership":16.7,"Over":0,"PlayerValue":5.07764705882353,"$$hashKey":"object:193"},{"PlayerName":"josh richardson","PlayerTeam":"PHI","PlayerOpp":"DAL","PlayerOriginalMinutes":34,"PlayerMinutes":34,"PlayerOriginalPoints":18.39,"PlayerPoints":18.39,"PlayerOriginalThrees":2.2,"PlayerThrees":2.2,"PlayerOriginalRebounds":3.92,"PlayerRebounds":3.92,"PlayerOriginalAssists":4.16,"PlayerAssists":4.16,"PlayerOriginalSteals":1.01,"PlayerSteals":1.01,"PlayerOriginalBlocks":0.41,"PlayerBlocks":0.41,"PlayerOriginalTurnovers":1.9,"PlayerTurnovers":1.9,"PlayerFDPoints":31.694000000000003,"PlayerDKPoints":32.52,"PlayerPosition":"SG/SF","PlayerOwnership":9.8,"PlayerSalary":6400,"AdjustedOwnership":9.8,"Over":0,"PlayerValue":5.081250000000001,"$$hashKey":"object:194"},{"PlayerName":"tobias harris","PlayerTeam":"PHI","PlayerOpp":"DAL","PlayerOriginalMinutes":34,"PlayerMinutes":34,"PlayerOriginalPoints":21.01,"PlayerPoints":21.01,"PlayerOriginalThrees":2.02,"PlayerThrees":2.02,"PlayerOriginalRebounds":8.88,"PlayerRebounds":8.88,"PlayerOriginalAssists":3.29,"PlayerAssists":3.29,"PlayerOriginalSteals":0.64,"PlayerSteals":0.64,"PlayerOriginalBlocks":0.38,"PlayerBlocks":0.38,"PlayerOriginalTurnovers":1.94,"PlayerTurnovers":1.94,"PlayerFDPoints":37.72100000000001,"PlayerDKPoints":39.12500000000001,"PlayerPosition":"SF/PF","PlayerOwnership":24.3,"PlayerSalary":6800,"AdjustedOwnership":24.3,"Over":0,"PlayerValue":5.753676470588236,"$$hashKey":"object:195"},{"PlayerName":"al horford","PlayerTeam":"PHI","PlayerOpp":"DAL","PlayerOriginalMinutes":31,"PlayerMinutes":31,"PlayerOriginalPoints":15.54,"PlayerPoints":15.54,"PlayerOriginalThrees":1.74,"PlayerThrees":1.74,"PlayerOriginalRebounds":7.72,"PlayerRebounds":7.72,"PlayerOriginalAssists":3.88,"PlayerAssists":3.88,"PlayerOriginalSteals":0.87,"PlayerSteals":0.87,"PlayerOriginalBlocks":0.94,"PlayerBlocks":0.94,"PlayerOriginalTurnovers":1.74,"PlayerTurnovers":1.74,"PlayerFDPoints":34.31399999999999,"PlayerDKPoints":34.63,"PlayerPosition":"PF/C","PlayerOwnership":15.3,"PlayerSalary":6700,"AdjustedOwnership":15.3,"Over":0,"PlayerValue":5.168656716417911,"$$hashKey":"object:196"},{"PlayerName":"james ennis iii","PlayerTeam":"PHI","PlayerOpp":"DAL","PlayerOriginalMinutes":20,"PlayerMinutes":20,"PlayerOriginalPoints":7.35,"PlayerPoints":7.35,"PlayerOriginalThrees":1.07,"PlayerThrees":1.07,"PlayerOriginalRebounds":3.89,"PlayerRebounds":3.89,"PlayerOriginalAssists":1.11,"PlayerAssists":1.11,"PlayerOriginalSteals":0.6,"PlayerSteals":0.6,"PlayerOriginalBlocks":0.29,"PlayerBlocks":0.29,"PlayerOriginalTurnovers":0.68,"PlayerTurnovers":0.68,"PlayerFDPoints":15.673000000000002,"PlayerDKPoints":15.852499999999996,"PlayerPosition":"SF/PF","PlayerOwnership":2.7,"PlayerSalary":3400,"AdjustedOwnership":2.7,"Over":0,"PlayerValue":4.662499999999999,"$$hashKey":"object:197"},{"PlayerName":"mike scott","PlayerTeam":"PHI","PlayerOpp":"DAL","PlayerOriginalMinutes":26,"PlayerMinutes":26,"PlayerOriginalPoints":8.74,"PlayerPoints":8.74,"PlayerOriginalThrees":2.01,"PlayerThrees":2.01,"PlayerOriginalRebounds":4.38,"PlayerRebounds":4.38,"PlayerOriginalAssists":0.96,"PlayerAssists":0.96,"PlayerOriginalSteals":0.44,"PlayerSteals":0.44,"PlayerOriginalBlocks":0.12,"PlayerBlocks":0.12,"PlayerOriginalTurnovers":0.72,"PlayerTurnovers":0.72,"PlayerFDPoints":16.395999999999997,"PlayerDKPoints":17.419999999999998,"PlayerPosition":"SF/PF","PlayerOwnership":2,"PlayerSalary":4000,"AdjustedOwnership":2,"Over":0,"PlayerValue":4.3549999999999995,"$$hashKey":"object:198"},{"PlayerName":"trey burke","PlayerTeam":"PHI","PlayerOpp":"DAL","PlayerOriginalMinutes":12,"PlayerMinutes":12,"PlayerOriginalPoints":6.96,"PlayerPoints":6.96,"PlayerOriginalThrees":0.53,"PlayerThrees":0.53,"PlayerOriginalRebounds":1.41,"PlayerRebounds":1.41,"PlayerOriginalAssists":2.02,"PlayerAssists":2.02,"PlayerOriginalSteals":0.31,"PlayerSteals":0.31,"PlayerOriginalBlocks":0.05,"PlayerBlocks":0.05,"PlayerOriginalTurnovers":0.51,"PlayerTurnovers":0.51,"PlayerFDPoints":12.251999999999999,"PlayerDKPoints":12.482499999999996,"PlayerPosition":"PG/SG","PlayerOwnership":0.2,"PlayerSalary":3000,"AdjustedOwnership":0.2,"Over":0,"PlayerValue":4.160833333333333,"$$hashKey":"object:199"},{"PlayerName":"matisse thybulle","PlayerTeam":"PHI","PlayerOpp":"DAL","PlayerOriginalMinutes":20,"PlayerMinutes":20,"PlayerOriginalPoints":5.61,"PlayerPoints":5.61,"PlayerOriginalThrees":1.2,"PlayerThrees":1.2,"PlayerOriginalRebounds":1.35,"PlayerRebounds":1.35,"PlayerOriginalAssists":1.64,"PlayerAssists":1.64,"PlayerOriginalSteals":1.17,"PlayerSteals":1.17,"PlayerOriginalBlocks":0.48,"PlayerBlocks":0.48,"PlayerOriginalTurnovers":1.11,"PlayerTurnovers":1.11,"PlayerFDPoints":13.53,"PlayerDKPoints":13.1025,"PlayerPosition":"SG/SF","PlayerOwnership":1.1,"PlayerSalary":3000,"AdjustedOwnership":1.1,"Over":0,"PlayerValue":4.3675,"$$hashKey":"object:200"},{"PlayerName":"norvel pelle","PlayerTeam":"PHI","PlayerOpp":"DAL","PlayerOriginalMinutes":12,"PlayerMinutes":12,"PlayerOriginalPoints":3.32,"PlayerPoints":3.32,"PlayerOriginalThrees":0,"PlayerThrees":0,"PlayerOriginalRebounds":3.47,"PlayerRebounds":3.47,"PlayerOriginalAssists":0.83,"PlayerAssists":0.83,"PlayerOriginalSteals":0,"PlayerSteals":0,"PlayerOriginalBlocks":1.27,"PlayerBlocks":1.27,"PlayerOriginalTurnovers":0.96,"PlayerTurnovers":0.96,"PlayerFDPoints":11.579,"PlayerDKPoints":10.962499999999999,"PlayerPosition":"C","PlayerOwnership":0.1,"PlayerSalary":3400,"AdjustedOwnership":0.1,"Over":0,"PlayerValue":3.224264705882353,"$$hashKey":"object:201"},{"PlayerName":"furkan korkmaz","PlayerTeam":"PHI","PlayerOpp":"DAL","PlayerOriginalMinutes":14,"PlayerMinutes":14,"PlayerOriginalPoints":5.64,"PlayerPoints":5.64,"PlayerOriginalThrees":1.02,"PlayerThrees":1.02,"PlayerOriginalRebounds":1.47,"PlayerRebounds":1.47,"PlayerOriginalAssists":0.61,"PlayerAssists":0.61,"PlayerOriginalSteals":0.44,"PlayerSteals":0.44,"PlayerOriginalBlocks":0.06,"PlayerBlocks":0.06,"PlayerOriginalTurnovers":0.47,"PlayerTurnovers":0.47,"PlayerFDPoints":9.348999999999998,"PlayerDKPoints":9.6675,"PlayerPosition":"SG/SF","PlayerOwnership":0.1,"PlayerSalary":3100,"AdjustedOwnership":0.1,"Over":0,"PlayerValue":3.1185483870967743,"$$hashKey":"object:202"},{"PlayerName":"damian lillard","PlayerTeam":"POR","PlayerOpp":"MIL","PlayerOriginalMinutes":37,"PlayerMinutes":37,"PlayerOriginalPoints":27.34,"PlayerPoints":27.34,"PlayerOriginalThrees":3.49,"PlayerThrees":3.49,"PlayerOriginalRebounds":4.54,"PlayerRebounds":4.54,"PlayerOriginalAssists":8.33,"PlayerAssists":8.33,"PlayerOriginalSteals":1.06,"PlayerSteals":1.06,"PlayerOriginalBlocks":0.41,"PlayerBlocks":0.41,"PlayerOriginalTurnovers":2.76,"PlayerTurnovers":2.76,"PlayerFDPoints":46.933,"PlayerDKPoints":48.81499999999999,"PlayerPosition":"PG","PlayerOwnership":16.1,"PlayerSalary":8700,"AdjustedOwnership":16.1,"Over":0,"PlayerValue":5.610919540229884,"$$hashKey":"object:449"},{"PlayerName":"cj mccollum","PlayerTeam":"POR","PlayerOpp":"MIL","PlayerOriginalMinutes":36,"PlayerMinutes":36,"PlayerOriginalPoints":22.41,"PlayerPoints":22.41,"PlayerOriginalThrees":2.59,"PlayerThrees":2.59,"PlayerOriginalRebounds":4.58,"PlayerRebounds":4.58,"PlayerOriginalAssists":3.93,"PlayerAssists":3.93,"PlayerOriginalSteals":0.77,"PlayerSteals":0.77,"PlayerOriginalBlocks":0.49,"PlayerBlocks":0.49,"PlayerOriginalTurnovers":1.73,"PlayerTurnovers":1.73,"PlayerFDPoints":35.851000000000006,"PlayerDKPoints":36.980000000000004,"PlayerPosition":"PG/SG","PlayerOwnership":17.3,"PlayerSalary":6500,"AdjustedOwnership":17.3,"Over":0,"PlayerValue":5.68923076923077,"$$hashKey":"object:450"},{"PlayerName":"moses brown","PlayerTeam":"POR","PlayerOpp":"MIL","PlayerOriginalMinutes":16,"PlayerMinutes":16,"PlayerOriginalPoints":8.31,"PlayerPoints":8.31,"PlayerOriginalThrees":0,"PlayerThrees":0,"PlayerOriginalRebounds":8.19,"PlayerRebounds":8.19,"PlayerOriginalAssists":0,"PlayerAssists":0,"PlayerOriginalSteals":0.74,"PlayerSteals":0.74,"PlayerOriginalBlocks":0,"PlayerBlocks":0,"PlayerOriginalTurnovers":1.41,"PlayerTurnovers":1.41,"PlayerFDPoints":18.947999999999997,"PlayerDKPoints":19.3225,"PlayerPosition":"C","PlayerOwnership":0.1,"PlayerSalary":3000,"AdjustedOwnership":0.1,"Over":0,"PlayerValue":6.440833333333334,"$$hashKey":"object:451"},{"PlayerName":"anfernee simons","PlayerTeam":"POR","PlayerOpp":"MIL","PlayerOriginalMinutes":24,"PlayerMinutes":24,"PlayerOriginalPoints":10.21,"PlayerPoints":10.21,"PlayerOriginalThrees":1.22,"PlayerThrees":1.22,"PlayerOriginalRebounds":2.94,"PlayerRebounds":2.94,"PlayerOriginalAssists":1.69,"PlayerAssists":1.69,"PlayerOriginalSteals":0.35,"PlayerSteals":0.35,"PlayerOriginalBlocks":0.13,"PlayerBlocks":0.13,"PlayerOriginalTurnovers":1.12,"PlayerTurnovers":1.12,"PlayerFDPoints":16.593000000000004,"PlayerDKPoints":17.430000000000003,"PlayerPosition":"PG/SG","PlayerOwnership":2.8,"PlayerSalary":3600,"AdjustedOwnership":2.8,"Over":0,"PlayerValue":4.841666666666668,"$$hashKey":"object:452"},{"PlayerName":"kent bazemore","PlayerTeam":"POR","PlayerOpp":"MIL","PlayerOriginalMinutes":30,"PlayerMinutes":30,"PlayerOriginalPoints":8.04,"PlayerPoints":8.04,"PlayerOriginalThrees":1.07,"PlayerThrees":1.07,"PlayerOriginalRebounds":5.03,"PlayerRebounds":5.03,"PlayerOriginalAssists":0.86,"PlayerAssists":0.86,"PlayerOriginalSteals":1.34,"PlayerSteals":1.34,"PlayerOriginalBlocks":0.72,"PlayerBlocks":0.72,"PlayerOriginalTurnovers":1.4,"PlayerTurnovers":1.4,"PlayerFDPoints":20.146,"PlayerDKPoints":19.5725,"PlayerPosition":"SG/SF","PlayerOwnership":7.4,"PlayerSalary":3800,"AdjustedOwnership":7.4,"Over":0,"PlayerValue":5.150657894736843,"$$hashKey":"object:453"},{"PlayerName":"mario hezonja","PlayerTeam":"POR","PlayerOpp":"MIL","PlayerOriginalMinutes":8,"PlayerMinutes":8,"PlayerOriginalPoints":2.29,"PlayerPoints":2.29,"PlayerOriginalThrees":0.15,"PlayerThrees":0.15,"PlayerOriginalRebounds":2.03,"PlayerRebounds":2.03,"PlayerOriginalAssists":0.52,"PlayerAssists":0.52,"PlayerOriginalSteals":0.33,"PlayerSteals":0.33,"PlayerOriginalBlocks":0.05,"PlayerBlocks":0.05,"PlayerOriginalTurnovers":0.37,"PlayerTurnovers":0.37,"PlayerFDPoints":6.276,"PlayerDKPoints":6.2575,"PlayerPosition":"SF/PF","PlayerOwnership":0.1,"PlayerSalary":3000,"AdjustedOwnership":0.1,"Over":0,"PlayerValue":2.0858333333333334,"$$hashKey":"object:454"},{"PlayerName":"anthony tolliver","PlayerTeam":"POR","PlayerOpp":"MIL","PlayerOriginalMinutes":30,"PlayerMinutes":30,"PlayerOriginalPoints":6.32,"PlayerPoints":6.32,"PlayerOriginalThrees":1.43,"PlayerThrees":1.43,"PlayerOriginalRebounds":5.78,"PlayerRebounds":5.78,"PlayerOriginalAssists":1.83,"PlayerAssists":1.83,"PlayerOriginalSteals":0.44,"PlayerSteals":0.44,"PlayerOriginalBlocks":0.48,"PlayerBlocks":0.48,"PlayerOriginalTurnovers":1,"PlayerTurnovers":1,"PlayerFDPoints":17.761000000000003,"PlayerDKPoints":18.345000000000002,"PlayerPosition":"PF/C","PlayerOwnership":0.1,"PlayerSalary":3000,"AdjustedOwnership":0.1,"Over":0,"PlayerValue":6.115,"$$hashKey":"object:455"},{"PlayerName":"carmelo anthony","PlayerTeam":"POR","PlayerOpp":"MIL","PlayerOriginalMinutes":34,"PlayerMinutes":34,"PlayerOriginalPoints":18.54,"PlayerPoints":18.54,"PlayerOriginalThrees":1.65,"PlayerThrees":1.65,"PlayerOriginalRebounds":7.05,"PlayerRebounds":7.05,"PlayerOriginalAssists":1.39,"PlayerAssists":1.39,"PlayerOriginalSteals":0.92,"PlayerSteals":0.92,"PlayerOriginalBlocks":0.65,"PlayerBlocks":0.65,"PlayerOriginalTurnovers":1.75,"PlayerTurnovers":1.75,"PlayerFDPoints":32.045,"PlayerDKPoints":32.527499999999996,"PlayerPosition":"SF/PF","PlayerOwnership":14.5,"PlayerSalary":5600,"AdjustedOwnership":14.5,"Over":0,"PlayerValue":5.808482142857142,"$$hashKey":"object:456"},{"PlayerName":"gary trent","PlayerTeam":"POR","PlayerOpp":"MIL","PlayerOriginalMinutes":13,"PlayerMinutes":13,"PlayerOriginalPoints":4.48,"PlayerPoints":4.48,"PlayerOriginalThrees":0.98,"PlayerThrees":0.98,"PlayerOriginalRebounds":1.15,"PlayerRebounds":1.15,"PlayerOriginalAssists":0.61,"PlayerAssists":0.61,"PlayerOriginalSteals":0.35,"PlayerSteals":0.35,"PlayerOriginalBlocks":0.18,"PlayerBlocks":0.18,"PlayerOriginalTurnovers":0.33,"PlayerTurnovers":0.33,"PlayerFDPoints":8.035,"PlayerDKPoints":8.217500000000001,"PlayerPosition":"SG","PlayerOwnership":0.1,"PlayerSalary":3100,"AdjustedOwnership":0.1,"Over":0,"PlayerValue":2.6508064516129037,"$$hashKey":"object:457"},{"PlayerName":"nassir little","PlayerTeam":"POR","PlayerOpp":"MIL","PlayerOriginalMinutes":10,"PlayerMinutes":10,"PlayerOriginalPoints":2.98,"PlayerPoints":2.98,"PlayerOriginalThrees":0.18,"PlayerThrees":0.18,"PlayerOriginalRebounds":2.29,"PlayerRebounds":2.29,"PlayerOriginalAssists":0.47,"PlayerAssists":0.47,"PlayerOriginalSteals":0.22,"PlayerSteals":0.22,"PlayerOriginalBlocks":0.21,"PlayerBlocks":0.21,"PlayerOriginalTurnovers":0.31,"PlayerTurnovers":0.31,"PlayerFDPoints":7.413,"PlayerDKPoints":7.3424999999999985,"PlayerPosition":"SF/PF","PlayerOwnership":0.1,"PlayerSalary":3000,"AdjustedOwnership":0.1,"Over":0,"PlayerValue":2.4475,"$$hashKey":"object:458"}],"AllTeams":["LAL","NO","PHI","DET","OKC","POR","BOS","MIL","DEN","CLE","CHI","DAL"],"$$hashKey":"object:19"}');

      $scope.Title = data.Title;
      $scope.Date = Date.parse(data.Date);
      $scope.AllPlayers = data.AllPlayers;
      $scope.AllTeams = data.AllTeams;

      //rebuild projections
      $scope.AllPlayers.forEach(function(singlePlayer) {
        if(singlePlayer.PlayerMinutes > 0) {
          $scope.updatePlayerMinutes(singlePlayer.PlayerName);
        }
      });
      $scope.sampleData = true;
    }

    $scope.loadProjections = function(event) {
      var file = event.target.files[0];
        $scope.clearData();
        var allText = "";
        var reader = new FileReader();
        reader.onload = function (e) {
            allText = reader.result;

            var allTextLines = allText.split(/\r\n|\n/);
            for(var i = 1; i < allTextLines.length; i++) {
              var headers = allTextLines[i].split(',');

              var parsed_row = $scope.parse(headers);

              var PlayerName = "";
              var PlayerTeam = "";
              var PlayerMinutes = 0;
              var PlayerPoints = 0;
              var PlayerThrees = 0;
              var PlayerRebounds = 0;
              var PlayerAssists = 0;
              var PlayerSteals = 0;
              var PlayerBlocks = 0;
              var PlayerTurnovers = 0;

              for (var j = 0; j < parsed_row.length; j++) {
                  switch (j) {
                    case 0:
                        PlayerName = parsed_row[j].replace('"', '').replace('"', '').replace('Jr.', '').replace('Sr.', '').trim().toLowerCase();
                        break;
                    case 1:
                        PlayerTeam = parsed_row[j].replace('"', '').replace('"', '').replace('Jr.', '').replace('Sr.', '').trim();
                        break;
                    case 2:
                        PlayerMinutes = parseFloat(parsed_row[j].replace('"', '').replace('"', '').trim());
                        break;
                    case 3:
                        PlayerPoints = parseFloat(parsed_row[j].replace('"', '').replace('"', '').trim());
                        break;
                    case 4:
                        PlayerThrees = parseFloat(parsed_row[j].replace('"', '').replace('"', '').trim());
                        break;
                    case 5:
                        PlayerRebounds = parseFloat(parsed_row[j].replace('"', '').replace('"', '').trim());
                        break;
                    case 6:
                        PlayerAssists = parseFloat(parsed_row[j].replace('"', '').replace('"', '').trim());
                        break;
                    case 7:
                        PlayerSteals = parseFloat(parsed_row[j].replace('"', '').replace('"', '').trim());
                        break;
                    case 8:
                        PlayerBlocks = parseFloat(parsed_row[j].replace('"', '').replace('"', '').trim());
                        break;
                    case 9:
                        PlayerTurnovers = parseFloat(parsed_row[j].replace('"', '').replace('"', '').trim());
                        break;
                  }
              }

              var PlayerFDPoints = ((PlayerPoints * 1) + (PlayerRebounds * 1.2) + (PlayerAssists * 1.5) + (PlayerSteals * 3) + (PlayerBlocks * 3) + (PlayerTurnovers * -1));

              var DoubleDouble = 0;
              if((PlayerPoints >= 10 && PlayerRebounds >= 10) || (PlayerPoints >= 10 && PlayerAssists >= 10) || (PlayerRebounds >= 10 && PlayerAssists >= 10)) {
                DoubleDouble = 1;
              }
              var TripleDouble = 0;
              if((PlayerPoints >= 10 && PlayerRebounds >= 10 && PlayerAssists >= 10)) {
                TripleDouble = 1;
              }

              var PlayerDKPoints = ((PlayerPoints * 1) + (PlayerThrees * 0.5)+ (PlayerRebounds * 1.25) + (PlayerAssists * 1.5) + (PlayerSteals * 2) + (PlayerBlocks * 2) + (PlayerTurnovers * -0.5) + (DoubleDouble * 1.5) + (TripleDouble * 3));

              if(PlayerMinutes > 0) {
                $scope.AllPlayers.push({
                  PlayerName : PlayerName,
                  PlayerTeam : PlayerTeam,
                  PlayerOpp : "",
                  PlayerOriginalMinutes : PlayerMinutes,
                  PlayerMinutes : PlayerMinutes,
                  PlayerOriginalPoints : PlayerPoints,
                  PlayerPoints : PlayerPoints,
                  PlayerOriginalThrees : PlayerThrees,
                  PlayerThrees : PlayerThrees,
                  PlayerOriginalRebounds : PlayerRebounds,
                  PlayerRebounds : PlayerRebounds,
                  PlayerOriginalAssists : PlayerAssists,
                  PlayerAssists : PlayerAssists,
                  PlayerOriginalSteals : PlayerSteals,
                  PlayerSteals : PlayerSteals,
                  PlayerOriginalBlocks : PlayerBlocks,
                  PlayerBlocks : PlayerBlocks,
                  PlayerOriginalTurnovers : PlayerTurnovers,
                  PlayerTurnovers : PlayerTurnovers,
                  PlayerFDPoints : PlayerFDPoints,
                  PlayerDKPoints : PlayerDKPoints,
                  PlayerPosition : "",
                  PlayerOwnership : 0,
                  PlayerSalary : 0,
                  AdjustedOwnership : 0,
                  Over : 0
                });
              }

            }
        }

        $scope.statsLoaded = true;
        $scope.sampleData = false;

        reader.readAsText(file);
        $scope.$apply();
    }

    $scope.loadOwnership = function (event) {

      var file = event.target.files[0];

        var allText = "";
        var reader = new FileReader();
        reader.onload = function (e) {
            allText = reader.result;

            var allTextLines = allText.split(/\r\n|\n/);
            var headers = allTextLines[0].split(',');

            var playersNotFound = [];
            var playersInFile = [];
            for (var i = 1; i < allTextLines.length; i++) {
                if(allTextLines[i].length === 0) {
                  continue;
                }

                var parsed_row = $scope.parse(allTextLines[i]);

                var data = parsed_row;

                var PlayerName = "";
                var PlayerSalary = 0;
                var PlayerPosition = "";
                var PlayerTeam = "";
                var PlayerOpp = "";
                var PlayerOwnership = 0;

                for (var j = 0; j < data.length; j++) {
                    switch (j) {
                        case 0:
                            PlayerName = data[j].replace('"', '').replace('"', '').replace('Jr.', '').replace('Sr.', '').trim().toLowerCase();
                            break;
                        case 1:
                            PlayerSalary = parseFloat(data[j].replace('"', '').replace('"', '').replace(',','').trim());
                            break;
                        case 2:
                            PlayerPosition = data[j].replace('"', '').replace('"', '').trim();
                            break;
                        case 4:
                            PlayerTeam = data[j].replace('"', '').replace('"', '').trim();
                            break;
                        case 5:
                            PlayerOpp = data[j].replace('"', '').replace('"', '').trim();
                            break;
                        case 6:
                            PlayerOwnership = parseFloat(data[j].replace('"', '').replace('"', '').trim());
                            break;
                    }
                }

                $scope.AllPlayers.forEach(function (player) {
                    if(player.PlayerName ===  PlayerName) {
                        player.PlayerSalary = PlayerSalary;
                        player.PlayerPosition = PlayerPosition;
                        player.PlayerTeam = PlayerTeam;
                        player.PlayerOpp = PlayerOpp;
                        player.PlayerOwnership = PlayerOwnership;

                        if(player.PlayerMinutes > 0) {
                          $scope.updatePlayerMinutes(player.PlayerName);
                        }

                        if(player.AdjustedOwnership === 0) {
                          player.AdjustedOwnership = player.PlayerOwnership
                        }
                        else {
                          $scope.ModifyAdjustedOwnership(player);
                        }
                    }
                    if(!$scope.AllTeams.includes(PlayerTeam)) {
                      $scope.AllTeams.push(PlayerTeam);
                    }
                });



            }
            $scope.$apply(function() {
              $scope.displayNewMessage("success", "Ownership Data has been successfully loaded.");
            });

        }
        reader.readAsText(file);
        //clear input
        angular.forEach(
          angular.element("input[type='file']"),
          function(inputElem) {
            angular.element(inputElem).val(null);
          }
        );
        $scope.sampleData = false;
        $scope.OwnershipLoaded = true;
    }

    $scope.DownloadModifiedFile = function() {
      var rows = [];
      $scope.AllPlayers.forEach(function(singlePlayer){

        var Points_Per_Min = singlePlayer.PlayerOriginalPoints / singlePlayer.PlayerOriginalMinutes;
        var Threes_Per_Min = singlePlayer.PlayerOriginalThrees / singlePlayer.PlayerOriginalMinutes;
        var Rebounds_Per_Min = singlePlayer.PlayerOriginalRebounds / singlePlayer.PlayerOriginalMinutes;
        var Assists_Per_Min = singlePlayer.PlayerOriginalAssists / singlePlayer.PlayerOriginalMinutes;
        var Steals_Per_Min = singlePlayer.PlayerOriginalSteals / singlePlayer.PlayerOriginalMinutes;
        var Blocks_Per_Min = singlePlayer.PlayerOriginalBlocks / singlePlayer.PlayerOriginalMinutes;
        var Turnovers_Per_Min = singlePlayer.PlayerOriginalTurnovers / singlePlayer.PlayerOriginalMinutes;

        var New_Points = Points_Per_Min * singlePlayer.PlayerMinutes;
        var New_Threes = Threes_Per_Min * singlePlayer.PlayerMinutes;
        var New_Rebounds = Rebounds_Per_Min * singlePlayer.PlayerMinutes;
        var New_Assists = Assists_Per_Min * singlePlayer.PlayerMinutes;
        var New_Steal = Steals_Per_Min * singlePlayer.PlayerMinutes;
        var New_Blocks = Blocks_Per_Min * singlePlayer.PlayerMinutes;
        var New_Turnovers = Turnovers_Per_Min * singlePlayer.PlayerMinutes;

        rows.push(singlePlayer.PlayerName +","+ singlePlayer.PlayerTeam +","+ singlePlayer.PlayerMinutes  +","+
        New_Points.toFixed(3) +","+ New_Threes.toFixed(3) +","+ New_Rebounds.toFixed(3) +","+ New_Assists.toFixed(3) +","+ New_Steal.toFixed(3) +","+ New_Blocks.toFixed(3) +","+ New_Turnovers.toFixed(3));
      });
      var csvContent = "data:text/csv;charset=utf-8,";

      csvContent += "Name,Team,Proj minutes,Exp points,Exp 3P,Exp rebounds,Exp assists,Exp steals,Exp blocks,Exp turnovers\r\n";
      rows.forEach(function(rowArray) {
          csvContent += rowArray + "\r\n";
      });
      var encodedUri = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "MODIFIED_NBA_Stats.csv");
      document.body.appendChild(link); // Required for FF

      link.click();
    }
    $scope.DownloadModifiedDKProjections = function() {
      var rows = [];
      $scope.AllPlayers.forEach(function(singlePlayer){

        var Points_Per_Min = singlePlayer.PlayerOriginalPoints / singlePlayer.PlayerOriginalMinutes;
        var Threes_Per_Min = singlePlayer.PlayerOriginalThrees / singlePlayer.PlayerOriginalMinutes;
        var Rebounds_Per_Min = singlePlayer.PlayerOriginalRebounds / singlePlayer.PlayerOriginalMinutes;
        var Assists_Per_Min = singlePlayer.PlayerOriginalAssists / singlePlayer.PlayerOriginalMinutes;
        var Steals_Per_Min = singlePlayer.PlayerOriginalSteals / singlePlayer.PlayerOriginalMinutes;
        var Blocks_Per_Min = singlePlayer.PlayerOriginalBlocks / singlePlayer.PlayerOriginalMinutes;
        var Turnovers_Per_Min = singlePlayer.PlayerOriginalTurnovers / singlePlayer.PlayerOriginalMinutes;

        var New_Points = Points_Per_Min * singlePlayer.PlayerMinutes;
        var New_Threes = Threes_Per_Min * singlePlayer.PlayerMinutes;
        var New_Rebounds = Rebounds_Per_Min * singlePlayer.PlayerMinutes;
        var New_Assists = Assists_Per_Min * singlePlayer.PlayerMinutes;
        var New_Steal = Steals_Per_Min * singlePlayer.PlayerMinutes;
        var New_Blocks = Blocks_Per_Min * singlePlayer.PlayerMinutes;
        var New_Turnovers = Turnovers_Per_Min * singlePlayer.PlayerMinutes;

        //Calculate DK Projection
        var DoubleDouble = 0;
        if((New_Points >= 10 && New_Rebounds >= 10) || (New_Points >= 10 && New_Assists >= 10) || (New_Rebounds >= 10 && New_Assists >= 10)) {
          DoubleDouble = 1;
        }
        var TripleDouble = 0;
        if((New_Points >= 10 && New_Rebounds >= 10 && New_Assists >= 10)) {
          TripleDouble = 1;
        }

        var PlayerDKPoints = ((New_Points * 1) + (New_Threes * 0.5)+ (New_Rebounds * 1.25) + (New_Assists * 1.5) + (New_Steal * 2) + (New_Blocks * 2) + (New_Turnovers * -0.5) + (DoubleDouble * 1.5) + (TripleDouble * 3));
        singlePlayer.PlayerDKPoints = PlayerDKPoints;

        rows.push(singlePlayer.PlayerName +","+ singlePlayer.PlayerDKPoints.toFixed(3) +",");
      });
      var csvContent = "data:text/csv;charset=utf-8,";

      csvContent += "Name,DK Projection\r\n";
      rows.forEach(function(rowArray) {
          csvContent += rowArray + "\r\n";
      });
      var encodedUri = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "MODIFIED_Awesemo_DK_Projections.csv");
      document.body.appendChild(link); // Required for FF

      link.click();
    }
    $scope.DownloadModifiedFDProjections = function() {
      var rows = [];
      $scope.AllPlayers.forEach(function(singlePlayer){

        var Points_Per_Min = singlePlayer.PlayerOriginalPoints / singlePlayer.PlayerOriginalMinutes;
        var Threes_Per_Min = singlePlayer.PlayerOriginalThrees / singlePlayer.PlayerOriginalMinutes;
        var Rebounds_Per_Min = singlePlayer.PlayerOriginalRebounds / singlePlayer.PlayerOriginalMinutes;
        var Assists_Per_Min = singlePlayer.PlayerOriginalAssists / singlePlayer.PlayerOriginalMinutes;
        var Steals_Per_Min = singlePlayer.PlayerOriginalSteals / singlePlayer.PlayerOriginalMinutes;
        var Blocks_Per_Min = singlePlayer.PlayerOriginalBlocks / singlePlayer.PlayerOriginalMinutes;
        var Turnovers_Per_Min = singlePlayer.PlayerOriginalTurnovers / singlePlayer.PlayerOriginalMinutes;

        var New_Points = Points_Per_Min * singlePlayer.PlayerMinutes;
        var New_Threes = Threes_Per_Min * singlePlayer.PlayerMinutes;
        var New_Rebounds = Rebounds_Per_Min * singlePlayer.PlayerMinutes;
        var New_Assists = Assists_Per_Min * singlePlayer.PlayerMinutes;
        var New_Steal = Steals_Per_Min * singlePlayer.PlayerMinutes;
        var New_Blocks = Blocks_Per_Min * singlePlayer.PlayerMinutes;
        var New_Turnovers = Turnovers_Per_Min * singlePlayer.PlayerMinutes;

        //Calculate FD Projection
        var PlayerFDPoints = ((New_Points * 1) + (New_Rebounds * 1.2) + (New_Assists * 1.5) + (New_Steal * 3) + (New_Blocks * 3) + (New_Turnovers * -1));
        singlePlayer.PlayerFDPoints = PlayerFDPoints;

        rows.push(singlePlayer.PlayerName +","+ singlePlayer.PlayerFDPoints.toFixed(3) +",");
      });
      var csvContent = "data:text/csv;charset=utf-8,";

      csvContent += "Name,FD Projection\r\n";
      rows.forEach(function(rowArray) {
          csvContent += rowArray + "\r\n";
      });
      var encodedUri = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "MODIFIED_Awesemo_FD_Projections.csv");
      document.body.appendChild(link); // Required for FF

      link.click();
    }
    $scope.calcPositionMins = function(team, position) {
      var sumMin = 0;
      $scope.AllPlayers.forEach(function (player) {
          if(player.PlayerTeam ===  team && player.PlayerPosition === position) {
            sumMin += player.PlayerMinutes;
          }
      });
      return sumMin;
    }
    $scope.calcMins = function(team) {
      var sumMin = 0;
      $scope.AllPlayers.forEach(function (player) {
          if(player.PlayerTeam ===  team ) {
            sumMin += player.PlayerMinutes;
          }
      });
      return sumMin;
    }

    $scope.getMaxValue = function() {
      var currentMax = 0;
      $scope.AllPlayers.forEach(function (player) {
          if(player.PlayerValue > currentMax && isFinite(player.PlayerValue)) {
            currentMax = player.PlayerValue;
          }
      });
      return currentMax;
    }
    $scope.getMaxOwnership = function() {
      var currentMax = 0;
      $scope.AllPlayers.forEach(function (player) {
          if(player.PlayerOwnership > currentMax) {
            currentMax = player.PlayerOwnership;
          }
      });
      return currentMax;
    }
    $scope.getMaxOwnershipPosition = function(position) {
      var currentMax = 0;
      $scope.AllPlayers.forEach(function (player) {
          if(player.PlayerOwnership > currentMax && player.PlayerPosition === position) {
            currentMax = player.PlayerOwnership;
          }
      });
      return currentMax;
    }
    $scope.updatePlayerMinutes = function(playerName) {

      var DK_File = false;

      for(var j = 0; j < $scope.AllPlayers.length; j++) {
        if($scope.AllPlayers[j].PlayerPosition.includes("/")) {
          DK_File = true;
          break;
        }
      }


      $scope.AllPlayers.forEach(function (singlePlayer) {
          if(singlePlayer.PlayerName === playerName) {

            var Points_Per_Min = singlePlayer.PlayerOriginalPoints / singlePlayer.PlayerOriginalMinutes;
            var Threes_Per_Min = singlePlayer.PlayerOriginalThrees / singlePlayer.PlayerOriginalMinutes;
            var Rebounds_Per_Min = singlePlayer.PlayerOriginalRebounds / singlePlayer.PlayerOriginalMinutes;
            var Assists_Per_Min = singlePlayer.PlayerOriginalAssists / singlePlayer.PlayerOriginalMinutes;
            var Steals_Per_Min = singlePlayer.PlayerOriginalSteals / singlePlayer.PlayerOriginalMinutes;
            var Blocks_Per_Min = singlePlayer.PlayerOriginalBlocks / singlePlayer.PlayerOriginalMinutes;
            var Turnovers_Per_Min = singlePlayer.PlayerOriginalTurnovers / singlePlayer.PlayerOriginalMinutes;

            var New_Points = Points_Per_Min * singlePlayer.PlayerMinutes;
            var New_Threes = Threes_Per_Min * singlePlayer.PlayerMinutes;
            var New_Rebounds = Rebounds_Per_Min * singlePlayer.PlayerMinutes;
            var New_Assists = Assists_Per_Min * singlePlayer.PlayerMinutes;
            var New_Steal = Steals_Per_Min * singlePlayer.PlayerMinutes;
            var New_Blocks = Blocks_Per_Min * singlePlayer.PlayerMinutes;
            var New_Turnovers = Turnovers_Per_Min * singlePlayer.PlayerMinutes;

            //Calculate DK Projection
            var DoubleDouble = 0;
            if((New_Points >= 10 && New_Rebounds >= 10) || (New_Points >= 10 && New_Assists >= 10) || (New_Rebounds >= 10 && New_Assists >= 10)) {
              DoubleDouble = 1;
            }
            var TripleDouble = 0;
            if((New_Points >= 10 && New_Rebounds >= 10 && New_Assists >= 10)) {
              TripleDouble = 1;
            }

            var PlayerDKPoints = ((New_Points * 1) + (New_Threes * 0.5)+ (New_Rebounds * 1.25) + (New_Assists * 1.5) + (New_Steal * 2) + (New_Blocks * 2) + (New_Turnovers * -0.5) + (DoubleDouble * 1.5) + (TripleDouble * 3));
            singlePlayer.PlayerDKPoints = PlayerDKPoints;

            //Calculate FD Projection
            var PlayerFDPoints = ((New_Points * 1) + (New_Rebounds * 1.2) + (New_Assists * 1.5) + (New_Steal * 3) + (New_Blocks * 3) + (New_Turnovers * -1));
            singlePlayer.PlayerFDPoints = PlayerFDPoints;

            if(DK_File) {
              //DK File
              singlePlayer.PlayerValue = ((PlayerDKPoints / singlePlayer.PlayerSalary) * 1000);
            }
            else {
              //FD file
              singlePlayer.PlayerValue = ((PlayerFDPoints / singlePlayer.PlayerSalary) * 1000);
            }
          }
      });
    }

    $scope.clearData = function() {
      $scope.Title = "Main";
      $scope.Date  = new Date()
      $scope.AllPlayers = [];
      $scope.AllTeams = [];

      $scope.sampleData = false;
      $scope.statsLoaded = false;
      $scope.OwnershipLoaded = false;

    }

    $scope.save = function() {
      $scope.Title = $scope.uuidv4();
      mainObj = {
        Title : $scope.Title,
        Date : $scope.Date,
        AllPlayers : $scope.AllPlayers,
        AllTeams : $scope.AllTeams
      }
      localStorage.setItem("AwesemoMinutes_" + $scope.Title, JSON.stringify(mainObj));
    }

    $scope.read = function(title) {
      $scope.savedPastSettings.forEach(function(singleSetting) {
        if(singleSetting.Title === title) {
          $scope.Title = singleSetting.Title;
          $scope.Date = Date.parse(singleSetting.Date);
          $scope.AllPlayers = singleSetting.AllPlayers;
          $scope.AllTeams = singleSetting.AllTeams;

          //rebuild projections
          $scope.AllPlayers.forEach(function(singlePlayer) {
            if(singlePlayer.PlayerMinutes > 0) {
              $scope.updatePlayerMinutes(singlePlayer.PlayerName);
            }
          });

        }
      });
      // for(var singleSetting in $scope.savedPastSettings) {
      //   if(singleSetting.Title === title) {
      //     $scope.Title = singleSetting.Title;
      //     $scope.Date = singleSetting.Date;
      //     $scope.AllPlayers = singleSetting.AllPlayers;
      //     $scope.AllTeams = singleSetting.AllTeams;
      //   }
      // }
    }

    $scope.loadPastSettings = function() {
      $scope.savedPastSettings = [];
      for(var i in localStorage) {
        if(i.includes("AwesemoMinutes")) {
          $scope.savedPastSettings.push(JSON.parse(localStorage[i]));
        }
        //console.log(localStorage[i]);
      }
    }


    $scope.ModifyAdjustedOwnership = function(player) {
      if(player.Over === undefined || player.Over === "" || player.Over === "-") {
        player.AdjustedOwnership = player.PlayerOwnership;
      }
      else {
        // var value = 100/player.PlayerOwnership;
        if(parseFloat(player.Over) < -100) {
          player.Over = -100;
        }
        var adjustment = 100 + parseFloat(player.Over);
        player.AdjustedOwnership = player.PlayerOwnership * (adjustment*0.01);
      }
    }
    $scope.getMaxAdjustedOwnershipPosition = function(position) {
      var currentMax = 0;
      $scope.AllPlayers.forEach(function (player) {
          if(player.AdjustedOwnership > currentMax && player.PlayerPosition === position) {
            currentMax = player.AdjustedOwnership;
          }
      });
      return currentMax;
    }
    $scope.uuidv4 = function() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }

    $scope.getGradientColor = function(min, max, number) {
        // strip the leading # if it's there

        var percent = number / max;

       end_color = "7FFF00";//green
       start_color = "FF0000";//red

       // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
       if(start_color.length == 3){
         start_color = start_color.replace(/(.)/g, '$1$1');
       }

       if(end_color.length == 3){
         end_color = end_color.replace(/(.)/g, '$1$1');
       }

       // get colors
       var start_red = parseInt(start_color.substr(0, 2), 16),
           start_green = parseInt(start_color.substr(2, 2), 16),
           start_blue = parseInt(start_color.substr(4, 2), 16);

       var end_red = parseInt(end_color.substr(0, 2), 16),
           end_green = parseInt(end_color.substr(2, 2), 16),
           end_blue = parseInt(end_color.substr(4, 2), 16);

       // calculate new color
       var diff_red = end_red - start_red;
       var diff_green = end_green - start_green;
       var diff_blue = end_blue - start_blue;

       diff_red = ( (diff_red * percent) + start_red ).toString(16).split('.')[0];
       diff_green = ( (diff_green * percent) + start_green ).toString(16).split('.')[0];
       diff_blue = ( (diff_blue * percent) + start_blue ).toString(16).split('.')[0];

       // ensure 2 digits by color
       if( diff_red.length == 1 ) diff_red = '0' + diff_red
       if( diff_green.length == 1 ) diff_green = '0' + diff_green
       if( diff_blue.length == 1 ) diff_blue = '0' + diff_blue

       return '#' + diff_red + diff_green + diff_blue;
    }

}]);

var app = angular.module('dapp.loc.ibank', ['ui.router']);

var customPdfGenerator = require('./pdfContents.js');
app.controller('issuingBankCtrl', function($scope,Api,$http) {

    var lcPdf = customPdfGenerator.createPdf();

  // lcPdf.output('save', 'LetterOfCredit.pdf'); //Try to save PDF as a file (not works on ie before 10, and some mobile devices)
  /*
      var pdfData = lcPdf.output('arraybuffer')
      alternative way to save as blob
              var pdf = new Blob([pdfData], {
                  type: 'application/pdf'
              });

  */
      var pdf = lcPdf.output('blob');
    /*
    // open pdf in new window
      var fileURL = URL.createObjectURL(pdf);
      window.open(fileURL);
*/
      var data = new FormData();
      data.append('pdfFile' , pdf);

                var request = {
                    method: 'POST',
                    url: '/ethereumDapp/uploadLC',
                    data: data,
                    headers: {
                        'Content-Type': undefined
                    }
                };

                // SEND THE FILES.
                $http(request)
                    .success(function (d) {
                      //console.log(d);
                    })
                    .error(function () {
                    });

$scope.lcStatus=5;
$scope.message="";

console.log($scope.issuingBankName);

$scope.createLC = function(){
    $scope.isLcCreated= true;
}


$scope.issueLC = function () {
    $scope.digitallySign=true;
}

$scope.makePaymentPermission =function(){
    $scope.digitallySign=true;
}

if($scope.lcStatus>1 && $scope.lcStatus<9){
$scope.message="LC issued . Waiting for buyer confirmation on receiving goods..."
}

if($scope.lcStatus>9){
$scope.message="Payment Done"
}

});

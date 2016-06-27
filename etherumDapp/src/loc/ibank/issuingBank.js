var app = angular.module('dapp.loc.ibank', ['ui.router']);

var customPdfGenerator = require('./pdfContents.js');
app.controller('issuingBankCtrl', function($scope,Api,$http,$timeout) {

    var lcPdf;
    var pdf;
    $scope.isLcCreated= false;
    $scope.billOfLading =true;
    $scope.invoice = false;
    $scope.transportDoc=false;
    $scope.message="";

    Api.letterOfCredit.contractData.get().$promise.then(function(data){
        //console.log(data)
        $scope.contractData=data;
        $timeout(function () {
          $scope.lcStatus=data.lcStatus;
          console.log($scope.lcStatus);

          if($scope.lcStatus>1 && $scope.lcStatus<9){
          $scope.message="LC issued . Waiting for buyer confirmation on receiving goods..."
          }

          if($scope.lcStatus>9){
          $scope.message="Payment Done"
          }

        }, 1000);



      },function(error) {
          console.log('error', error);
    });

    Api.letterOfCredit.getAccounts.get().$promise.then(function(data){
        console.log(data);
        $scope.sellerAccountAddress=data[3];
      },function(error) {
                    console.log('error', error);
    });
    Api.letterOfCredit.getAccountBalances.get().$promise.then(function(data){
        console.log(data);
        $scope.sellerAccountBalance=data[3];
      },function(error) {
                    console.log('error', error);
    });

    function uploadPdf(){
      var data = new FormData();
      data.append('pdfFile' , pdf);

                var request = {
                    method: 'POST',
                    url: '/ethereumDapp/letterOfCredit/issueLC',
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
$scope.message="";
    }


  // lcPdf.output('save', 'LetterOfCredit.pdf'); //Try to save PDF as a file (not works on ie before 10, and some mobile devices)
  /*
      var pdfData = lcPdf.output('arraybuffer')
      alternative way to save as blob
              var pdf = new Blob([pdfData], {
                  type: 'application/pdf'
              });

  */

    /*
    // open pdf in new window
      var fileURL = URL.createObjectURL(pdf);
      window.open(fileURL);
*/




//console.log($scope.issuingBankName);

$scope.createLCPdf = function(){
    $scope.isLcCreated= true;
    var docsToBeSubmitted="";
    if($scope.billOfLading)docsToBeSubmitted="Bill OF Lading,";
    if($scope.invoice)docsToBeSubmitted=docsToBeSubmitted+"Invoice,";
    if($scope.transportDoc)docsToBeSubmitted=docsToBeSubmitted+"Transport Documents";
    lcPdf = customPdfGenerator.createPdf($scope.issuingBankDetails,$scope.advisingBankDetails,$scope.applicantDetails,$scope.beneficiaryDetails,docsToBeSubmitted,$scope.deadline,$scope.amountToBePaid,$scope.conditions);
    pdf= lcPdf.output('blob');
    //lcPdf.output('save', 'LetterOfCredit.pdf');
    //console.log($scope.billOfLading);
    //console.log($scope.invoice);
}

$scope.viewLCPdf =function() {
  var fileURL = URL.createObjectURL(pdf);
  window.open(fileURL);

}

$scope.downloadLCPdf =function() {
    lcPdf.output('save', 'LetterOfCredit.pdf');
}

$scope.issueLC = function () {
    $scope.digitallySign=true;
    uploadPdf();
}

$scope.makePaymentPermission =function(){
    $scope.digitallySign=true;
    Api.letterOfCredit.confirmPayment.confirm().$promise.then(function(data){
        console.log(data);
      },function(error) {
                    console.log('error', error);
    });
}



});

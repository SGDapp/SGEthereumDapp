var createPdf = function(issuingBankDetails,advisingBankDetails,applicantDetails,beneficiaryDetails,docsToBeSubmitted,deadline,amountToBePaid,conditions){
var doc = new jsPDF();
doc.setFontType("bold");
doc.text(80, 30, 'Letter Of Credit');
doc.text(20, 50, 'Issuing Bank:');
doc.setFontType("normal");
doc.text(72, 50, issuingBankDetails);
doc.setFontType("bold");
doc.text(20, 80, 'Advising Bank:');
doc.setFontType("normal");
doc.text(72, 80, advisingBankDetails);
doc.setFontType("bold");
doc.text(20, 110, 'Applicant:');
doc.setFontType("normal");
doc.text(72, 110, applicantDetails);
doc.setFontType("bold");
doc.text(20, 140, 'Beneficiary:');
doc.setFontType("normal");
doc.text(72, 140, beneficiaryDetails);

doc.setFontType("bold");
doc.text(20, 170, 'Documents to:\nbe Submitted');
doc.setFontType("normal");
doc.text(72, 170, docsToBeSubmitted);

doc.setFontType("bold");
doc.text(20, 190, 'Delivary Deadline:');
doc.setFontType("normal");
doc.text(72, 190, deadline);

doc.setFontType("bold");
doc.text(20, 210, 'Amount to be:\nPaid');
doc.setFontType("normal");
doc.text(72, 210, amountToBePaid);

doc.setFontType("bold");
doc.text(20, 230, 'Conditions:');
doc.setFontType("normal");
doc.text(72, 230, conditions);

return doc;
}

module.exports.createPdf= createPdf;

var createPdf = function(){
var doc = new jsPDF();
doc.setFontType("bold");
doc.text(80, 30, 'Letter Of Credit');
doc.text(20, 50, 'Issuing Bank:');
doc.setFontType("normal");
doc.text(72, 50, 'Issuing Bank:asdasdasdasdasdasda\
    \nasdasdasddas\ndasdasd\nasdasdsad');
doc.setFontType("bold");
doc.text(20, 80, 'Advising Bank:');
doc.setFontType("normal");
doc.text(72, 80, 'Issuing Bank:asdasdasdasdasdasda\
    \nasdasdasddas\ndasdasd\nasdasdsad');
doc.setFontType("bold");
doc.text(20, 110, 'Applicant:');
doc.setFontType("normal");
doc.text(72, 110, 'Issuing Bank:asdasd\nasdasdas\ndasda');
doc.setFontType("bold");
doc.text(20, 140, 'Beneficiary:');
doc.setFontType("normal");
doc.text(72, 140, 'Issuing Bank:asdasd\nasdasdas\ndasda');

doc.setFontType("bold");
doc.text(20, 170, 'Documents to:\nbe Submitted');
doc.setFontType("normal");
doc.text(72, 170, 'Issuing Bank:asdasd\nasdasdas');

doc.setFontType("bold");
doc.text(20, 190, 'Delivary Deadline:');
doc.setFontType("normal");
doc.text(72, 190, 'Issuing Bank:asdasd');

doc.setFontType("bold");
doc.text(20, 210, 'Amount to be:\nPaid');
doc.setFontType("normal");
doc.text(72, 210, 'Issuing Bank:asdasd\nasdasdas');

doc.setFontType("bold");
doc.text(20, 230, 'Conditions:');
doc.setFontType("normal");
doc.text(72, 230, 'Issuing Bank:asdasd\nasdasdas');

return doc;
}

module.exports.createPdf= createPdf;

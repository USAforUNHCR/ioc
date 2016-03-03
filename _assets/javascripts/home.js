var gw = new Groundwork ({
    'api_url': 'https://api.thegroundwork.com',
    'oauth_client_id': 'pub-un-test.olympics--Gp9kL6zhJ20.teMAuXMAvmtMjh.9KLXwNbiumd.dMsxFGwwFYkUqqjb2UTtRumvrf_9faJXkCV8faQV9fhTGXg'
  });

function splitNames(name){
  var nameArr = name.split(" ");
  var givenName = nameArr[0];
  var familyName = "";
  for (var i = 1; i< nameArr.length; i++) {
    familyName = familyName + " " + nameArr[i];
  }
  return {
    familyName: familyName,
    givenName: givenName
  };
}

$(document).ready(function(){
  formListener();
});

function formListener() {
  $('#petition').submit(function(event) {
    event.preventDefault()
    var form = $('#petition');
    var data = splitNames(form.find('[name="NAME"]').val());
    data.email = form.find('[name="EMAIL"]').val();
    data.postalCode = form.find('[name="ZIP"]').val();
    data.source = querystring.parse().src;
    sendData(data);
    form.find('input').val('');
    form.find('[type="submit"]').prop('value','Thanks!');
    form.find('[type="submit"]').prop('disabled', true);
  });
}

function sendData(data) {
  data.tags || (data.tags = {});
  data.tags.send_email = 0;
  gw.supporters.create(data)
  .then(function(res){
    console.log(res);
    // window.location.href = '../confirmation.html';
  })
  .catch(function(res){
    console.log(res);
  });
};
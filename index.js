var input = document.getElementById("inputImage");

input.addEventListener("change", function(event){
  var file = event.target.files;
  var reader = new FileReader();
  reader.readAsDataURL(file[0]);

  reader.onload = function(){
    var img = new Image();
    img.src = reader.result;
    document.getElementById("loading").classList.add("hollow-dots-spinner");
    img.onload = function(){
      var canvas = document.createElement('canvas');
      document.body.appendChild(canvas)
      var ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      console.log(document.getElementById("loading").classList)
      var data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var newData = ctx.createImageData(canvas.width, canvas.height);
      generateShadow(data, newData);
      resizeImage(img);
      canvas.parentNode.removeChild(canvas)
    }
  }
}, false);

var generateShadow = function(data, newData) {
  var wrapper = document.getElementById("wrapper");
  rawData = newData.data;
  for(var i = 0; i < data.height; i++){
    var boxShadowStyle = ""
    var div = document.createElement('div');
    for(var j = 0; j < data.width; j++){
      var idx = (j + i * data.width) * 4;
      boxShadowStyle += ` ${j}px ${0}px rgb(${data.data[idx]}, ${data.data[idx+1]}, ${data.data[idx+2]}),`;
      rawData[idx] = data.data[idx];
      rawData[idx + 1] = data.data[idx+1];
      rawData[idx + 2] = data.data[idx+2];
    }
    var boxShadowStyle = boxShadowStyle.slice(0, -1);
    div.style.boxShadow = boxShadowStyle;
    div.style.width = "1px";
    div.style.height = "1px";
    wrapper.appendChild(div)
  }
}

var resizeImage = async function(img) {
  if(img.width > window.innerWidth) {
    document.getElementById("wrapper").style.width = `${img.width}px`
  }
  await document.getElementById("loading").classList.remove("hollow-dots-spinner");
}


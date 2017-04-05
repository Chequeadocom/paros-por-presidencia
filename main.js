 // Define data and legend 
     // unit 
     var oneDay  = 24*60*60;
     var oneMonth  = 24*60*60*30;
     var oneYear = 365*24*60*60;
    
var c10 = d3.scale.category10();

     // data 
     var data=[
                
                {
                  label:"Alfons&iacute;n",
                  value:0.19,
                  unit:oneMonth,
                  legend:"",
                  source:"http://www.bigmacmuseum.com/",
                  ttl:0.999,
                  old:null
                },
                {
                  label:"Menem I",
                  value:0.04,
                  unit:oneMonth,
                  legend:"",
                  source:"http://www.coca-cola.co.uk/faq/products/how-many-cans-of-coca-cola-are-sold-worldwide-in-a-day.html",
                  old:null,
                  ttl:0.999,
                },
                
                {
                  label:"Menem II",
                  value:0.09,
                  unit:oneMonth,
                  legend:"",
                  source:"http://www.worldometers.info/cars/",
                 // size:30,
                 // texture:"http://www.motorbeam.com/wp-content/uploads/Renault_Bajaj_Small_Car.jpg",
                  old:null,
                  ttl:0.999, //999 product cycle 
                },
                {
                  label:"De la R&uacute;a",
                  value:0.36,
                  unit:oneMonth,
                  legend:"",
                  source:"http://www.worldometers.info/bicycles/",
                  //texture:"http://image.made-in-china.com/2f0j00SKsQUwotETqJ/700C-3k-38mm-Tubular-Full-Carbon-Bicycle-Wheels-with-Novatec-Hub-BX-W38T-.jpg",
                  old:null,
                  ttl:0.999, // product cycle ??
                },
                {
                  label:"Duhalde",
                  value:0.18,
                  unit:oneMonth,
                  source:"http://www.worldometers.info/computers/",
                  //texture:"http://upload.wikimedia.org/wikipedia/commons/1/1a/Tatung-einstein-computer.png",
                  old:null,
                  ttl:0.999,
                },
                
                {
                  label:"N. Kirchner",
                  value:0.01,
                  unit:oneMonth,
                  source:"http://www.worldometers.info/cars/",
                 // size:30,
                 // texture:"http://www.motorbeam.com/wp-content/uploads/Renault_Bajaj_Small_Car.jpg",
                  old:null,
                  ttl:0.999, //999 product cycle 
                },
                {
                  label:"CFK I",
                  value:0,
                  unit:oneMonth,
                  source:"http://www.worldometers.info/bicycles/",
                  //texture:"http://image.made-in-china.com/2f0j00SKsQUwotETqJ/700C-3k-38mm-Tubular-Full-Carbon-Bicycle-Wheels-with-Novatec-Hub-BX-W38T-.jpg",
                  old:null,
                  ttl:0.999, // product cycle ??
                },
                {
                  label:"CFK II",
                  value:0.10,
                  unit:oneMonth,
                  source:"http://www.worldometers.info/computers/",
                  //texture:"http://upload.wikimedia.org/wikipedia/commons/1/1a/Tatung-einstein-computer.png",
                  old:null,
                  ttl:0.999,
                }
                ,
                {
                  label:"Macri",
                  value:0.06,
                  unit:oneMonth,
                  source:"http://www.worldometers.info/computers/",
                  //texture:"http://upload.wikimedia.org/wikipedia/commons/1/1a/Tatung-einstein-computer.png",
                  old:null,
                  ttl:0.999,
                }
        ]

      var w = $(window).width();

      // Setting normal chart 
      sceneSetting = {
        x:0,
        y:0,
        width:w,
        height:200,
        chart:{
          x:0,      // chart.x on the schema
          y:0,      // chart.y on the schema
          width:w,  // chart.width on the schema
          height:200,  // chart.width on the schema
          colorRange:d3.scale.category10()
        },
        data:{
              model:[],
              stream:{}
            },
        sedimentation:{
          token:{
            size:{ original:10, minimum:2 }
          }
        }
      }

      // create column by datas  
      for (var i = data.length - 1; i >= 0; i--) {
        sceneSetting.data.model.push({label:data[i].label})
      };

      // customize tokens before create it  
      function createToken(_this,i,data){
         var token = { 
            category:i,
            callback:{
             draw:function(token){
               var size = token.attr("size");
               if (size > 5){
                  token.attr("size",size*data.ttl);
               }
             }
            }
          }

        token.fillStyle=c10(i);

        if(typeof(data.texture)!="undefined"){
         token.texture = {}
         token.texture.src = data.texture
        }
        if(typeof(data.size)!="undefined"){
          token.size = data.size
        }
        token.size = 15;
        if(_this && _this.addToken){
          _this.addToken(token);
        }
      }

      // setup the scene
      var scene    = $("#demo").vs(sceneSetting).data('visualSedimentation');
      //console.log(scene)

      // setup the clock 
      var time     = new Date(),secondsToday,secondsSinceNewYear, milliSecondsToday;

      var iteration = 0;

      var meses = 0;

      var clock;

      var segundos = 0;

      // start the clock 
      function start() {
          for (var i = data.length - 1; i >= 0; i--) {
            data[i].old = null;                                      
          };
          meses = 0;

          $('#restart').hide();

          /*setInterval(function(){
            console.log(segundos++);
          },1000);*/

          clock    = window.setInterval(
                              function (){

                                  if(iteration % 100==0){
                                    meses++;
                                    $('#meses').html(meses);
                                  }

                                  time = new Date()
                                  secondsToday = (time.getHours()*60*60) + (time.getMinutes()*60) + time.getSeconds()
                                  milliSecondsToday= (time.getHours()*60*60*1000) + (time.getMinutes()*60*1000) + time.getSeconds()*1000+time.getMilliseconds() 
                                  
                                  for (var i = data.length - 1; i >= 0; i--) {
                                    data[i].now = Math.round(milliSecondsToday*data[i].value/1000)
                                    if(data[i].old == null){
                                      data[i].old = 0;
                                    } else {
                                      if(data[i].now!=data[i].old){
                                        createToken(scene,i,data[i]);
                                      } 
                                    }
                                    data[i].old = data[i].now                                      
                                  };

                                  if(iteration==4800){
                                    clearInterval(clock);
                                    iteration = 0;
                                    $('#restart').show();
                                    meses = 0;
                                    $('#meses').html(0);
                                  }

                                  iteration++;

                                 }
                                 , 10); 
  
    }

    // add legends 
    var labeling =function(setting,container){
       //$('#'+container).append('<div class="label" style="width:100px;"> &nbsp;</div>');
       var divWidth = Math.floor(setting.width/setting.data.model.length)
       //console.log("divWidth",divWidth)
       for (var i = setting.data.model.length-1; i >= 0 ; i--) {
         $('#'+container).append('<div class="label-viz" style="width:'+divWidth+'px;">'+setting.data.model[i].label+'</div>');
       }
    }

    labeling(sceneSetting,"headerLabel");

    //start();

        // add legends 
/*    var labeling =function(setting,container){
       //$('#'+container).append('<div class="label" style="width:100px;"> &nbsp;</div>');
       var divWidth = Math.round(setting.width/setting.data.model.length)
       //console.log("divWidth",divWidth)
       for (var i = setting.data.model.length-1; i >= 0 ; i--) {
         $('#'+container).append('<div class="label" style="width:'+divWidth+'px;">'+setting.data.model[i].label+'</div>');
       }
    }*/

    //labeling(sceneSetting,"headerLabel");